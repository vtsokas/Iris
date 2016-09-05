$(document).ready(function () {
    var theme = 'darkblue';
    $("#Search").jqxInput({ placeHolder: "Search", height: '40px', theme: theme});

    $("#LeftMenu").jqxMenu({width: 'auto', height:'99%', mode: 'vertical', theme: theme});
    $("#LeftMenu").css('visibility', 'visible');


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


    $("#MailGrid").jqxGrid(
        {
            width: '100%',
            pageable: false,
            autoheight: true,
            sortable: false,
            altrows: false,
            enabletooltips: false,
            editable: false,
            selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'Sender', datafield: 'Sender', width: '20%' },
                { text: 'Subject', datafield: 'Subject', width: '60%' },
                { text: 'Date', datafield: 'Date', width: '20%' }
            ]
        });

    $("#jqxDockPanel").jqxDockPanel({ width: '100%', height: '1002325', theme: theme});
    $('#jqxDockPanel').jqxDockPanel('render');
});