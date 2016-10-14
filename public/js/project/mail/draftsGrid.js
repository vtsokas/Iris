initDraftsGrid = function() {

    var url = 'message-json/newMessages?count='+unreadMessages+'&box=inbox';
    var draftsSource =
    {
        datatype: "json",
        datafields: [
            { name: 'msg_id' , type: 'string' },
            { name: 'receiver', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'dateAdded', type: 'string' },
        ],
        id: 'msg_id',
        cache: false,
        url: 'message-json?box=drafts&send=false',
        root: 'Rows',
        beforeprocessing: function (data) {
            draftsSource.totalrecords = data.TotalRows;
        }
    };


    var draftsDataAdapter = new $.jqx.dataAdapter(draftsSource);

    $("#draftsGrid").jqxGrid(
        {
            width:'100%',
            height:'100%',
            source: draftsDataAdapter,
            theme: theme,
            pageable: true,
            pagermode: 'default',
            pagesizeoptions: ['1', '20', '50', '100'],
            pagesize: 20,
            sortable: true,
            enablehover: false,
            selectionmode: 'checkbox',
            localization: greekLanguage,
            virtualmode: true,
            rendergridrows: function (params) {
                return params.data;
            },
            columns: [
                { text: 'Παραλήπτης', dataField: 'receiver', width: '15%' },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: '40%' },
                { text: 'Τύπος', editable: false, dataField: 'type', width: 'auto',cellsAlign: 'center', align: 'center' },
                { text: 'Ημερομηνία', dataField: 'dateAdded', width: '15%', cellsAlign: 'right', align: 'right' }
            ]
        });
    $("#draftsGrid").css('visibility','visible');

    /**
     * Changes on interface on row selected
     */
    $("#draftsGrid").on('rowselect', function (event){
        GetTopButtonsOnGridSelectionChange();
    });

    /**
     * Changes on interface on row unselected
     */
    $('#draftsGrid').on('rowunselect', function (event){
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
    var contextMenu = $("#draftsGridMenu").jqxMenu({ width: 200, height: 58, autoOpenPopup: false, mode: 'popup'});
    $("#draftsGridMenu").css("visibility", "visible");
    $("#draftsGrid").on('contextmenu', function () {
        return false;
    });
    // handle context menu clicks.
    $("#draftsGridMenu").on('itemclick', function (event) {
        var args = event.args;
        var rowindex = $("#draftsGrid").jqxGrid('getselectedrowindex');
        if ($.trim($(args).text()) == "Edit Selected Row") {

        }
        else {

        }
    });

    $('#outboxGrid').on('rowclick', function (event) {
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