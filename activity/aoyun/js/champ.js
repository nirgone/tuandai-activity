(function() {
	FastClick.attach(document.body);
	var flag = true; //是否已测过
	var userName = "【团小贷】";

	function init() {
		var id = Math.random() * 8;
		id = parseInt(id, 10);
		id= 3;
		var obj = champData[id];
		var bgImg = 'url(' + getOrigin() + obj.bgImg + ')';
		$(".tc-cont")[0].style.backgroundImage = bgImg;
		$(".icon-name")[0].src = getOrigin() + obj.nameImg;
		$("#tc-name").html(userName);
		$("#tc-champ").html(obj.content);
		$(".icon-people").addClass(obj.champ);
		if (flag) {
			$("#goTest").html('再测一次');
			$("#share").show();
		} else {
			$("#goTest").html('我也要测');
			$("#share").hide();
		}
		$("title").html(userName + "属于奥运场上的" + obj.name);
	}
	init();

	function getOrigin() {
		return window.location.origin || (window.location.protocol + "//" + window.location.host);
	}
	$("#goTest").on('click', function() {
		window.location.href = "./index.html";
	});
	//分享
	$("#share").on('click', function() {
		if (isWeiXin()) {
			$(".mask").show();
		} else {
			if (Jsbridge.isNewVersion()) {

				Jsbridge.toActivityAppInviteFriend();
			} else {
				//旧版分享
			}
		}
	});
	//集徽章赢奖品
	$("#goLot").on('click', function() {
		 window.location.href = "./lottery.html";
	});
	$(".mask").on('click', function() {
		$(".mask").hide();
	});

	function isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
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
				title: '测一测，你是奥运场上的谁？',
				link: window.location.href,
				imgUrl: getOrigin() + '/images/share1.jpg',
				desc: '奥运将至，群雄争霸，你会是奥运场上的哪一号人物？玩逗趣活动，赢奥运纪念大奖'
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