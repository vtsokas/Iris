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

    for($i=0; $i<$numOfButtons; $i++) {
        var $myDiv = ('<li id="'+($buttons[$i]).id+'">'+($buttons[$i]).name+'<li>');
        $('[name="myList"]').append($myDiv);
    }

    $("#TopMenu").jqxMenu({width: 'auto', mode: 'horizontal', theme: theme});
    $("#TopMenu").css('visibility', 'visible');

});