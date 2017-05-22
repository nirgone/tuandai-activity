(function() {
	FastClick.attach(document.body);
	$('body').on('click', '.tp-item', function() {
		$('.tp-item').removeClass('active');
		$(this).addClass('active');
	});
	$("#goDetail").on('click', function() {
		location.href = './tpDetail.html';
	});

	//输入兑换的团票数量
	$("#count").on('input', function() {
		var num = $(this).val();
		if (num && num > 0) {
			var ratio = 100; //团票与团币兑换比例
			var calu = num * ratio + '团币';
			$(".tp-input-tips").html(calu);
		}else{
			$(".tp-input-tips").html('');
		}
	});
})();