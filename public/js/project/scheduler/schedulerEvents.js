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
                console.log(event, response);
                /**
                 * Set the correct color according to the
                 * status and the id assigned by the DB
                 */
                $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                    "id", response.id);

                $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                    "background", formatAppointment(task).background);
                /**
                 * @todo Cannot edit afterwards
                 */
            });
        }
    });

    $("#scheduler").on("appointmentChange", function (event) {
        console.log(event, $('#scheduler').jqxScheduler('selectAppointment', event.id));
        var task = exchangeTaskObject(event);
        /**
         * Leave if task is false
         */
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
            /**
             * Set the correct color according to the
             * status that might has been changed
             */
            $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                "background", formatAppointment(task).background);
        }
    });

    $("#scheduler").on("appointmentDelete", function (event) {
        console.log(event);
    });
};