//theme = 'dark';
$(document).ready(function () {
    theme = 'energyblue';
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
                        $('#jqxTabs').jqxTabs({
                            width: '100%',
                            height: '100%',
                            theme: theme,
                            initTabContent: function (tab){
                                if (tab==0){
                                    $('#jqxTree').jqxTree({ height: '%', hasThreeStates: false, checkboxes: true, width: '100%'});
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
                                else if (tab==1){
                                    $("#excelExport").jqxButton();
                                    $("#htmlExport").jqxButton();
                                    $("#excelExport").css('visibility','visible');
                                    $("#htmlExport").css('visibility','visible');

                                    $("#excelExport").click(function () {
                                        $("#scheduler").jqxScheduler('exportData', 'xls');
                                    });
                                    $("#htmlExport").click(function () {
                                        $("#scheduler").jqxScheduler('exportData', 'html');
                                    });
                                }
                            }
                        });
                        $("#tablist").css('visibility','visible');
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
});
$(window).load(function() {
    $("#showWindowButton").css('visibility','visible');
    $("#outputContainer").css('visibility','visible');
});