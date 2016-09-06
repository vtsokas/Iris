/**
 * Created by gep on 04-Sep-16.
 */
var test;
$(document).ready(function () {
    $('#LeftMenu').on('itemclick', function (event) {
        // get the clicked LI element.

        //$("#MailGrid").text("papakia");
        test = [ TopMenuValues[0], TopMenuValues[1], TopMenuValues[2] ];
    });

    $('#LeftMenu').on('initialized', function () {
        $("#second").click();
        //$("#MailGrid").text("papakia");
    });

});