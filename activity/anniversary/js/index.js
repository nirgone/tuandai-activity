(function() {
	FastClick.attach(document.body);
	//主页swiper
	var mySwiper = new Swiper('#anniv', {
		direction: 'vertical',
		onInit: function(swiper) {
			swiper.lockSwipeToNext();
		},
		onSlideChangeEnd: function(swiper) {
			if (swiper.activeIndex == 1) {
				$(".t-cont").removeClass('t-move');
				$(".h-t").show();
				$('.arrow').addClass('ab');
			}
			if(swiper.activeIndex == 0) {
				swiper.lockSwipeToNext();
			}
			$(".swiper-slide").find('.page').hide();
			$(".swiper-slide-active").find('.page').show();
		}

	});
	//点击年份滑页
	$("#guidPage").on('click', function(e) {
		$(".t-cont").addClass('t-move');
		$(".h-t").hide();
		$('.arrow').removeClass('ab');
		mySwiper.unlockSwipeToNext();
	});
	//是否是查看视频后返回
	if (window.sessionStorage['state'] && window.sessionStorage['state'] == "checkVideo") {
		mySwiper.unlockSwipeToNext();
		mySwiper.slideTo(3);
		window.sessionStorage['state'] = null;
	}


	//年份切换swiper
	var tabSwiper = new Swiper('#tabs', {
		direction: 'horizontal',
		initialSlide: 0,
		onSlideNextStart: function(swiper) {
			changeTab();
		},
		onSlidePrevStart: function(wiper) {
			changeTab();
		},

	});
	//寄愿团贷swiper
	var peoSwiper = new Swiper('#peoSwiper', {
		direction: 'horizontal',
		pagination: '.swiper-pagination',
	});
	$(".t-year").on('click', function(e) {
		$(".t-year").removeClass('t-active');
		$(this).addClass('t-active');
		var index = $(this).attr('data-index');
		tabSwiper.slideTo(parseInt(index));

	});

	function changeTab() {
		var id = $("#tabs").find(".swiper-slide-active").attr('data-id');
		$(".t-year").removeClass('t-active');
		$("#" + id).addClass('t-active');
	}
	$(".p-detail").on('click', function() {
		var id = $(this).attr('data-id');
		initManagerData(id);

	});

	function initManagerData(id) {
		var obj = Data[id];
		var img = 'url("' + getOrigin() + '/images/' + obj.imgName + '.png")';
		$("#avator")[0].style.backgroundImage = img;
		$("#avator").attr('data-id', id);
		$(".dp-name").html(obj.name);
		$(".dp-posi").html('（' + obj.position + '）');
		if(obj.position.length > 10) {
			$(".dp-posi").addClass('s-t');
		}
		$(".dp-txt").html(obj.template);
		$(".dp-txt").attr('data-url', obj.url);
		setTimeout(function() {
			$(".dp-txt")[0].scrollTop = 0;
		}, 0);
		$(".d-page").show();
	}


	$(".back-btn").on('click', function() {
		$(".d-page").hide();
	});
	//查看更多
	$(".check-btn").on('click', function() {
		var url = $(".dp-txt").attr('data-url');
		var pageData = {
			page: peoSwiper.activeIndex,
			mid: $("#avator").attr('data-id'),
		}
		window.sessionStorage['more'] = JSON.stringify(pageData);
		window.location.href = url;
	});
	//是否查看高管更多内容返回
	if(window.sessionStorage['more'] && window.sessionStorage['more'] != 'null') {
		mySwiper.unlockSwipeToNext();
		mySwiper.slideTo(2);
		var sessionData = window.sessionStorage['more'];
		sessionData = JSON.parse(sessionData);
		peoSwiper.slideTo(+sessionData.page);
		initManagerData(sessionData.mid);
		window.sessionStorage['more'] = null;
	}

	function getOrigin() {
		return window.location.origin || (window.location.protocol + "//" + window.location.host);
	}
	$(".icon-tf").on('click', function() {
		var type = $(this).attr('data-type');
		$(".v-mask").show();
		if (type == 0) {
			/*$("#tfVideo").show();
			$("#tfVideo").trigger('click');
			tfPlayer.playVideo();*/
			window.location.href = 'http://v.youku.com/v_show/id_XMTY0NDkyNTA4NA==.html';
		} else {
			// $("#tdVideo").show();
			// $("#tdVideo").trigger('click');
			// tdPlayer.playVideo();
			window.location.href = 'http://v.youku.com/v_show/id_XMTY0NDk2ODc4NA==.html';
		}
		window.sessionStorage['state'] = "checkVideo";
	});

	/*var tfPlayer = new YKU.Player('tfVideo', {
		styleid: '0',
		client_id: '52b3fa57e9fe17cf',
		vid: 'XMTY0NDkyNTA4NA=='
	});
	// var tdPlayer = new YKU.Player('tdVideo', {
	// 	styleid: '0',
	// 	client_id: '52b3fa57e9fe17cf',
	// 	vid: 'XMTY0NDk2ODc4NA=='
	// });
	$(".v-masker").on('click', function() {
		if (tfPlayer) {
			tfPlayer.pauseVideo();
			$("#tfVideo").show();
		}
		// if (tdPlayer) {
		// 	tdPlayer.pauseVideo();
		// 	$("#tdVideo ").show();
		// }
		$(".v-mask").hide();

	});*/

	//微信分享
	var weixinConfig;
	var csrf_url = (window.location.href.indexOf('#') == -1 ? window.location.href : window.location.href.substring(0, window.location.href.indexOf('#')));
	$.ajax({
		type: "get",
		async: true,
		url: "http://m.tuandai.com/ajaxCross/WXTokenAjax.ashx",
		data: {
			code: "",
			url: csrf_url,
			r: Math.random()
		},
		dataType: "json",
		success: function(json) {
			console.info("weixin----json--", json);
			weixinConfig = json;
			wx.config({
				debug: false,
				appId: weixinConfig.appid, // 必填，公众号的唯一标识
				timestamp: weixinConfig.timeStamp, // 必填，生成签名的时间戳
				nonceStr: weixinConfig.nonceStr, // 必填，生成签名的随机串
				signature: weixinConfig.signature,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			var shareConfig = {
				title: '团贷网4周岁啦',
				link: window.location.href,
				imgUrl: getOrigin() + '/images/share.jpg',
				desc: '4年，共一千四百六十个日夜，感谢有你~'
			};
			console.info("shareConfig---", shareConfig);
			wx.onMenuShareTimeline({
				title: shareConfig.title, // 分享标题
				link: shareConfig.link, // 分享链接
				imgUrl: shareConfig.imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: shareConfig.title, // 分享标题
				desc: shareConfig.desc, // 分享描述
				link: shareConfig.link, // 分享链接
				imgUrl: shareConfig.imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareQQ({
				title: shareConfig.title, // 分享标题
				desc: shareConfig.desc, // 分享描述
				link: shareConfig.link, // 分享链接
				imgUrl: shareConfig.imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareWeibo({
				title: shareConfig.title, // 分享标题
				desc: shareConfig.desc, // 分享描述
				link: shareConfig.link, // 分享链接
				imgUrl: shareConfig.imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareQZone({
				title: shareConfig.title, // 分享标题
				desc: shareConfig.desc, // 分享描述
				link: shareConfig.link, // 分享链接
				imgUrl: shareConfig.imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		},
		error: function() {}
	});



})();