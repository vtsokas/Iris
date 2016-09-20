
var dict = {                                        //all offices and their officers to choose from as receivers
    "1ο ΕΓ": ["ΚΙΟΡΤΣΗΣ","ΒΛΑΧΟΠΟΥΛΟΣ"],
    "2ο ΕΓ" : ["ΠΑΛΤΙΔΗΣ","ΣΙΔΗΡΟΠΟΥΛΟΣ"],
    "3ο ΕΓ" : ["ΠΡΟΔΡΟΜΟΥ","ΤΑΣΙΑΣ"],
    "4ο ΕΓ" : ["ΜΗΤΡΟΥΤΣΙΚΟΣ","ΑΘΑΝΑΣΙΑΔΗΣ"],
    "ΔΟΙ" : ["ΤΣΟΜΠΑΝΟΣ"],
    "ΔMX" : ["ΜΠΕΛΟΣ"]
};

/**
 * Function to generate and show the new email interface
 */
ShowNewEmailUI = function() {

    ClearNewEmailInterface();   //TODO find a way to clear tools selection

    /*
     Auto-completed list and multiple choices for Office's input
     */
    $('#inputReceiver1').jqxInput({
        placeHolder: 'Γραφείο/Δκση/Δνση', theme: theme, height: 25, width: 250, minLength: 1,
        source: function (query, response) {
            var item = query.split(/,\s*/).pop();
            // update the search query.
            $("#inputReceiver1").jqxInput({query: item});
            response(Object.keys(dict));
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
    /*
    Auto completed list and multiple choices for Receiver's input
    List of available choices according to Office selection
     */
    $('#inputReceiver2').jqxInput({
        placeHolder: 'Επιτελής', theme: theme, height: 25, width: 250, minLength: 1,
        source: function (query, response) {
            var sourceArray = [];

            var item = query.split(/,\s*/).pop();
            // update the search query.
            $("#inputReceiver2").jqxInput({query: item});
            response(sourceArray);
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

    $('#inputSubject').jqxInput({placeHolder: 'Θέμα', theme: theme, height: 25, width: 250, minLength: 1});
    $('#newEmail').css('display', 'block');
    $('#text').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%',
        tools: 'bold italic underline | left center right | font size'
    });
};

/**
 * Function to clear all fields on new email interface
 */
ClearNewEmailInterface = function(){
    $('#text').val('');
    $('#inputReceiver1').val(null);
    $('#inputReceiver2').val(null);
    $('#inputSubject').val(null);
    $('#inputMessageType').jqxDropDownList('clearSelection');
};

/**
 * Function to generate and show the read email interface
 * @param: data of the selected email (selected row from MailTable)
 */
ShowReadEmailUI = function(data){

    $('#readEmail').css('display','block');

    var sender = data.office + " - " + data.sender;
    var subject = data.subject;
    var text = data.text;

    /*$('#viewer').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%',
        tools: '',
        //editable: false
    });*/

    $('#sender').text(sender);
    $('#subject').text(subject);
    $('#viewer').html(text);
    //document.getElementById("viewer").setAttribute("readonly", true);
};