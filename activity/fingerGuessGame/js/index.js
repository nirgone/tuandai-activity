(function() {
    //do your thing.
    window.onload = function(e) {
        $(".icon-title").show();
        setTimeout(function() {
            $(".icon-star0, .icon-star1, .icon-star2").show();
        }, 500);
    }

    // Util.exchangAlert(0,"您本月兑换机会已用完");
    // Util.exchangAlert(0,"您的团币不足100");
    // Util.exchangAlert(1,"恭喜你，兑换成功");

    // Util.exchangeDialog("本次兑换将会扣除您100团币",function() {
    // 	console.log("todo 扣除团币");
    // 	//结果
    // 	Util.exchangAlert(1,"恭喜你，兑换成功");
    // }, null);

	//跳转游戏页面
	$("#btn_start").on("click", function(e) {
        window.location.href = "./game.html";
    });

    //显示游戏规则
    $("#show_rule").on("click", function(e) {
        $("#pop_rule").show();
    });

    //显示排行榜
    $("#show_menu").on("click", function(e) {
        $("#pop_menu").show();
    });

    //显示获取更多机会
    $("#toget_chance").on("click", function(e) {
        // $("#pop_chance").show();
        Util.showPopChance();
    });

    //排行榜的nav 
    $("#menu_nav").on("click", "a", function(e) {
        var $target = $(this),
            _type = $(this).attr("data-type"),
            _ul = _type == "0" ? "ul_record" : "ul_list"
        $("#menu_nav a, .menu-content ul").removeClass("active");
        $target.addClass("active");
        $("#" + _ul).addClass("active");
    });

    //关闭弹窗
    $(".popup-btn-close").on("click", function(e) {
        $(".popup").hide();
    });


    

})();
