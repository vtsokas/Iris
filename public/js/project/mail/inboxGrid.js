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
            { name: 'sender', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'dateAdded', type: 'string' },
            { name: 'isRead', type: 'boolean' }
        ],
        id: 'msg_id',
        cache: false,
        url: 'message-json',
        root: 'Rows'
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
            theme: theme,
            pageable: true,
            pagermode: 'default',
            pagesizeoptions: ['1', '20', '50', '100'],
            pagesize:20,
            sortable: true,
            enablehover: false,
            selectionmode: 'checkbox',
            localization: greekLanguage,
            virtualmode: true,
            rendergridrows: function (params) {
                return params.data;
            },
            columns: [
                { text: 'Αποστολέας', dataField: 'sender', width: '15%' , cellsrenderer: rendrow },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: '40%' , cellsrenderer: rendrow },
                { text: 'Τύπος', editable: false, dataField: 'type', width: 'auto',cellsAlign: 'center', align: 'center' , cellsrenderer: rendrow },
                { text: 'Ημερομηνία', dataField: 'dateAdded', width: '15%', cellsAlign: 'right', align: 'right', cellsrenderer: rendrow }
            ]
        });
    $("#MailTable").css('visibility','visible');

    /**
     * Changes on interface on row selected
     */
    $("#MailTable").on('rowselect', function (event){
        GetTopButtonsOnGridSelectionChange();
    });

    /**
     * Changes on interface on row unselected
     */
    $('#MailTable').on('rowunselect', function (event){
        GetTopButtonsOnGridSelectionChange();
    });

    /**
     * Function determines which buttons should appear on top menu, according to email selection
     */
    GetTopButtonsOnGridSelectionChange = function(){
        var selectedrowindexes = $('#MailTable').jqxGrid('selectedrowindexes');
        if (selectedrowindexes.length==1){
            var args=["create", "reply", "view", "delete"];
            ShowTopMenuItems(args);;
        }
        else if (selectedrowindexes.length==0){
            var args=["create"];
            ShowTopMenuItems(args);
        }
        else{
            var args=["create", "delete"];
            ShowTopMenuItems(args);
        }
    }



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
            viewMessage(event.args.rowindex);

            var args = ["reply","delete","cancel"];
            ShowTopMenuItems(args);
        }
    });
}