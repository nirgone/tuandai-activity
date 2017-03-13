(function() {
	FastClick.attach(document.body);
	$(".icon-rule").on('click', function() {
		$(".rule-mask").show();
	});
	$(".rule-submit").on('click', function() {
		$(".rule-mask").hide();
	});
	//返回修改
	$('#btn_back').on('click', function(e) {
		history.back()
	});
	//分享按钮
	$('#btn_share').on('click', function(e) {
		$("#popup_share").show();
	});
	$('#popup_share').on('click', function(e) {
		$("#popup_share").hide();
	});
})();