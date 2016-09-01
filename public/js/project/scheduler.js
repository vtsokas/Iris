scheduler = function(){
    var source =
    {
        dataType: 'array',
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'status', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'style', type: 'string' },
            { name: 'resource', type: 'string' },
            { name: 'start', type: 'date', format: "yyyy-MM-dd HH:mm" },
            { name: 'end', type: 'date', format: "yyyy-MM-dd HH:mm" }
        ],
        id: 'id'
    };
    var adapter = new $.jqx.dataAdapter(source);
    $("#scheduler").jqxScheduler({
        width: '99.8%',
        height: '99%',
        source: adapter,
        showLegend: true,
        ready: function () { registerEvents() },
        appointmentDataFields:
        {
            from: "start",
            to: "end",
            id: "id",
            description: "description",
            location: "location",
            subject: "subject",
            style: "style",
            status: "status"
        },
        view: 'weekView',
        views:
            [
                'dayView',
                'weekView',
                'monthView',
                'agendaView'
            ],
        theme:theme,
        /**
         * called when the context menu is created.
         * @param {Object} menu - jqxMenu's jQuery object.
         * @param {Object} settings - Object with the menu's initialization settings.
         */
        contextMenuCreate: function(menu, settings)
        {
            var source = settings.source;
            source.push({ id: "delete", label: "Delete Appointment" });
            source.push({
                id: "status", label: "Set Status", items:
                    [
                        { label: "Free", id: "free" },
                        { label: "Out of Office", id: "outOfOffice" },
                        { label: "Tentative", id: "tentative" },
                        { label: "Busy", id: "busy" }
                    ]
            });
        },
        /**
         * called when the user clicks an item in the Context Menu. Returning true as a result disables the built-in Click handler.
         * @param {Object} menu - jqxMenu's jQuery object.
         * @param {Object} the selected appointment instance or NULL when the menu is opened from cells selection.
         * @param {jQuery.Event Object} the jqxMenu's itemclick event object.
         */
        contextMenuItemClick: function (menu, appointment, event)
        {
            var args = event.args;
            switch (args.id) {
                case "delete":
                    $("#scheduler").jqxScheduler('deleteAppointment', appointment.id);
                    return true;
                case "free":
                    $("#scheduler").jqxScheduler('setAppointmentProperty', appointment.id, 'status', 'free');
                    return true;
                case "outOfOffice":
                    $("#scheduler").jqxScheduler('setAppointmentProperty', appointment.id, 'status', 'outOfOffice');
                    return true;
                case "tentative":
                    $("#scheduler").jqxScheduler('setAppointmentProperty', appointment.id, 'status', 'tentative');
                    return true;
                case "busy":
                    $("#scheduler").jqxScheduler('setAppointmentProperty', appointment.id, 'status', 'busy');
                    return true;
            }
        },
        /**
         * called when the menu is opened.
         * @param {Object} menu - jqxMenu's jQuery object.
         * @param {Object} the selected appointment instance or NULL when the menu is opened from cells selection.
         * @param {jQuery.Event Object} the open event.
         */
        contextMenuOpen: function (menu, appointment, event) {
            if (!appointment) {
                menu.jqxMenu('hideItem', 'delete');
                menu.jqxMenu('hideItem', 'status');
            }
            else {
                menu.jqxMenu('showItem', 'delete');
                menu.jqxMenu('showItem', 'status');
            }
        },
        /**
         * called when the menu is closed.
         * @param {Object} menu - jqxMenu's jQuery object.
         * @param {Object} the selected appointment instance or NULL when the menu is opened from cells selection.
         * @param {jQuery.Event Object} the close event.
         */
        contextMenuClose: function (menu, appointment, event) {
        }
    });

    getAppointments = function() {
        $.ajax({url: "/task-json"}).done(function (data) {
            var appointments = new Array();
            for (var i in data) {
                data[i].start = new Date(parseInt(data[i].from) * 1000);
                data[i].end = new Date(parseInt(data[i].to) * 1000);
                appointments.push(data[i]);
            }
            source.localdata = appointments;
            adapter.dataBind();
            $("#scheduler").jqxScheduler('addAppointment');
        });
    };

    getAppointments();

};