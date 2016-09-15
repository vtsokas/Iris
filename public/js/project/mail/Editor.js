
/**
 * Function to generate and show the new email interface
 */
ShowNewEmailUI = function(){

    ClearNewEmailInterface();   //TODO find a way to clear tools selection

    var offices = ["1ο ΕΓ","2o ΕΓ","3ο ΕΓ","4ο ΕΓ","ΔΟΙ","ΔΜΧ","ΔΔΒ","ΔΠΒ","ΓΕΠ",
                    "ΔΚΤΗΣ","ΥΔΚΤΗΣ","ΕΠΧΗΣ","Β.ΕΠΧΗ","ΙΕΡΕΑΣ","ΥΠΑΣΠΙΣΤΗΡΙΟ"];     //all offices to choose from
    /*
    Auto-completed list and multiple choices for Receivers' input
     */
    $('#inputReceiver1').jqxInput({placeHolder: 'Γραφείο/Δκση/Δνση', theme: theme, height: 25, width: 250, minLength: 1,
        source: function (query, response) {
            var item = query.split(/,\s*/).pop();
            // update the search query.
            $("#inputReceiver1").jqxInput({ query: item });
            response(offices);
        },
        renderer: function (itemValue, inputValue) {
            var terms = inputValue.split(/,\s*/);
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(itemValue);
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            var value = terms.join(", ");
            return value;
        }
    });

    $('#inputReceiver2').jqxInput({placeHolder: 'Επιτελής', theme: theme, height: 25, width: 250, minLength: 1});
    $('#inputSubject').jqxInput({placeHolder: 'Θέμα', theme: theme,height: 25, width: 250, minLength: 1});
    $('#newEmail').css('display','block');
    $('#text').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%',
        tools: 'bold italic underline | left center right | font size'
    });
}

/**
 * Function to clear all fields on new email interface
 */
ClearNewEmailInterface = function(){
    $('#text').val('');
    $('#inputReceiver1').val(null);
    $('#inputReceiver2').val(null);
    $('#inputSubject').val(null);
}

/**
 * Function to generate and show the read email interface
 * @param: data of the selected email (selected row from MailTable)
 */
ShowReadEmailUI = function(data){
    $('#MailTable').jqxGrid('clearselection');
    $('#readEmail').css('display','block');

    var sender = data.office + " - " + data.sender;
    var subject = data.subject;

    $('#sender').text(sender);
    $('#subject').text(subject);

    //TODO show email main body

    $('#viewer').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%',
        tools: '',
        editable: false
    });

}