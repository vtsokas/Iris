var theme = 'darkblue';
$(document).ready(function () {

    // the 'layout' JSON array defines the internal structure of the layout
    var layout = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'documentGroup',
            width: '15%',
            items: [{
                type: 'documentPanel',
                title: 'Left Menu',
                contentContainer: 'LeftMenuPanel',
                initContent: initLeftMenu
            }]
        }, {
            type: 'layoutGroup',
            orientation: 'vertical',
            width: '85%',
            items: [{
                type: 'documentGroup',
                height: '5%',
                items: [{
                    type: 'documentPanel',
                    title: 'Top Menu',
                    contentContainer: 'TopMenuPanel',
                    initContent: initTopMenu
                }]
            }, {
                type: 'documentGroup',
                height: '95%',
                items: [{
                    type: 'documentPanel',
                    title: 'MailsPanel',
                    contentContainer: 'MailsPanel',
                    initContent: initDataGrid
                }, {
                    type: 'documentPanel',
                    title: 'NewEmailPanel',
                    contentContainer: 'NewEmailPanel',
                    initContent: function(){
                        initEmailUI();
                    }
                }, {
                    type: 'documentPanel',
                    title: 'ViewEmailPanel',
                    contentContainer: 'ViewEmailPanel',
                    initContent: function(){
                        $("#readEmail").css('visibility','visible');
                    }
                }]
            }]
        }]
    }];

    $('#jqxLayout').jqxLayout({
        width: '100%',
        height: '100%',
        resizable : true,
        theme:theme,
        layout: layout });
});