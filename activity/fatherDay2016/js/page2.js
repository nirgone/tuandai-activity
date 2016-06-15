(function() {
    FastClick.attach(document.body);
    var mySwiper;
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
                onInit: function(swiper) {
                    $(".swiper-slide-active").find(".piccont").addClass("to-scale");
                    $(".swiper-slide-active").find('.icon-tag').addClass('showIcon');
                },
                onSlideChangeStart: function(swiper) {
                    $(".swiper-slide").find(".piccont").removeClass("to-scale");
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
                    $(".swiper-slide-active").find(".piccont").addClass("to-scale");
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
        window.location.href = "./photoList.html";
    });
    //我也要炫父
    $(".btn-xf").on('click', function() {
        window.location.href = "./upload.html";
    });

})();