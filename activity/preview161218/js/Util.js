(function() {
    FastClick.attach(document.body);

    function init() {
        $("body").on('click', '.footer>a', function() {
            var type = $(this).attr('data-type');
            var option = Util.getParam('option');
            // console.info('option---', option);
            if ($(this).hasClass('active')) {
                return;
            } else {
                switch (+type) {
                    case 0:
                        location.href = "./privilege.html?option=" + option;
                        break;
                    case 1:
                        location.href = "./share.html?option=" + option;
                        break;
                    case 2:
                        location.href = "./presale.html?option=" + option;
                        break;
                    case 3:
                        location.href = "./expect.html?option=" + option;
                        break;
                }
            }
        });
    }
    init();



    //兑换


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
            "title": "",
            "icon": "",
            "content": "",
            "btn": null,
            "closeCallback": null
        };
        _options = $.extend(_options, options || {});
        var popup = $("<div/>").addClass("popup");
        masker = $("<div/>").addClass("masker"),
            popup_wrapper = $("<div/>").addClass("popup-wrapper"),
            popup_header = $("<div/>").addClass("popup-header").attr("data-title", _options.title),
            popup_close = $("<div/>").addClass("popup-close").html('<i class="close"></i>'),
            popup_content = $("<div/>").addClass("popup-content").html(_options.content);



        if (_options.icon) {
            var i = $("<i/>").addClass("icon").addClass("icon-" + _options.icon);
            popup_header.append(i);
            popup.addClass("popup-icon");
        }
        popup_header.append(popup_close);
        if (_options.btn) {
            var btn = $("<div/>").addClass("btn-orange").html(_options.btn.name);

            popup_content.append(btn);
            btn.on("click", function(e) {
                var _callback = _options.btn.callback;
                if (_callback) {
                    _callback();
                }
                hide(popup);
            });
        }
        popup_wrapper.append(popup_header).append(popup_content);
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
            target.remove();
            enableScrolling();
        }
    }

    function enableScrolling() {
        $(".scroll").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".scroll").removeClass("scroll-active");
    }


    var util = {
        //普通带title带文字内容弹窗，content--html片段， closeCallback--关闭回调
        message: function(title, content, closeCallback) {
            popup({
                title: title,
                "content": content,
                "closeCallback": closeCallback
            });
        },
        //加息提示弹窗，percent--加息百分比
        alertJiaxi: function(percent, closeCallback) {
            popup({
                "icon": "pop0",
                "content": '<p>恭喜您获得加息特权</p><p class="percent">' + percent + '</p>',
                "closeCallback": closeCallback
            });
        },

        //带icon和按钮的弹窗
        // option: {
        //     type:  取值[1, 2]--icon类型
        //     content: html片段
        //     btn : {
        //         name: 按钮名字
        //         callback: 按钮回调
        //     },
        //     closeCallback: 关闭回调
        // }
        alertCommon: function(option) {
            popup({
                "icon": "pop" + option.type,
                "content": option.content,
                "btn": option.btn,
                "closeCallback": option.closeCallback
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
        isIOS: function() {
            var flag = false;
            if (navigator.userAgent.match(/(iPad|iPhone)/)) {
                flag = true;
            } else if (navigator.userAgent.match(/(Android)/)) {
                flag = false;
            }
            return flag;
        },
        isWeiXin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
    }

    window.Util = util;
})();