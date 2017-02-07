(function() {
	var bgMusic = $("#bgMusic");
	var bgMusic = $("#bgMusic");
	var params = {}; //跳转参数

	function init() {
		params = Util.getParam('params');
		if (params) {
			params = JSON.parse(params);
		}
		if (params && params.paused) {
			$(".icon-music").removeClass('play').addClass('pause');
		} else {
			bgMusic[0].play();
		}
	}
	init();
	window.onload = function() {
		$(".icon-envelope").show();
		$(".icon-envelope").addClass('send-letter');
		$(".pai-star").addClass('show-pai');
		$(".icon-tips").addClass('show-tips');
		// $(".icon-star4").addClass('star-blind');
		$(".icon-star4").addClass('star-anit');
	}
	$(".star-cont").on('click', function() {
		params.type = 1;
		if ($(".icon-music").hasClass('pause')) {
			params.paused = true;
		}
		location.href = './wishCard.html?params=' + JSON.stringify(params);
	});
	$("body").on('touchstart', function() {
		if ($(".icon-music").hasClass('pause')) {
			return;
		}
		bgMusic[0].play();
		$("body").off('touchstart');
	});
	$(".icon-music").on('touchstart', function() {
		if ($(this).hasClass('play')) {
			if (bgMusic[0].currentTime > 0) {
				$(this).removeClass('play').addClass('pause');
				bgMusic[0].pause();
			}
		} else {
			$(this).removeClass('pause').addClass('play');
			bgMusic[0].play();
		}
	});

})();