
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
                args=["create", "reply", "view", "delete"];
                break;
            case "outbox":
                args=["create", "view", "delete"];
                break;
            case "drafts":
                args=["create", "edit", "view", "delete"];
                break;
            default:
            //default code block
        }
        previousState = args;
        ShowMenuItems(args);
    });

    $('#LeftMenu').on('initialized', function () {
        $("#inbox").click();
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
                $('#MailTable').css('display','none');

                $('#inputReceiver').jqxInput({placeHolder: ' Παραλήπτης', theme: theme, height: 25, width: 250, minLength: 1});
                $('#inputSubject').jqxInput({placeHolder: ' Θέμα', theme: theme,height: 25, width: 250, minLength: 1});
                $('#creation').css('display','initial');
                $('#text').jqxEditor({
                    theme: theme,
                    height: '100%',
                    width: '100%'
                });
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
                args = previousState;
                break;
            default:
        }
        ShowMenuItems(args);

    });

});