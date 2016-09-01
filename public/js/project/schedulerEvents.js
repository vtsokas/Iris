registerEvents = function() {
    $("#scheduler").on("appointmentAdd", function (event) {
        /**
         * Get the task object in the correct format
         */
        var task = exchangeTaskObject(event);
        /**
         * Leave if task is false
         */
        if (task !== false){
            /**
             * Send a POST AJAX request
             * for insert
             */
            $.ajax({
                "url"   : "/task-json",
                "type" : "POST",
                "data"   : task
            }).success(function(response){
                /**
                 * Set id
                 */
            });
        }
    });

    $("#scheduler").on("appointmentChange", function (event) {
        var task = exchangeTaskObject(event);
        if (task !== false){
            /**
             * Send a PUT AJAX request
             * for edit. Also send the
             * entity ID as a param
             */
            $.ajax({
                "url"    : "/task-json/" + event.args.appointment.id,
                "type" : "PUT",
                "data"   : task
            });
        }
    });

    $("#scheduler").on("appointmentDelete", function (event) {
        console.log(event);
    });
};


/**
* Transform the event object to an object ready to be
* submitted to our PHP controller. Returns false if
* no subject has been set.
*/
exchangeTaskObject = function(event){console.log(event.args.appointment);
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
            calendar            : "ΓΕΠ"
        };
        return object;
    }
    return false;
};