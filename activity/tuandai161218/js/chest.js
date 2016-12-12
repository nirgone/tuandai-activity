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

	Util.alertPrize({
    content: '<p>恭喜你获得加息机会！</p><p class="grey align-justify">12月18日13时30分至12月19日24时00分，您只需额外充值12,000元，即可自动获得<font class="font-red">0.2%</font>加息特权，数量有限先到先哦。</p>',
    btn: {
        name: '立即领取',
        callback: function() {
            console.log('立即领取')
        }
    },
    closeCallback: function() {
        console.log('关闭');
    },
});
})();