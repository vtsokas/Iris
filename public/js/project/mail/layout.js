$(document).ready(function () {
    var theme = 'darkblue';
    $("#Search").jqxInput({ placeHolder: "Search", height: '40px', theme: theme});

    $("#MailGrid").jqxGrid(
        {
            width: '80%',
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