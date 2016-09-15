selectedResource = null;
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
        console.log(appointment);
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
        console.log(object);
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
}