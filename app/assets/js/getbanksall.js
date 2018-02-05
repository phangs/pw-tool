jQuery(document).ready(function() {

    console.log("Get Banks-All Loaded");

    jQuery('#sendrequest').click(function() {
        
        jQuery('#httpresult').text('');

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/Common/Banks';
        var requrl = String(jQuery('#server').val()) + endpoint;
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

        console.log(headerObj);

        $.ajax({
            url: requrl,
            headers: headerObj,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                // alert(result.Status);
                // jQuery('#httpresult').val(result.Status);
                jQuery.each(result.Data, function() {
                    // console.log(this.PaymentMethodCode + ' : ' + this.PaymentMethodName + '\n');
                    // var paymethod = (this.PaymentMethodCode + ' : ' + this.PaymentMethodName + '\n');
                    var prettyerror = JSON.stringify(result.Messages.Errors, null, '\ ');
                    var prettymsg = JSON.stringify(result.Messages);
                    var prettyresult = JSON.stringify(result.Data, null, '\ ');
                    jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg); 
                });
            }
        });

    });


});