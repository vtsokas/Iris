var theme = 'darkblue';
$(document).ready(function () {

    // the 'layout' JSON array defines the internal structure of the layout
    var layout = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'layoutGroup',
            orientation: 'vertical',
            width: '25%',
            items: [{
                type: 'documentGroup',
                height: '10%',
                items: [{
                    type: 'documentPanel',
                    title: 'search',
                    contentContainer: 'Search',
                    initContent: function(){
                        /**
                         * TODO initialize search html content
                         */
                    }
                }]
            },{
                type: 'documentGroup',
                height: '90%',
                items: [{
                    type: 'documentPanel',
                    height: '90%',
                    title: 'Left Menu',
                    contentContainer: 'LeftMenuPanel',
                    initContent: initLeftMenu
                }]
            }]
        }, {
            type: 'layoutGroup',
            orientation: 'vertical',
            width: '75%',
            items: [{
                type: 'documentGroup',
                height: '10%',
                items: [{
                    type: 'documentPanel',
                    title: 'Top Menu',
                    contentContainer: 'TopMenuPanel',
                    initContent: initTopMenu
                }]
            }, {
                type: 'documentGroup',
                height: '90%',
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


    $("#searchInput").jqxInput({ placeHolder: "Αναζήτηση", height: '100%', width: '100%', minLength: 1, theme:theme });
    $("#searchInput").css({"box-sizing": "border-box"});

});