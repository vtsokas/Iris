/**
 * Created by gep on 06-Sep-16.
 */
    var theme = 'darkblue';
var SampleData;
$(document).ready(function () {
    SampleData = new $.jqx.dataAdapter(datatablesampledata);
    //SampleData.dataBind();
    $("#MailTable").jqxGrid(
        {
            width:'100%',
            height:'100%',
            //pageable: true,
            //pageSize: 20,
            theme: theme,
            //pagerButtonsCount: 10,
            source: SampleData,
            //columnsResize: true,
            columns: [
                { text: 'Γραφείο - Δνση/Δκση', dataField: 'office', width: '10%' },
                { text: 'Αποστολέας', dataField: 'sender', width: '15%' },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: 'auto' },
                { text: 'Ημερομηνία', dataField: 'date', width: '15%', cellsAlign: 'right', align: 'right' },
            ]
        });
    $("#MailTable").css('visibility', 'visible');

});