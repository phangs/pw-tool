jQuery(document).ready(function() {

    console.log("Check Deposit Transaction Loaded");

    jQuery('#sendrequest').click(function() {

        jQuery('#httpresult').text('');

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var qdeptrxn = String(jQuery('#trxn').val());

        if (qdeptrxn === '') {
            alert('Transaction Number is required');
            return;
        } else {
            var endpoint = 'api/Payment/CheckDeposit?transactionNo=';
            var requrl = String(jQuery('#server').val()) + endpoint + qdeptrxn;
        
        

        var platform = String(jQuery('#bdplatform').text());
        console.log(requrl);

        var hvAccept = String('application/json');
        var hvContentType = String('application/json');

        var headerObj = {
            'Accept': hvAccept,
            'Content-Type': hvContentType,
            'ClientKey': clientkey,
            'SecretKey': secretkey,
            'X-PAYWALO-PLATFORM': platform
            };


        $.ajax({
            url: requrl,
            headers: headerObj,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                var prettyres = JSON.stringify(result.Messages.Errors, null, '\ ');
                jQuery('#httpresult').text(prettyres);
                jQuery.each(result.Data, function() {
                    var prettyerror = JSON.stringify(result.Messages.Errors, null, '\ ');
                    var prettymsg = JSON.stringify(result.Messages);
                    var prettyresult = JSON.stringify(result.Data, null, '\ ');
                    jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg + '\n' + prettyerror);
                });
            }
        });

    }});

});