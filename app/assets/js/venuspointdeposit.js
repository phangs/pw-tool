jQuery(document).ready(function() {

    console.log("Online Venus Point Deposit Loaded");

    jQuery('#sendrequest').click(function() {


        jQuery('#httpresult').text('');
        jQuery('#httprequest').text('');

        var dAmount = String(jQuery('#Amount').val());
        // var dOrderDate = String(jQuery('#OrderDate').val());
        var dOrderDate = new Date().toISOString().substr(0, 19);
        // var dOrderNumber = String(jQuery('#OrderNumber').val());
        // var dBankCode = String(jQuery('#BankCode').val());
        // var dCurrency = String(jQuery('#Currency').val());
        var dUserId = String(jQuery('#UserId').val());
        var dUserPasswordRaw = String(jQuery('#UserPassword').val());
            var dUserPasswordMD5 = CryptoJS.MD5(dUserPasswordRaw).toString();

        var dCallbackUrl = String(jQuery('#CallbackUrl').val());
        var dNotes = String(jQuery('#Notes').val());
        var dcount = String(jQuery('#noreq').val());
        // var paymeth = String(jQuery('#ddpaymethod').text());

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/PaymentGateway/VenusPointDeposit';
        var requrl = String(jQuery('#server').val()) + endpoint;
        var platform = String(jQuery('#bdplatform').text());

        var hvAccept = String('application/json');
        var hvContentType = String('application/json');

        var headerObj = {
            'Accept': hvAccept,
            'Content-Type': hvContentType,
            'ClientKey': clientkey,
            'SecretKey': secretkey,
            'X-PAYWALO-PLATFORM': platform
        }

        var intendedLoop = dcount;

        if (intendedLoop > 0) {
            for (var itr = 0; itr < intendedLoop; itr++) {
                var d = new Date();
                var d1 = d.getTime();
                var dOrderNumber = String('TEST' + "-" + d1);

                var raw = dAmount + dOrderDate + dOrderNumber + dUserId + dUserPasswordMD5 + dCallbackUrl + dNotes;
                var dsign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
                jQuery('#Sign').val(dsign);

                var dataObj = {
                    'Amount': dAmount,
                    'OrderDate': dOrderDate,
                    'OrderNumber': dOrderNumber,
                    'UserId': dUserId,
                    'UserPassword': dUserPasswordMD5,
                    'CallbackUrl': dCallbackUrl,
                    'Notes': dNotes,
                    'Sign': dsign
                }

                jQuery.ajax({
                    url: requrl,
                    headers: headerObj,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(dataObj),
                    success: function(result) {
                        jQuery('#httpresult').text(result.Status);
                        // alert('Done ' + result.Status);
                        // console.log(dataObj);
                        // var prettyrequest = JSON.stringify(dataObj, null, '\ ');
                        // jQuery('#httprequest').text(prettyrequest);
                        jQuery.each(result.Data, function() {
                            jQuery('#pgurl').attr('href', result.Data.PaymentGateWayUrl);
                            var prettyheader = JSON.stringify(headerObj, null, '\ ');
                            var prettyrequest = JSON.stringify(dataObj, null, '\ ');
                            jQuery('#httprequest').text(prettyheader + '\n' + prettyrequest);
                            var prettyerror = JSON.stringify(result.Messages.Errors, null, '\ ');
                            var prettymsg = JSON.stringify(result.Messages);
                            var prettyresult = JSON.stringify(result.Data, null, '\ ');
                            jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg + '\n' + prettyerror);
                        });
                    }
                })
            }
        }
    });
});