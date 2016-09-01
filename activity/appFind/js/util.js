(function($, win) {
    var Util = {
        baseUrl: "http://10.100.1.113:9005//ajaxCross/ajax_AppFind.ashx",
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
        },
        getDate: function(dates) {
            var dd = new Date();
            dd.setDate(dd.getDate() + dates);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 >= 10 ? dd.getMonth() + 1 : '0' + (dd.getMonth() + 1);
            var d = dd.getDate() >= 10 ? dd.getDate() : '0' + dd.getDate();

            return y + "-" + m + "-" + d;
        },
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        dateFormat: function(date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        ajax: function(params) {
            var me = this;
            params.timeout = params.timeout || 20 * 1000; //设置默认超时时间

            var _preSuccessFunc = params.success;
            var _preErrorFunc = params.error;
            var _preCompeteFunc = params.complete;
            var _preBeforeSend = params.beforeSend;

            params.beforeSend = function() {
                if (_preBeforeSend && typeof _preBeforeSend === "function") {
                    _preBeforeSend.apply(this, arguments);
                }
                if (params.hideLoading) { //不加载loading
                    return;
                }
                // loading图标
                var loadingEl = $(".icon-loader");
                if (loadingEl.length == 0) {
                    $("body").append($('<div class="icon-loader"><i class="icon-loading"></i></div>'));
                }
                loadingEl.show();
            };

            params.success = function(data) {
                // loading图标
                if (!params.hideLoading) { //加载loading
                    $(".icon-loader").hide();
                }
                if (_preSuccessFunc && typeof _preSuccessFunc === "function") {
                    _preSuccessFunc.apply(this, arguments);
                }
            };

            params.error = function(events, statusText) {
                // loading图标
                if (!params.hideLoading) { //加载loading
                    $(".icon-loader").hide();
                }

                if (_preErrorFunc && typeof _preErrorFunc === "function") {
                    _preErrorFunc.apply(this, arguments);
                }
                if (!params.alertError) {
                    return;
                }
                var _path = path ? path : "";
                var error_msg = "系统异常:" + statusText;
                alert(error_msg);
                window.location.href = _path + "/index.shtml";

            };

            params.complete = function(request, status) {
                switch (status) {
                    case 'timeout':
                        console.error('api请求超时.');
                        break;
                }
                if (_preCompeteFunc && typeof _preCompeteFunc === "function") {
                    _preCompeteFunc.apply(this, arguments);
                }
                // if (params.hideLoading) { //不加载loading
                //     return;
                // }
                // // loading图标
                // $(".icon-loader").hide();

            };

            $.ajax(params);
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

        /*
        option= {
            t: loginToken,
            s: 登录状态,
            url: 后台登录接口
        }
        */

        checkLogin: function(option) {
            var me = this;
            /*if (!url) {
                url = "http://10.100.11.110:9006/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址
            }
            if (!t && !s) {
                t = me.getParam('t');
                s = me.getParam('s');
            }*/
            var _opt = {
                t: me.getParam('t'),
                s: me.getParam('s'),
                url: "http://10.100.11.110:9006/ajaxCross/Login.ashx?Action=UserLogin"
            }
            _opt = $.extend(_opt, option || {});
            console.info("checkLogin-------t-", _opt.t, '--s--', _opt.s);
            if (Jsbridge.isNewVersion()) {
                if (_opt.s) {

                    //最新4.3.6app登录
                    if (_opt.s == 1) {
                        //app已登录并获取到loginToken
                        var params = {
                            "Data": {
                                "LoginToken": _opt.t
                            }
                        };
                        params = JSON.stringify(params);
                        Jsbridge.actLogin(_opt.url, params, function(result) {
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

                    } else if (_opt.s == 2) {
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
                                Jsbridge.actLogin(_opt.url, data, function(result) {
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
                // window.location.href = "ToAppLogin";
            } else {
                //非app端登录
                if (!mobileUrl) {
                    mobileUrl = "https://m.tuandai.com";
                }
                window.location.href = mobileUrl + "/user/Login.aspx?ReturnUrl=" + window.location.href;

            }
        },



    }
    win.Util = Util;
    // return Util;

})(jQuery, window);