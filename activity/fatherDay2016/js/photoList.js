(function() {
    FastClick.attach(document.body);
    var _loading = false,
        _has_more = true,
        _cur_page = 1;
    var isLogin = true;
    //跳转详情
    $("#photo_list").on("click", ".img-container", function(e) {
        //todo 
        window.location.href = "./picDetail.html?t=" + t + "&s=" + s;
    });

    //点赞
    $("#photo_list").on("click", ".btn-like", function(e) {
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

    //弹出查询 模态窗
    $("#search_home").bind("click", function(e) {
        $("#search_part").show();
    });

    //收起查询 模态窗
    $("#search_part .icon-back").bind("click", function(e) {
        $("#search_part").hide();
    });



    function loadData() {
        //todo

        //
        var _template = "";
        for (var i = 0; i < 10; i++) {
            _template += '<li class="item">' +
                '<div class="img-container">' +
                '<i class="img" style="background-image:url(../images/img.png)"></i>' +
                '</div>' +
                '<p>编号：<span class="underline">20581</span></p>' +
                '<p>爱心赞：<span>15</span>个</p>' +
                '<a class="btn-like"><i class="icon-heart"></i>点赞</a>' +
                '</li>';
        }

        $("#photo_list").append(_template);
    }

    $(".content").on("scroll", function(e) {
        if (_has_more && !_loading) {
            var target = e.currentTarget,
                height = $(target).height(),
                scrollHeight = target.scrollHeight,
                scrollTop = target.scrollTop;
            // console.log(height + scrollTop- scrollHeight);
            if (height + scrollTop - scrollHeight > -3) {
                loadData();
            }
        }

    });

    // function searchShow() {
    //     var $searchpart = $("#search_part");
    //     $searchpart.removeClass("slideOutDown").addClass("slideInUp");
    //     $searchpart.show();
    // }

    // function searchHide() {
    //     var $searchpart = $("#search_part");
    //     $searchpart.removeClass("slideInUp").addClass("slideOutDown");
    //     setTimeout(function(e) {
    //         $searchpart.show();
    //     }, 600);
    // $searchpart.show();
    // }
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