
var previousState; // keeping user's last selection on left menu

$(document).ready(function () {

    /**
     * Changing content according to left menu selection(inbox, outbox, drafts etc.)
     */
    $('#LeftMenu').on('itemclick', function (event) {
        // get the clicked LI elements
        var element = event.args;
        var args = new Array();
        switch(element.id) {
            case "inbox":
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="inbox";
                });
                break;
            case "outbox":
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="outbox";
                });
                break;
            case "drafts":
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="draft";
                });
                break;
            default:
            //default code block
        }
        previousState = args;
        ShowTopMenuItems(args);

        datatablesampledata.localdata=filtereddata;

        HideAllInterfaces();
        ShowMailTableInterface();

    });

    /**
     * Default selection on initialization is the inbox
     */
    $('#LeftMenu').on('initialized', function () {
        $("#inbox").click();
    });

    /**
     * Function to hide all of top menu's elements
     */
    function HideTopMenuItems(){
        for($i=0; $i<TopMenuItems.length; $i++) {
            $("#"+TopMenuItems[$i].id).hide();
        }
    }

    /**
     * Function to show selected elements(args) on top menu
     */
    function ShowTopMenuItems(args){
        HideTopMenuItems();
        for($i=0; $i<args.length; $i++) {
            $("#"+args[$i]).show();
        }
    }

    /**
     * Changing content according to top menu selection(create, reply, cancel etc.)
     */
    $('#TopMenu').on('itemclick', function(event){
        var element = event.args;
        var args = new Array();
        switch (element.id){
            case "create":
                HideAllInterfaces();
                ShowNewEmailUI();
                args=["send","save","cancel"];
                break;
            case "reply":
                ReplyToEmail();
                args=["send","save","cancel"];
                break;
            case "edit":
                break;
            case "view":
                ViewEmail();
                args=["reply","delete","cancel"];
                break;
            case "delete":
                break;
            case "send":
                //mock message
                alert("�?ήνυμα εστάλη");
                HideAllInterfaces();
                ShowMailTableInterface();
                args = previousState;
                break;
            case "save":
                break;
            case "cancel":
                HideAllInterfaces();
                ShowMailTableInterface();
                args = previousState;
                break;
            default:
        }
        ShowTopMenuItems(args);
    });

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

    /**
     * Hides all interfaces
     */
    HideAllInterfaces = function(){
        $('#newEmail').css('display','none');
        $('#readEmail').css('display','none');
        $('#MailTable').css('display','none');
    }

    /**
     * Show mailtable interface
     */
    ShowMailTableInterface = function () {
        $('#MailTable').jqxGrid('clearselection');                  //clear selected items
        $('#MailTable').jqxGrid('updatebounddata');                 //refresh data
        $('#MailTable').css('display','block');                     //show interface
    }

    /**
     * Function to display a selected email
     */
    ViewEmail = function(){
        var rowindex = $('#MailTable').jqxGrid('getselectedrowindex');
        var data = $('#MailTable').jqxGrid('getrowdatabyid', rowindex);


        HideAllInterfaces();
        ShowReadEmailUI(data);
    }

    /**
     * Function to reply to a selected email
     */
    ReplyToEmail = function()   {
        var rowindex = $('#MailTable').jqxGrid('getselectedrowindex');
        var data = $('#MailTable').jqxGrid('getrowdatabyid', rowindex);

        HideAllInterfaces();
        ShowNewEmailUI();
        $('#inputReceiver1').val(data.office);
        $('#inputReceiver2').val(data.sender);
        $('#inputSubject').val("RE: [" + data.subject + "]");
    }
});