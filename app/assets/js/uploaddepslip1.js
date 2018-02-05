jQuery(document).ready(function() {

    console.log("Upload Deposit Slip V1 Loaded");

    jQuery('#sendrequest').click(function() {


        jQuery('#httpresult').text('');
        jQuery('#httprequest').text('');

        var dDepositSlipImage = String(jQuery('#DepositSlipImage').val());
        var dTransactionNumber = String(jQuery('#TransactionNumber').val());
        var dFileNameWithExtension = String(jQuery('#FileNameWithExtension').val());

        var dcount = String(jQuery('#noreq').val());

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'v2/api/Payment/UploadDepositSlip';
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

                var raw = dDepositSlipImage + dTransactionNumber + dFileNameWithExtension;
                var dsign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
                jQuery('#Sign').val(dsign);

                var dataObj = {
                    'DepositSlipImage': dDepositSlipImage,
                    'TransactionNumber': dTransactionNumber,
                    'FileNameWithExtension': dFileNameWithExtension,
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