(function() {
    FastClick.attach(document.body);
    $('body').on('click', '.tp-item', function() {
        $('.tp-item').removeClass('active');
        $(this).addClass('active');
    });
    var maskHeight = $(window).height() - $(".det-list").offset().top;
    $('.det-mask').height(maskHeight);
    $('.det-select').on('click', function() {
        if ($(this).hasClass('show-opt')) {
            $(this).removeClass('show-opt');
            $('.det-mask').hide();
        } else {
            $(this).addClass('show-opt');
            $('.det-mask').show();
        }
    });
    $('body').on('click', '.opt', function() {
        var value = $(this).attr('data-value');
        var text = $(this).html();
        $('.opt').removeClass('active');
        $(this).addClass('active');
        $('.det-select').find('span').html(text);
        $('.det-select').removeClass('show-opt');
        $('.det-mask').hide();
    });
})();