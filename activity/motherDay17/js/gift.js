(function() {
	FastClick.attach(document.body);
	//分享
	$('.g-share').on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppActivity(1);
		} else {
			$(".mask").show();
		}
	});
	$(".mask").on('click', function() {
		$(this).hide();
	});
	var giftData = {
		'0': {
			name: '投资红包',
			icon: 'g-redpacket',
			text: '你负责收下红包，妈妈负责享受回报<br>“妈，这是我靠投资给您赚的零花！”'
		},
		'1': {
			name: '团币',
			icon: 'g-tuanbi',
			text: '不擅长赠送礼物的你，或许可以攒集团币<br>去会员商城帮妈妈兑换好礼'
		},
		'2': {
			name: '按摩椅垫',
			icon: 'g-anmo',
			text: '岁月，让妈妈的身姿曲线变成了弧线<br>此刻只想让她靠一靠，忘记生活的烦恼'
		},
		'3': {
			name: '优酷卡',
			icon: 'g-youku',
			text: '即便不能时刻陪伴，至少也要让她孤单减半<br>妈妈想看的节目，咱可以送优酷！'
		},
		'4': {
			name: '京东卡',
			icon: 'g-jd',
			text: '妈妈舍不得买的东西，咱用卡买单<br>老妈，这卡随便刷！”'
		},
		'5': {
			name: '足疗机',
			icon: 'g-zuliao',
			text: '让妈妈好好歇一歇，舒舒服服按个脚<br>放松的是双脚，温暖的是心房'
		}
	};
	showGift();
	//显示奖品
	function showGift() {
		var type = 5;
		var data = giftData[type];
		$("#name").html(data.name);
		$("#icon").addClass(data.icon);
		$("#text").html(data.text);
	}
	//查看奖品
	$(".g-check").on('click', function() {

	});

})();