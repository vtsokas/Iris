refreshInterval = 15;
unreadMessages = 0;
paginginformation = null;
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
sendMessage = function(){
    var message = createMessageTaskObject();

    if (message !== false){
        $.ajax({
            "url":  "/message-json",
            "type": "POST",
            "data": message
        }).success(function(response){

        }).error(function(){

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

        }).error(function(){
            $('#sender').text(data.sender);
            $('#subject').text(data.subject);
        });
    }


    showInterface("ViewEmailPanel");
}
createMessageTaskObject = function(){
    var type;
    if ($('#inputMessageType').jqxDropDownList('getSelectedItem') != null){
        switch ($('#inputMessageType').jqxDropDownList('getSelectedItem').index){
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
    }else{
        alert("τεστ");
        return false;
    }

    var receiversArray = $('#inputReceiver1').val().match( /(?=\S)[^,]+?(?=\s*(,|$))/g );
    var object = {
        message: {
            subject:    $('#inputSubject').val(),
            msgBody:    $('#text').val(),
            type:       type,
            isDeleted:  0,
            isSent:     1
        },
        offices: receiversArray,
        regarding: $('#inputReceiver2').val()
    };

    //$('#inputReceiver2').val(null);
    return object;
}

getUnreadEmailCount = function() {
    paginginformation = $('#MailTable').jqxGrid('getpaginginformation');
    $.ajax({
        url: "/message-json/newMessages?count=" + unreadMessages + "&box=inbox" +
        "&pagenum=" + paginginformation.pagenum + "&pagesize=" + paginginformation.pagesize
    }).success(function (response) {
        unreadMessages = response.data[0].count;
        //alert(response);
        if (paginginformation.pagenum == 0)
        if (response.data[0].source)
        {
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'msg_id' , type: 'string' },
                    { name: 'sender', type: 'string' },
                    { name: 'subject', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'dateAdded', type: 'string' },
                    { name: 'isRead', type: 'boolean' }
                ],
                id: 'msg_id',
                localdata: response.data[0].source,
                root: 'Rows',
                beforeprocessing: function (data) {
                    source.totalrecords = data[0].TotalRows;
                }
            };
            //var dataAdapter = new $.jqx.dataAdapter(source);
            dataadapter = new $.jqx.dataAdapter(source);
            $('#MailTable').jqxGrid('updatebounddata');
        }
        $("#LeftMenu ul li span").first().text("");
        $("#LeftMenu ul li span").first().text("Εισερχόμενα" + " (" + unreadMessages + ")");
    }).error(function(data){
    });
};

/**
 * @TODO get dictionary from db
 */
getOfficeDictionary = function(){

}

setInterval(function(){
    getUnreadEmailCount();
}, refreshInterval * 1000);