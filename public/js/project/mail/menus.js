var TopMenuValues = [
    { id: 1, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Mail</span>" },
    { id: 2, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Calendar</span>" },
    { id: 3, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Contacts</span>" },
    { id: 4, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Inbox</span>" },
    { id: 5, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Admin</span>" },
    { id: 6, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Corporate</span>" },
    { id: 7, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Finance</span>" },
    { id: 8, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Other</span>" },
    { id: 9, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Deleted Items</span>" },
    { id: 10, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Notes</span>" },
    { id: 11, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Settings</span>" },
    { id: 12, html: "<img src='../../../img/sendmail.png' style='height:16px;'/><span style='position: relative; left: 3px;'>Favorites</span>" }
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

    $("#TopMenu").jqxMenu({source: TopMenuValues, width: 'auto', mode: 'horizontal', theme: theme});
    $("#TopMenu").css('visibility', 'visible');

    /*
    Left menu
     */
    $("#LeftMenu").jqxMenu({width: '100%', height:'99%', mode: 'vertical', theme: theme});
    $("#LeftMenu").css('visibility', 'visible');


});