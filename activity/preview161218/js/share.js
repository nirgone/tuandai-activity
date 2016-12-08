(function() {
	FastClick.attach(document.body);
	var scratchByInveste = 1; //是否有投资刮奖机会 0 没有刮奖机会且未刮奖 1 有刮奖机会 2 已经刮奖
	var isInvite = true; //是否已经获取邀请加息 

	var pageContentEl = $(".page-content");
	var sharecontEl = $(".sharecont");
	var scratchInvestEl = $(".scratch-byInvestment");
	var scratchInviteEl = $(".scratch-byInvite");
	var scratchEl = $('.scratch-item');

	function initScatchPad() { //初始化刮奖效果

		scratchEl.find(".scratch-area .scratch-area-cover").wScratchPad({
			bg: '',
			size: 15,
			fg: '../images/bg-interest-ticket-cover.png',
			cursor: "auto",
			scratchMove: function(e, percent) { //刮奖中
				if (percent >= 30) { //刮奖超过30%
					var currentTarget = $(e.currentTarget);
					currentTarget.parents(".scratch-area").hide(); //隐藏刮奖区域
					var scratchItemEl = currentTarget.parents(".scratch-item");
					//修改文案
					scratchItemEl.find(".scratch-right .text").text("投资获加息");
					// 修改链接为预售专场
					scratchItemEl.find(".right-wrapper").attr("href", "./presale.html")
				}
			}
		});
	}

	//绑定查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		Util.message("规则说明", "<p>1、活动期间内，加入预售专场智能理财累计满1000元即可参与刮奖，每个用户仅能刮1次。</p><p>2、用户邀请好友活动期间内注册且累计投资金额满500元即可获得0.15%加息特权，每个用户活动期间内仅有1次机会。</p><p>本活动规则解释权归团贷网所有，如有疑问请联系在线客服或拨打400-6410-888</p>",
			function() { //点击关闭按钮
				pageContentEl.addClass("geted"); //切换至领完加息状态
			})
	});

	// 监听刮奖状态
	scratchEl.on("touchmove", ".scratch-cover", function(e) {
		var currentTarget = $(e.currentTarget);
		currentTargetParentEl = currentTarget.parents(".scratch-item")

		if (scratchByInveste == 0) { //没有刮奖机会
			if ($(".popup").length !== 0) return;
			Util.alertCommon({
				type: 1,
				content: "<p>您还需加入指定的智能理财项目满<font style='color:#ff7630;'>" + 1000 + "</font>元才能参与刮奖哦~</p>",
				btn: {
					name: "立即投资",
					callback: function() {
						// TODO: 跳转至立即投资链接
						window.location.href = "https://m.tuandai.com/pages/invest/WE/WE_list.aspx"
					}
				},
				closeCallback: function() {

				}
			});
		} else { //有刮奖机会，不支持刮奖效果，直接显示刮奖结果
			currentTargetParentEl.find(".scratch-cover, .scratch-area").hide();
			currentTargetParentEl.find(".scratch-right .text").text("投资获加息");
		}
	});

	// 监听邀请点击
	scratchInviteEl.on("click", ".scratch-wrapper", function(e) {
		if ($(".popup").length !== 0) return;
		if (!isInvite) {
			Util.alertCommon({
				type: 2,
				content: "<p>您需邀请1名好友进行注册并累计投≥500元才能获取加息特权哦~</p>",
				btn: {
					name: "立即邀请",
					callback: function() {
						//跳转至邀请有礼链接
						window.location.href = "https://hd.tuandai.com/weixin/Invite/InviteIndex.aspx"
					}
				},
				closeCallback: function() {

				}
			});
		}


	});



	var uiShowInvite = function() { //是否已经邀请
		if (isInvite) {
			// scratchInviteEl.find(".icon-get").show();
			scratchInviteEl.find(".scratch-right .text").text("邀请得佣金");
		}

	}

	// 绑定邀请
	scratchInviteEl.on("click", ".right-wrapper", function() {
		if (isInvite) {
			window.location.href = "https://hd.tuandai.com/weixin/Invite/InviteIndex.aspx"
		} else {
			var canGet = true;
			// TODO: 如果符合条件

			if (canGet) {
				// TODO:领取
			} else {
				Util.alertCommon({
					type: 2,
					content: "<p>您需邀请1名好友进行注册并累计投≥500元才能获取加息特权哦~</p>",
					btn: {
						name: "立即邀请",
						callback: function() {
							//跳转至邀请有礼链接
							window.location.href = "https://hd.tuandai.com/weixin/Invite/InviteIndex.aspx"
						}
					},
					closeCallback: function() {

					}
				});
			}
		}
	})


	function uiSetScratchStatus() { //设置抽奖状态
		if (!$.support.canvas) { //不支持canvas标签，无法实现刮奖效果~降级处理
			return;
		}
		switch (scratchByInveste) {
			case 1: //可抽奖
				setTimeout(function() { //延迟隐藏cover，防止看到奖品
					scratchInvestEl.find(".scratch-cover").hide();
				}, 200)
				break;
			case 2: //已中奖
				scratchInvestEl.find(".scratch-cover, .scratch-area").hide();
				scratchInvestEl.find(".scratch-right .text").text("投资获加息");
				// 修改链接为预售专场
				scratchInvestEl.find(".right-wrapper").attr("href", "./presale.html")
				break;
		}


	}
	initScatchPad(); //初始化刮奖效果
	uiSetScratchStatus(); //设置抽奖状态
	uiShowInvite(); //设置邀请状态

	// 分享按钮
	pageContentEl.on("click", ".btn-share", function() {
		onShowShare();
	})

	// 隐藏分享
	sharecontEl.on("click", ".cancle-share, .smask", function() {
		sharecontEl.hide();
	})
	var onShowShare = function() {
		var isApp = false; //判断是否为app
		if (isApp) {
			Bbsbridge.toActivityAppInviteFriend();
		} else if (Util.isWeiXin()) { //微信
			onShowShareWeiXin();
		} else { //浏览器分享
			onShowBrowserShare();

		}
	}

	var onShowShareWeiXin = function() { //显示微信分享
		sharecontEl.find(".share-popup").hide();
		sharecontEl.find(".smask").show();
		sharecontEl.show();
	}

	var onShowBrowserShare = function() { //显示浏览器分享
		sharecontEl.find(".smask").hide();
		sharecontEl.find(".share-popup").show();
		sharecontEl.show();
	}

	var onConfigShare = function() { //配置分享信息
		var config = {
			url: window.location.href,
			source: "",
			title: document.title,
			description: "",
			image: "",
			sites: ['qzone', 'qq', 'weibo'], // 启用的站点

		};
		socialShare("#sociShare", config);
	}
	onConfigShare();


})();