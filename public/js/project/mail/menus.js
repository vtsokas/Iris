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

var LeftMenuItems = [
    { id: "inbox", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Εισερχόμενα</span>" },
    { id: "outbox", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Απεσταλμένα</span>" },
    { id: "drafts", html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Πρόχειρα</span>" },
];

$(document).ready(function () {

    /*
     Top menu
     */
    $("#TopMenu").jqxMenu({source: TopMenuItems, height:30,  mode: 'horizontal', theme: theme});
    $("#TopMenu").css('visibility', 'visible');

    /*
    Left menu
     */
    $("#LeftMenu").jqxMenu({source: LeftMenuItems, height:'100%',  mode: 'vertical', theme: theme});
    $("#LeftMenu").css('visibility', 'visible');

    $( "#drag1" ).draggable();
    $( "#jqxLayout" ).droppable({
        drop: function(ev,ui) {
            console.log(ui);
            ev.preventDefault();

            var data = ui.draggable.attr("id");

            ev.target.appendChild(document.getElementById(data));
            $("#"+data).css({top: ui.offset.top, left: ui.offset.left, position:'absolute'});
        }
    });
});