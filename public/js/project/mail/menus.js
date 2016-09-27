var TopMenuItems = [
    { id: "create", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Δημιουργία</span>" },
    { id: "reply", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Απάντηση</span>" },
    { id: "edit", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Επεξεργασία</span>" },
    { id: "view", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Προβολή</span>" },
    { id: "delete", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Διαγραφή</span>" },
    { id: "send", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Αποστολή</span>" },
    { id: "save", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Αποθήκευση</span>" },
    { id: "cancel", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Ακύρωση</span>" },
];

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
 * Top menu
 */
initTopMenu = function () {

    //$("#TopMenu").jqxNavBar({selectedItem: 0,  height: '100%', width:200, orientation:'horizontal', theme:theme });

    $("#TopMenu").jqxMenu({source: TopMenuItems, height: '100%', width: '100%', mode: 'horizontal', theme: theme});
    $("#TopMenu").css('visibility','visible');
    ShowTopMenuItems(["create"]);
    /**
     * Changing content according to top menu selection(create, reply, cancel etc.)
     */
    $('#TopMenu').on('itemclick', function(event){
        var element = event.args;
        var args = new Array();
        switch (element.id){
            case "create":
                newEmail("create");
                args=["send","save","cancel"];
                break;
            case "reply":
                newEmail("reply");
                args=["send","save","cancel"];
                break;
            case "edit":
                newEmail("edit");
                args=["send", "save", "delete", "cancel"];
                break;
            case "view":
                viewEmail();
                args=["reply","delete","cancel"];
                break;
            case "delete":
                showInterface('MailsPanel');
                args=["create"];
                break;
            case "send":
                /**
                 * @TODO implement
                 */
                onSendMessage();
                ShowMailTableInterface();
                args=["create"];
                break;
            case "save":
                ShowMailTableInterface();
                args=["create"];
                break;
            case "cancel":
                ShowMailTableInterface();
                args=["create"];
                break;
            default:
        }
        ShowTopMenuItems(args);
    });
};

/**
 * Left menu
 */
initLeftMenu = function () {
    $("#LeftMenu").jqxNavBar({selectedItem: 0,  height:140, width:'100%', orientation:'vertical', theme:theme });
    $("#LeftMenu").css('visibility','visible');

    /**
     * Changing content according to left menu selection(inbox, outbox, drafts etc.)
     */
    $('#LeftMenu').on('change', function (event) {
        // get the clicked LI elements
        var element = event.args;
        var args = new Array();
        switch(element.selectedItem) {
            case 0:
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="inbox";
                });
                break;
            case 1:
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="outbox";
                });
                break;
            case 2:
                args=["create"];
                var filtereddata = data.filter(function (e) {                //test filter
                    return e.state=="draft";
                });
                break;
            default:
            //default code block
        }
        ShowTopMenuItems(args);

        datatablesampledata.localdata=filtereddata;

        ShowMailTableInterface();

    });
};
