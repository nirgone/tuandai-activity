(function() {
    FastClick.attach(document.body);
    //do your thing.
    window.onload = function(e) {
        $(".top").show();
    }
    var _indexs = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //抽奖奖品图标下标
    var _timeout = null;
    var _prizes = [{
        "title": "投资红包10元",
        "icon": "prize-redpack10",
    }, {
        "title": "卖座电影票2张",
        "icon": "prize-ticket",
    }, {
        "title": "指环支架",
        "icon": "qrcode",
    }, {
        "title": "优酷会员月卡",
        "icon": "prize-youku",
    }, {
        "title": "投资红包50元",
        "icon": "prize-redpack50",
    }, {
        "title": "青花瓷餐具套装",
        "icon": "qrcode",
    }, {
        "title": "投资红包20元",
        "icon": "prize-redpack20",
    }, {
        "title": "酒瓶伞",
        "icon": "qrcode",
    }, {
        "title": "车载空气净化器",
        "icon": "qrcode",
    }];
    //打开规则
    $("#rule_btn").on("click", function(e) {
        $("#rule").show();
    });
    //绑定遮罩和关闭按钮事件
    $("#rule .masker,.close-btn, .popup-close").on("click", function(e) {
        $(".popup").hide();
    });
    //点击抽奖按钮
    $("#lottery_btn").on("click", function(e) {
        //未抽过奖，已注册， 输入手机号码弹窗
        // showTelInput();
        // return;

        //未抽过奖，未注册， 注册弹窗
        showRegisterInput();
        return;

        //抽奖
        $(".item").removeClass("active");
        lottery.init({ id: 'lottery', speed: 120 });
        //settimeout 之后可以替换成ajax,ajax成功回调后，设置获取的奖品
        setTimeout(function(e) {
            lottery.stop(2, function(index) {
                // alert(index);
                prizePopup(index);
            }); //设置获取的奖品
        }, 2000);

    });
    // 获取短信验证码
    $("#get_msg_btn").on("click", function(e) {
        var $target = $(this);
        if ($target.hasClass("disabled")) {
            return;
        }
        $target.addClass("disabled");
        countdown(60);

        //todo 发送短信验证码请求

    });
    //绑定验证手机pop00 弹窗按钮
    $("#pop00_btn").on("click", function(e) {
        // warn("tel_warn", "请输入正确的手机号码");
    });

    //提示 id:提示dom的id; msg: 提示信息
    function warn(id, msg) {
        var $target = $("#" + id);
        $target.html(msg);
    }

    //隐藏提示
    function warnHide(id) {
        var $target = $("#" + id);
        $target.html('');
    }
    //1分钟倒数
    function countdown(num) {
        if (num < 1) {
            $("#get_msg_btn").removeClass("disabled");
            $("#get_msg_btn").html("再次获取");
            clearTimeout(_timeout);
            _timeout = null;
        } else {
            $("#get_msg_btn").html(num + "s");
            _timeout = setTimeout(function() {
                countdown(num - 1);
            }, 1000);
        }

    }
    //显示用户输入手机弹窗
    function showTelInput() {
        $(".popup").hide();
        $("#pop00").show();
    }

    //显示注册页面弹窗
    function showRegisterInput() {
        $(".popup").hide();
        $("#pop01").show();
    }

   //显示获奖 prize:奖品序号，status: 0--未抽过奖，中奖提示；1--抽过奖，未领取实物奖品 2--抽过奖，已领取奖品（虚拟和实物）
    function prizePopup(prize,status) {
        var _title = "";
        switch(status) {
            case 0: 
            _title = "哇！中奖啦！";
            break;
            case 1: 
            _title = "您已抽过奖！";
            break;
            case 2: 
            _title = "您领过奖啦！";
            break;
            default: 
            _title = "哇！中奖啦！";
            break;
        }
        switch (prize) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 6:
                popup({
                    "title": _title,
                    "type": 1,
                    "prizeIndex": prize,
                    "btntxt": "查看奖品",
                    callback: function() {
                        console.log("查看奖品");
                    }
                });
                break;
            default:
                popup({
                    "title": _title,
                    "type": 2,
                    "prizeIndex": prize,
                });
                break;
        }

    }
    //获取0-8中间的随机数
    function rd() {
        return Math.floor(Math.random() * 9);
    }

    /*抽奖*/
    var lottery = {
        config: {
            id: "",
            index: -1, //当前转动到哪个位置，起点位置
            count: 0, //总共有多少个位置
            speed: 20, //初始转动速度
            cycle: 18, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
        },
        times: 0, //转动次数
        timer: 0, //setTimeout的ID，用clearTimeout清除
        lotteryCallback: null,
        init: function(config) {
            this.config = $.extend(this.config, config || {});
            var _config = this.config;
            if ($("#" + _config.id).find(".item").length > 0) {
                $lottery = $("#" + _config.id);
                $units = $lottery.find(".item");
                _config.obj = $lottery;
                _config.count = $units.length;
                $lottery.find("#item" + this.index).addClass("active");
            };
            this.lottery(this);
        },
        roll: function(index) {
            var _config = this.config;
            var _index = _config.index;
            var count = _config.count;
            var lottery = _config.obj;
            $(lottery).find("#item" + _indexs[_index]).removeClass("active");
            if (!index) {
                var _index_rd = rd();
                if (_index_rd == _index) {
                    index = _index_rd + 1 > 9 ? 0 : _index_rd + 1;
                } else {
                    index = _index_rd;
                }
            }
            $(lottery).find("#item" + _indexs[index]).addClass("active");
            this.config.index = index;
            return false;
        },
        lottery: function(lo) {
            lo.times += 1;
            var _config = lo.config;
            if (_config.prize != -1 && lo.times > _config.cycle + 9) {
                clearTimeout(lo.timer);
                lo.roll(_config.prize);
                setTimeout(function() {
                    // showXsPresnet(lottery.prize);
                    if (lo.lotteryCallback) {
                        lo.lotteryCallback(_config.prize);
                        // console.log(_config.prize);
                    }
                    lo.config.prize = -1;
                    lo.config.times = 0;
                }, 500);
            } else {
                if (_config.prize != -1) {
                    if (lo.times > _config.cycle) {
                        lo.config.speed += 40;
                    } else {
                        lo.config.speed += 5;
                    }
                }
                lo.roll();
                lo.timer = setTimeout(function(e) {
                    lo.lottery(lo);
                }, _config.speed);
            }
        },
        clear: function(index) {
            $(this.obj).find(".active").removeClass("active");
        },
        stop: function(index, callback) {
            this.config.prize = index;
            this.lotteryCallback = callback;
        }
    };

    /* ==================弹出框==popup================= */
    /*
            options : {
                title: 弹窗框的title,
                type: 弹出框的种类  1: 虚拟奖品 2: 实物奖品
                prizeIndex: 奖品序号 
                btntxt:按钮文字
                callback: 按钮回调
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            "title": "",
            "type": 00,
            "prizeIndex": "",
            "btntxt": "",
            "callback": null
        };
        _options = $.extend(_options, options || {});
        var popup = $("<div/>").addClass("popup").addClass("prize-part").addClass("type" + _options.type),
            masker = $("<div/>").addClass("masker"),
            popup_content = $("<div/>").addClass("popup-content"),
            popup_title = $("<div/>").addClass("popup-title").html(_options.title),
            popup_body = $("<div/>").addClass("popup-body"),
            popup_close = $("<div/>").addClass("popup-close"),
            popup_btn = null;

        popup_content.append(popup_title);
        var _prize = _prizes[_options.prizeIndex];
        if (_options.type == 1) {
            popup_body.append('<div class="prize-bg"><p class="prize-title">' + _prize.title + '</p><i class="' + _prize.icon + '"></i></div>');
            popup_btn = $("<div/>").addClass("popup-btn").attr("data-value", _options.btntxt);
            popup_body.append(popup_btn)
        } else if (_options.type == 2) {
            popup_body.append('<p class="prize-title">' + _prize.title + '</p><img src="../images/' + _prize.icon + '.png" class="qrcode" alt="二维码"><p class="info">请向现场工作人员出示该二维码以验证兑奖 二维码一经验证立即失效，请妥善保管</p>');
        }
        popup_content.append(popup_body);
        popup_content.append(popup_close);
        popup.append(masker).append(popup_content);

        $("body").append(popup);
        if (popup_btn) {
            popup_btn.on("click", function(e) {
                var $target = $(e.currentTarget),
                    _callback = _options.callback
                if (_callback) {
                    _callback();
                    hide(popup);
                }
            });
        }

        popup_close.on("click", function(e) {
            hide(popup);
        });

        function hide(target) {
            target.remove();
            // enableScrolling();
        }
    }


})();
