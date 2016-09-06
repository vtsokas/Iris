/**
 * Created by gep on 04-Sep-16.
 */

$(document).ready(function () {
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

    function HideMenuItems(){
        for($i=0; $i<TopMenuItems.length; $i++) {
            $("#"+TopMenuItems[$i].id).hide();
        }
    }

    function ShowMenuItems(args){
        HideMenuItems();
        for($i=0; $i<args.length; $i++) {
            $("#"+args[$i]).show();
        }
    }
});