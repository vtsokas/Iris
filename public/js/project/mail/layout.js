var theme = 'darkblue';
$(document).ready(function () {

    $("#Search").jqxInput({ placeHolder: "Search", height: '31px', theme: theme});



    $("#jqxDockPanel").jqxDockPanel({ lastchildfill: true, theme: theme});
    $('#jqxDockPanel').jqxDockPanel('render');


});