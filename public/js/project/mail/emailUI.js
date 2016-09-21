var dict = {
    "1ï ÅÃ": ["ÊÉÏÑÔÓÇÓ","ÂËÁ×ÏĞÏÕËÏÓ"],
    "2ï ÅÃ" : ["ĞÁËÔÉÄÇÓ","ÓÉÄÇÑÏĞÏÕËÏÓ"],
    "3ï ÅÃ" : ["ĞÑÏÄÑÏÌÏÕ","ÔÁÓÉÁÓ"],
    "4ï ÅÃ" : ["ÌÇÔÑÏÕÔÓÉÊÏÓ","ÁÈÁÍÁÓÉÁÄÇÓ"],
    "ÄÏÉ" : ["ÔÓÏÌĞÁÍÏÓ"],
    "ÄMX" : ["ÌĞÅËÏÓ"]
};

var ddlSource = [
    { html: "<div style='height: 16px; float: left;'><img style='height: 16px; float: left; margin-top: 2px; margin-right: 5px;' src='../../img/message.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Áğëü ÌŞíõìá</span></div>" },
    { html: "<div style='height: 16px; float: left;'><img style='height: 16px; float: left; margin-top: 2px; margin-right: 5px;' src='../../img/announcement.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Áíáêïßíùóç</span></div>"},
    { html: "<div style='height: 16px; float: left;'><img style='height: 16px; float: left; margin-top: 2px; margin-right: 5px;' src='../../img/request.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Áßôçìá</span></div>"}
]

/**
 * Function to generate and show the new email interface
 */

initEmailUI = function() {

    /**
     * Auto-completed list and multiple choices for Office's input
     */
    $('#inputReceiver1').jqxInput({
        placeHolder: 'Ãñáöåßï/Äêóç/Äíóç', theme: theme, height: 25, width: 250, minLength: 1,
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

    /**
     *
     */
    $('#inputReceiver1').on('change', function(){
        $('#inputReceiver2').jqxInput({
            placeHolder: 'ÅğéôåëŞò', theme: theme, height: 25, width: 250, minLength: 1,
            source: function (query, response) {
                var sourceArray = [];
                var rec = $("#inputReceiver1").val();
                for(var key in dict){
                    if(rec.indexOf(key) != -1){
                        sourceArray = sourceArray.concat(dict[key]);
                    }
                }
                var item = query.split(/,\s*/).pop();
                // update the search query.
                $("#inputReceiver2").jqxInput({query: item});
                response(sourceArray);
            }
        });
    });

    /**
     * Auto completed list and multiple choices for Receiver's input
     * List of available choices according to Office selection
     */
    $('#inputReceiver2').jqxInput({
        placeHolder: 'ÅğéôåëŞò', theme: theme, height: 25, width: 250, minLength: 1,
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

    $('#inputMessageType').jqxDropDownList({
        source: ddlSource,
        placeHolder: "Åğéëİîôå ôığï ìçíıìáôïò:",
        selectedIndex: -1,
        width: '200',
        autoDropDownHeight: true,
        theme: theme
    });

    $('#inputSubject').jqxInput({placeHolder: 'Èİìá', theme: theme, height: 25, width: 250, minLength: 1});

    $('#text').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%',
        tools: 'bold italic underline | left center right | font size'
    });
    $('#newEmail').css('visibility', 'visible');
};