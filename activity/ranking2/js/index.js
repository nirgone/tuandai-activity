(function() {
	FastClick.attach(document.body);
	var pageSwiper, mhSwiper;
	var isLogin = true; //是否已登录
	// var isAppOpen = true; //是否是app打开
	var hasInit = {};
	var curMonth = new Date().getMonth() + 1; //当前月份
	var lastMonth = curMonth == 1 ? 12 : curMonth - 1; //上月
	var month = Util.getSessionStorage('month'); //缓存的参数
	var showMonth = curMonth; //当前显示月份

	var listData = {
		userInfo: {
			ranking: 10,
			invest: '88888',
			onList: true,
			isNew: false,
			signDay: 7
		},
		list: [{
			ranking: 1,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 2,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 3,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 4,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 5,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 6,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 7,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 8,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}, {
			ranking: 9,
			name: '文***签',
			amount: '88888',
			avator: '../images/avator.png',
			text: '300元投资红包'
		}]
	};
	// listData = {
	// 	userInfo: {},
	// 	list: []
	// }
	var myHonor = [{
		name: '龙虎榜',
		time: '2017年3月份',
		ranking: '33',
		icon: 'icon-lh'
	}, {
		name: '壕友榜',
		time: '2017年3月份',
		ranking: '10',
		icon: 'icon-hy'
	}, {
		name: '新锐榜',
		time: '2017年3月份',
		ranking: '10',
		icon: 'icon-new'
	}, {
		name: '人缘榜',
		time: '2017年3月份',
		ranking: '10',
		icon: 'icon-ry'
	}, {
		name: '签到榜',
		time: '2017年3月份',
		ranking: '10',
		icon: 'icon-sign'
	}];
	var honorJson = {};
	// $(".mask-honor").show();

	function init() {
		pageSwiper = new Swiper('#pageSwiper', {
			direction: 'vertical',
			initialSlide: 0,
			onTransitionStart: function(swiper) {
				console.info('activeIndex--', swiper.activeIndex, hasInit);
				if (swiper.isEnd) {
					$(".next-page").hide();
				} else {
					$(".next-page").show();
				}
				var nextIndex = swiper.activeIndex;
				var prevIndex = swiper.activeIndex - 1;
				//如果当前页的下一页榜单没有加载数据，则获取数据加载
				if (nextIndex > 0 && nextIndex < 6 && !hasInit[nextIndex]) {
					getList(nextIndex);
				}
				//如果当前页的上一页榜单没有加载数据，则获取数据加载
				if (prevIndex > 0 && prevIndex < 6 && !hasInit[prevIndex]) {
					getList(prevIndex);
				}
			}
		});


		var btnStr = '上月榜单',
			type = 'last';
		// showMonth = curMonth;

		if (month && month == lastMonth) {
			btnStr = '本月榜单';
			type = 'cur';
			showMonth = lastMonth;
		} else {
			initMyHonor();
		}
		$(".month-txt").html(showMonth);
		$(".btn-cl").html(btnStr);
		$(".btn-cl").attr('data-type', type);
		getList(1);
	}
	init();
	//查看规则
	$(".txt-rule").on('click', function() {
		showRule()
	});
	//切换规则tag
	$(".rule-tag").on('click', function() {
		$(".rule-tag").removeClass('active-tag');
		$(this).addClass('active-tag');
		var id = $(this).attr('data-id');
		$(".rule-list").hide();
		$("#" + id).show();
	});
	//关闭弹窗
	$(".masker, .icon-close").on('click', function() {
		$(".mask").hide();
	});

	function showRule() {
		$(".rule-mask").show();
		$(".rule-tag").removeClass('active-tag');
		$(".rule-tag").eq(0).trigger('click');
	}

	//获取榜单数据
	function getList(type) {
		Util.setSessionStorage('month', ''); //获取数据后清除缓存中的数据
		var selector;
		switch (type) {
			case 1:
				selector = '.lh-page';
				break;
			case 2:
				selector = '.new-page';
				break;
			case 3:
				selector = '.ry-page';
				break;
			case 4:
				selector = '.hy-page';
				break;
			case 5:
				selector = '.sign-page';
				break;
		}
		var goldTemp = '',
			sliverTemp = '',
			bonzeTemp = '',
			// temp = '<div class="scroll-list">';
			temp = '<div class="swiper-container" id="listSwiper' + type + '"><div class="swiper-wrapper">';
		var _wrapper = $(selector);
		if (type === 5) {
			//签到榜
			var signTemp = '';
			if (listData && listData.list && listData.list.length > 0) {
				var signList = listData.list.length > 12 ? listData.list.slice(0, 12) : listData.list; //最多显示12条签到数据
				signList.forEach(function(item, index) {
					signTemp += '<li class="sign-item"><i class="sign-avator" style="background-image:url(' + item.avator + ');"></i>' +
						'<span class="sign-name">' + item.name + '</span></li>';
				});
			} else {
				signTemp = '<div class="no-data">今日排行榜数据将于次日04:00更新<br>敬请期待....</div>';
			}
			_wrapper.find('.sign-list').html(signTemp);
		} else {
			if (listData && listData.list && listData.list.length > 0) {
				if (type === 3) {
					listData.list.forEach(function(item, index) {
						//榜单前三名
						if (index === 0) {
							goldTemp = '<li class="t-gold"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">' + item.amount + '人</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else if (index === 1) {

							sliverTemp += '<li class="t-sliver"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">' + item.amount + '人</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else if (index === 2) {
							bonzeTemp += '<li class="t-bonze"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">' + item.amount + '人</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else {
							//榜单列表
							if ((index - 3) % 5 === 0) {
								temp += ' <div class="swiper-slide"><ul class="scroll-list">';
							}
							temp += '<li class="r-item"><div class="r-seri">' + item.ranking + '</div>' +
								'<div>' + item.name + '</div><div>' + item.amount + '人</div><div>' + item.text + '</div></li>'
							if ((index - 3) % 5 === 4 || index === (listData.list.length - 1)) {
								temp += '</ul></div>';
							}
						}
					});
				} else {
					listData.list.forEach(function(item, index) {
						//榜单前三名
						if (index === 0) {
							goldTemp = '<li class="t-gold"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">¥' + item.amount + '</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else if (index === 1) {

							sliverTemp += '<li class="t-sliver"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">¥' + item.amount + '</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else if (index === 2) {
							bonzeTemp += '<li class="t-bonze"><span class="t-name">' + item.name + '</span>' +
								'<i class="t-avator" style="background-image:url(' + item.avator + ')" data-content="' + item.ranking + '"></i>' +
								'<span class="t-txt1">¥' + item.amount + '</span><span class="t-txt2">' + item.text + ' </span></li>';
						} else {
							//榜单列表
							if ((index - 3) % 5 === 0) {
								temp += ' <div class="swiper-slide"><ul class="scroll-list">';
							}
							temp += '<li class="r-item"><div class="r-seri">' + item.ranking + '</div>' +
								'<div>' + item.name + '</div><div>¥' + item.amount + '</div><div>' + item.text + '</div></li>'
							if ((index - 3) % 5 === 4 || index === (listData.list.length - 1)) {
								temp += '</ul></div>';
							}
						}
					});
				}
				temp += '</div></div>';
				var topTemp = sliverTemp + goldTemp + bonzeTemp;
			} else {
				var str = type === 3 ? '********人' : '¥********';
				topTemp = '<li class="t-sliver"><span class="t-name">*****</span>' +
					'<i class="t-avator" style="background-image:url(../images/pai-sliver.png)" data-content="2"></i>' +
					'<span class="t-txt1">' + str + '</span><span class="t-txt2">300元投资红包 </span> </li>' +
					'<li class="t-gold"><span class="t-name">*****</span>' +
					'<i class="t-avator" style="background-image:url(../images/pai-gold.png)" data-content="1"></i>' +
					'<span class="t-txt1">' + str + '</span><span class="t-txt2">300元投资红包 </span></li>' +
					'<li class="t-bonze"><span class="t-name">*****</span>' +
					'<i class="t-avator" style="background-image:url(../images/pai-bonze.png)" data-content="3"></i>' +
					'<span class="t-txt1">' + str + '</span><span class="t-txt2">300元投资红包 </span> </li>';
				temp = '<div class="no-data">今日排行榜数据将于次日04:00更新<br>敬请期待....</div>';
			}


			_wrapper.find('.ranking-top').html(topTemp);
			_wrapper.find('.r-list').html(temp);
			var loop = listData.list.length > 8 ? true : false
			new Swiper('#listSwiper' + type, {
				direction: 'vertical',
				loop: loop,
				autoplay: 2000
			});
		}
		if (isLogin) {
			var rankingTemp = '<span>您当月累计年化投资金额：<font class="txt-yellow">¥' + listData.userInfo.invest + '</font></span>';
			switch (type) {
				case 1:
					if (listData.userInfo.isNew) {
						rankingTemp += '<span>您是新用户，请关注“新锐榜”</span>';
					} else if (listData.userInfo.onList) {
						rankingTemp += '<span>好厉害，您已荣登龙虎榜第 <font class="txt-yellow">' + listData.userInfo.ranking + '</font> 名</span>';
					} else {
						rankingTemp += '<span>距离上榜还有一小步，加油哦！</span>';
					}
					break;
				case 2:
					if (!listData.userInfo.isNew) {
						rankingTemp += '<span>您是老用户，请关注“龙虎榜”</span>';
					} else if (listData.userInfo.onList) {
						rankingTemp += '<span>好厉害，您已荣登新锐榜第 <font class="txt-yellow">' + listData.userInfo.ranking + '</font> 名</span>';
					} else {
						rankingTemp += '<span>距离上榜还有一小步，加油哦！</span>';
					}
					break;
				case 3:
					if (listData.userInfo.onList) {
						rankingTemp += '<span>好厉害，您已登上人缘榜！</span>';
					} else {
						rankingTemp += '<span>距离上榜还有一小步，加油哦！</span>';
					}
					break;
				case 4:
					rankingTemp = '<span>您当月新邀请好友的投资金额：<font class="txt-yellow">¥' + listData.userInfo.invest + '</font></span>';
					if (listData.userInfo.onList) {
						rankingTemp += '<span>好厉害，您已登上壕友榜！</span>';
					} else {
						rankingTemp += '<span>距离上榜还有一小步，加油哦！</span>';
					}
					break;
				case 5:
					rankingTemp = '<span>您当月在App连续签到并分享：<font class="txt-yellow">' + listData.userInfo.signDay + '天</font></span>';
					if (listData.userInfo.onList) {
						rankingTemp += '<span>好厉害，您已登上签到榜！</span>';
					} else {
						rankingTemp += '<span>距离“签到先锋”奖章还有一小步，加油哦！</span>'
					}
					break;
			}
			_wrapper.find('.ranking-txt').html(rankingTemp);

		} else {
			_wrapper.find('.ranking-txt').html('<span>快登录查看我的成绩吧，<font class="txt-yellow txt-underline go-login">点击登录</font></span>');
		}
		hasInit[type] = true;

	}
	//跳转到相应榜单
	$(".btn-main").on('click', function() {
		var index = $(this).attr('data-type');
		pageSwiper.slideTo(index);
		if (!hasInit[index]) {
			getList(index);
		}
	});
	//跳转到登录
	$("body").on('click', '.go-login', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppLogin();
		} else {
			//web版登录
		}
	});
	//返回首页
	$(".btn-gm").on('click', function() {
		pageSwiper.slideTo(0);
	});
	//分享
	$(".btn-join").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppActivity(1);
		} else {
			$(".share-mask").show();
		}
	});
	$(".icon-prev").on('click', function() {
		mhSwiper.slidePrev();
	});
	$(".icon-next").on('click', function() {
		mhSwiper.slideNext();
	});
	//查看上月或者当月月榜单
	$(".btn-cl").on('click', function() {
		var type = $(this).attr('data-type');
		var _month = type === 'last' ? lastMonth : curMonth;
		Util.setSessionStorage('month', _month);
		window.location.reload();
	});
	//显示我获得的荣誉
	function initMyHonor() {
		if (myHonor && myHonor.length > 0) {
			var temp = '';
			myHonor.forEach(function(item, index) {
				var styleStr = 'mh-metal ' + item.icon;
				temp += '<div class="swiper-slide" data-type="' + item.type + '"><i class="' + styleStr + '"></i></div>';
				honorJson[index] = {
					time: item.time,
					ranking: item.ranking,
					name: item.name
				};
			});
			$(".mh-time").html(myHonor[0].time);
			$(".mh-desc").html('荣登' + myHonor[0].name + '第<font>' + myHonor[0].ranking + '</font>名');
			$("#mhSwiper").find('.swiper-wrapper').html(temp);
			$(".mask-honor").show();
			mhSwiper = new Swiper("#mhSwiper", {
				onInit: function(swiper) {
					Util.triggerSlideArrow(".mask-honor", swiper);
				},
				onTransitionStart: function(swiper) {
					// console.info('index---', swiper.activeIndex, swiper.isBeginning);
					var data = honorJson[swiper.activeIndex];
					$(".mh-time").html(data.time);
					$(".mh-desc").html('荣登' + data.name + '第<font>' + data.ranking + '</font>名');
					Util.triggerSlideArrow(".mask-honor", swiper);

				}
			});
		}
	}
	//跳转到我的荣誉
	$(".btn-mh, .mh-check").on('click', function() {
		window.location.href = './myHonor.html';
	});

	// function triggerSlideArrow(selector, swiper) {
	// 	var prevObj = $(selector).find('.icon-prev');
	// 	var nextObj = $(selector).find('.icon-next');
	// 	if (swiper.isBeginning) {
	// 		prevObj.hide();
	// 	} else {
	// 		prevObj.show();
	// 	}
	// 	if (swiper.isEnd) {
	// 		nextObj.hide();
	// 	} else {
	// 		nextObj.show();
	// 	}
	// }

	// function setSessionStorage(key, param) {
	// 	if (window.sessionStorage) {
	// 		window.sessionStorage[key] = param
	// 	} else {
	// 		window.mySessionStorage[key] = param
	// 	}
	// }

	// function getSessionStorage(key) {
	// 	if (window.sessionStorage) {
	// 		return window.sessionStorage[key]
	// 	} else {
	// 		return window.mySessionStorage[key]
	// 	}
	// }

})();