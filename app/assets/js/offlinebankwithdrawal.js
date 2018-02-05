jQuery(document).ready(function() {

    console.log("Offline Withdrawal Loaded");

    jQuery('#sendrequest').click(function() {


        jQuery('#httpresult').text('');

        var dAmount = String(jQuery('#Amount').val());
        // var dOrderDate = String(jQuery('#OrderDate').val());
        var dOrderDate = new Date().toISOString().substr(0, 19);
        // var dOrderNumber = String(jQuery('#OrderNumber').val());
        var dCurrency = String(jQuery('#Currency').val());
        var dBankAccountName = String(jQuery('#BankAccountName').val());
        var dBankAccountNo = String(jQuery('#BankAccountNo').val());
        var dBankName = String(jQuery('#BankName').val());
        var dBankCity = String(jQuery('#BankCity').val());
        var dBankBranch = String(jQuery('#BankBranch').val());
        var dBankProvince = String(jQuery('#BankProvince').val());
        var dCallbackUrl = String(jQuery('#CallbackUrl').val());
        var dNotes = String(jQuery('#Notes').val());
        var dcount = String(jQuery('#noreq').val());

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/Payment/Withdraw';
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

                var raw = dAmount + dOrderDate + dOrderNumber + dCurrency + dBankAccountName + dBankAccountNo + dBankName + dBankCity + dBankBranch + dBankProvince + dCallbackUrl + dNotes;
                var dsign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
                jQuery('#Sign').val(dsign);

                var dataObj = {
                    'Amount': dAmount,
                    'OrderDate': dOrderDate,
                    'OrderNumber': dOrderNumber,
                    'Currency': dCurrency,
                    'BankAccountName': dBankAccountName,
                    'BankAccountNo': dBankAccountNo,
                    'BankName': dBankName,
                    'BankCity': dBankCity,
                    'BankBranch': dBankBranch,
                    'BankProvince': dBankProvince,
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
                            var prettyheader = JSON.stringify(headerObj, null, '\ ');
                            var prettyrequest = JSON.stringify(dataObj, null, '\ ');
                            jQuery('#httprequest').text(prettyheader + '\n' + prettyrequest);
                            var prettyerror = JSON.stringify(result.Messages.Errors, null, '\ ');
                            var prettyresult = JSON.stringify(result.Data, null, '\ ');
                            jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg + '\n' + prettyerror);
                        });
                    }
                })
            }
        }
    });
});