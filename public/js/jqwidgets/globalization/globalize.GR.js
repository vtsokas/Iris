greekLanguage = {
    // separator of parts of a date (e.g. '/' in 11/05/1955)
    '/': "/",
    // separator of parts of a time (e.g. ':' in 05:44 PM)
    ':': ":",
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 0,
    days: {
        // full day names
        names: ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"],
        // abbreviated day names
        namesAbbr: ["Κυ","Δε","Τρ","Τε","Πε","Πα","Σα"],
        // shortest day names
        namesShort: ["Κυ","Δε","Τρ","Τε","Πε","Πα","Σα"]
    },
    months: {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος",""],
        // abbreviated month names
        namesAbbr: ["Ιαν","Φεβ","Μάρ","Απρ","Μάι","Ιον","Ιολ","Αύγ","Σεπ","Οκτ","Νοέ","Δεκ",""]
    },
    // AM and PM designators in one of these forms:
    // The usual view, and the upper and lower case versions
    //      [standard,lowercase,uppercase]
    // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
    //      null
    AM: ["ΠΜ", "πμ", "ΠΜ"],
    PM: ["ΜΜ", "μμ", "ΜΜ"],
    eras: [
        // eras in reverse chronological order.
        // name: the name of the era in this culture (e.g. A.D., C.E.)
        // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
        // offset: offset in years from gregorian calendar
        { "name": "A.D.", "start": null, "offset": 0 }
    ],
    twoDigitYearMax: 2029,
    patterns: {
        // short date pattern
        d: "M/d/yyyy",
        // long date pattern
        D: "dddd, MMMM dd, yyyy",
        // short time pattern
        t: "h:mm tt",
        // long time pattern
        T: "h:mm:ss tt",
        // long date, short time pattern
        f: "dddd, MMMM dd, yyyy h:mm tt",
        // long date, long time pattern
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        // month/day pattern
        M: "MMMM dd",
        // month/year pattern
        Y: "yyyy MMMM",
        // S is a sortable format that does not vary by culture
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
        // formatting of dates in MySQL DataBases
        ISO: "yyyy-MM-dd hh:mm:ss",
        ISO2: "yyyy-MM-dd HH:mm:ss",
        d1: "dd.MM.yyyy",
        d2: "dd-MM-yyyy",
        d3: "dd-MMMM-yyyy",
        d4: "dd-MM-yy",
        d5: "H:mm",
        d6: "HH:mm",
        d7: "HH:mm tt",
        d8: "dd/MMMM/yyyy",
        d9: "MMMM-dd",
        d10: "MM-dd",
        d11: "MM-dd-yyyy"
    },
    backString: "Πίσω",
    forwardString: "Επόμενο",
    toolBarPreviousButtonString: "Πίσω",
    toolBarNextButtonString: "Επόμενο",
    emptyDataString: "Δεν υπάρχουν δεδομένα",
    loadString: "Φόρτωση...",
    clearString: "Εκκαθάριση",
    todayString: "Σήμερα",
    dayViewString: "Ημέρα",
    weekViewString: "Εβδομάδα",
    monthViewString: "Μήνας",
    timelineDayViewString: "Zeitleiste Day",
    timelineWeekViewString: "Zeitleiste Woche",
    timelineMonthViewString: "Zeitleiste Monat",
    loadingErrorMessage: "Die Daten werden noch geladen und Sie können eine Eigenschaft nicht festgelegt oder eine Methode aufrufen . Sie können tun, dass, sobald die Datenbindung abgeschlossen ist. jqxScheduler wirft die ' bindingComplete ' Ereignis, wenn die Bindung abgeschlossen ist.",
    editRecurringAppointmentDialogTitleString: "Επεξεργασία επαναλαμβανόμενης εργασίας",
    editRecurringAppointmentDialogContentString: "Θέλετε να επεξεργαστείτε μόνο αυτή την εμφάνισή ή τη σειρά;",
    editRecurringAppointmentDialogOccurrenceString: "Αυτή την εμφάνιση",
    editRecurringAppointmentDialogSeriesString: "Όλη τη σειρά",
    editDialogTitleString: "Παράθυρο επεξεργασίας",
    editDialogCreateTitleString: "Δημιουργία νέου συμβάντος",
    contextMenuEditAppointmentString: "Επεξεργασία συμβάντος",
    contextMenuCreateAppointmentString: "Δημιουργία νέου συμβάντος",
    editDialogSubjectString: "Θέμα",
    editDialogLocationString: "Μέρος",
    editDialogFromString: "Από",
    editDialogToString: "Έως",
    editDialogAllDayString: "Ολοήμερο",
    editDialogExceptionsString: "Εξαίρεση",
    editDialogResetExceptionsString: "Επαναφορά για αποθήκευση",
    editDialogDescriptionString: "Περιγραφή",
    editDialogResourceIdString: "Γραφείο",
    editDialogStatusString: "Κατάσταση",
    editDialogColorString: "Χρώμα",
    editDialogColorPlaceHolderString: "Επιλέξετε το χρώμα",
    editDialogTimeZoneString: "Ζώνη ώρας",
    editDialogSelectTimeZoneString: "Επιλέξτε ζώνη ώρας",
    editDialogSaveString: "Αποθήκευση",
    editDialogDeleteString: "Διαγραφή",
    editDialogCancelString: "Ακύρωση",
    editDialogRepeatString: "Επανάληψη",
    editDialogRepeatEveryString: "Ανά",
    editDialogRepeatEveryWeekString: "εβδομάδες",
    editDialogRepeatEveryYearString: "έτη",
    editDialogRepeatEveryDayString: "μέρες",
    editDialogRepeatNeverString: "Ποτέ",
    editDialogRepeatDailyString: "Ημερήσια",
    editDialogRepeatWeeklyString: "Εβδομαδιαία",
    editDialogRepeatMonthlyString: "Μηνιαία",
    editDialogRepeatYearlyString: "Ετήσια",
    editDialogRepeatEveryMonthString: "μήνες",
    editDialogRepeatEveryMonthDayString: "Κάθε μέρα του μήνα",
    editDialogRepeatFirstString: "πρώτη",
    editDialogRepeatSecondString: "δεύτερη",
    editDialogRepeatThirdString: "τρίτη",
    editDialogRepeatFourthString: "τέταρτη",
    editDialogRepeatLastString: "τελευταία",
    editDialogRepeatEndString: "Τέλος",
    editDialogRepeatAfterString: "Σε",
    editDialogRepeatOnString: "Πότε",
    editDialogRepeatOfString: "Από",
    editDialogRepeatOccurrencesString: "Στιγμιότυπα",
    editDialogRepeatSaveString: "Αποθήκευση",
    editDialogRepeatSaveSeriesString: "Αποθήκευση σειράς",
    editDialogRepeatDeleteString: "Διαγραφή",
    editDialogRepeatDeleteSeriesString: "Διαγαφή σειράς",
    editDialogStatuses: {
        free: "Ολοκληρωμένο",
        tentative: "Κοινό",
        busy: "Επείγον"
    },

    /**
     * grid translation
     */
    percentsymbol: "%",
    currencysymbol: "$",
    currencysymbolposition: "before",
    decimalseparator: '.',
    thousandsseparator: ',',
    pagergotopagestring: "Πήγαινε στην σελίδα:",
    pagershowrowsstring: "Εμφάνιση γραμμών:",
    pagerrangestring: " από ",
    pagerpreviousbuttonstring: "Προηγούμενη",
    pagernextbuttonstring: "Επόμενη",
    groupsheaderstring: "Σείρετε μια στήλη και αφήστε την εδώ για να ομαδοποιήσετε με βάση αυτή",
    sortascendingstring: "Αύξουσα Ταξινόμηση",
    sortdescendingstring: "Φθίνουσα Ταξινόμηση",
    sortremovestring: "Κατάργηση ταξινόμησης",
    groupbystring: "Ομαδοποίηση με βάση αυτή τη στήλη",
    groupremovestring: "Αφαίρεση από τις ομάδες",
    filterclearstring: "Εκκαθάριση",
    filterstring: "Φιλτράρισμα",
    filtershowrowstring: "Δείξτε γραμμές όπου:",
    filtershowrowdatestring: "Δείτε γραμμές όπου ημερομηνία:",
    filterorconditionstring: "Ή",
    filterandconditionstring: "Και",
    filterselectallstring: "(Επιλογή Όλων)",
    filterchoosestring: "Παρακαλώ επιλέξτε:",
    filterstringcomparisonoperators: ['άδειο', 'όχι άδειο', 'περιέχει', 'περιέχει(Ταίριασμα Κεφαλαίων/Μικρών)',
        'δεν περιέχει', 'δεν περιέχει(Ταίριασμα Κεφαλαίων/Μικρών)', 'αρχίζει με', 'αρχίζει(Ταίριασμα Κεφαλαίων/Μικρών)',
        'τελειώνει με', 'τελειώνει με(Ταίριασμα Κεφαλαίων/Μικρών)', 'ίσο', 'ίσο(Ταίριασμα Κεφαλαίων/Μικρών)', 'κενό', 'όχι κενό'],
    filternumericcomparisonoperators: ['ίσο', 'όχι ίσο', 'λιγότερο από', 'λιγότερο από ή ίσο',
        'περισσότερο από', 'περισσότερο από ή ίσο', 'κενό', 'όχι κενό'],
    filterdatecomparisonoperators: ['ίσο', 'όχι ίσο', 'λιγότερο από', 'λιγότερο από ή ίσο',
        'περισσότερο από', 'περισσότερο από ή ίσο', 'κενό', 'όχι κενό'],
    filterbooleancomparisonoperators: ['ίσο', 'όχι ίσο'],
    validationstring: "Η εισηγμένη τιμή δεν είναι έγκυρη",
    emptydatastring: "Δεν υπάρχουν δεδομένα προς εμφάνιση",
    filterselectstring: "Επιλογή Φίλτρου",
    loadtext: "Φόρτωση...",
    clearstring: "Εκκαθάριση",
    todaystring: "Σήμερα"
};
