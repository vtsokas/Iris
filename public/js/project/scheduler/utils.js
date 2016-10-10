selectedResource = null;
newObjectIds = {};
selectedResources = "default";
resources = [];
refreshInterval = 60;
lastUpdate = new Date().getTime() / 1000;
//firstTime = true;
/**
 * Get the resources dynamically
 */
$.ajax({url:"/role-json"}).done(function(data){
    selectedResources = data.userRole;

    for (var i in data.childRoles){
        resources.push({calendar:data.childRoles[i]});
    }
});

/**
 * Method to get all appointments from
 * server and add them in scheduler
 */
getAppointments = function() {
    $.ajax({url: "/task-json?resources=" + selectedResources}).done(function (data) {
        $("#scheduler").jqxScheduler('beginAppointmentsUpdate');

        var appointments = new Array();
        for (var i in data) {

            if (parseInt(data[i].dateAdded) > lastUpdate)
                //console.log(data[i]);
                ShowNotification("Προστέθηκε μία εργασία", "success", data[i].calendar );
            else if (data[i].dateUpdated > lastUpdate)
                ShowNotification("Τροποποιήθηκε μία εργασία", "success", data[i].calendar );

            var appointment = formatAppointment(data[i]);
            appointments.push(appointment);
        }
        dataSource.localdata = appointments;
        resourceSource.localdata = resources;

        dataAdapter.dataBind();
        resourceAdapter.dataBind();

        $("#scheduler").jqxScheduler('endAppointmentsUpdate');

        //if (firstTime == true && data.length > 0) $("#scheduler").jqxScheduler('ensureAppointmentVisible', data[0].id);

        lastUpdate = new Date().getTime() / 1000;

        //firstTime = false;
    });
};
/**
 * Transform the event object to an object ready to be
 * submitted to our PHP controller. Returns false if
 * no subject has been set.
 */
exchangeTaskObject = function(event){console.log(event);
    var isJQX = typeof event.args.appointment.jqxAppointment != "undefined";
    var appointment = (isJQX) ? event.args.appointment.jqxAppointment.boundAppointment : event.args.appointment;
    var isRec = (isJQX) ? appointment.jqxAppointment.isRecurrentAppointment(): false;

    var exceptionsStr = getExceptionsString();

    if (appointment.subject !== "")
    {
        var object = {
            description         : appointment.originalData.description,
            location            : appointment.originalData.location,
            subject             : appointment.originalData.subject,
            from                : appointment.originalData.start.getTime() / 1000,
            to                  : appointment.originalData.end.getTime() / 1000,
            /**
             * If it is recurrent set the pattern and exceptions as string
             * else set value as null.
             */
            recurrenceRule      : (isRec) ? getRecurrencePattern(appointment.jqxAppointment.recurrencePattern) : null,
            recurrenceException : (isRec) ? appointment.jqxAppointment.recurrenceException.join() : null,
            status              : appointment.originalData.status,
            /**
             * The selectedResource variable was set when the dropdown selection changed
             * Not a desired implementation but this is the fate of custom solutions
             */
            calendar            : (selectedResource != null) ? selectedResource : appointment.resourceId,
            exceptions  : exceptionsStr//(lastClickedAppointmentDate !== null) ? lastClickedAppointmentDate.toDate().getTime() / 1000 : null
        };
        return object;
    }
    return false;
};
/**
 * Transform the appointment object so to be
 * correctly displayed by the scheduler
 */
formatAppointment = function(appointment){
    /**
     * Unset recurrent properties if
     * appointment is single
     */
    if (appointment.recurrenceRule == ""){
        delete appointment.recurrenceRule;
        delete appointment.recurrenceException;
    }
    /**
     * Format dates
     */
    appointment.start = new Date(parseInt(appointment.from) * 1000);
    appointment.end = new Date(parseInt(appointment.to) * 1000);
    /**
     * Set color according to status
     */
    switch (appointment.status){
        case "free" :
            appointment.style = "#088A08";
            break;
        case "tentative" :
            appointment.style = "#FF8000";
            break;
        case "busy" :
            appointment.style = "#FF0000";
            break;
        default :
            break;
    };
    return appointment;
};

ShowNotification = function(text, template, arg){
    $("#messageNotificationText").text(text + " (" + arg + ")");
    $('#messageNotification').jqxNotification({ template: template });
    $("#messageNotification").jqxNotification("open");
};
/**
 * Get all exceptions of a recurrence rule.
 * Dates to Comma Separated String
 */
getExceptionsString = function(){
    var exceptionsStr = null;
    if (clickedApp !== null && typeof clickedApp !== "undefined") {
        var exceptions = [];
        for (var i in clickedApp.recurrenceException) {
            if (clickedApp.recurrenceException[i] != null && exceptions.indexOf(clickedApp.recurrenceException[i].toString()) < 0){
                exceptions.push(clickedApp.recurrenceException[i].toDate());}
        }
        var exceptionsStr = exceptions.join(",", exceptions);//console.log(exceptionsStr);
    }
    return exceptionsStr;
}
/**
 * Construct recurrence pattern string
 */
function getRecurrencePattern(recurrencePattern) {
    //console.log(recurrencePattern);
    //recurrencePattern.byweekday = [];
    //for (var i in recurrencePattern.weekDays){
    //    recurrencePattern.byweekday.push(recurrencePattern.weekDays[i]);
    //}console.log(recurrencePattern);
    fctResult = '';
    try  {
        fctResult = recurrencePattern.toString()
    }
    catch (err) {
        err += '. Trying to get recurrencePattern by code !';
        console.log(err);
        var freqency = recurrencePattern.freq.toUpperCase();

        var byDay = '';
        var byMonth = '';
        var byMonthDay = '';
        var count = recurrencePattern.count;
        var interval = recurrencePattern.interval;
        var until = recurrencePattern.to.toString('yyyyMMddTHHmmssZ');

        switch (freqency) {
            case 'WEEKLY':
                var checkedDays = recurrencePattern.byweekday;
                for (var index = 0; index < checkedDays.length; index++) {
                    if (byDay != '') {
                        byDay += ',';
                    }
                    byDay += getWeekDayName(checkedDays[index]);console.log(byDay);
                }
                break;
            case 'MONTHLY':
                var checkedMonthDay = recurrencePattern.bymonthday;
                var checkedMonthWeekDay = recurrencePattern.bynweekday;
                if (checkedMonthDay != null) {
                    for (var index = 0; index < checkedMonthDay.length; index++) {
                        if (byMonthDay != '') {
                            byMonthDay += ',';
                        }
                        byMonthDay += checkedMonthDay[index];
                    }
                }
                if (checkedMonthWeekDay.length != 0) {
                    byDay = checkedMonthWeekDay[0][1].toString() + getWeekDayName(checkedMonthWeekDay[0][0]);
                }
                break;
            case 'YEARLY':
                var checkedYearDay = recurrencePattern.byyearday;
                var checkedMonthes = recurrencePattern.bymonth;
                var checkedMonthWeekDay = recurrencePattern.bynweekday;
                if (checkedYearDay != null) {
                    for (var index = 0; index < checkedYearDay.length; index++) {
                        if (byMonthDay != '') {
                            byMonthDay += ',';
                        }
                        byMonthDay += checkedYearDay[index];
                    }
                }
                if (checkedMonthes.length != 0) {
                    byMonth = checkedMonthes[0];
                }
                if (checkedMonthWeekDay.length != 0) {
                    byDay = checkedMonthWeekDay[0][1].toString() + getWeekDayName(checkedMonthWeekDay[0][0]);
                }
                break;
        }

        fctResult = 'FREQ=' + freqency;
        if (count != 1000) {
            if (fctResult != '') fctResult += ';';
            fctResult += 'COUNT=' + count;
        }
        if (until != '99991231T000000Z') {
            if (fctResult != '') fctResult += ';';
            fctResult += 'UNTIL=' + until;
        }
        if (byDay != '') {
            if (fctResult != '') fctResult += ';';
            fctResult += 'BYDAY=' + byDay;
        }
        if (byMonthDay != '') {
            if (fctResult != '') fctResult += ';';
            fctResult += 'BYMONTHDAY=' + byMonthDay;
        }
        if (byMonth != '') {
            if (fctResult != '') fctResult += ';';
            fctResult += 'BYMONTH=' + byMonth;
        }
        if (interval != 1) {
            if (fctResult != '') fctResult += ';';
            fctResult += 'INTERVAL=' + interval;
        }

    }
    /**
     * FIX - Days shifted right when editing
     *       a recurring appointment
     */
    var d = ["SU","MO","TU","WE","TH","FR","SA"];
    var params = fctResult.split(";");
    for (var i in params){
        if (params[i].indexOf("BYDAY")>=0){
            var byDayString = params[i];
            var days = byDayString.replace("BYDAY=","").split(",");
            var newDays = [];
            for (var j in days){
                console.log(days[j]);
                var newDaysIndex = d.indexOf(days[j]) - 1;
                if (newDaysIndex == -1) newDaysIndex = 6;
                newDays.push(d[newDaysIndex]);
            }
            params[i] = "BYDAY=" + newDays.join(",");
        }
    }
    fctResult = params.join(";");

    return fctResult;
}
/**
 * Auto refresh by an interval set above
 */
setInterval(function(){
    getAppointments();
}, refreshInterval * 1000);