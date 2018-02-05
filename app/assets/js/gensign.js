jQuery(document).ready(function() {

    console.log("Generate Sign Loaded");

    jQuery('#sendrequest').click(function() {

        jQuery('#httpresult').text('');

        var saltkey = String(jQuery('#saltkey').val());
        var raw = String(jQuery('#rawdata').val());
        var sign = CryptoJS.HmacSHA256(raw, saltkey).toString(CryptoJS.enc.Hex).toUpperCase();
        console.log(sign);
        jQuery('#httpresult').text(sign);

    });

});