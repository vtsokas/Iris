$(document).ready(function () {
    var theme = 'darkblue';
    // the 'layout' JSON array defines the internal structure of the layout
    var layout = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'layoutGroup',
            orientation: 'vertical',
            width: '20%',
            items: [{
                type: 'documentGroup',
                height: '80%',
                minHeight: '25%',
                items: [{
                    type: 'documentPanel',
                    title: 'Προβολή',
                    contentContainer: 'Document1Panel',
                    initContent: function(){
                        $('#jqxTree').jqxTree({ height: '99%', hasThreeStates: false, checkboxes: true, width: '99%'});
                        $('#jqxTree').css('visibility', 'visible');
                        $("#jqxTree").jqxTree('selectItem', $("#home")[0]);
                        $("#jqxTree").bind('change', function (event) {
                            var items = $('#jqxTree').jqxTree('getItems');
                            var ar = [];
                            for (var i in items){
                                if (items[i].checked) ar.push(items[i].originalTitle);
                            }
                            selectedResources = ar.join(",");
                            getAppointments();
                        });
                    }
                    }, {
                        type: 'documentPanel',
                        title: 'Επιλογές',
                        contentContainer: 'Document2Panel',
                    initContent: function(){
                        $("#excelExport").jqxButton();
                        $("#htmlExport").jqxButton();

                        $("#excelExport").click(function () {
                            $("#scheduler").jqxScheduler('exportData', 'xls');
                        });
                        $("#htmlExport").click(function () {
                            $("#scheduler").jqxScheduler('exportData', 'html');
                        });
                    }
                }]
            }, {
                type: 'tabbedGroup',
                height: '20%',
                pinnedHeight: '10%',
                items: [{
                    type: 'layoutPanel',
                    title: 'Σύνδεση',
                    contentContainer: 'OutputPanel',
                    selected: true
                }]
            }]
        }, {
            type: 'tabbedGroup',
            width: '80%',
            items: [{
                type: 'layoutPanel',
                title: 'Διαδραστικό Ημερολόγιο',
                contentContainer: 'SolutionExplorerPanel',
                initContent: scheduler
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: '100%', height: '100%',
        theme:theme,layout: layout });

    $("#messageNotification").jqxNotification({
        width: 250, position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
    });

    /*
    Temp code
    */

    $( "#showWindowButton" ).draggable({
        cancel: false,
        grid: [1,1],
        snap: 'body',
        snapMode: 'inner',
        snapTolerance: 40,
        start: function (event, ui) {
            $(this).css({left: 'auto', right: 'auto', top: 'auto', bottom: 'auto'});
        },
        stop: MailButtonPosition
    });

    $("#jqxwindow").jqxWindow({
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        //maxWidth: 8,
        theme: theme,
        autoOpen: false,
        animationType: 'combined',
        isModal: true,
        draggable: false,
        resizable: false,
        modalOpacity: 0.5,
        modalZIndex: 999,
        initContent: function() {document.getElementById("content").innerHTML='<object type="text/html" data="/mail" style="width:100%; height: 100%;"></object>'}
    });


    $('#showWindowButton').click(function (event, ui) {
        if ($(this).position().left == 0){
            var x = $(this).position().left + $(this).width()+10;
        }
        else{
            var x = $(this).position().left - $('#jqxwindow').width();
        }
        $("#jqxwindow").jqxWindow({ position: { x: x, y: 0} });
        $("#jqxwindow").jqxWindow('open');
    });

     function MailButtonPosition (event, ui) {
        var cWidth = $(window).width() / 2;
        var cHeight = $(window).height() / 2;

        if (ui.position.left > cWidth) {
            $(this).css({left: 'auto', right: 0});
            var x = $(this).position().left - $('#jqxwindow').width();
            $('#jqxwindow').jqxWindow('move', x, 0);
        }
        else {
            $(this).css({right: 'auto', left: 0});
            var x = $(this).position().left + $(this).width()+10;
        }

        if (ui.position.top > cHeight) {
            $(this).css({top: 'auto', bottom: 0});
        }
        else {
            $(this).css({bottom: 'auto', top: 0});
        }
         $('#jqxwindow').jqxWindow('move', x, 0);
    }
});