$(document).ready(function () {
    /**
     * Create draggable button
     */
    $("#showWindowButton").draggable({
        cancel: false,
        grid: [1, 1],
        snap: 'body',
        snapMode: 'inner',
        snapTolerance: 40,
        start: function (event, ui) {
            $(this).css({right: 0, left: 0, bottom: 0, top: 0});
        },
        stop: MailButtonPosition
    });

    /**
     * Create jqxwindow
     */
    $("#jqxwindow").jqxWindow({
        height: '100%',
        width: '800',
        maxHeight: '600px',
        theme: theme,
        autoOpen: false,
        isModal: true,
        draggable: false,
        resizable: false,
        modalOpacity: 0.5,
        modalZIndex: 999999,
        zIndex: 99998,
        initContent: function () {
            $("#content").html('<iframe src="/mail" width="100%" height="100%" frameBorder="0"></iframe>');
        }
    });

    /**
     * show/hide jqxwindow on button click
     */
    $('#showWindowButton').click(function (event, ui) {
        if (!$('#jqxwindow').jqxWindow('isOpen')) {
            if ($(this).position().left == 0) {
                var x = $(this).position().left + $(this).width() + 10;
            }
            else {
                var x = $(this).position().left - $('#jqxwindow').width();
            }
            $("#jqxwindow").jqxWindow({position: {x: x, y: 0}});
            $("#jqxwindow").jqxWindow('open');
        }
        else {
            $("#jqxwindow").jqxWindow('close');
        }

    });

    /**
     * Button position logic
     * @param event
     * @param ui
     * @constructor
     */
    function MailButtonPosition(event, ui) {
        var cWidth = $(window).width() / 2;
        var cHeight = $(window).height() / 2;

        if (ui.position.left > cWidth) {
            $(this).css({left: 'auto', right: 0});
            var x = $(this).position().left - $('#jqxwindow').width();
            $('#jqxwindow').jqxWindow('move', x, 0);
        }
        else {
            $(this).css({right: 'auto', left: 0});
            var x = $(this).position().left + $(this).width() + 10;
        }

        if (ui.position.top > cHeight) {
            $(this).css({top: 'auto', bottom: 0});
        }
        else {
            $(this).css({bottom: 'auto', top: 0});
        }
        $('#jqxwindow').jqxWindow('move', x, 0);
    }
});