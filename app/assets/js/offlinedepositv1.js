jQuery(document).ready(function() {

    console.log("Offline Deposit V1 Loaded");

    jQuery('#sendrequest').click(function() {

        jQuery('#httpresult').text('');
        jQuery('#httprequest').text('');

        var dAmount = String(jQuery('#Amount').val());
        // var dOrderDate = String(jQuery('#OrderDate').val());
        var dOrderDate = new Date().toISOString().substr(0, 19);
        // var dOrderNumber = String(jQuery('#OrderNumber').val());
        var dBankId = String(jQuery('#BankId').val());
        var dCurrency = String(jQuery('#Currency').val());
        var dCallbackUrl = String(jQuery('#CallbackUrl').val());
        var dNotes = String(jQuery('#Notes').val());
        var dcount = String(jQuery('#noreq').val());

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/Payment/Deposit';
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

                var raw = dAmount + dOrderDate + dOrderNumber + dBankId + dCurrency + dCallbackUrl + dNotes;
                var dsign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
                jQuery('#Sign').val(dsign);

                var dataObj = {
                    'Amount': dAmount,
                    'OrderDate': dOrderDate,
                    'OrderNumber': dOrderNumber,
                    'BankId': dBankId,
                    'Currency': dCurrency,
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
                            var prettymsg = JSON.stringify(result.Messages);
                            var prettyresult = JSON.stringify(result.Data, null, '\ ');
                            jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg + '\n' + prettyerror);
                        });
                    }
                })
            }
        }
    });

    function GetBankIDs() {

        jQuery('#httpresult').text('');

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var qcountry = String(jQuery('#country').val());        

        if (qcountry === '') {
            var endpoint = 'api/Common/DepositBanks';
        } else {
            var endpoint = 'api/Common/DepositBanks?country=' + qcountry;
        }
        
        // var endpoint = 'api/Common/DepositBanks';
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

        $.ajax({
            url: requrl,
            headers: headerObj,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                // alert(result.Status + JSON.stringify(result.Messages));
                jQuery.each(result.Data, function() {
                    var prettyheader = JSON.stringify(headerObj, null, '\ ');
                    var prettyrequest = JSON.stringify(dataObj, null, '\ ');
                    jQuery('#httprequest').text(prettyheader + '\n' + prettyrequest);
                    var prettymsg = JSON.stringify(result.Messages);
                    var prettyresult = JSON.stringify(result.Data, null, '\ ');
                    jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg);
                })
            }
        })
    };

    // jQuery('#enableCallback').click(function() {

    //     var nocb = jQuery('#enableCallback').val();
    //     if (nocb === false) {
    //         jQuery('#CallbackUrl').setReadOnly(true);
    //     } else {
    //         jQuery('#CallbackUrl').setReadOnly(false);
    //     }
            
    // });

});