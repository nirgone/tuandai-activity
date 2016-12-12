(function() {
	FastClick.attach(document.body);

	var pageContentEl = $(".content");

	// 查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		$(".dialog-rule").show();
	});

	// 关闭弹窗
	$(".popup-close, .masker").on("click", function() {

			$(".dialog").hide();
		})
		// 控制列表滚动
	function anit() {
		var length = pageContentEl.find(".winner-item").length;
		var speed = 0.5 * length;
		if (length >= 6) {
			pageContentEl.find(".wrap").addClass('anit');
			pageContentEl.find(".anit").css({
				"-webkit-animation-duration": speed + "s",
				"animation-duration": speed + "s",
			});
		}
	}
	// 控制列表滚动
	anit();
})();