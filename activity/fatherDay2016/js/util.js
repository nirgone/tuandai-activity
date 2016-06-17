(function($, win) {
    var Util = {

        // 阻止冒泡事件。
        stopBubble: function(el) {
            if (el && el.stopPropagation) {
                //因此它支持W3C的stopPropation()方法
                el.stopPropagation();
            } else {
                //否则,我们得使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
        },

        isWeiXin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        getParam: function(name, url) {
            if (!url) {
                url = location.href;
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
        //冒泡提示
        toast: function(msg, duration) {
            duration = isNaN(duration) ? 2000 : duration;
            var m = document.createElement('div');
            $(m).addClass("toast-content");
            m.innerHTML = msg;
            m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.5;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
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
        },
        popup: function(title, msg, hasClose, btnTxt, btnCallback) {
            var closeTemp = "";
            var maskTemp = "";
            if (hasClose) {
                closeTemp = '<i class="icon-close-white"></i>';
            }
            if ($(".mask").length < 1) {
                maskTemp = '<div class="mask masker"></div>';
            }

            if ($(".popup").length > 0) {
                $(".ptitle").html(title);
                $(".popdetcont").html(msg);
                $(".pop-btn").html(btnTxt);
                if (hasClose) {
                    $(".icon-close-white").show();
                } else {
                    $(".icon-close-white").hide();
                }
            } else {
                var temp = maskTemp + '<div class="popup">' + closeTemp + '<span class="ptitle">' + title +
                    '</span><section class="popdetcont">' + msg + '</section><div class="pop-btn">' + btnTxt + '</div></div>';
                $("body").append(temp);
                $("body").on('click', ".mask, .icon-close-white", function() {
                    $(".mask").hide();
                    $(".popup").hide();
                    $(".weixin-share").hide();
                });
            }
            $(".mask").show();
            $(".popup").show();
            $("body").off('click', '.pop-btn').on('click', '.pop-btn', function() {
                $(".mask").hide();
                $(".popup").hide();
                if (btnCallback && typeof btnCallback == "function") {
                    btnCallback.apply(this, arguments);
                }
            });


        }


    }
    win.Util = Util;
    // return Util;

})(jQuery, window);