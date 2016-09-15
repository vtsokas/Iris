/**
 * Add a custom select to the edit dialog
 * Put inside editDialogCreate()
 */
var source = [
    "Affogato",
    "Americano",
    "Bicerin",
    "Breve",
    "Café Bombón",
    "Café au lait",
    "Caffé Corretto",
    "Café Crema"
];
/**
 * Create a jqxDropDownList
 */
resourceSelect = $(
"<div>" +
    "<div class='jqx-scheduler-edit-dialog-label'>" +
        "Ανάθεση σε" +
    "</div>" +
    "<div class='jqx-scheduler-edit-dialog-field'>" +
        "<div id='resourceSelect'>" +
        "</div>" +
    "</div>" +
"</div>" +
"</br>");
fields.buttons.parent().prepend(resourceSelect);
/**
* @todo
* Change dynamically according
* to the allowed resources size
*/
var autoHeight = true;
/**
* @todo set the selected index
*/
$("#resourceSelect").jqxDropDownList({ source: source, selectedIndex: 1, width:"100%", autoDropDownHeight: autoHeight});
/**
* On change store value to use later
*/
$('#resourceSelect').on('select', function (event) {
    var args = event.args;
    var item = $('#resourceSelect').jqxDropDownList('getItem', args.index);
    if (item != null) {
       selectedResource = item.label;
    }
});