(function() {
	FastClick.attach(document.body);

	var pageEl = $(".page");
	var dialogEl = $(".dialog");

	// 绑定弹窗关闭按钮
	dialogEl.on("click", ".icon-close", function() {
		dialogEl.removeClass("getError getRedPackage");
	});

	var basePath = "//10.100.1.39";
	// var basePath = "//bbs.tuandai.com";
	// $("#redPacketPop").show();

	function init() {
		var signDays = getParam('signDays');
		if (signDays && !isNaN(+signDays)) {
			$(".sign-days").html(signDays);
			$(".title").html('您的好友在团粉圈连续签到');
			$(".ori").hide();
			$(".sub").show();
		} else {
			$(".ori").show();
			$(".sub").hide();
			var isLogined = getCookie('tuandaiw');
			bbsWebLogin();
			return;
			//判断是否已登录
			if (!isLogined) {
				var returnUrl = window.location.href;
				returnUrl = encodeURIComponent(returnUrl);
				window.location.href = "//m.tuandai.com/user/Login.aspx?tdfrom=tuanfenquan-p1611-01&ReturnUrl=" + returnUrl;
			} else {
				bbsWebLogin();
			}

		}
	}
	init();

	function initData() {
		$.ajax({
			url: basePath + "/app/index.php",
			type: "POST",
			dataType: 'json',
			data: {
				"version": 4,
				"module": "member",
				"action": "weixin_sign"
			},
			beforeSend: function() {
				$(".loading").show();
			},
			success: function(data) {
				console.info("data------", data);
				/*if (data.code == 200 && data.data) {
					var signData = data.data;
					if (signData.is_luck == 1) {
						dialogEl.find(".redPackage font").text(signData.award);
						dialogEl.addClass("getRedPackage");
					}
					pageEl.find(".sign-days").text(signData.series_sign_num);
				} else if (data.code == 401) {
					//未登录
				} else {
					dialogEl.addClass("getError")
					$(".error-label").html(data.message);
				}*/
				if (data.code == 400) {
					dialogEl.addClass("getError")
					$(".error-label").html(data.message);
				}
				if (data.data) {
					var signData = data.data;
					if (signData.is_luck == 1) {
						dialogEl.find(".redPackage font").text(signData.award);
						dialogEl.addClass("getRedPackage");
					}
					var signNum = signData.series_sign_num && !isNaN(signData.series_sign_num) ? signData.series_sign_num : 0;
					pageEl.find(".sign-days").text(signNum);
					$("title").html('我在团粉圈签到了' + signNum + '天！你也来试试');
				}
			},
			error: function(err) {
				dialogEl.addClass("getError");
				$(".error-label").html('签到出错啦~请稍后再试！');
			},
			complete: function() {
				$(".loading").hide();
			}
		});
	}

	//分享按钮
	$(".btn-share").on('click', function() {
		$("#sharePop").show();
	});
	$("#sharePop, .masker, .icon-close-white").on('click', function() {
		$(".mask").hide();
	});
	$(".btn-sign").on('click', function() {
		$("#qrCodePop").show();
	});
	$("#wxLogo")[0].src = getOrigin() + '/images/icon.jpg';
	//立即领取
	$(".btn-check").on('click', function() {
		$(".mask").hide();
	});


	//微信分享
	var weixinConfig;
	var csrf_url = (window.location.href.indexOf('#') == -1 ? window.location.href : window.location.href.substring(0, window.location.href.indexOf('#')));
	$.ajax({
		type: "post",
		async: true,
		url: basePath + "/app/index.php",
		data: {
			version: 4,
			module: 'wechat',
			action: 'wx_js_config'
		},
		dataType: "json",
		success: function(json) {
			console.info("weixin----json--", json);
			// var wx = {};
			if (json && json.code == 200 && json.data) {
				var weixinConfig = json.data;
				wx.config({
					debug: false,
					appId: weixinConfig.appId, // 必填，公众号的唯一标识
					timestamp: weixinConfig.timestamp, // 必填，生成签名的时间戳
					nonceStr: weixinConfig.nonceStr, // 必填，生成签名的随机串
					signature: weixinConfig.signature,
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				var num = $(".sign-days").html();
				if (!num || isNaN(+num)) {
					num = 0;
				}
				var shareConfig = {
					// title: '打个卡 赌5块',
					title: '我在团粉圈签到了' + num + '天！你也来试试',
					link: window.location.href + "?signDays=" + num,
					imgUrl: getOrigin() + '/images/icon.jpg',
					desc: '我用团粉圈签到，拿红包，为每一笔投资加码！'
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

			} else {
				console.info("获取微信配置信息失败-----");
			}
			// weixinConfig = json;


		},
		error: function() {}
	});

	function getOrigin() {
		return window.location.origin || (window.location.protocol + "//" + window.location.host);
	}

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

	function bbsWebLogin() {
		var tuandaiCookie = getCookie('tuandaiw');
		if (!tuandaiCookie) {
			return;
		}
		$.ajax({
			url: basePath + "/app/index.php",
			type: 'post',
			dataType: 'json',
			data: {
				version: 4,
				module: "member",
				action: 'login',
				tuandaiwang_cookie: tuandaiCookie,
			},
			beforeSend: function() {
				// toast('用户信息同步中，请稍候...');
			},
			success: function(v_data) {
				console.info("--bbsWebLogin====data--", v_data);
				if (v_data.code == "200") {
					// window.sessionStorage['uid'] = v_data.data.member.uid;
					/*if (window.mySessionStorage) {
						window.mySessionStorage['uid'] = v_data.data.member.uid;
					} else {
						window.sessionStorage['uid'] = v_data.data.member.uid;
					}
					toast('同步数据成功');*/
					initData();
				} else {
					console.info("login fail------", v_data.message);
					toast(v_data.message);
				}
			},
			error: function(e) {
				toast('同步数据失败！');

			}
		});
	}

	function getCookie(name) {
		var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
	//冒泡提示
	function toast(msg, duration) {
		duration = isNaN(duration) ? 1000 : duration;
		var m = document.createElement('div');
		$(m).addClass("toast-content");
		m.innerHTML = msg;
		m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.6;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
		document.body.appendChild(m);
		setTimeout(function() {
			var d = 0.5;
			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
			m.style.opacity = '0';
			setTimeout(function() {
				if ($(".toast-content").size() > 0) {
					document.body.removeChild(m);
				}
			}, d * 1000);
		}, duration);
	}


})();