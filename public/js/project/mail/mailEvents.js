/**
 * Created by gep on 04-Sep-16.
 */

$(document).ready(function () {
    $('#LeftMenu').on('itemclick', function (event) {
        // get the clicked LI elements
        var element = event.args;
        var args = new Array();
        switch(element.id) {
            case "first":
                args=[1,5,10];
                break;
            case "second":
                args=[2,8,11];
                break;
            case "third":
                args=[3,4,9];
                break;
            default:
            //default code block
        }

        ShowMenuItems(args);
    });

    $('#LeftMenu').on('initialized', function () {
        //$("#second").click();
    });

    function HideMenuItems(){
        for($i=1; $i<=TopMenuValues.length; $i++) {
            $("#"+$i).hide();
        }
    }

    function ShowMenuItems(args){
        HideMenuItems();
        for($i=0; $i<args.length; $i++) {
            $("#"+args[$i]).show();
        }
    }
});