(function() {
	FastClick.attach(document.body);
	var pageEl = $('.page');
	// 初始化
	+ function init() {
		var mySwiper = new Swipe(document.getElementById('slider'), {
			continuous: false,
			callback: function(index, elem) {
				onSlideUIChange(index);
			}
		});
	}();

	// 滑动之后UI的变化
	function onSlideUIChange(index) {
		switch (index) {
			case 0:
				pageEl.find('.arrow-left').hide();
				pageEl.find('.arrow-right').show();
				break;
			case 1:
			
				pageEl.find('.arrow-left').show();
				pageEl.find('.arrow-right').show();
				break;
			case 2:
				
				pageEl.find('.arrow-left').show();
				pageEl.find('.arrow-right').hide();
				break;
		}
	}
	// 点击关闭
	$('.page').on('click', '.close-btn', function() {
		console.log('点击了关闭')
	})
})();