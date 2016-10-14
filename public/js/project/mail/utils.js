refreshInterval = 4410;
paginginformation = null;
/**
 * Update Content Interface dependent on param value.
 * Possible values: InboxPanel/NewEmailPanel/ViewEmailPanel
 * @param text
 */
showInterface = function(text, mailGrid){
    if (mailGrid){
        switch(text){
            case 'InboxPanel':
                $('#MailTable').jqxGrid('clear');
                $('#MailTable').jqxGrid('clearselection');                  //clear selected items
                $('#MailTable').jqxGrid('updatebounddata');                 //refresh data
                break;
            case 'OutboxPanel':
                $('#outboxGrid').jqxGrid('clear');
                $('#outboxGrid').jqxGrid('clearselection');                  //clear selected items
                $('#outboxGrid').jqxGrid('updatebounddata');                 //refresh data
                break;
            case 'DraftsPanel':
                $('#draftsGrid').jqxGrid('clear');
                $('#draftsGrid').jqxGrid('clearselection');                  //clear selected items
                $('#draftsGrid').jqxGrid('updatebounddata');                 //refresh data
                break;
        }
        $( "li:contains("+text+")" )[0].click();

    }
    else{
        $( "li:contains("+text+")" )[0].click();
    }
}

/**
 * Show mailtable interface
 */
ShowMailTableInterface = function () {
    $('#MailTable').jqxGrid('clearselection');                  //clear selected items
    $('#MailTable').jqxGrid('updatebounddata');                 //refresh data
    showInterface("InboxPanel");
};

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

    showInterface("NewEmailPanel", false);
    $("#MailTable").jqxGrid('gotopage', 0);
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

/**
 * ajax call to save new/edited message to database
 */
sendMessage = function(isSent){
    var message = createMessageTaskObject(isSent);

    if (message !== false){
        $.ajax({
            "url":  "/message-json",
            "type": "POST",
            "data": message
        }).success(function(response){

        }).error(function(){

        }).always(function(){
            showInterface('InboxPanel', true);
            args=["create"];
            ShowTopMenuItems(args);
        });
    }
}

/**
 * ajax call to get message info from db to display
 */
viewMessage = function(rowindex){
    var data = $('#MailTable').jqxGrid('getrowdata', rowindex);

    if (data.msg_id){
        $.ajax({
            "url": "/message-json/" + data.msg_id,
        }).success(function(response){
            $('#sender').text(data.sender);
            $('#subject').text(data.subject);
            $('#viewer').html(response[0].msgBody);
            showInterface("ViewEmailPanel", false);
        }).error(function(){

        });
    }
}
createMessageTaskObject = function(isSent){
    var type;
    if ($('#inputMessageType').jqxDropDownList('getSelectedItem') != null){
        switch ($('#inputMessageType').jqxDropDownList('getSelectedItem').index){
            case 0:
                type = "Απλό μήνυμα";
                break;
            case 1:
                type = "Ανακοίνωση";
                break;
            case 2:
                type = "Αίτηση";
                break;
        }
    }else{
        type = "";
    }

    var receiversArray = $('#inputReceiver1').val().match( /(?=\S)[^,]+?(?=\s*(,|$))/g );
    var object = {
        message: {
            subject:    $('#inputSubject').val(),
            msgBody:    $('#text').val(),
            type:       type,
            isDeleted:  0,
            isSent:     isSent
        },
        offices: receiversArray,
        regarding: $('#inputReceiver2').val()
    };

    return object;
}

/**
 * @TODO get dictionary from db
 */
getOfficeDictionary = function(){

}

getVisibleGrid = function(){
    switch ($("#LeftMenu").jqxNavBar('getSelectedIndex')){
        case 0:

            type = "simple";
            break;
        case 1:
            type = "announcement";
            break;
        case 2:
            type = "request";
            break;
    }
}

setInterval(function(){
    caller = 'interval';
    $('#MailTable').jqxGrid('updatebounddata');
}, refreshInterval * 1000);

