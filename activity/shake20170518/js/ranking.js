(function() {
    FastClick.attach(document.body);
    var scrollEl = $(".scroll");
    var pageContentEl = $(".content");
    var ruleEl = $(".dialog-rule");
    var shareEl = $(".dialog-share");

    // 分享
    pageContentEl.on("click", ".btn-share", function() {
        shareEl.show();
        scrollEl.removeClass("scroll-active");
    });

    // 关闭分享
    shareEl.on("click", ".masker", function() {
        shareEl.hide();
        scrollEl.addClass("scroll-active");
    })

    // 查看规则
    pageContentEl.on("click", ".btn-rule", function() {
        onShowRule();
    });

    // 关闭规则
    ruleEl.on("click", ".icon-close", function() {
        onHideRule();
    });

    // 显示规则
    function onShowRule() {
        ruleEl.show();
        scrollEl.removeClass("scroll-active");
    }

    // 隐藏规则
    function onHideRule() {
        ruleEl.hide();
        scrollEl.addClass("scroll-active");
    }
})()
