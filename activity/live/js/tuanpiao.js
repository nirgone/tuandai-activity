(function() {
    FastClick.attach(document.body);
    $('body').on('click', '.tp-item', function() {
        $('.tp-item').removeClass('active');
        $(this).addClass('active');
    });
    $("#goDetail").on('click', function() {
        location.href = './tpDetail.html';
    });
})();