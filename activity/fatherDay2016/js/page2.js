(function() {
    FastClick.attach(document.body);
    var mySwiper;
    var isLogin = false;
    //初始化数据
    function init() {
        var temp = "";
        var pictureJson = {};
        for (var i = 1; i <= 10; i++) {
            var pid = "pic" + i;
            var imgSrc = "../images/pic.png";
            temp += '<div class="swiper-slide" data-id="' + pid + '"><div class="slidecont"><div class="piccont"><i class="icon-picture" style="background-image:url(\'' + imgSrc + '\');"></i></div><i class="icon-tag"><span>排名第' + i + '</span></i></div></div>';
            pictureJson[pid] = {
                picNo: '205' + i,
                assists: i * 100,
                picdesc: '空间分开交罚款是第几集' + i * 230
            }
        }
        $(".swiper-wrapper").append(temp);
        if (!mySwiper) {
            mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                // loopAdditionalSlides: 1,
                onSlideChangeStart: function(swiper) {
                    // $(".icon-picture").removeClass('enlage');
                    $(".piccont").removeClass('enlage');
                    $(".icon-tag").removeClass('showIcon');
                    setTimeout(function() {
                        // $(".swiper-slide-active").find('.icon-picture').addClass('enlage');
                        $(".swiper-slide-active").find('.piccont').addClass('enlage');
                        $(".swiper-slide-active").find('.icon-tag').addClass('showIcon');
                    }, 100);

                },
                onSlideChangeEnd: function(swiper) {
                    var pid = $(".swiper-slide-active").attr('data-id');
                    if (!pid) {
                        pid = "pic1";
                    }
                    var picData = pictureJson[pid];
                    $(".pnum").html(picData.picNo);
                    $(".assists").html(picData.assists);
                    $(".picdesc").html(picData.picdesc);
                    // $(".icon-picture").removeClass('enlage');
                    // $(".swiper-slide-active").find('.icon-picture').addClass('enlage');
                }

            });
        }
    }

    init();
    //点赞赚团币
    $(".btn-zan").on('click', function() {
        if (!isLogin) {
            Jsbridge.toAppLogin();
            return;
        }
        var type = 2;
        if (type == 0) {
            //重复点赞
            $(".ptitle").html('抱歉');
            $(".poprow1").html('爱心赞数量有限');
            $(".poprow2").html('每天只能为同一作品送出1次哦！');
            $(".pop-btn").html('给其他作品点赞');
            $(".icon-close-white").show();
        } else if (type == 1) {
            //赞已送完
            $(".ptitle").html('抱歉');
            $(".poprow1").html('您今天的爱心赞已送完');
            $(".poprow2").html('明天再继续支持吧！');
            $(".pop-btn").html('确定');
            $(".icon-close-white").hide();
        } else {
            //点赞成功
            $(".ptitle").html('恭喜您');
            $(".poprow1").html('成功送出爱心赞1枚，并获得<font class="fbold">50</font>团币嘉奖');
            $(".poprow2").html('详情请登录会员体系查看！');
            $(".pop-btn").html('确定');
            $(".icon-close-white").hide();
        }
        $(".pop-btn").attr('data-type', type);
        $(".mask").show();
        $(".popup").show();
    });
    //关闭弹窗
    $(".icon-close-white, .mask").on('click', function() {
        $(".mask").hide();
        $(".popup").hide();
    });
    //弹窗按钮事件
    $(".pop-btn").on('click', function() {
        if ($(this).attr('data-type') == 0) {
            $(".more-pic").trigger('click');
        } else {
            $(".mask").trigger('click');
        }
    });
    //查看更多照片
    $(".more-pic").on('click', function() {
        window.location.href = "./photoList.html?t=" + t + "&s=" + s;
    });
    //我也要炫父
    $(".btn-xf").on('click', function() {
        window.location.href = "./upload.html?t=" + t + "&s=" + s;
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