(function() {
    FastClick.attach(document.body);
    var isLogin = true;

    //点赞赚团币
    $(".zancont").on('click', function() {
        if (!isLogin) {
            if (Jsbridge.isNewVersion()) {

                Jsbridge.toAppLogin();
            } else if (type == "mobileapp") {
                //旧版本app登录

            } else {
                //非app端登录

            }
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
        window.location.href = "./upload.html?t=" + t + "&s=" + s;
    });
    //活动首页
    $("#goMain").on('click', function() {
        window.location.href = "./index.html?t=" + t + "&s=" + s;
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
    var type = Util.getParam('type'); //判断是否为app端
    //'http://121.13.249.210:9006//weixin/Yuanxiao20160218/ajax/ajax.ashx?Action=AjaxLogin'
    var url = "http://121.13.249.210:9006/ajaxCross/Login.ashx?Action=UserLogin"; //106测试地址
    // var url = "http://hd.tuandai.com/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址
    if (type == "mobileapp") {
        //app端
        isLogin = Util.checkLogin(url, t, s);
    } else {
        //非app端

    }
    

})();