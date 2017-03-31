(function() {
	FastClick.attach(document.body);
	var pageSwiper, metalSwiper;
	var isLogin = true; //是否已登录
	// var isAppOpen = true; //是否是app打开
	var hasInit = {};
	var curMonth = new Date().getMonth() + 1; //当前月份
	var lastMonth = curMonth == 12 ? 1 : curMonth - 1; //上月
	var month = getParam('month'); //url地址带的参数

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
		}
		// listData = {
		// 	userInfo: {},
		// 	list: []
		// }

	function init() {
		pageSwiper = new Swiper('#pageSwiper', {
			direction: 'vertical',
			initialSlide: 6,
			onTransitionStart: function(swiper) {
				console.info('activeIndex--', swiper.activeIndex, hasInit);
				if (swiper.activeIndex < 6) {
					$(".next-page").show();
				} else {
					$(".next-page").hide();
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
		/*metalSwiper = new Swiper('#metalSwiper', {
			onInit: function(swiper) {
				$(".m-txt").html('风云际会，巅峰PK!<br>龙争虎斗，等你夺魁!');
				$(".icon-prev").hide();
			},
			onTransitionStart: function(swiper) {
				var str = '';
				switch (swiper.activeIndex) {
					case 0:
						str = '风云际会，巅峰PK!<br>龙争虎斗，等你夺魁!';
						$(".icon-prev").hide();
						break;
					case 1:
						str = '青出于蓝而胜于蓝!<br>看好你，新晋达人!';
						$(".icon-prev").show();
						break;
					case 2:
						str = '呼朋唤友聚团贷!<br>志同道合更有爱! ';
						break;
					case 3:
						str = '四海之内皆兄弟!<br>有福同享赚收益!';
						$(".icon-next").show();
						break;
					case 4:
						str = '锲而不舍，金石可镂!<br>持之以恒，签到达人!'
						$(".icon-next").hide();
						break;
				}
				$(".m-txt").html(str);
			}
		});*/
		if (month && month == lastMonth) {
			$(".month-txt").html(month);
			$(".btn-cl").html('本月榜单');
		} else {
			$(".month-txt").html(curMonth);
			$(".btn-cl").html('上月榜单');
		}

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
	$(".masker, .rule-close").on('click', function() {
		$(".mask").hide();
	});

	function showRule() {
		$(".rule-mask").show();
		// $(".rule-list").hide();
		// $("#rule0").show();
		$(".rule-tag").removeClass('active-tag');
		$(".rule-tag").eq(0).trigger('click');
	}

	//获取榜单数据
	function getList(type) {
		// console.info('getList---', type);


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
		// $.ajax({
		// 	url: url,
		// 	data: param,
		// 	dataType: 'json',
		// 	type: 'post',
		// 	success: function(result) {

		// 	},
		// 	complete: function(e) {
		// 		// console.info('complete------', e);
		// 	}
		// });
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
	// $(".icon-prev").on('click', function() {
	// 	metalSwiper.slidePrev();
	// });
	// $(".icon-next").on('click', function() {
	// 	metalSwiper.slideNext();
	// });
	//查看上月或者当月月榜单
	$(".btn-cl").on('click', function() {

	});

	function getParam(name, url) {
		if (!url) {
			url = location.href;
		}
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var returnValue;
		for (var i = 0; i < paraString.length; i++) {
			var tempParas = paraString[i].split('=')[0];
			var parasValue = paraString[i].split('=')[1];
			if (tempParas === name)
				returnValue = parasValue;
		}

		if (!returnValue) {
			return "";
		} else {
			if (returnValue.indexOf("#") != -1) {
				returnValue = returnValue.split("#")[0];
			}
			return returnValue;
		}
	}

})();