(function($, win) {
    var Util = {
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
            m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.7;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
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

        checkLogin: function(t, s, url) {
            var me = this;
            if (!url) {
                url = "http://10.100.11.110:9006/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址
            }
            if(!t && !s) {
                t = me.getParam('t');
                s = me.getParam('s');
            }
            console.info("checkLogin-------t-", t, '--s--', s);
            console.info("navigator-------", navigator.userAgent);
            if (Jsbridge.isNewVersion()) {
                if (s) {

                    //最新4.3.6app登录
                    if (s == 1) {
                        //app已登录并获取到loginToken
                        var params = {
                            "Data": {
                                "LoginToken": t
                            }
                        };
                        params = JSON.stringify(params);
                        Jsbridge.actLogin(url, params, function(result) {
                            if (result.Status == 1) {
                                return true;
                                // window.location.reload();
                            } else if (result.Status == -1) {
                                //登录失败，loginToken不存在
                                /*if (confirm("登陆失效，需要重新登陆吗？")) {
                                    Jsbridge.toAppLogin();
                                }*/
                                return false;
                            } else {
                                return false;
                            }
                        }, function(e) {
                            console.info("login---error--", e);
                        });

                    } else if (s == 2) {
                        //app已登录，但是未获取到loginToken
                        this.toast("无法获取登录凭证！");
                        return false;
                    } else {
                        //app未登录
                        return false;
                    }
                } else {
                    Jsbridge.appLifeHook(null, function(data) {
                        console.info("lifehook----data-----", data);
                        if (data) {
                            data = JSON.parse(data);
                            /*data = JSON.parse(data);
                            var returncode = data.ReturnCode;
                            data = data.Data
                            var v_token = data.LoginToken;*/


                            //returncode == 1调用登陆接口
                            if (data.ReturnCode == '1') {
                                Jsbridge.actLogin(url, data, function(result) {
                                    console.info("login----", result);
                                    if (result.Status == 1) {
                                        return true;
                                        // window.location.reload();
                                    } else if (result.Status == -1) {
                                        //登录失败，loginToken不存在
                                        return false;
                                        /*if (confirm("登陆失效，需要重新登陆吗？")) {
                                            Jsbridge.toAppLogin();
                                        }*/
                                    } else {
                                        return false;
                                    }
                                }, function(e) {
                                    console.info("login---error--", e);
                                });
                            } else {
                                var message = data.ReturnMessage;
                                // returncode为4表示用户未登录
                                if (returncode != 4) {
                                    this.toast(message);
                                }
                                return false;


                            }
                        } else {
                            console.info('原生没有返回任何数据');
                            return false;
                        }

                    }, null, null, null);
                }
            }
        },
        openLogin: function(isAppOpen, mobileUrl) {
            if (Jsbridge.isNewVersion()) {
                if (Jsbridge.isDisable()) {
                    this.toast('app版本太低，请更新到最新版本');
                    return;
                }
                Jsbridge.toAppLogin();
            } else if (isAppOpen) {
                //旧版本app登录
                window.location.href = "ToAppLogin";
            } else {
                //非app端登录
                if (!mobileUrl) {
                    mobileUrl = "https://m.tuandai.com";
                }
                window.location.href = mobileUrl + "/user/Login.aspx?ReturnUrl=" + window.location.href;

            }
        },
        // ===============禁止滑动================
        preventDefault: function(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        },
        scrolling: function(e) {
            // var that = this;
            // that.preventDefault(e);
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        },
        disableScrolling: function() {
            var that = this;
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', that.scrolling, false);
                window.addEventListener('touchmove', that.scrolling, false);
                // window.onmousewheel = document.onmousewheel = scrolling;
            }
        },
        enableScrolling: function() {
            var that = this;
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', that.scrolling, false);
                window.removeEventListener('touchmove', that.scrolling, false);
            }
            // window.onmousewheel = document.onmousewheel = null;
        }


    }
    win.Util = Util;
    // return Util;

})(window.Zepto || window.jQuery, window);