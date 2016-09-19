/**
 * Created by gep on 06-Sep-16.
 */
var datatablesampledata;
var data = new Array();
$(document).ready(function () {
    // prepare the data

    var office =
        [
            "1o ΕΓ", "2ο ΕΓ", "3ο ΕΓ", "4ο ΕΓ", "ΔΠΒ", "ΔΔΒ"
        ];
    var sender =
        [
            "Παπαδόπουλος", "Παντακίδης Ο Μέγας", "Γιαγκούλας", "Τσόκας", "KLCI-85"
        ];
    var subject =
        [
            "10 Μέρες Τιμητική", "20 Μέρες Τιμητική", "30 Μέρες Τιμητική", "40 Μέρες Τιμητική"
        ];
    var date =
        [
            "25/5/2016", "28/5/2016", "22/6/2016", "12/4/2016", "18/10/2016",
        ];
    var state =
        [
            "inbox", "outbox", "draft"
        ];
    var text = [
            "hasta la vista baby.", "I'll make him an offer, he can't refuse.",  "I know people.",
            "Say it one more time motherfucker. I dare you, I double dare you", "Go ahead, make my day."
        ];
    generatedata = function(){
        for (var i = 0; i < 200; i++) {
            var row = {};
            row["office"] = office[Math.floor(Math.random() * office.length)];
            row["sender"] = sender[Math.floor(Math.random() * sender.length)];
            row["subject"] = subject[Math.floor(Math.random() * subject.length)];
            row["state"] = state[Math.floor(Math.random() * state.length)]; //test purpose
            row["date"] = date[Math.floor(Math.random() * date.length)];
            row["text"] = text[Math.floor(Math.random() * text.length)];
            data[i] = row;
        }
    }
    generatedata();

    datatablesampledata =
    {
        localData: data,
        dataType: "array",
        dataFields:
            [
                { name: 'office', type: 'string' },
                { name: 'sender', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'date', type: 'string' },
                { name: 'state', type: 'string' },
                { name: 'text', type: 'string' },
            ]
    };
});