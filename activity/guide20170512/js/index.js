(function() {
	FastClick.attach(document.body);
	var pageEl = $('.page');
	// var sti;
	// var animateClass = 'slideInUp animated';
	// 初始化
	+ function init() {
		/*pageEl.find('.item-dialog01').addClass(animateClass);
		sti = setTimeout(function() {
			pageEl.find('.item-dialog02').addClass(animateClass);
		}, 1000);*/
		var mySwiper = new Swipe(document.getElementById('slider'), {
			continuous: false,
			callback: function(index, elem) {
				onSlideUIChange(index);
			}
		});
	}();

	// 滑动之后UI的变化
	function onSlideUIChange(index) {
		// pageEl.find('.item-dialog').removeClass(animateClass);
		switch (index) {
			case 0:
				/*pageEl.find('.item-dialog01').addClass(animateClass);
				sti = setTimeout(function() {
					pageEl.find('.item-dialog02').addClass(animateClass);
				}, 1000);*/
				pageEl.find('.arrow-left').hide();
				pageEl.find('.arrow-right').show();
				break;
			case 1:
				/*pageEl.find('.item-dialog03').addClass(animateClass);
				clearTimeout(sti);*/
				pageEl.find('.arrow-left').show();
				pageEl.find('.arrow-right').show();
				break;
			case 2:
				/*pageEl.find('.item-dialog04').addClass(animateClass);
				clearTimeout(sti);*/
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