
var previousState; // keeping user's last selection on left menu
$(document).ready(function () {

    /*
    Changing content according to left menu selection(inbox, outbox, drafts etc.)
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
                datatablesampledata.localdata=filtereddata;
                //SampleData.dataBind();                                    //not necessary
                $('#MailTable').jqxGrid('updatebounddata');                 //refresh data
                $('#MailTable').jqxGrid('clearselection');                  //clear selected items

                break;
            case "outbox":
                args=["create"];
                break;
            case "drafts":
                args=["create"];
                break;
            default:
            //default code block
        }
        previousState = args;
        ShowMenuItems(args);
    });

    $('#LeftMenu').on('initialized', function () {
        //$("#inbox").click();
    });

    /*
    Function to hide all of top menu's elements
     */
    function HideMenuItems(){
        for($i=0; $i<TopMenuItems.length; $i++) {
            $("#"+TopMenuItems[$i].id).hide();
        }
    }

    /*
    Function to show selected elements(args) on top menu
     */
    function ShowMenuItems(args){
        HideMenuItems();
        for($i=0; $i<args.length; $i++) {
            $("#"+args[$i]).show();
        }
    }

    /*
     Changing content according to top menu selection(create, reply, cancel etc.)
     */
    $('#TopMenu').on('itemclick', function(event){
        var element = event.args;
        var args = new Array();
        switch (element.id){
            case "create":
                ShowNewEmailUI();
                args=["send","save","cancel"];
                break;
            case "reply":
                break;
            case "edit":
                break;
            case "view":
                break;
            case "delete":
                break;
            case "send":
                break;
            case "save":
                break;
            case "cancel":
                $('#creation').css('display','none');
                //$('#text').jqxEditor('destroy');
                $('#text').val('');
                $('#inputReceiver').val(null);
                $('#inputSubject').val(null);

                $('#MailTable').css('display','block');
                //$("#MailTable").jqxGrid('refresh');
                args = previousState;
                break;
            default:
        }
        ShowMenuItems(args);

    });

    $("#MailTable").on('rowselect', function (event)
    {
        GetTopButtonsOnGridSelectionChange();
    });

    $('#MailTable').on('rowunselect', function (event)
    {
        GetTopButtonsOnGridSelectionChange();
    });

    GetTopButtonsOnGridSelectionChange = function(){
        var selectedrowindexes = $('#MailTable').jqxGrid('selectedrowindexes');
        if (selectedrowindexes.length==1){
            var args=["create", "reply", "view", "delete"];
            ShowMenuItems(args);;
        }
        else if (selectedrowindexes.length==0){
            var args=["create"];
            ShowMenuItems(args);
        }
        else{
            var args=["create", "delete"];
            ShowMenuItems(args);
        }
    }
});