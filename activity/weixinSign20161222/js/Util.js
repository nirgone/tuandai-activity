(function() {

    /* ==================弹出框==popup================= */
    /*
            options : {
                title: 弹窗框的title,
                icon: 弹窗的图标
                content: 内容
                btns: [{
                    name: 按钮名称
                    callback: function() {}
                }]
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            "icon": "",
            "content": "",
            "btn": null,
            "closeCallback": null
        };
        $(".popup").remove(); //删除已有弹窗
        _options = $.extend(_options, options || {});
        var popup = $("<div/>").addClass("popup");
        var masker = $("<div/>").addClass("masker");
        var popup_wrapper = $("<div/>").addClass("popup-wrapper");
        var popup_close = $("<div/>").addClass("popup-close").html('<i class="close"></i>');
        var popup_content = $("<div/>").addClass("popup-content");
        var popup_icon = $("<div/>").addClass("popup-icon");
        var popup_icon_ribbon = null;
        if (_options.hasRibbon) {
            popup_icon_ribbon = $("<div/>").addClass("popup-icon-ribbon");
        }
        popup_content.append(popup_icon_ribbon).append(popup_icon).append(_options.content);
        popup_icon.css({
            "background-image": "url(" + _options.icon.url + ")",
            "width": _options.icon.width,
            "height": _options.icon.height
        });
        if (_options.prizeText) {
            popup_icon.text(_options.prizeText);
        }

        if (_options.btn) {
            var btn = $("<div/>").addClass("btn-yellow").html(_options.btn.name);

            popup_content.append(btn);
            btn.on("click", function(e) {
                var _callback = _options.btn.callback;
                if (_callback) {
                    _callback();
                }
                hide(popup);
            });
        }

        if (_options.popupClass) {
            popup.addClass(_options.popupClass)
        }
        popup_wrapper.append(popup_close).append(popup_content);
        popup.append(masker).append(popup_wrapper);
        $("body").append(popup);
        disableScrolling();


        popup_close.on("click", function(e) {
            var _closefun = _options.closeCallback;
            if (_closefun) {
                _closefun();
            }
            hide(popup);
        });
        masker.on("click", function(e) {
            var _closefun = _options.closeCallback;
            if (_closefun) {
                _closefun();
            }
            hide(popup);
        });

        function hide(target) {
            if (_options.hasAnimation) {
                popup_wrapper.addClass("zoomOut");
                setTimeout(function() {
                    target.remove();
                    enableScrolling();
                }, 300);
            } else {
                target.remove();
                enableScrolling();
            }

        }
    }

    function enableScrolling() {
        $(".page").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".page").removeClass("scroll-active");
    }

    var util = {
        basePath: "//bbs2.tuandai.com",
        enableScrolling: enableScrolling,

        disableScrolling: disableScrolling,

        alertServeError: function() {
            this.alert({
                url: "../images/icon-error.png",
                width: "6.6133333333rem",
                height: "4.3946666667rem"
            }, "<p>服务器闹情绪了，稍后再试试呗~</p>", {
                name: "关了吧"
            });
        },

        alertPrize: function(options) {
            var _options = options || {};
            this.alert({
                "url": _options.iconUrl,
                "width": "6.784rem",
                "height": "4.9493333333rem"
            }, _options.contentText, {
                "name": _options.btn && _options.btn.name,
                "callback": _options.btn && _options.btn.callback,
            }, _options.hasRibbon, _options.prizeText);
        },


        //带icon和按钮的弹窗
        // option: {
        //     icon:  {
        // iconUrl: 图片路径
        // width: 宽度,
        // height: 高度
        // }
        //     content: html片段
        //     btn : {
        //         name: 按钮名字
        //         callback: 按钮回调
        //     },
        //     closeCallback: 关闭回调
        // }
        alert: function(icon, content, btn, hasRibbon, prizeText, closeCallback) {
            popup({
                "icon": icon,
                "content": content,
                "btn": btn,
                "closeCallback": closeCallback,
                "hasRibbon": hasRibbon,
                "prizeText": prizeText
            });
        },

        getParam: function(name, url) {
            if (!url) {
                url = decodeURIComponent(location.href);
            }
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var returnValue;
            for (var i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];
                if (tempParas === name)
                    returnValue = parasValue;
            }

            if (!returnValue) {
                return "";
            } else {
                if (returnValue.indexOf("#") != -1) {
                    returnValue = returnValue.split("#")[0];
                }
                return returnValue;
            }
        },
        bbsInit: function(cb) { //初始化，判断是否登录之后的初始化
             return;
            var isLogined = this.isLogined();
            if (isLogined) {
                typeof cb === "function" && cb.call(this);
            } else {
                var isTuandaiLogined = this.isTuandaiLogined();
                //判断是否已登录
                if (!isTuandaiLogined) {
                    var returnUrl = window.location.href;
                    returnUrl = encodeURIComponent(returnUrl);
                    window.location.href = "//m.tuandai.com/user/Login.aspx?tdfrom=tuanfenquan-p1611-01&ReturnUrl=" + returnUrl;
                } else {
                    this.bbsWebLogin(cb);
                }

            }
        },
        isLogined: function() { //判断是否已经登录团粉圈
            // var isLogined = this.getCookie('voHF_b718_auth');
            var isLogined = this.getCookie('voHF_2132_auth');
            return !!isLogined;
        },

        isTuandaiLogined: function() { //判断是否已经登录团贷网
            var isTuandaiLogined = this.getCookie('tuandaiw');
            return !!isTuandaiLogined;
        },

        bbsWebLogin: function(success, error) { //通过团贷网登录团粉圈
            return;
            var me = this;
            var tuandaiCookie = me.getCookie('tuandaiw');
            if (!tuandaiCookie) { //如果没有已经登录团贷网
                var returnUrl = window.location.href;
                returnUrl = encodeURIComponent(returnUrl);
                window.location.href = "//m.tuandai.com/user/Login.aspx?tdfrom=tuanfenquan-p1611-01&ReturnUrl=" + returnUrl;
                return;
            }
            $.ajax({
                url: me.basePath + "/app/index.php",
                type: 'post',
                dataType: 'json',
                timeout: 60000,
                data: {
                    version: 4,
                    module: "member",
                    action: 'login',
                    tuandaiwang_cookie: tuandaiCookie,
                },
                beforeSend: function() {
                    $(".loading").show(); // 显示loading图标
                },
                success: function(v_data) {
                    if (v_data.code == "200") {
                        typeof success === "function" && success.call(this, v_data);
                    } else {
                        $(".loading").hide();
                        me.alertServeError(); //服务器错误
                    }
                },
                error: function(e) {
                    // 错误时隐藏loading图标，成功留给callback隐藏
                    $(".loading").hide();
                    me.alertServeError(); //服务器错误
                }
            });
        },
        isWeiXin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        getCookie: function(name) {
            var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        //冒泡提示
        toast: function(msg, duration) {
            duration = isNaN(duration) ? 1000 : duration;
            var m = document.createElement('div');
            $(m).addClass("toast-content");
            m.innerHTML = msg;
            m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.6;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
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
        }

    }

    window.Util = util;
})();