jQuery(document).ready(function() {

    console.log("Get Banks-Deposit Loaded");

    jQuery('#sendrequest').click(function() {

        jQuery('#httpresult').text('');

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var qcountry = String(jQuery('#Country').text());
        console.log(qcountry);       

        if (qcountry === '') {
            var endpoint = 'api/Common/DepositBanks';
        } else {
            var endpoint = 'api/Common/DepositBanks?country=' + qcountry;
        }
        
        // var endpoint = 'api/Common/DepositBanks';
        var requrl = String(jQuery('#server').val()) + endpoint;
        var platform = String(jQuery('#bdplatform').text());
        // console.log(requrl);

        var hvAccept = String('application/json');
        var hvContentType = String('application/json');

        var headerObj = {
            'Accept': hvAccept,
            'Content-Type': hvContentType,
            'ClientKey': clientkey,
            'SecretKey': secretkey,
            'X-PAYWALO-PLATFORM': platform
            };

        // console.log(headerObj);
        // console.log(endpoint);

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

    });


});