(function() {
	FastClick.attach(document.body);
	var metalSwiper;
	var curYear = new Date().getFullYear();
	var curMonth = new Date().getMonth() + 1; //当前月份
	var lastMonth = curMonth == 1 ? 12 : curMonth - 1; //上月
	var honorList = [{
		name: '龙虎榜',
		icon: 'icon-lh-grey',
		text: '风云际会，巅峰PK！<br>龙争虎斗，等你夺魁！'
	}, {
		name: '新锐榜',
		icon: 'icon-new-grey',
		text: '青出于蓝而胜于蓝！<br>看好你，新晋达人！',

	}, {
		name: '人缘榜',
		icon: 'icon-ry-grey',
		text: '呼朋唤友聚团贷！<br>志同道合更有爱！'
	}, {
		name: '壕友榜',
		icon: 'icon-hy-grey',
		text: '四海之内皆兄弟！<br>有福同享赚收益！'
	}, {
		name: '签到榜',
		icon: 'icon-sign-grey',
		text: '锲而不舍，金石可镂！<br>持之以恒，签到达人！'
	}];
	var honorJson = {};

	function init() {
		var myHonor = [{
			name: '龙虎榜',
			icon: 'icon-lh',
			ranking: 1
		}, {
			name: '新锐榜',
			icon: 'icon-new',
			ranking: 2,

		}, {
			name: '人缘榜',
			icon: 'icon-ry',
			ranking: 3
		}, {
			name: '壕友榜',
			icon: 'icon-hy',
			ranking: 4
		}, {
			name: '签到榜',
			icon: 'icon-sign',
			ranking: 5
		}];
		var list = myHonor && myHonor.length > 0 ? myHonor.concat(honorList) : honorList;
		var temp = '';
		list.forEach(function(item, index) {
			temp += '<div class="swiper-slide"><i class="icon-metal ' + item.icon + '"></i></div>';
			honorJson[index] = item;
		});
		$(".swiper-wrapper").html(temp);
		metalSwiper = new Swiper('#metalSwiper', {
			onInit: function(swiper) {
				Util.triggerSlideArrow('.lm-container', swiper);
				triggerText(0);

			},
			onTransitionStart: function(swiper) {
				Util.triggerSlideArrow('.lm-container', swiper);
				triggerText(swiper.activeIndex);
			}
		});
	}
	init();

	function triggerText(index) {
		var data = honorJson[index];
		$(".mh-share").hide();
		if (data.ranking) {
			var year = lastMonth == 12 ? curYear - 1 : curYear;
			str = year + '年' + lastMonth + '月份<br>荣登' + data.name + '第<font>' + data.ranking + '</font>名';
			$(".lm-txt").addClass('mh-active');
			$(".lm-txt").html(str);
			$(".btn-active").show();
		} else {
			str = curYear + '年' + curMonth + '月份<br>' + data.text;
			$(".lm-txt").removeClass('mh-active');
			$(".lm-txt").html(str);
			$(".btn-negative").show();
		}
	}

	$(".icon-prev").on('click', function() {
		metalSwiper.slidePrev();
	});
	$(".icon-next").on('click', function() {
		metalSwiper.slideNext();
	});
	/*//分享
	$(".mh-share").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppActivity(1);
		} else {
			$(".share-mask").show();
		}
	});*/
	//为TA加油
	$(".btn-fight").on('click', function() {
		// showPopup('您本月已经为TA加油过了！');
		showPopup('为TA加油成功！', 'p-txt-big');
	});
	//查看我的荣誉
	$(".check-my").on('click', function() {
		window.location.href = './index.html';
		$(".mask").hide();
	});
	$(".masker, .icon-close").on('click', function() {
		$(".mask").hide();
	});
	function showPopup(msg, txtStyle) {
		var _span = $("<span/>").html(msg);
		txtStyle && _span.addClass(txtStyle);
		$(".pop-content").html(_span);
		$(".mask-pop").show();
	}
	// function hidePopup() {
	// 	$(".mask-pop").hide();
	// }
})();