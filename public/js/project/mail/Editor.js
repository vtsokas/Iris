/**
 * Created by gep on 07-Sep-16.
 */
ShowNewEmailUI = function(){
    $('#MailTable').css('display','none');

    $('#inputReceiver').jqxInput({placeHolder: ' Πα�?αλήπτης', theme: theme, height: 25, width: 250, minLength: 1});
    $('#inputSubject').jqxInput({placeHolder: ' �?έμα', theme: theme,height: 25, width: 250, minLength: 1});
    $('#creation').css('display','initial');
    $('#text').jqxEditor({
        theme: theme,
        height: '100%',
        width: '100%'
    });
}