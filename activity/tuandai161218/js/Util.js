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
            "closeCallback": null,
            "hasAnimation": false
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
            popup_content.addClass(_options.icon + "-content");
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
        if (_options.hasAnimation) {
            popup_wrapper.addClass("zoomIn");
        }
        if (_options.popupClass) {
            popup.addClass(_options.popupClass)
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
        $(".scroll").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".scroll").removeClass("scroll-active");
    }
    var onShowShare = function() {
        var IsInApp = false;    //TODO：需要后台加此参数
        if (IsInApp == true) {
            MobileRedirector.go_share(5);
        } else if (Util.isWeiXin()) { //微信
            onShowShareWeiXin();
        } else { //浏览器分享
            onShowBrowserShare();
        }
    }
    var onShowShareWeiXin = function() { //显示微信分享
        if($("body").find(".sharecont").length == 0) {
            $("body").append('<div class="sharecont"><div class="smask"><i class="icon-share"></i></div><div class="share-popup"><div class="stxt"><b></b>分享到<b></b></div><div class="iconcont social-share" data-initialized="true" id="sociShare"><div><a class="social-share-icon icon-weibo" ><i class="icon-sina"></i></a><span>新浪微博</span></div><div><a class="social-share-icon icon-qq" ><i class="icon-tenc"></i></a><span>QQ</span></div><div><a class="social-share-icon icon-qzone"><i class="icon-zone"></i></a><span>QQ空间</span></div></div><div class="cancle-share social-share-icon"><i class="icon-close"></i></div></div></div>')
        }
        var sharecontEl = $(".sharecont");
        sharecontEl.find(".share-popup").hide();
        sharecontEl.find(".smask").show();
        sharecontEl.show();
        $(".scroll").removeClass("scroll-active");
    }

    var onShowBrowserShare = function() { //显示浏览器分享
        if($("body").find(".sharecont").length == 0) {
            $("body").append('<div class="sharecont"><div class="smask"><i class="icon-share"></i></div><div class="share-popup"><div class="stxt"><b></b>分享到<b></b></div><div class="iconcont social-share" data-initialized="true" id="sociShare"><div><a class="social-share-icon icon-weibo" ><i class="icon-sina"></i></a><span>新浪微博</span></div><div><a class="social-share-icon icon-qq" ><i class="icon-tenc"></i></a><span>QQ</span></div><div><a class="social-share-icon icon-qzone"><i class="icon-zone"></i></a><span>QQ空间</span></div></div><div class="cancle-share social-share-icon"><i class="icon-close"></i></div></div></div>')
        }
        var sharecontEl = $(".sharecont");
        sharecontEl.find(".smask").hide();
        sharecontEl.find(".share-popup").show();
        sharecontEl.show();
        $(".scroll").removeClass("scroll-active");
    }

    var initShare = function(shareData) { //初始化分享配置
         var IsInApp = false;    //TODO：需要后台加此参数
        if (!IsInApp) {
            var config = {
                url: "Globals.ActivityWebsiteUrl" + "/weixin/20161218YR/index.aspx",
                source: "Globals.ActivityWebsiteUrl" + "/weixin/20161218YR/index.aspx",
                title: "#1218网贷爱心日#领军互金平台团贷网全场加息！年度最壕，最高年化可加2%！",
                description: "#1218网贷爱心日#领军互金平台团贷网全场加息！年度最壕，最高年化可加2%！",
                image: "images/logo.png",
                sites: ['qzone', 'qq', 'weibo'], // 启用的站点

            };
            socialShare && socialShare("#sociShare", config);
        }
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
        // alertJiaxi: function(percent, closeCallback) {
        //     popup({
        //         "icon": "pop0",
        //         "content": '<p>恭喜您获得加息特权</p><p class="percent">' + percent + '</p>',
        //         "closeCallback": closeCallback
        //     });
        // },
        // 获奖提示 {}
        alertPrize: function(options) {
            this.alert(0, options.content, options.btn, options.closeCallback, options.hasAnimation, options.popupClass);
        },

        alertCommon: function(options) {
            this.alert(1, options.content, options.btn, options.closeCallback, options.hasAnimation, options.popupClass);
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
        alert: function(type, content, btn, closeCallback, hasAnimation, popupClass) {
            popup({
                "icon": "pop" + type,
                "content": content,
                "btn": btn,
                "closeCallback": closeCallback,
                "hasAnimation": hasAnimation,
                "popupClass": popupClass
            });
        },
        showLoader: function(msg) {
            msg = msg ? msg : '';
            var loader = $("<div/>").addClass("loader").html(msg);
            $("body").append(loader);
        },
        hideLoader: function() {
            $(".loader").remove();
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
        // 分享按钮
        bindShare: function() {
            initShare();
            $(".btn-share").on("click", function() {
                onShowShare();
            });
            // 隐藏分享
            $("body").on("click", ".cancle-share, .smask", function() {
                $(".sharecont").remove();
                $(".scroll").addClass("scroll-active");
            })
        }
    }

    window.Util = util;
})();