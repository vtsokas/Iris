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
    $("#TopMenu").jqxMenu({source: TopMenuItems, mode: 'horizontal', theme: theme});
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
                var rowindex = $('#'+getGridFromInterface(lastSelectedBox)).jqxGrid('getselectedrowindex');
                viewMessage(rowindex,getGridFromInterface(lastSelectedBox));
                args=["reply","delete","cancel"];
                break;
            case "delete":
                var rowindex = $('#'+getGridFromInterface(lastSelectedBox)).jqxGrid('getselectedrowindex');
                deleteMessage(rowindex,getGridFromInterface(lastSelectedBox));
                showInterface(lastSelectedBox, true);
                args=["create"];
                break;
            case "send":
                sendMessage(1);
                break;
            case "save":
                sendMessage(0);
                break;
            case "cancel":
                showInterface(lastSelectedBox, true);
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
        var args = new Array(["create"]);
        switch(element.selectedItem) {
            case 0:
                lastSelectedBox = showInterface('InboxPanel', true);
                break;
            case 1:
                lastSelectedBox = showInterface('OutboxPanel', true);
                break;
            case 2:
                lastSelectedBox = showInterface('DraftsPanel', true);
                break;
        }
        ShowTopMenuItems(args);
    });
};
