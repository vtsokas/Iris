tmpdata = null;
unreadMessages = 0;
caller = 'grid';
box = 'inbox';
initInboxGrid = function() {

    /**
     * New/unread mails are styled bold and italic. It applies on every cell of each row.
     * @param row
     * @param columnfield
     * @param value
     * @param defaulthtml
     * @param columnproperties
     * @param rowdata
     * @returns {string}
     */
    var rendrow = function(row, columnfield, value, defaulthtml, columnproperties, rowdata){
        if(rowdata.isRead == 0){
            var align=columnproperties.align;
            if(align == "center"){
                align = "middle";
            }
            return '<div class="jqx-grid-cell-' + align + '-align" style="margin-top: 6px;"><b>' + value + '</b></div>';
        }
    }

    var inboxSource =
    {
        datatype: "json",
        datafields: [
            { name: 'msg_id' , type: 'string' },
            { name: 'sender_office', type: 'string' },
            { name: 'sender_user', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'dateAdded', type: 'date' },
            { name: 'isRead', type: 'boolean' }
        ],
        id: 'msg_id',
        cache: false,
        url: 'message-json',
        root: 'Rows',
        sort: function () {
            // update the grid and send a request to the server.
            $("#MailTable").jqxGrid('updatebounddata', 'sort');
        },
        filter: function () {
            // update the grid and send a request to the server.
            $("#MailTable").jqxGrid('updatebounddata', 'filter');
        }
    };

    var inboxDataAdapter = new $.jqx.dataAdapter(inboxSource,
        {
            loadServerData: function (serverdata, source, callback) {
                $.ajax({
                    dataType: source.datatype,
                    url: 'message-json?count=' + unreadMessages + '&box=inbox&caller=' + caller,
                    data: serverdata,
                    success: function (data, status, xhr) {
                        unreadMessages = data.unreadMessages;
                        if (serverdata.pagenum == 0)
                        {
                            if (data.Rows.length > 0)
                            {
                                tmpdata = data;   //keep current data
                            }
                            else{
                                if (tmpdata != null)
                                    data = tmpdata;
                                else
                                    data = Array();
                            }
                        }
                        $("#LeftMenu ul li span").first().text("");
                        $("#LeftMenu ul li span").first().text("Εισερχόμενα" + " (" + unreadMessages + ")");

                            //your code to be executed after 1 second
                        $("#MailTable .jqx-grid-load").parent().parent().css('width','100%');
                        $("#MailTable .jqx-grid-load").parent().css('width','100%');

                        caller = 'grid'; //refresh caller to default value
                        callback({ records: data.Rows, totalrecords: data.TotalRows });
                    }
                });
            }
        });

    $("#MailTable").jqxGrid(
        {
            width:'100%',
            height:'100%',
            source: inboxDataAdapter,
            showdefaultloadelement: false,
            theme: theme,
            pageable: true,
            pagermode: 'default',
            pagesizeoptions: ['1', '20', '50', '100'],
            pagesize:20,
            sortable: true,
            filterable: true,
            //showfilterrow: true,
            filtermode: 'excel',
            columnsresize: true,
            enablehover: false,
            selectionmode: 'checkbox',
            localization: greekLanguage,
            virtualmode: true,
            rendergridrows: function (params) {
                return params.data;
            },
            columns: [
                { text: 'Γραφείο', dataField: 'sender_office', width: '10%' , cellsrenderer: rendrow },
                { text: 'Χρήστης', dataField: 'sender_user', width: '10%' , cellsrenderer: rendrow },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: 'auto' , cellsrenderer: rendrow },
                { text: 'Τύπος', editable: false, dataField: 'type', width: '15%',cellsAlign: 'center', align: 'center' , cellsrenderer: rendrow },
                { text: 'Ημερομηνία', dataField: 'dateAdded', width: '20%', cellsAlign: 'right', align: 'right', cellsrenderer: rendrow }
            ]
        });
    $("#MailTable").css('visibility','visible');

    /**
     * Changes on interface on row selected
     */
    $("#MailTable").on('rowselect', function (event){
        GetTopButtonsOnGridSelectionChange(event.currentTarget.id);
    });

    /**
     * Changes on interface on row unselected
     */
    $('#MailTable').on('rowunselect', function (event){
        GetTopButtonsOnGridSelectionChange(event.currentTarget.id);
    });

    // create context menu
    var contextMenu = $("#gridMenu").jqxMenu({ width: 200, height: 58, autoOpenPopup: false, mode: 'popup'});
    $("#gridMenu").css("visibility", "visible");
    $("#MailTable").on('contextmenu', function () {
        return false;
    });
    // handle context menu clicks.
    $("#gridMenu").on('itemclick', function (event) {
        var args = event.args;
        var rowindex = $("#MailTable").jqxGrid('getselectedrowindex');
        if ($.trim($(args).text()) == "Edit Selected Row") {
            alert("EDIT");
        }
        else {

        }
    });

    $('#MailTable').on('rowclick', function (event) {
        if (event.args.rightclick) {
            //$("#MailTable").jqxGrid('selectrow', event.args.rowindex);
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();
            contextMenu.jqxMenu('open', parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
            return false;
        }
        else{
            viewMessage(event.args.rowindex, 'MailTable');

            var args = ["reply","delete","cancel"];
            ShowTopMenuItems(args);
        }
    });
}