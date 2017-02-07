(function() {
	FastClick.attach(document.body);
	//do your thing.
	var isFinished = false; //活动是否已结束
	var canWish = false; //是否可许愿
	var type = 0; //0-预览页面 1-我的愿望页面 2-别人分享给我的愿望页面

	var bgMusic = $("#bgMusic");
	var paused = 0;

	function init(type) {
		paused = Util.getParam('paused');

		if (paused == 1) {
			$(".icon-music").removeClass('play').addClass('pause');
		} else {
			bgMusic[0].play();
		}

		if (type) {
			type = type;
		} else {
			type = Util.getParam('type');
		}
		if (type == 2) {
			$(".wish-title").html('来自123的愿望');
			$(".go-index").removeClass('hidden').html('我也要许愿');
			$(".pai-coins").removeClass('hidden');
			$(".c-remark").removeClass('hidden').html('您的好友1111获得【小派新年祝福30团币】');
		} else if (type == 1) {
			$(".wish-title").html('愿望卡片');
			$(".go-again").removeClass('hidden').html('我要再许愿');
			$(".pai-coins").removeClass('hidden');
			$(".c-remark").removeClass('hidden').html('<span>恭喜你！小派有<font class="txt-bold">XX个团币</font>送给你</span><span><a>登录</a>团贷网领取奖品</span>');
		} else {
			$(".wish-title").html('愿望卡片');
			$(".go-wish").removeClass('hidden');
			$(".letter-det").addClass('card');
			$('.l-pai').removeClass('hidden');
		}
		// $.ajax({
		// 	url: 'http://www.baidu.com',
		// 	type: 'get',
		// 	beforeSend: function() {
		// 		Util.showLoader();
		// 	},
		// 	success: function() {
		// 		console.info("test-------");
		// 	},
		// 	complete: function() {
		// 		setTimeout(function() {
		// 			Util.hideLoader();
		// 		},2000);
		// 	}
		// });
		
		// showSky();
	}
	init();
	function showSky() {
		$(".wish-page").addClass('hidden');
		$(".star-page").removeClass('hidden');
		$(".icon-envelope").removeClass('send-letter').addClass('hidden');
		$(".pai-star").removeClass('show-pai').addClass('is');
		$(".icon-tips").removeClass('show-tips').addClass('is');
	}

	//我要许愿
	$(".go-wish").on('click', function() {
		if (isFinished) {
			var options = {
				'icon': 'icon-pai pai-sad',
				// 'hasClose': false,
				'content': '非常抱歉，活动已结束<br>感谢您一直以来对于团贷网的支持。<br>您的奖励已发送到个人账户，<br>请<a class="r-undeline" href="http://www.baidu.com">登录</a>查看',
				'hasBtn': true,
				'button': {
					'content': '确定',
					'class': '',
					'callback': null
				}
			};
			Util.showPopup(options);
		} else {
			$(".letter-cont").addClass('close');
			$(".l-pai").hide();
			setTimeout(function() {
				$(".envelope-close").removeClass('hidden');
			}, 2000);
			setTimeout(function() {
				// if ($(".icon-music").hasClass('pause')) {
				// 	paused = true;
				// }
				// location.href = "./star.html?params=" + JSON.stringify(params);
				$(".wish-page").addClass('hidden');
				$(".star-page").removeClass('hidden');
			}, 2500);
		}
	});
	//我要再许愿
	$('.go-again').on('click', function() {
		if (canWish) {
			$(".share-mask").removeClass('hidden');
		} else {
			var options = {
				'icon': 'icon-pai pai-sad',
				// 'hasClose': false,
				'content': '非常抱歉，<br>本次活动每位用户两次参加机会。<br>更多好玩的，请关注团贷网公众号',
				'hasBtn': true,
				'button': {
					'content': '确定',
					'class': '',
					'callback': null
				}
			};
			Util.showPopup(options);
		}
	});
	$(".share-mask").on('click', function() {
		$(this).addClass('hidden');
	});
	//我也要许愿
	$(".go-index").on('click', function() {
		location.href = './index.html';
	});
	$(".star-cont").on('click', function() {
		type = 1;
		if ($(".icon-music").hasClass('pause')) {
			paused = 1;
		}
		location.href = './wishCard.html?paused=' + paused + '&type=' + type;
	});

	var bgMusic = $("#bgMusic");
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