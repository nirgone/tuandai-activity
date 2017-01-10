(function() {
    FastClick.attach(document.body);

    var pageEl = $(".page");
    var dialogEl = $(".dialog");

    // 初始化判断是否已经登录

    Util.bbsInit(initData);

    function initData() { //初始化数据
        $.ajax({
            url: Util.basePath + "/app/index.php",
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
            success: function(respond) {
                if (respond.code == 200) {
                    var data = respond.data;
                    onShowLuckyDialog(data.add_luck_value, data.total_luck_value); //显示幸运值
                    pageEl.find(".sign-days .days").text(data.series_sign_num); //连续签到天数
                    // 是否可抽奖
                    if(data.luck_chance == "1") {
                        pageEl.find(".btn-lottery").removeClass("disable");
                    } else {
                        pageEl.find(".btn-lottery").addClass("disable")
                    }

                    pageEl.find(".my-rank font").text(data.my_rank+"名");
                    var topTenListEl = pageEl.find(".list-top10");
                    for(var i = 0; i<data.sign_rank.length &&i<10 ; i++) {
                        topTenListEl.append(onTopTenTem(data.sign_rank[i]));
                    }
                } else if (respond.code == 401) { //未登录
                    var returnUrl = window.location.href;
                    returnUrl = encodeURIComponent(returnUrl);
                    window.location.href = "//m.tuandai.com/user/Login.aspx?tdfrom=tuanfenquan-p1611-01&ReturnUrl=" + returnUrl;
                } else { //服务器错误
                    Util.alertPrize({
                        iconUrl: "../images/icon-unhappy.png",
                        contentText: "<p>" + respond.message + "</p>",
                        btn: {
                            name: "关了吧"
                        },
                    });
                }
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
            if (!currentTarget.hasClass("disable")) {
                window.location.href = "./lottery.html"
            }
        })
        // 动画变化幸运值
    var numAnim;
    var animateNum = function(startNum, endNum) {
        numAnim = new CountUp("luckyValue", startNum, endNum, 0, 1.2, {
            separator: ""
        });

        numAnim.start();
    }

    // 显示幸运值中奖,并修改总幸运值
    var onShowLuckyDialog = function(add_luck_value, total_luck_value) {
        var total_luck_value = Number(total_luck_value);
        var add_luck_value = Number(add_luck_value);
        if (isNaN(add_luck_value) || isNaN(total_luck_value)) { //如果非数值
            return;
        }
        if (add_luck_value !== 0) {
            dialogEl.find(".lucky-dialog .lucky-prize-value").text(add_luck_value);
            dialogEl.find(".lucky-dialog").addClass("show");
            dialogEl.addClass("show");
        }

        var luckyValueEl = pageEl.find(".lucky-value");
        var luckyProgressEl = pageEl.find(".lucky-progress");
        animateNum(0, total_luck_value);
        var luckyProgress = total_luck_value > 100 ? 100 : total_luck_value;
        luckyProgressEl.css("width", luckyProgress + "%");
        Util.disableScrolling();
    }


    var onTopTenTem = function(data) {
        // 拼接字符串;
        var itemStr = "<div class='item'><div class='rank row01'>" +
            "<span class='icon-star'></span><font class='rank-text'> " +
            data.rank_id + "</font></div><font class='name row02'>" +
            data.nickname + "</font></div>"

        return $(itemStr);
    }


    // 关闭弹窗
    var onHideDialogs = function() {
        $(".show").removeClass("show");
        Util.enableScrolling();
    }



})();