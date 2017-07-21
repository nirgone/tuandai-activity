(function() {
    FastClick.attach(document.body);
    var mySwiper;
    // var isLogin = false;
    // var isAppOpen = false;
    // var mobileUrl = "https://m.tuandai.com";
    //登录验证
    var t = Util.getParam('t'); //loginToken
    var s = Util.getParam('s'); //根据s判断是否获取到loginToken， s为0表示未登录
    if (isAppOpen && !isLogin) {
        isLogin = Util.checkLogin(t, s);
    }
    console.info("aaaa---", isLogin);
    //初始化数据
    function init() {
        var temp = "";
        var pictureJson = {};
        for (var i = 1; i <= 10; i++) {
            var pid = "pic" + i;
            var imgSrc = "../images/pic.png";
            temp += '<div class="swiper-slide" data-id="' + pid + '" picid="aa"><div class="slidecont"><div class="piccont"><i class="icon-picture" style="background-image:url(\'' + imgSrc + '\');"></i></div><i class="icon-tag"><span>排名第' + i + '</span></i></div></div>';
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
                onInit: function(swiper) {
                    $(".swiper-slide-active").addClass("to-scale");
                    $(".swiper-slide-active").find('.icon-tag').addClass('showIcon');
                },
                onSlideChangeStart: function(swiper) {
                    $(".swiper-slide").removeClass("to-scale");
                    // $(".icon-picture").removeClass('enlage');
                    // $(".piccont").removeClass('enlage');
                    // $(".icon-tag").removeClass('showIcon');
                    // $(".swiper-slide-active").find('.piccont').addClass('to-scale')
                    // setTimeout(function() {
                    //     // $(".swiper-slide-active").find('.icon-picture').addClass('enlage');
                    //     $(".swiper-slide-active").find('.piccont').addClass('enlage');
                    //     $(".swiper-slide-active").find('.icon-tag').addClass('showIcon');
                    // }, 100);

                },
                onSlideChangeEnd: function(swiper) {
                    var pid = $(".swiper-slide-active").attr('data-id');
                    if (!pid) {
                        pid = "pic1";
                    }
                    $(".swiper-slide-active").addClass("to-scale");
                    $(".icon-tag").removeClass('showIcon');
                    $(".swiper-slide-active").find('.icon-tag').addClass('showIcon');

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
            Util.openLogin(isAppOpen, mobileUrl);
            return;
        }
        var type = 2;
        if (type == 0) {
            //重复点赞
            Util.popup('抱歉', '爱心赞数量有限</br>每天只能为同一作品送出1次哦！', true, '给其他作品点赞', function() {
                window.location.href = "./photoList.html?t=" + t + "&s=" + s;
            });
        } else if (type == 1) {
            //赞已送完
            Util.popup('抱歉', '您今天的爱心赞已送完</br>明天再继续支持吧！', false, '确定', function() {});
        } else {
            //点赞成功
            Util.popup('恭喜您', '成功送出爱心赞1枚，并获得<font class="fbold">50</font>团币嘉奖</br>详情请登录会员体系查看！', false, '确定', function() {});

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

    $(".sbody").on('click', '.piccont', function() {
        var pid = $(".swiper-slide-active").attr('picid');
        window.location.href = "./picDetail.html?pid=" + pid;
    });

})();