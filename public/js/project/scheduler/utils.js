selectedResource = null;
newObjectIds = {};
selectedResources = "default";
resources = [];
refreshInterval = 60;
lastUpdate = new Date().getTime() / 1000;
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
 * Method to get all apointments from
 * server and add them in scheduler
 */
getAppointments = function() {
    $.ajax({url: "/task-json?resources=" + selectedResources}).done(function (data) {
        $("#scheduler").jqxScheduler('beginAppointmentsUpdate');

        var appointments = new Array();
        for (var i in data) {

            if (parseInt(data[i].dateAdded) > lastUpdate) {
                $("#messageNotificationText").text("Προστέθηκε μία εργασία (" + data[i].calendar + ")");
                $("#messageNotification").jqxNotification("open");
            } else if (data[i].dateUpdated > lastUpdate){
                $("#messageNotificationText").text("Τροποποιήθηκε μία εργασία (" + data[i].calendar + ")");
                $("#messageNotification").jqxNotification("open");
            }

            var appointment = formatAppointment(data[i]);
            appointments.push(appointment);
        }
        dataSource.localdata = appointments;
        resourceSource.localdata = resources;

        dataAdapter.dataBind();
        resourceAdapter.dataBind();

        $("#scheduler").jqxScheduler('endAppointmentsUpdate');

        lastUpdate = new Date().getTime() / 1000;
    });
};
/**
 * Transform the event object to an object ready to be
 * submitted to our PHP controller. Returns false if
 * no subject has been set.
 */
exchangeTaskObject = function(event){
    var isJQX = typeof event.args.appointment.jqxAppointment != "undefined";
    var appointment = (isJQX) ? event.args.appointment.jqxAppointment.boundAppointment : event.args.appointment;
    var isRec = (isJQX) ? appointment.jqxAppointment.isRecurrentAppointment(): false;
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
            recurrenceRule      : (isRec) ? appointment.jqxAppointment.recurrencePattern.toString() : null,
            recurrenceException : (isRec) ? appointment.jqxAppointment.recurrenceException.join() : null,
            status              : appointment.originalData.status,
            /**
             * The selectedResource variable was set when the dropdown selection changed
             * Not a desired implementation but this is the fate of custom solutions
             */
            calendar            : (selectedResource != null) ? selectedResource : appointment.resourceId
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
    appointment.start = new Date(parseInt(appointment.from) * 1000);
    appointment.end = new Date(parseInt(appointment.to) * 1000);
    switch (appointment.status){
        case "free" :
            appointment.background = "#088A08";
            break;
        case "tentative" :
            appointment.background = "#FF8000";
            break;
        case "busy" :
            appointment.background = "#FF0000";
            break;
        default :
            break;
    };
    return appointment;
};
/**
 * Auto refresh by an interval set above
 */
setInterval(function(){
    getAppointments();
}, refreshInterval * 1000);