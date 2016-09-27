(function() {
    FastClick.attach(document.body);
    //do your thing.
    // return;
    var _clientWidth = document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth,
        _fontsize = 20 * (_clientWidth / 320);
    var _height = [$("#dialog").height(), pxToPx(204)];

    function pxToPx(px) {
        return px / 23.4375 / 2 * _fontsize;
    }
    // $("#middle_sec").height(_height[0]);
    // $("#get_sec").height(_height[1]);
    // setTimeout(function() {
    //     $(".get-sec").show();

    // }, 0);
    $("#open_btn").bind("click", function(e) {
        var $target = $(e.currentTarget);
        if ($target.hasClass("not-open")) {
            $target.addClass("open");
            setTimeout(function() {
                $target.removeClass("not-open");
            }, 200);
            setTimeout(function() {
                opened();
            }, 800);
        }
    });

    function opened(el) {
        //红包金额
        $("#open_btn").html('<div class="money">10</div>');
        //碎屑散开动画
        $("#chippings").show();
        //中间部分过渡
        $("#middle_sec").height(_height[1]);
        $("#dialog").addClass("fadeOut");
        $("#get_sec").height(_height[1]);
        setTimeout(function(e) {
            $(".middle-content")[0].style.webkitTransform = "translateX(-50%)"
        }, 600)
    }

    //拉起输入碳层
    $("#to_input").click(function(e) {
        $("#input_popup").removeClass("slideOutDown").addClass("slideInUp");
        $("#input_popup").show();
        // setTimeout(function() {
        //     $("#telNo").focus();
        // }, 500);
    });
    $("#input_popup").on("click", ".icon-close", function(e) {
        $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
    });

})();
