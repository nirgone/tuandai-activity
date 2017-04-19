(function() {
    FastClick.attach(document.body);
    $('#btn_open').on('click', function(e) {
        $('.page-toopen').removeClass('not-open');
        setTimeout(function() {
            $('.page-toopen').removeClass('close');
            $(".redface").hide();
        }, 1000 * 1.65);
    });
    
   //拉起输入碳层
    $("#to_input").click(function(e) {
        Util.showInputPopup();
        // setTimeout(function() {
        //     $("#telNo").focus();
        // }, 500);
    });
})()