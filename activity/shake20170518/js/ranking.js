(function() {
    FastClick.attach(document.body);
    var pageContentEl = $(".content");
    var ruleEl = $(".dialog-rule");
    var shareEl = $(".dialog-share");

    // 分享
    pageContentEl.on("click", ".btn-share", function() {
        shareEl.show();
        $(".scroll").removeClass("scroll-active");
    });

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
        $(".scroll").removeClass("scroll-active");
    }

    // 隐藏规则
    function onHideRule() {
        ruleEl.hide();
        $(".scroll").addClass("scroll-active");
    }
})()
