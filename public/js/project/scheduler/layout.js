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
                        $("#jqxTree").bind('change', function (event) {//event.
                            var items = $('#jqxTree').jqxTree('getItems');
                            var ar = [];
                            for (var i in items){console.log(items[i]);
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
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 300000, template: "info"
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
        stop: function (event, ui) {
            var cWidth = $(window).width() / 2;
            var cHeight = $(window).height() / 2;

            if (ui.position.left > cWidth) {
                $(this).css({left: 'auto', right: 0});
            }
            else {
                $(this).css({right: 'auto', left: 0});
            }

            if (ui.position.top > cHeight) {
                $(this).css({top: 'auto', bottom: 0});
            }
            else {
                $(this).css({bottom: 'auto', top: 0});
            }
        }
    });
    $("#jqxwindow").jqxWindow({
        height: 570,
        width: 700,
        theme: theme,
        autoOpen: false,
        //InitContent: <iframe src="http://iris/mail" width="100%" height="100%"></iframe>,
    });
/*
    $("#jqxwindow").jqxWindow('setContent', '<iframe src="http://iris/mail" width="100%" height="100%"></iframe>');
*/

    $('#showWindowButton').click(function () {
        $('#jqxwindow').jqxWindow('open');
    });
});