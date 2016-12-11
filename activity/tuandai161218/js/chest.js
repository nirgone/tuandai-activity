(function() {
	FastClick.attach(document.body);
	//do your thing.
	var pageEl = $(".content");


	// 控制列表滚动
	function anit() {
		var length = pageEl.find(".winner-item").length;
		var speed = 0.5 * length;
		if (length >= 6) {
			pageEl.find(".wrap").addClass('anit');
			pageEl.find(".anit").css({
				"-webkit-animation-duration": speed + "s",
				"animation-duration": speed + "s",
			});
		}
	}
	// 控制列表滚动
	anit();
})();