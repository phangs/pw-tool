jQuery(document).ready(function() {

    console.log("JS Loaded");

    jQuery('#paymentmethods').click(function() {
        jQuery('#apitester').load('assets/pages/payment_methods.html');
    });

    jQuery('#bankaccounts').click(function() {
        jQuery('#apitester').load('assets/pages/bankaccounts.html');
    });

    jQuery('#getbanksall').click(function() {
        jQuery('#apitester').load('assets/pages/banks-all.html');
    });

    jQuery('#getbankdeposit').click(function() {
        jQuery('#apitester').load('assets/pages/banks-deposit.html');
    });

    jQuery('#getbankwithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/banks-withdrawal.html');
    });

    jQuery('#checkdeposit').click(function() {
        jQuery('#apitester').load('assets/pages/checkdeposit.html');
    });

    jQuery('#checkwithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/checkwithdrawal.html');
    });

    jQuery('#gensign').click(function() {
        jQuery('#apitester').load('assets/pages/gensign.html');
    });

    jQuery('#getonlinebanks').click(function() {
        jQuery('#apitester').load('assets/pages/getonlinebank.html');
    });

    // jQuery('.dropdown-menu').click(function() {
    //     jQuery('#Country').text(this.id);
    //     console.log(this.id);
    // });


// Calls for Deposit Transactions
    jQuery('#offlinedepv1').click(function() {
        jQuery('#apitester').load('assets/pages/offlinedepositv1.html');
    });

    jQuery('#offlinedepv2').click(function() {
        jQuery('#apitester').load('assets/pages/offlinedepositv2.html');
    });

    jQuery('#onelinedep').click(function() {
        jQuery('#apitester').load('assets/pages/onlinedeposit.html');
    });

    jQuery('#onelinewechat').click(function() {
        jQuery('#apitester').load('assets/pages/onlinewechat.html');
    });

    jQuery('#onlineqqpay').click(function() {
        jQuery('#apitester').load('assets/pages/onlineqqpay.html');
    });

    jQuery('#onlinealipay').click(function() {
        jQuery('#apitester').load('assets/pages/onlinealipay.html');
    });

    jQuery('#venusdeposit').click(function() {
        jQuery('#apitester').load('assets/pages/venuspointdeposit.html');
    });

    jQuery('#offlinelinepay').click(function() {
        jQuery('#apitester').load('assets/pages/offlinelinepay.html');
    });

    jQuery('#offlinewechat').click(function() {
        jQuery('#apitester').load('assets/pages/offlinewechat.html');
    });

    jQuery('#offlineqqpay').click(function() {
        jQuery('#apitester').load('assets/pages/offlineqqpay.html');
    });

    jQuery('#offlinebankwithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/offlinebankwithdrawal.html');
    });

    jQuery('#offlinewithdrawalwc').click(function() {
        jQuery('#apitester').load('assets/pages/offlinewithdrawalwc.html');
    });

    jQuery('#offlinewithdrawalqq').click(function() {
        jQuery('#apitester').load('assets/pages/offlinewithdrawalqq.html');
    });

    jQuery('#onlinewithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/onlinewithdrawal.html');
    });

    jQuery('#venuswithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/venuspointwithdrawal.html');
    });

    jQuery('#uploaddepslip1').click(function() {
        jQuery('#apitester').load('assets/pages/uploaddepslip1.html');
    });

    jQuery('#venuswithdrawal').click(function() {
        jQuery('#apitester').load('assets/pages/venuspointwithdrawal.html');
    });
    
    jQuery('#onlinecup').click(function() {
        jQuery('#apitester').load('assets/pages/cup.html');
    });

    // jQuery('#btnchsrvr').click(function() {

    //     var server = String(jQuery('#server').val());

    //     if (server === 'http://prod.paywalo.com/') {
    //         jQuery('#server').val('http://stg.paywalo.com:8086/');
    //         jQuery('#clientkey').val('0a6dea9f-7001-4ac8-95b3-304712386d3a');
    //         jQuery('#secretkey').val('438c1de6-0e35-46b4-a9f8-3b2eab8ec776');
    //         jQuery('#saltkey').val('28ff558bb47043cba186f4819a8393c5');
    //         jQuery('#bdserver').text('Staging');
    //     } else {
    //         jQuery('#server').val('http://prod.paywalo.com/');
    //         jQuery('#clientkey').val('67ceb2f6-18ec-43e6-b6db-1e803eafce73');
    //         jQuery('#secretkey').val('097cd93f-f2a7-46d8-8982-7c2d798b6a38');
    //         jQuery('#saltkey').val('46da9153c96c4d75b138d6722cd5f7e0');
    //         jQuery('#bdserver').text('Production');
    //     }

    // });

    jQuery('.chcountry').on("click", function(e){
        // alert(this.id);
        jQuery('#Country').text(this.text);
        jQuery('#Currency').val(this.id);
    });

    jQuery('.chsrvr').on("click", function(e){

        jQuery('#ddServer').text(this.text);
        jQuery('#server').val(this.id);

        var server = String(jQuery('#server').val());

        if (server === 'http://prod.paywalo.com/') {
            jQuery('#clientkey').val('67ceb2f6-18ec-43e6-b6db-1e803eafce73');
            jQuery('#secretkey').val('097cd93f-f2a7-46d8-8982-7c2d798b6a38');
            jQuery('#saltkey').val('46da9153c96c4d75b138d6722cd5f7e0');
            
        } else {
            jQuery('#clientkey').val('47693eb3-5b85-4980-b006-0f2a35c02b8a');
            jQuery('#secretkey').val('59dba91b-52d0-4589-8909-42d7f14a2a46');
            jQuery('#saltkey').val('46da9153c96c4d75b138d6722cd5f7e0');
        }

    });

    jQuery('.chpform').on("click", function(e){

        jQuery('#ddPlatform').text(this.id); 
    });


    // jQuery('#btnchplatform').click(function() {

    //     var platform = String(jQuery('#bdplatform').text());

    //     if (platform === 'WEB') {
    //         jQuery('#bdplatform').text('MOB');
    //     } else {
    //         jQuery('#bdplatform').text('WEB');
    //     }

    // });

    // (function blink() {
    //     jQuery('.blink_me').fadeOut(500).fadeIn(500, blink);
    // })();

});