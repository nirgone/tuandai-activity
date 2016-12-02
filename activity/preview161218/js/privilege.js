(function() {
	FastClick.attach(document.body);
	var pageContentEl = $(".page-content");
	var signTaskEl = pageContentEl.find(".get-interest-sign"); //签到任务dom
	var onePercentTaskEl = pageContentEl.find(".get-interest-onepercent"); //1%加息任务dom
	var investTaskEl = pageContentEl.find(".get-interest-invest"); //投资任务dom
	var inviteTaskEl = pageContentEl.find(".get-interest-invite"); //邀请任务dom
	var interestTextEl = pageContentEl.find(".interest-ticket-wrapper font"); //加息文本dom
	// 查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		$(".dialog").show();
	});


	//显示签到
	pageContentEl.on("click", ".btn-sign", function() {
		Util.alertCommon({
			type: 1,
			content: "<p style='font-size:0.64rem;line-height:1.28rem;'>活动期间内，在APP进行签到并成功分享，即有机会获得<font style='color:#ff7630;'>0.1%</font>加息特权。</p>",
			btn: {
				name: "马上签到",
				callback: function() {
					// TODO: 跳转至手机签到链接
					window.location.href = ""
				}
			}
		});
	});

	//领取加息劵
	pageContentEl.on("click", ".btn-sign-nothing", function() {
		Util.alertCommon({
			type: 3,
			content: '<p>噢哦，未抽中加息特权～</p><p>明日再接再厉，签到赢加息特权</p>'
		});
	});

	$(".popup-close, .masker").on("click", function() {
		$(".dialog").hide();
	})

	// 通过以下状态来控制页面
	var statusSign = 0; //手机签到状态 0当天未签到	1当天未获加息	2当天获加息
	var statusOnePercent = 0; //是否获取1%加息特权 0未获取	1已获取	
	var statusInvest = 0; //是否获取投资加息 0未获取	 1已获取	
	var statusInvite = 0; //是否获取邀请加息 0未获取	 1已获取	

	var isShowSignDialog = false; //是否显示签到中奖与否弹窗
	var uiShowSign = function() { //是否显示签到中奖与否弹窗
		if (isShowSignDialog) {
			switch (statusSign) { //签到
				case 2: //获得加息
					Util.alertJiaxi("0.1")
					break;
				case 1: //未获得加息
					Util.alertCommon({
						type: 3,
						content: '<p>噢哦，未抽中加息特权～</p><p>明日再接再厉，签到赢加息特权</p>'
					});
					break;
			}
		}

	}

	var uiSetStatus = function() { //设置页面状态

		switch (statusSign) { //签到
			case 2: //获得加息
				signTaskEl.find(".task-status").addClass("done");
				break;
			case 1: //未获得加息
				signTaskEl.find(".task-done, .btn-sign").hide();
				signTaskEl.find(".btn-sign-nothing, .not-win").css("display", "inline-block");
				break;
		}
		switch (statusOnePercent) { //1%
			case 1:
				onePercentTaskEl.find(".task-status").addClass("done");
				break;
		}
		switch (statusInvest) { //投资加息
			case 1:
				investTaskEl.find(".task-status").addClass("done");
				break;
		}
		switch (statusInvite) { //邀请加息
			case 1:
				inviteTaskEl.find(".task-status").addClass("done");
				break;
		}
		// 设置总的加息特权 百分比根据实际变化
		interestTextEl.text("1");
	}
	uiShowSign(); //是否显示签到中奖与否弹窗
	uiSetStatus(); //设置页面状态

	/**/
})();