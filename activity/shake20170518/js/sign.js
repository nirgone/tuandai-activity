(function() {
    FastClick.attach(document.body);
    var pageContentEl = $(".content");
    var scoreEl = $(".dialog-score");
    // 查看战绩
    pageContentEl.on("click", ".pk-sec", function() {
        onShowScore();
    });

    // 关闭战绩
    scoreEl.on("click", ".icon-close", function() {
        onHideScore();
    });

    // 显示战绩
    function onShowScore() {
        scoreEl.show();
        $(".scroll").removeClass("scroll-active");
    }

    // 隐藏战绩
    function onHideScore() {
        scoreEl.hide();
        $(".scroll").addClass("scroll-active");
    }
})()