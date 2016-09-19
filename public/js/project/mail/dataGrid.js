/**
 * Created by gep on 06-Sep-16.
 */
var theme = 'darkblue';
var SampleData;
$(document).ready(function () {
    SampleData = new $.jqx.dataAdapter(datatablesampledata,
        {
            formatData: function (data) {
                data.office_startsWith == $("#searchField").val(); //to be continued
                return data;
            }
        }
    );

    /**
     * New/unread mails are styled bold and italic. It applies on every cell of each row.
     * @param row
     * @param columnfield
     * @param value
     * @param defaulthtml
     * @param columnproperties
     * @param rowdata
     * @returns {string}
     */
    var rendrow = function(row, columnfield, value, defaulthtml, columnproperties, rowdata){
        if(rowdata.newMail == true){
            var align=columnproperties.align;
            if(align == "center"){
                align = "middle";
            }
            return '<div class="jqx-grid-cell-' + align + '-align" style="margin-top: 6px;"><b><i>' + value + '</i></b></div>';
        }
    };

    //SampleData.dataBind();
    $("#MailTable").jqxGrid(
        {
            width:'100%',
            height:'100%',
            source: SampleData,
            theme: theme,
            pageable: true,
            pagermode: 'default',
            pagesizeoptions: ['20', '50', '100'],
            pagesize:20,
            sortable: true,
            showtoolbar: true,
            enabletooltips: true,
            selectionmode: 'checkbox',
            showtoolbar: true,
            rendertoolbar:datagridtoolbar,
            columns: [
                { text: 'Γραφείο - Δνση/Δκση', dataField: 'office', width: '10%' , cellsrenderer: rendrow },
                { text: 'Αποστολέας', dataField: 'sender', width: '15%' , cellsrenderer: rendrow },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: '40%' , cellsrenderer: rendrow },
                { text: 'Τύπος', editable: false, dataField: 'type', width: 'auto',cellsAlign: 'center', align: 'center' , cellsrenderer: rendrow },
                { text: 'Ημερομηνία', dataField: 'date', width: '15%', cellsAlign: 'right', align: 'right' , cellsrenderer: rendrow }
            ]
        });
    $("#MailTable").css('visibility', 'visible');

    function datagridtoolbar(toolbar) {
        var me = this;
        var container = $("<div style='margin: 5px;'></div>");
        var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Αναζήτηση μηνύματος: </span>");
        var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 223px;' />");
        toolbar.append(container);
        container.append(span);
        container.append(input);
        if (theme != "") {
            input.addClass('jqx-widget-content-' + theme);
            input.addClass('jqx-rc-all-' + theme);
        }
        var oldVal = "";
        input.on('keydown', function (event) {
            var x = SampleData.source;
            if (input.val().length >= 2) {
                if (me.timer) {
                    clearTimeout(me.timer);
                }
                if (oldVal != input.val()) {
                    me.timer = setTimeout(function () {
                        $("#MailTable").jqxGrid('updatebounddata');
                    }, 1000);
                    oldVal = input.val();
                }
            }
            else {
                $("#MailTable").jqxGrid('updatebounddata');
            }
        });
    }
});