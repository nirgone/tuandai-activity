(function() {
	FastClick.attach(document.body);
	$('.rt-type').on('click', function() {
		$('.rt-type').removeClass('active');
		$(this).addClass('active');
		var type = $(this).attr('data-type');
		if (type == 0) {
			$('.rl-container').removeClass('total-list').addClass('day-list');
		} else {
			$('.rl-container').removeClass('day-list').addClass('total-list');
		}
		// var dis = $(window).width() * (+type);
		// $('.rl-container').css('transform','translateX(' + (-dis) + 'px)');

	});
})();