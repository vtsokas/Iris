registerEvents = function() {
    $("#scheduler").on("appointmentAdd", function (event) {
        if (selectedResources.split(",").indexOf(event.args.appointment.resourceId)==-1){
            $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                "hidden", true);
        }
        console.log(event);
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
                 * Match the id assigned by the JQX
                 * logic with the one from our DB
                 */
                newObjectIds[event.args.appointment.id] = response.id;
                $("#scheduler").jqxScheduler('beginAppointmentsUpdate');

                /**
                 * Set the correct color according to the status
                 */
                $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                    "background", formatAppointment(task).background);

                $("#scheduler").jqxScheduler('endAppointmentsUpdate');
                /**
                 * @todo Cannot edit afterwards
                 */
            });
        }
    });

    $("#scheduler").on("appointmentChange", function (event) {
        var task = exchangeTaskObject(event);

        /**
         * If we have a recently added appointment we
         * want to retreive the id assigned by our DB
         */
        var id = event.args.appointment.id.indexOf("-") > 0
            ? newObjectIds[event.args.appointment.id]
            : event.args.appointment.id;
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
                "url"    : "/task-json/" + id,
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