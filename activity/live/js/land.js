(function() {
    FastClick.attach(document.body);
    // Util.toast('嘘！主播休息中...');
    //主播信息
    $('.video-info').on('click', function() {
        $('.anchor-info-wrapper').show();
    });
    $('.ai-close, .ai-masker').on('click', function() {
        $('.anchor-info-wrapper').hide();
    });

})();
