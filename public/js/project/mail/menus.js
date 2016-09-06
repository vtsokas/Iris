var TopMenuValues = [
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Mail</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Calendar</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Contacts</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Inbox</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Admin</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Corporate</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Finance</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Other</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Deleted Items</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Notes</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Settings</span>" },
    { html: "<img src='../../../img/sendmail.png'/><span style='position: relative; left: 3px; top: -2px;'>Favorites</span>" }
];

$(document).ready(function () {
    var theme = 'darkblue';

    /*
     Dynamically add elements to TopMenu
     */
    var $numOfButtons = 3;
    var $buttons = [
        {name:'Create', id:'crt'},
        {name:'Delete', id:'dlt'},
        {name:'Hide', id:'hd'}
    ];

    /*for($i=0; $i<$numOfButtons; $i++) {
        var $myDiv = ('<li id="'+($buttons[$i]).id+'">'+($buttons[$i]).name+'<li>');
        $('[name="myList"]').append($myDiv);
    }*/

    $("#TopMenu").jqxMenu({source: test, width: 'auto', mode: 'horizontal', theme: theme});
    $("#TopMenu").css('visibility', 'visible');

    /*
    Left menu
     */
    $("#LeftMenu").jqxMenu({width: '100%', height:'99%', mode: 'vertical', theme: theme});
    $("#LeftMenu").css('visibility', 'visible');


});