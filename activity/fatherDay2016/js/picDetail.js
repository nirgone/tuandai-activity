(function() {
    FastClick.attach(document.body);
    var isLogin = true;

    //点赞赚团币
    $(".zancont").on('click', function() {
        if (!isLogin) {
            Jsbridge.toAppLogin();
            return;
        }
        var type = 2;
        if (type == 0) {
            //重复点赞
            Util.popup('抱歉', '爱心赞数量有限</br>每天只能为同一作品送出1次哦！', true, '给其他作品点赞', function() {
                //按钮事件
                window.location.href = "./photoList.html?t=" + t + "&s=" + s;
            });
        } else if (type == 1) {
            //赞已送完
            Util.popup('抱歉', '您今天的爱心赞已送完</br>明天再继续支持吧！', false, '确定', function() {});
        } else {
            //点赞成功
            $(".icon-zan").removeClass('zan-hollow').addClass('zan-solid');
            Util.popup('恭喜您', '成功送出爱心赞1枚，并获得<font class="fbold">50</font>团币嘉奖</br>详情请登录会员体系查看！', false, '确定', function() {});

        }
    });

    //我也要炫父
    $("#xf").on('click', function() {
        window.location.href = "./upload.html";
    });
    //活动首页
    $("#goMain").on('click', function() {
        window.location.href = "./index.html";
    });
    //分享 
    $(".icon-share").on('click', function() {
        if (Util.isWeiXin()) {
            //微信分享
            $(".mask").show();
            $(".weixin-share").show();
        } else if (Jsbridge.isNewVersion()) {
            //新版分app分享
            Jsbridge.toActivityAppInviteFriend();
        } else {
            //旧版本app分享

        }
    });
    $(".mask").on('click', function() {
        $(".mask").hide();
        $(".weixin-share").hide();
    });
    //登录验证
    var t = Util.getParam('t'); //loginToken
    var s = Util.getParam('s'); //根据s判断是否获取到loginToken， s为0表示未登录
    if (!isLogin) {
        if (Jsbridge.isNewVersion()) {
            // var t = Util.getParam('t');
            // var s = Util.getParam('s');
            //'http://121.13.249.210:9006//weixin/Yuanxiao20160218/ajax/ajax.ashx?Action=AjaxLogin'
            var url = "http://121.13.249.210:9006/ajaxCross/Login.ashx?Action=UserLogin"; //106测试地址
            // var url = "http://hd.tuandai.com/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址
            if (s) {
                //最新4.3.6app登录
                if (s == 1) {
                    //app已登录并获取到loginToken
                    Jsbridge.actLogin(url, t, function(data) {
                        console.info("login-------data--", data);
                        if (data && data.ReturnCode == "200") {
                            //登录成功
                            isLogin = true;
                        }
                    }, function(e) {
                        console.info("login---error--", e);
                    });

                } else if (s == 2) {
                    //app已登录，但是未获取到loginToken

                } else {
                    //4.4.4及4.4.5app通过获取app返回的loginToken登录
                    Bbsbridge.appBbsLifeHook(function(data) {
                        console.info("lifehook----data-----", data);
                        if (data) {
                            data = JSON.parse(data);
                            var returncode = data.ReturnCode;
                            data = data.Data
                            var v_token = data.LoginToken;

                            //returncode == 1调用登陆接口
                            if (returncode == '1') {
                                Jsbridge.actLogin(url, t, function(data) {
                                    console.info("login-------data--", data);
                                    if (data && data.ReturnCode == "200") {
                                        //登录成功
                                        isLogin = true;
                                    }
                                }, function(e) {
                                    console.info("login---error--", e);
                                });
                            } else {
                                var message = data.ReturnMessage;
                                // returncode为4表示用户未登录
                                if (returncode != 4) {
                                    alert(message);
                                }


                            }
                        } else {
                            console.info('原生没有返回任何数据');
                        }

                    });
                }
            }
        }
    }

})();