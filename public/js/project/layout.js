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
                            console.log($('#jqxTree').jqxTree('getItems'));
                        });
                    }
                    }, {
                        type: 'documentPanel',
                        title: 'Επιλογές',
                        contentContainer: 'Document2Panel'
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
});