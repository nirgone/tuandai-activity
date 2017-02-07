(function() {
	FastClick.attach(document.body);
	var canWish = true; //是否可以许愿
	var bgMusic = $("#bgMusic");
	var paused = 0; //是否暂停音乐

	function init() {
		paused = Util.getParam('paused');
		console.info("paused---", paused == 0);
		if (paused == 1) {
			$(".icon-music").removeClass('play').addClass('pause');
		} else {
			bgMusic[0].play();
		}
		// var options = {
		// 	'icon': 'icon-pai pai-sad',
		// 	'content': '很抱歉，活动已结束<br>感谢您一直以来对于团贷网的支持</br>您的奖励已发送到个人账户<br>请登录查看<br>更多丰厚大礼请关注团贷网公众号',
		// 	// 'content': '<span>非常抱歉，您已许愿两次咯~</span><span>感谢您的信任与支持</span><span>2017我们一起加油！</span><span>更多好玩的，请关注团贷网公众号</span>',
		// 	// 'contentStyle': 'l-t',
		// 	'hasBtn': true,
		// 	'button': {
		// 		'content': '确定',
		// 		'class': '',
		// 		'callback': null
		// 	}
		// };
		// Util.showPopup(options);
		// showBtnPopup();
	}
	init();

	//打开规则弹窗
	$(".rule-txt").on('click', function() {
		$(".r-mask").show();
	});
	//关闭规则弹窗
	$(".icon-close, .masker").on('click', function() {
		$(".r-mask").hide();
	});
	$(".l-textarea").on('click', function() {
		$(this).blur();
		var options = {
			'icon': 'icon-pai pai-happy',
			'content': '很抱歉，活动已结束<br>感谢您一直以来对于团贷网的支持</br>您的奖励已发送到个人账户<br>请登录查看<br>更多丰厚大礼请关注团贷网公众号',
			// 'content': '<span>非常抱歉，您已许愿两次咯~</span><span>感谢您的信任与支持</span><span>2017我们一起加油！</span><span>更多好玩的，请关注团贷网公众号</span>',
			// 'contentStyle': 'rabbions-cont',
			'hasBtn': true,
			'button': {
				'content': '确定',
				'class': '',
				'callback': null
			}
		};
		Util.showPopup(options);
	})


	//限制textarea输入字符长度
	$("textarea").on("input", function(e) {
		if ($(this).prop('comStart')) return;
		var maxLenth = $(this).attr('maxlength');
		var leftLength = maxLenth - ($(this).val().trim().length);
		if (leftLength >= 0) {
			$(".w-det-cont").attr('data-content', '( 剩余' + leftLength + '字 )')
		}

	}).on('compositionstart', function() {
		$(this).prop('comStart', true);
		console.log('中文输入：开始');
	}).on('compositionend', function() {
		$(this).prop('comStart', false);
		console.log('中文输入：结束');
	});
	$(".btn-preview").on('click', function() {
		if (canWish) {
			if ($(".icon-music").hasClass('pause')) {
				paused = 1;
			}
			var type = 0;
			location.href = './wishCard.html?paused=' + paused + '&type=' + type;
		} else {
			var options = {
				'icon': 'icon-pai pai-happy',
				'contentStyle': 'rabbions-cont',
				'content': '我们已收到你的许愿啦~<br><font class="r-60">元旦快乐！</font><br>更多好玩的，请<a class="r-undeline" href="http://www.baidu.com">关注团贷网</a>公众号',
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

	$("#goLogin").on('click', function() {
		hideBtnPopup();
	});
	$("#goRegister").on('click', function() {
		hideBtnPopup();
	});
	$(".masker, .b-close").on('click', function() {
		hideBtnPopup();
	});

	function showBtnPopup() {
		$(".btn-mask").removeClass('hidden');
	}
	function hideBtnPopup() {
		$(".btn-mask").addClass('hidden');
	}
})();