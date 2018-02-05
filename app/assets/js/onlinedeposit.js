jQuery(document).ready(function() {

    console.log("Online Deposit Loaded");
    GetOnlineBanks();

    jQuery('#sendrequest').click(function() {


        jQuery('#httpresult').text('');
        jQuery('#httprequest').text('');

        var dAmount = String(jQuery('#Amount').val());
        // var dOrderDate = String(jQuery('#OrderDate').val());
        var dOrderDate = new Date().toISOString().substr(0, 19);
        // var dOrderNumber = String(jQuery('#OrderNumber').val());
        var dBankCode = String(jQuery('#BankCode').val());
        var dCurrency = String(jQuery('#Currency').val());
        var dCallbackUrl = String(jQuery('#CallbackUrl').val());
        var dNotes = String(jQuery('#Notes').val());
        var dcount = String(jQuery('#noreq').val());
        // var paymeth = String(jQuery('#ddpaymethod').text());

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/PaymentGateway/OnlineDeposit';
        var requrl = String(jQuery('#server').val()) + endpoint;
        var platform = String(jQuery('#ddPlatform').text());
        console.log(platform);

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

                var raw = dAmount + dOrderDate + dOrderNumber + dBankCode + dCurrency + dCallbackUrl + dNotes;
                var dsign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
                jQuery('#Sign').val(dsign);

                var dataObj = {
                    'Amount': dAmount,
                    'OrderDate': dOrderDate,
                    'OrderNumber': dOrderNumber,
                    'BankCode': dBankCode,
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
                        var prettyres = JSON.stringify(result.Messages.Errors, null, '\ ');
                        jQuery('#httpresult').text(prettyres);
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

    function GetOnlineBanks() {
       var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var endpoint = 'api/Common/OnlineBanks';
        var requrl = String(jQuery('#server').val()) + endpoint;
        var platform = String(jQuery('#ddplatform').text());
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
                var prettyres = JSON.stringify(result.Messages.Errors, null, '\ ');
                jQuery('#httpresult').text(prettyres);
                jQuery.each(result.Data, function() {
                    var prettyerror = JSON.stringify(result.Messages.Errors, null, '\ ');
                    var prettymsg = JSON.stringify(result.Messages);
                    var prettyresult = JSON.stringify(result.Data, null, '\ ');
                    jQuery('#httpresult').text(result.Status + '\n' + '\n' + prettyresult + '\n' + prettymsg);
                    console.log(JSON.stringify(result.Data));
                    var bankcodes = jQuery('#BankCode');
                    bankcodes.append(jQuery("<option />").val(this.Code).text(this.Code + ' - ' + this.Name + ' - ' + this.Currency));

                    // jQuery('#banks').append('<a class="dropdown-item" href="#">' + JSON.parse(result.Data) + '</a>');
                });
            }
        });
    };

});