registerEvents = function() {
    $("#scheduler").on("appointmentAdd", function (event) {
        if (selectedResources.split(",").indexOf(event.args.appointment.resourceId)==-1){
            $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                "hidden", true);
        }
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

                getAppointments();

                if (selectedResources.split(",").indexOf(event.args.appointment.resourceId) < 0)
                    ShowNotification("Προστέθηκε μία εργασία", "success", event.args.appointment.resourceId);

                /**
                 * @todo Cannot edit afterwards
                 */
            }).error(function(){
                $('#scheduler').jqxScheduler('deleteAppointment', event.args.appointment.id);
                ShowNotification("Αδυναμία εισαγωγής εργασίας", "error", event.args.appointment.resourceId);
            });
        }
    });

    $("#scheduler").on("appointmentChange", function (event) {console.log("changed ... ... ... ",event.args.appointment.from.toString());
        /**
         *  EDIT RECURRENT APPOINTMENT
         */
        var isJQX = typeof event.args.appointment.jqxAppointment != "undefined";
        var appointment = (isJQX) ? event.args.appointment.jqxAppointment.boundAppointment : event.args.appointment;
        if (isJQX && appointment.jqxAppointment.rootAppointment !== null)
        {
            $("#scheduler").jqxScheduler('beginAppointmentsUpdate');

            delete(appointment.id);
            $("#scheduler").jqxScheduler("addAppointment", appointment);
            event.args.appointment.jqxAppointment.rootAppointment.exceptions.push( event.args.appointment.jqxAppointment);
            event.args.appointment.jqxAppointment = event.args.appointment.jqxAppointment.rootAppointment;
            //return;
        }
        var task = exchangeTaskObject(event);

        /**
         * If we have a recently added appointment we
         * want to retreive the id assigned by our DB
         */
        var id = (typeof event.args.appointment.jqxAppointment !== 'undefined')
            ? event.args.appointment.jqxAppointment.id
            :event.args.appointment.id;
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
                "url"    : "/task-json/" + id.replace(".","-"),
                "type" : "PUT",
                "data"   : task
            }).success(function(response){
                /**
                 * Set the correct color according to the
                 * status that might has been changed
                 */
                $('#scheduler').jqxScheduler('setAppointmentProperty', event.args.appointment.id,
                    "background", formatAppointment(task).background);

                /**
                 * @todo Cannot edit afterwards
                 */
            }).error(function(){
                ShowNotification("Αδυναμία τροποποίησης εργασίας", "error", event.args.appointment.resourceId);
            }).always(function(){
                getAppointments();
            });
        }
    });

    $("#scheduler").on("appointmentDelete", function (event) {
        console.log(event);
    });

    $("#scheduler").on("appointmentClick", function (event) {
        clickedApp = event.args.appointment;
    });
};