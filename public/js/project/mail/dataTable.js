/**
 * Created by gep on 06-Sep-16.
 */
var SampleData;
$(document).ready(function () {
    SampleData = new $.jqx.dataAdapter(datatablesampledata);
    //SampleData.dataBind();
    $("#MailTable").jqxDataTable(
        {
            width:'100%',
            height:'100%',
            pageable: true,
            pageSize: 20,
            theme: theme,
            pagerButtonsCount: 10,
            source: SampleData,
            columnsResize: true,
            columns: [
                { text: 'Γραφείο - Δνση/Δκση', dataField: 'office', width: 150 },
                { text: 'Αποστολέας', dataField: 'sender', width: 150 },
                { text: 'Θέμα', editable: false, dataField: 'subject', width: 'auto' },
                { text: 'Ημερομηνία', dataField: 'date', width: 100, cellsAlign: 'right', align: 'right' },
            ]
        });
});