(function() {
    FastClick.attach(document.body);
    
    //点赞赚团币
    $(".zancont").on('click', function() {
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
           window.location.href = "./photoList.html";
        } else {
            $(".mask").trigger('click');
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

})();