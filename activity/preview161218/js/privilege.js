(function() {
	FastClick.attach(document.body);
	var pageContentEl = $(".page-content");
	// 绑定查看加息说明
	pageContentEl.on("click", ".rule-geted .check-rule", function() {
		$(".dialog").show();
	});

	//绑定领取加息劵
	pageContentEl.on("click", ".btn-get", function() {
		// TODO: 判断是否登录
		// 登录之后
		Util.alertJiaxi("1", function() { //点击关闭按钮
			pageContentEl.addClass("geted"); //切换至领完加息状态
		})
	});

	$(".popup-close, .masker").on("click", function() {
		$(".dialog").hide();
	})

	var uiSetStatus = function() { //判断是否领取了加息特权
		//TODO: 判断是否已经领取
		var isGeted = false;
		isGeted ? pageContentEl.addClass("geted") : pageContentEl.removeClass("geted");
	}
	uiSetStatus();
})();