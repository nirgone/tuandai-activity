(function() {
    FastClick.attach(document.body);

    var pageEl = $(".page");
    var dialogEl = $(".dialog");



    // 初始化判断是否已经登录
    Util.bbsInit(function() {
        $(".loading").hide();
    });


    /*抽奖*/
    var lottery = {
        index: 0, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 20, //初始转动速度
        times: 0, //转动次数
        cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        init: function(id) {
            if ($("#" + id).find(".lottery-unit").length > 0) {
                $lottery = $("#" + id);
                $units = $lottery.find(".lottery-unit");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-" + this.index).find(".icon").addClass("active");
            };
        },
        roll: function() {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-" + index).find(".icon").removeClass("active");
            index += 1;
            if (index > count - 1) {
                index = 0;
            };
            $(lottery).find(".lottery-unit-" + index).find(".icon").addClass("active");
            this.index = index;
            return false;
        },
        clear: function(index) {
            $(this.obj).find(".active").removeClass("active");
        }

    };

    function roll() {
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
            clearTimeout(lottery.timer);
            setTimeout(function() {
                onShowPrize(lottery.prize, lottery.prizeValue);
                lottery.prize = -1;
                lottery.times = 0;
            }, 500);
            // click = false;
        } else {
            if (lottery.times < lottery.cycle) {
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) {
                // var index = Math.random() * (lottery.count) | 0;
                // lottery.prize = index;
            } else {
                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 20;
                }
            }
            if (lottery.speed < 40) {
                lottery.speed = 40;
            };
            lottery.timer = setTimeout(roll, lottery.speed);
        }
        return false;
    }
    // 初始化抽奖配置
    (function() {
        lottery.init('lottery');
        lottery.speed = 100;
    })();

    //抽奖开始
    pageEl.on('click', ".lotbtn", function(e) {
        var currentTarget = $(e.currentTarget);
        if(currentTarget.hasClass("disable")) { //不可抽奖状态
            return;
        }
        
        currentTarget.addClass("disable");
        $.ajax({
            url: Util.basePath + "/app/index.php",
            type: "POST",
            dataType: 'json',
            data: {
                "version": 4,
                "module": "member",
                "action": "luck_app"
            },
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(respond) {
                if (respond.code == 200) {
                    var data = respond.data;
                    var prizeType = 0;
                    if (data.is_luck == "1") { //中奖
                        switch (data.face_value) {
                            case "50": //50威望
                                prizeType = 0;
                                break;
                            case "80": //80威望
                                prizeType = 5;
                                break;
                            case "100": //100威望
                                prizeType = 2;
                                break;
                            case "3": //3元红包
                                prizeType = 1;
                                break;
                            case "5": //5元红包
                                prizeType = 4;
                                break;
                            case "10": //10元红包
                                prizeType = 7;
                                break;
                        }
                    } else { //未中奖
                        prizeType = [3, 6][Math.round(Math.random())]
                    }
                    lottery.prize = prizeType; //设置获取的奖品
                    lottery.prizeValue = data.face_value; //设置获取的奖品
                    roll();

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
                    pageEl.find(".lotbtn").removeClass("disable");
                }

            },
            error: function() {
                Util.alertServeError();
                pageEl.find(".lotbtn").removeClass("disable");
            },
            complete: function() {
                
                $(".loading").hide();
            }
        });
    });

    var onShowPrize = function(prizeType, prizeValue) {
        switch (prizeType) {
            case 3:
            case 6:
                Util.alertPrize({
                    iconUrl: "../images/icon-unhappy.png",
                    contentText: "<p>差一点就中啦！明天再来吧！</p>",
                    btn: {
                        name: "关了吧"
                    },
                });
                break;
            case 1:
            case 4:
            case 7:
                Util.alertPrize({
                    iconUrl: "../images/icon-hongbao.png",
                    contentText: "<p>恭喜你！获得<font style='color:#f93737;font-weight:bold;'>" + prizeValue + "元</font>投资红包</p>",
                    btn: {
                        name: "领取",
                        callback: function() {
                            window.location.href = "//m.tuandai.com/Member/UserPrize/Index.aspx";
                        }
                    },
                    hasRibbon: true,
                    prizeText: prizeValue + "元"
                });
                break;
            case 2:
            case 5:
            case 0:
                Util.alertPrize({
                    iconUrl: "../images/icon-weiwang.png",
                    contentText: "<p>恭喜你！获得<font style='color:#f93737;font-weight:bold;'>" + prizeValue + "威望</font></p>",
                    btn: {
                        name: "领取",
                        callback: function() {
                            window.location.href = "//bbs.tuandai.com/mobile/index.html#!/user";
                        }
                    },
                    hasRibbon: true,
                    prizeText: prizeValue
                });
                break;
        }
        pageEl.find(".lotbtn").removeClass("disable");
    }

    // 关闭弹窗
    dialogEl.on("click", ".icon-close, .close-btn, .mask", function() {
        onHideDialogs();
    })



    // 关闭弹窗
    var onHideDialogs = function() {
        $(".show").removeClass("show");
        enableScrolling();
    }



})();