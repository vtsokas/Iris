$(document).ready(function () {

    /**
     * Update Content Interface dependent on param value.
     * Possible values: MailsPanel/NewEmailPanel/ViewEmailPanel
     * @param text
     */
    showInterface = function(text){
        $( "li:contains("+text+")" )[0].click();
    }

    /**
     * Show mailtable interface
     */
    ShowMailTableInterface = function () {
        $('#MailTable').jqxGrid('clearselection');                  //clear selected items
        $('#MailTable').jqxGrid('updatebounddata');                 //refresh data
        showInterface("MailsPanel");
    };

    /**
     * Display selected email
     */
    viewEmail = function(){
        var rowindex = $('#MailTable').jqxGrid('getselectedrowindex');
        var data = $('#MailTable').jqxGrid('getrowdatabyid', rowindex);

        $('#sender').text(data.office + " - " + data.sender);
        $('#subject').text(data.subject);
        $('#viewer').html(data.text);

        showInterface("ViewEmailPanel");
    }

    /**
     * Open new email form. If flag is true it is a new email.
     * If flag is false, it is an existing email for edit.
     * @param flag
     * @constructor
     */
    newEmail = function(flag){

        clearNewEmailInterface();

        if (flag == "edit" || flag == "reply"){
            var rowindex = $('#MailTable').jqxGrid('getselectedrowindex');
            var data = $('#MailTable').jqxGrid('getrowdatabyid', rowindex);

            $('#inputReceiver1').val(data.office);
            $('#inputReceiver2').val(data.sender);
            if (flag == "reply")
                $('#inputSubject').val("RE: [" + data.subject + "]");
            else
                $('#inputSubject').val(data.subject);
        }

        showInterface("NewEmailPanel");
    }

    /**
     * Function to clear all fields on new email interface
     */
    clearNewEmailInterface = function(){
        $('#text').jqxEditor({tools: 'bold italic underline | left center right | font size'});
        $('#text').val('');
        $('#inputReceiver1').val(null);
        $('#inputReceiver2').val(null);
        $('#inputSubject').val(null);
        $('#inputMessageType').jqxDropDownList('clearSelection');
    };
});