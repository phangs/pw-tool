jQuery(document).ready(function() {

    console.log("Get Online Banks Loaded");

    jQuery('#sendrequest').click(function() {
        
        jQuery('#httpresult').text('');

        var clientkey = String(jQuery('#clientkey').val());
        var secretkey = String(jQuery('#secretkey').val());
        var saltkey = String(jQuery('#saltkey').val());
        var server = String(jQuery('#server').val());
        // var endpoint = 'api/Common/OnlineBanks';
        var platform = String(jQuery('#bdplatform').text());
        var dcurency = String(jQuery('#Currency').val());

        if (dcurency === '') {
            var endpoint = 'api/Common/OnlineBanks';
        } else {
            var endpoint = 'api/Common/OnlineBanks?currency=' + dcurency;
        }

        var requrl = server + endpoint; 
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
                });
            }
        });

    });


});