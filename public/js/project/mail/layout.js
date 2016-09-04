$(document).ready(function () {
    var theme = 'darkblue';
    // the 'layout' JSON array defines the internal structure of the layout
    var layout = [{
        type: 'layoutGroup',
        orientation: 'vertical',
        items: [{
            type: 'documentGroup',
            orientation: 'horizontal',
            width: '100px',
            items: [{
                type: 'documentPanel',
                title: 'Προβολή',
                contentContainer: 'Document1Panel'
            }]
        }, {
            type: 'documentGroup',
            orientation: 'horizontal',
            width: '80%',
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
                }]
            }, {
                type: 'layoutPanel',
                title: 'Διαδραστικό Ημερολόγιο',
                contentContainer: 'SolutionExplorerPanel',
                initContent: function(){
                    $('#jqxTree').jqxTree({ height: '99%', hasThreeStates: false, checkboxes: true, width: '99%'});
                    $('#jqxTree').css('visibility', 'visible');
                    $("#jqxTree").jqxTree('selectItem', $("#home")[0]);
                    $("#jqxTree").bind('change', function (event) {
                        console.log($('#jqxTree').jqxTree('getItems'));
                    });
                }
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: '100%', height: '100%',
        theme:theme,layout: layout });
});