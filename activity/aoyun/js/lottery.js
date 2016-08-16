(function() {
	FastClick.attach(document.body);
	var isLogin = Util.checkLogin(); //判断是否已登录
	var isAppOpen = true; //是否为app端打开

	if (document.referrer === "") {
		//直接从分享链接打开
		console.info("share------");
		$("#toShare").hide();
		$("#toFriend").show();
		$(".tc-hzcont").addClass('tc-up');
		
		$(".b-t").html('<span>团贷网邀请您与朋友一起来集徽章兑奖品</span>');
		$("#gainHZ").html('我也要集徽章');
		$("#gainHZ").attr('data-type', 'join');
		$("#ybtn").html('帮好友集徽章');
		$("#ybtn").attr('data-type', 'help');
	} else {
		//从上一页跳转
		$("#toShare").show();
		$("#toFriend").hide();
		$(".tc-hzcont").removeClass('tc-up');
		var num = 0; //点赞好友数
		// $(".b-t").html(' <span>已有<font class="otxt">' + num + '</font>位好友为你集徽章，邀请未注</span><span>册好友助力中大奖概率越高哦</span>');
		$(".b-t").html(' <span>已有<font class="otxt">' + num + '</font>位好友为你集徽章</span>');
		$("#gainHZ").html('我要集徽章');
		$("#gainHZ").attr('data-type', 'gain');
		$("#ybtn").html('兑换奖品');
		$("#ybtn").attr('data-type', 'lottery');
	}


	//初始化奖章
	function init() {
		var hzData = [{
			'name': 'WTF2010',
			'avator': ''
		}];
		if (hzData.length < 4) {
			var len = 4 - hzData.length;
			for (var i = 0; i < len; i++) {
				var hzObj = {
					'name': '虚位以待',
					'avator': '../images/default@2x.png',
					'hzImg': '../images/hz-default@2x.png',
					'type': 'default'
				}
				hzData.push(hzObj);
			}
		}
		var temp = "";
		hzData.forEach(function(item, index) {
			var avator = item.avator ? item.avator : '../images/avator@2x.png';
			var hzImg = item.hzImg ? item.hzImg : '../images/hz@2x.png';
			var avatorClass = "icon-avator";
			if (item.type && item.type === "default") {
				avatorClass += " d-avator";
			}
			if ((index + 1) % 2 == 1) {
				temp += '<li class="hz-row"><div>' +
					'<i class="icon-hz" style="background-image: url(' + hzImg + ')">' +
					'<i class="' + avatorClass + '" style="background-image: url(' + avator + ')"></i>' +
					'<span class="hz-name">' + item.name + '</span></i></div>';
			} else {
				temp += '<div><i class="icon-hz" style="background-image: url(' + hzImg + ')">' +
					'<i class="' + avatorClass + '" style="background-image: url(' + avator + ')"></i>' +
					'<span class="hz-name">' + item.name + '</span></i></div></li>';
			}
		});
		$(".tc-hzcont").html(temp);

	}
	init();


	//活动规则
	$(".b-rule").on('click', function() {
		$(".mask").show();
		$("#ruleDiag").show();
		$(".content")[0].style.overflow = "hidden";
		// Util.disableScrolling();
	});
	//关闭弹窗
	$(".mask, .closecont, .btn-pop").on('click', function() {
		$(".mask").hide();
		$(".popbg").hide();
		Util.enableScrolling();
		$(".content")[0].style.overflow = "scroll";
	});
	/*$(".btn-green").on('click', function() {
		$(".mask").show();
		Util.disableScrolling();
		$("#msgPop").show();
	});*/
	//我要集徽章/求助好友/我也要集徽章
	$("#gainHZ").on('click', function() {
		var type = $(this).attr('data-type');
		if (type === "gain") {
			//我要集徽章
			if (isLogin) {
				//重新获取奖章数据
				init();
				$("#gainHZ").html('求助好友');
				$("#gainHZ").attr('data-type', 'share');
			} else {
				$(".pl-msg").html('亲，需要登录团贷网账号才可以参与游戏哦')
				$(".mask").show();
				$("#loginPup").show();
				Util.disableScrolling();
			}
		} else if (type === 'share') {
			//求助好友
			if (Util.isWeiXin()) {
				$(".mask").show();
				$(".wx-cont").show();
				Util.disableScrolling();;
			} else {
				if (Jsbridge.isNewVersion()) {

					Jsbridge.toActivityAppInviteFriend();
				} else {
					//旧版分享
				}
			}
		} else {
			//我也要集徽章
			window.location.href = window.location.href + "?go=lottery";

		}

	});
	//打开登录
	$(".btn-login").on('click', function() {
		Util.openLogin(isAppOpen);
	});
	//打开注册
	$(".s-register").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			if (Jsbridge.isDisable()) {
				this.toast('app版本太低，请更新到最新版本');
				return;
			}
			Jsbridge.toAppRegister();
		} else if (isAppOpen) {
			//旧版本app注册
			window.location.href = "";
		} else {
			//非app端注册

		}
	});

	$("#ybtn").on('click', function() {
		var type = $(this).attr('data-type');

		if (type == "help") {
			//帮好友集徽章
			if (isLogin) {
				var hzNum = 1;
				if (hzNum < 4) {
					$(".pm-msg").html('<span class="p-title">谢谢你，帮我集了一枚徽章</span><span>你也来玩一下，有奥运纪念品拿哦</span>');
				} else {
					$(".pm-msg").html('<span class="p-title">谢谢你，我的徽章已经集满</span><span>你也来玩一下，有奥运纪念品拿哦</span>');
				}
				$(".mask").show();
				$("#msgPop").show();
				Util.disableScrolling();
			} else {
				$(".pl-msg").html('亲，要登录才可以帮好友集徽章哦')
				$(".mask").show();
				$("#loginPup").show();
				Util.disableScrolling();
			}
		} else {
			//兑换奖品
			if (isLogin) {
				var isChanged = false; //是否已兑换
				var isEnough = true; //是否已经集够徽章
				if (isChanged) {
					$(".pm-msg").html('对不起，您已经兑换过礼品');
				} else if (!isEnough) {
					$(".pm-msg").html('亲，您还没有集够徽章哦');
				} else {
					var present = "团贷网纪念银币";
					$(".pm-msg").html('恭喜您，获得' + present + '奖励');
				}
				$(".mask").show();
				$("#msgPop").show();
				Util.disableScrolling();

			} else {
				$(".pl-msg").html('亲，需要登录团贷网账号才可以参与游戏哦')
				$(".mask").show();
				$("#loginPup").show();
				Util.disableScrolling();
			}
		}


	});
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
				title: '我在玩集徽章赢大奖活动，你也来玩一下吧！',
				link: window.location.href,
				imgUrl: getOrigin() + '/images/share2.jpg',
				desc: '集够4枚奥运徽章，奥运纪念品大奖等你来拿！'
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

	function getOrigin() {
		return window.location.origin || (window.location.protocol + "//" + window.location.host);
	}


})();