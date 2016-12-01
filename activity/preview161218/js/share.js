(function() {
	FastClick.attach(document.body);
	var scratchByInveste = 0; //是否有投资刮奖机会 0 没有刮奖机会且未刮奖 1 有刮奖机会 2 已经刮奖
	var scratchByInvite = 1; //是否有分享刮奖机会 0 没有刮奖机会且未刮奖 1 有刮奖机会 2 已经刮奖

	var pageContentEl = $(".page-content");
	var scratchInvestEl = $(".scratch-byInvestment");
	var scratchInviteEl = $(".scratch-byInvite");
	var scratchEl = $('.scratch-item');

	function initScatchPad() {

		scratchEl.find(".scratch-area .scratch-area-cover").wScratchPad({
			bg: '',
			size: 15,
			fg: '../images/bg-interest-ticket-cover.png',
			cursor: "auto",
			scratchMove: function(e, percent) { //刮奖中
				if (percent >= 30) {
					var currentTarget = $(e.currentTarget);
					currentTarget.parents(".scratch-area").hide();
					var scratchItemEl = currentTarget.parents(".scratch-item");
					if (scratchItemEl.hasClass("scratch-byInvite")) {
						scratchItemEl.find(".scratch-right .text").text("邀请得佣金");
					} else if (scratchItemEl.hasClass("scratch-byInvestment")) {
						scratchItemEl.find(".scratch-right .text").text("投资获加息");
					}
				}
			}
		});
	}

	// // 绑定查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		Util.message("规则说明", "<p>1、活动期间内，用户登录PC端或者App端进入活动页面点击领取，即可获得1%爱心加息特权，每个用户仅能领取1次。</p><p>2、 活动期间邀请好友注册并投资满500元即可参与邀请刮奖， 每个用户活动期间内仅有1次机会。</p><p>本活动规则解释权归团贷网所有， 如有疑问请联系在线客服或拨打400 - 6410 - 888</p>",
			function() { //点击关闭按钮
				pageContentEl.addClass("geted"); //切换至领完加息状态
			})
	});

	function uiSetScratchStatus() { //设置抽奖状态

		switch (scratchByInveste) {
			case 1:
				setTimeout(function() { //延迟隐藏cover，防止看到奖品
					scratchInvestEl.find(".scratch-cover").hide();
				}, 200)
				break;
			case 2:
				scratchInvestEl.find(".scratch-cover, .scratch-area").hide();
				scratchInvestEl.find(".scratch-right .text").text("投资获加息");
				break;
		}

		switch (scratchByInvite) {
			case 1:
				setTimeout(function() { //延迟隐藏cover，防止看到奖品
					scratchInviteEl.find(".scratch-cover").hide();
				}, 200)
				break;
			case 2:
				scratchInviteEl.find(".scratch-cover, .scratch-area").hide();
				scratchInviteEl.find(".scratch-right .text").text("邀请得佣金");
				break;
		}
	}
	initScatchPad(); //初始化刮奖效果
	uiSetScratchStatus(); //设置抽奖状态

	// 监听开始刮奖状态
	scratchEl.on("touchstart", ".scratch-cover", function(e) {
		var currentTarget = $(e.currentTarget);
		currentTargetParentEl = currentTarget.parents(".scratch-item")
		if (currentTargetParentEl.hasClass("scratch-byInvestment")) {
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
			})
		} else if (currentTargetParentEl.hasClass("scratch-byInvite")) {
			Util.alertCommon({
				type: 2,
				content: "<p>您需邀请1名好友进行注册并累计投≥500元才能参与刮奖哦~</p>",
				btn: {
					name: "立即邀请",
					callback: function() {
						// TODO: 跳转至立即邀请链接
						// window.location.href = "https://m.tuandai.com/pages/invest/WE/WE_list.aspx"
					}
				},
				closeCallback: function() {

				}
			})
		}

	})

})();