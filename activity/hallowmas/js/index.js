(function() {
    var _type = request("type");

    //修改背景
    $("#result_content")[0].style.backgroundImage = "url(" + getBg(_type) + ")";

    //拉起输入碳层
    $("#to_input").click(function(e) {
        $("#input_popup").removeClass("slideOutDown").addClass("slideInUp");
        $("#input_popup").show();
        setTimeout(function() {
            $("#tel_no").focus();
        }, 500);
    });

    $("#input_popup").on("click", ".icon-close", function(e) {
        $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
    });

    //拉起注册碳层
    function showRegister() {
        $("#register").removeClass("slideOutDown").addClass("slideInUp");
        $("#register").show();
    }
    //关闭注册弹层
    $("#register").on("click", ".register-close", function(e) {
        $("#register").removeClass("slideInUp").addClass("slideOutDown");
    });
    //关闭分享弹窗
    $("#share_popup").on("click", function(e) {
        $(this).hide();
    });

    //弹出窗确定按钮
    $("#btn_confirm").on("click", function(e) {
        var _tel = $("#tel_no").val().trim();
        var _reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
        if (_reg.test(_tel)) {
            hidetip();
            $("#to_input").html(_tel);
            $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
        } else {
            tip("请输入正确的手机号码");
        }
    });
    //拆开奖品按钮
    $("#btn_open").on("click", function(e) {
        var _tel = $("#to_input").html().trim();
        var _reg1 = new RegExp("^[0-9]*$","i");
        var _reg2 = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
        if(!_reg1.test(_tel)) {
            inputTip("手机号不能为空");
            return;
        }
        if(!_reg2.test(_tel)) {
            inputTip("请输入正确的手机号");
            return;
        }
        //todo ajax请求验证手机号码是否已经注册，


        // 显示结果
        $("#ani_gift").show();
        setTimeout(function() {
            $("#ani_gift").hide();
            // 红包
            showGift(0,88);
            // 团币
            // showGift(1, 88);
        }, 960);
    });

    // 输入弹窗 号码验证提示
    function tip(msg) {
        $(".tip").addClass("active").html(msg);
        inputTipHide();
    }

    //输入弹窗 号码验证提示收起
    function hidetip() {
        $(".tip").removeClass("active").html('');
    }

    
    //号码验证提示
    function inputTip(msg) {
        $("#to_input").addClass("warn").html(msg);
    }
    //号码验证提示收起
    function inputTipHide() {
        $("#to_input").removeClass("warn");
    }

    //奖品弹窗 type:奖品类型 0--红包 1--团币  value: 数值（红包数值或者团币数值)
    function showGift(type, value) {
        var _btns = null;
        if (type == 0) {
            _btns = [{
                "text": "马上领取",
                callback: function(e) {
                    // console.log("马上领取")
                    showRegister();
                }
            }]
        } else {
            _btns = [{
                text: "登录查看",
                callback: function(e) {
                    console.log("登录查看")
                }
            }, {
                text: "邀请好友",
                callback: function(e) {
                    $("#share_popup").show();
                }
            }]
        }

        popup({
            "type": type,
            "value": value,
            "btns": _btns
        });

    }
    //获取背景
    function getBg(type) {
        var _bg = "../images/bg";
        switch (type) {
            case "1":
                _bg += "3.jpg";
                break;
            case "2":
                _bg += "4.jpg";
                break;
            case "3":
                _bg += "5.jpg";
                break;
        }
        return _bg;
    }
    //获取参数
    function request(paras) {
        var url = decodeURI(location.href);
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var returnValue;
        for (var i = 0; i < paraString.length; i++) {
            var tempParas = paraString[i].split('=')[0];
            var parasValue = paraString[i].split('=')[1];
            if (tempParas === paras)
                returnValue = parasValue;
        }

        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }

    /* ==================弹出框==popup================= */
    /*
            options : {
                type:奖品类型 0--红包 1--团币
                value: 数值（红包数值或者团币数值)
                btns:[{
                    text: 按钮文字，
                    callback: function() {} 回调
                },{
                    text: 按钮文字，
                    callback: function() {} 回调
                }]
            }
        */
    function popup(options) {
        //对应的人物 1:小派 2: 大唐 3: 鬼怪
        var _options = {
            "type": 0,
            "value": 10,
            "btns": [{
                "text": "",
                callback: function() {}
            }]
        };
        _options = $.extend(_options, options || {});
        var popup_wrapper = $("<div/>").addClass("popup-wrapper").addClass("gift-wrapper"),
            masker = $("<div/>").addClass("masker"),
            popup = $("<div/>").addClass("popup"),
            pop_icon = $("<i/>").addClass("icon-pop" + _type),
            frame = $("<div/>").addClass("frame"),
            icon = $("<i/>"),
            p = $("<p/>"),
            btn_group = $("<div/>").addClass("btn-group"),
            _btns = '';

        if (_options.type == 0) {
            icon.addClass("icon-redpack").html(_options.value);
            p.html("奖励现金红包");
            frame.append(icon).append(p);
        } else {
            icon.addClass("icon-coin");
            p.html("奖励团币" + _options.value);
            frame.append(icon).append(p).append('<span>请登录【个人账户-我的会员】查看</span>');
        }
        for (var i = 0; i < _options.btns.length; i++) {
            _btns += '<div class="btn-blue">' + _options.btns[i].text + '</div>';
        }
        btn_group.html(_btns);
        // frame.append(icon).append(p);
        popup.append(pop_icon).append(frame).append(btn_group);
        popup_wrapper.append(masker).append(popup);
        $("body").append(popup_wrapper);
        // disableScrolling();

        popup_wrapper.on("click", ".btn-blue", function(e) {
            var $target = $(e.currentTarget),
                _index = $target.index(),
                _callback = _options.btns[_index].callback
            if (_callback) {
                _callback();
                hide(popup_wrapper);
            }
        });

        function hide(target) {
            target.remove();
            // enableScrolling();
        }
    }
    //冒泡提示
    function toast(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        $(m).addClass("toast-content");
        m.innerHTML = msg;
        m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.5;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; top:48%; left:20%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:10px;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() {
                if ($(".toast-content").size() > 0) {
                    document.body.removeChild(m);
                }
            }, d * 1000);
        }, duration);
    };

    // ---------注册部分－－－－－－－－－－
    //设置密码
    likePlaceHolder();

    function likePlaceHolder() {
        var txtPassword = document.getElementById('setPassword').getElementsByTagName('input')[0];
        var $txtPassword = $("#setPassword").find('input');
        var placeholder = $("#likePlaceholder");
        placeholder.click(function() {
            if (txtPassword.value == '') {
                $txtPassword.focus();
            }
        });
        $txtPassword.blur(function() {
            if ($(this).val() == '') {
                placeholder.show();
            }
        });
        txtPassword.oninput = function() {
            if (this.value.length == 0) {
                placeholder.show();
            } else {
                placeholder.hide();
            }
        }

        $("#btnSee").click(function() {
            var eye = $(this).find('b');
            if ($txtPassword.attr('type') == 'password') {
                eye.removeClass('eye-close').addClass('eye-open');
                $txtPassword[0].type = 'text';
            } else {
                eye.removeClass('eye-open').addClass('eye-close');
                $txtPassword[0].type = 'password';
            }
        });
    }

    //圆形进度条
    var second = 181;
    var angle = 0;
    var timer;
    $("#getCode").click(function() {
        $(this).hide();
        $("#timeWrap").show();
        getTime();
        timer = setInterval(function() {
            getTime();
        }, 1000)
    })

    function getTime() {
        second -= 1;
        angle += 2;
        var rightcircle = document.getElementById('rightcircle');
        var leftcircle = document.getElementById('leftcircle');
        var show = document.getElementById('show');
        show.innerHTML = second;
        if (angle > 180) {
            rightcircle.style.cssText = "transform: rotate(" + (45 - (angle - 180)) + "deg)";
            leftcircle.style.cssText = "transform: rotate(-135deg)";
            if (second <= 0) {
                clearInterval(timer);
                $("#timeWrap").hide();
                $("#getCode").show();
            }
        } else {
            rightcircle.style.cssText = "transform: rotate(45deg)";
            leftcircle.style.cssText = "transform: rotate(" + (45 - angle) + "deg)";
        }
    }

    //显示隐藏邀请人手机号码输入框
    $("#invite").click(function() {
        var inp = $("#invite_inp");
        var $this = $(this);
        if (inp.hasClass('hide')) {
            $this.find('i').removeClass('triangle-r').addClass('triangle-d');
            inp.removeClass('hide');
        } else {
            $this.find('i').removeClass('triangle-d').addClass('triangle-r');
            inp.addClass('hide');
        }
    });

    // -----------end-----------

})();
