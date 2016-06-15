(function() {
    FastClick.attach(document.body);
    var _loading = false,
        _has_more = true,
        _cur_page = 1;
    //跳转详情
    $("#photo_list").on("click", ".img-container", function(e) {
        //todo 
        window.location.href = "./picDetail.html";
    });

    //点赞
    $("#photo_list").on("click", ".btn-like", function(e) {
        //todo 
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
})();
