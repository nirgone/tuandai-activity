(function() {
    FastClick.attach(document.body);

    var pageEl = $(".page");
    var dialogEl = $(".dialog");

    // 初始化判断是否已经登录

    Util.bbsInit(initData);

    function initData() { //初始化数据
        console.log(11111);
        $.ajax({
            url: basePath + "/app/index.php",
            type: "POST",
            dataType: 'json',
            data: {
                "version": 4,
                "module": "member",
                "action": "weixin_sign"
            },
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(data) {

            },
            error: function(err) {
                Util.alertServeError();
            },
            complete: function() {
                $(".loading").hide();
            }
        });
    }

    // 显示规则
    pageEl.on("click", ".btn-rule", function() {
        dialogEl.find(".rule-content").addClass("show");
        dialogEl.addClass("show");
        Util.disableScrolling();
    });

    // 关闭弹窗
    dialogEl.on("click", ".icon-close, .close-btn,.mask", function() {
        onHideDialogs();
    })

    // 跳转至抽奖页面
    pageEl.on("click", ".btn-lottery", function(e) {
        var currentTarget = $(e.currentTarget);
        if(!currentTarget.hasClass("disable")) {
            window.location.href = "./lottery.html"
        }
    })

    // 显示幸运值中奖
    var onShowLuckyDialog = function(i) {
        if (isNaN(Number(i))) { //如果非数值
            return;
        }
        dialogEl.find(".lucky-dialog .lucky-prize-value").text(i);
        dialogEl.find(".lucky-dialog").addClass("show");
        dialogEl.addClass("show");
        var luckyValueEl = pageEl.find(".lucky-value");
        var luckyProgressEl = pageEl.find(".lucky-progress");
        var luckyValue = luckyValueEl.text() ? luckyValueEl.text() : 0;
        animateNum(Number(luckyValue), Number(luckyValue) + Number(i));
        var luckyProgress = (Number(luckyValue) + Number(i)) > 100 ? 100 : (Number(luckyValue) + Number(i));
        luckyProgressEl.css("width", luckyProgress + "%");
        Util.disableScrolling();
    }

    // 动画变化幸运值
    var numAnim;
    var animateNum = function(startNum, endNum) {
        numAnim = new CountUp("luckyValue", startNum, endNum, 0, 0.8, {
            separator: ""
        });

        numAnim.start();
    }

    // 关闭弹窗
    var onHideDialogs = function() {
        $(".show").removeClass("show");
        Util.enableScrolling();
    }



})();