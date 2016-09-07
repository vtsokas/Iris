/**
 * Created by gep on 04-Sep-16.
 */

$(document).ready(function () {

    /*
    Alternating content of mailTable according to left menu selection(inbox, outbox, drafts etc.)
     */
    $('#LeftMenu').on('itemclick', function (event) {
        // get the clicked LI elements
        var element = event.args;
        var args = new Array();
        switch(element.id) {
            case "inbox":
                args=["create", "reply", "view", "delete"];
                data = data.filter(function (x) {
                    return x.state == "inbox";
                });

                /*datatablesampledata =
                {
                    localData: data,
                    dataType: "array",
                    dataFields:
                        [
                            { name: 'office', type: 'string' },
                            { name: 'sender', type: 'string' },
                            { name: 'subject', type: 'string' },
                            { name: 'date', type: 'string' },
                        ]
                };*/
                SampleData.dataBind();

                $("#MailTable").jqxDataTable('updateBoundData');
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



    $('#TopMenu').on('itemclick', function(event){
        var element = event.args;

        switch (element.id){
            case "create":
                $('#MailTable').html("");
                $('#MailTable').jqxEditor({
                    theme: theme
                });
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
                break;
            default:


        }

    });

});