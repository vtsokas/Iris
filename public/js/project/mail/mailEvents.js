/**
 * Created by gep on 04-Sep-16.
 */
$(document).ready(function () {
    $('#LeftMenu').on('itemclick', function (event) {
        // get the clicked LI element.

        $("#MailGrid").text("papakia");

    });

    $('#LeftMenu').on('initialized', function () {
        $("#second").click();
        //$("#MailGrid").text("papakia");
    });

});