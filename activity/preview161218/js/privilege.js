(function() {
	FastClick.attach(document.body);
	var pageContentEl = $(".page-content");
	var signTaskEl = pageContentEl.find(".get-interest-sign"); //签到任务dom
	var onePercentTaskEl = pageContentEl.find(".get-interest-onepercent"); //1%加息任务dom
	var tuanbiTaskEl = pageContentEl.find(".get-interest-tuanbi"); //1%加息任务dom
	var investTaskEl = pageContentEl.find(".get-interest-invest"); //投资任务dom
	var inviteTaskEl = pageContentEl.find(".get-interest-invite"); //邀请任务dom
	var interestTextEl = pageContentEl.find(".interest-ticket-wrapper font"); //加息文本dom

	var isApp = false; //是否为app端打开
	var isLogined; //是否已登录
	var option;
	//获取登录状态
	if (isApp) {
		option = Util.getParam('option');
		isLogined = Util.checkLogin(option);
	} else {
		//获取触屏版登录状态
	}

	// 查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		$(".dialog").show();
	});

	// 关闭弹窗
	$(".popup-close, .masker").on("click", function() {
		$(".dialog").hide();
	})

	//显示签到
	pageContentEl.on("click", ".btn-sign", function() {
		Util.alertCommon({
			type: 1,
			content: "<p style='font-size:0.64rem;line-height:1.28rem;'>活动期间内，在APP进行签到并成功分享，即有机会获得加息特权。</p>",
			btn: {
				name: "马上签到",
				callback: function() {
					if (!isApp) { //不是app
						window.location.href = "https://m.tuandai.com/pages/downopenapp.aspx";
					} else {
						// TODO: 跳转至手机签到链接
						window.location.href = ""
					}
				}
			},
			closeCallback: function() {

			}
		});
	});

	//签到加息抽奖
	pageContentEl.on("click", ".btn-lottery", function() {

		var isGetInterest = 1; // 0当天未获加息	1当天获加息
		uiShowSign(isGetInterest)
	});

	//没获取加息劵
	pageContentEl.on("click", ".btn-sign-nothing", function() {
		Util.alertCommon({
			type: 3,
			content: '<p>噢哦，未抽中加息特权～</p><p>明日再接再厉，签到赢加息特权</p>',
			closeCallback: function() {

			}
		});
	});

	//领取1%加息
	pageContentEl.on("click", ".get-interest-onepercent", function() {
		Util.alertJiaxi("1", function() {
			onePercentTaskEl.find(".task-status").addClass("done");
			// 设置总的加息特权 百分比根据实际变化
			interestTextEl.text("1");
		});
	});



	// 通过以下状态来控制页面
	var statusSign = 0; //手机签到状态 0当天未签到	1当天未获加息	2当天获加息
	var statusOnePercent = 0; //是否获取1%加息特权 0未获取	1已获取	
	var statusTuanbi = 0; //是否获取团币加息 0未获取 	1已获取	
	var statusInvest = 0; //是否获取投资加息 0未获取	 1已获取	
	var statusInvite = 0; //是否获取邀请加息 0未获取	 1已获取	

	var isShowLottery = false; //是否显示抽奖
	var uiShowLottery = function() { //是否显示签到中奖与否弹窗
		if (isShowLottery) {
			signTaskEl.find(".task-done, .btn-sign").hide();
			signTaskEl.find(".btn-lottery").css("display", "inline-block");
		}

	}


	var uiShowSign = function(isGetInterest) { //是否签到中奖
		switch (isGetInterest) { //是否签到中奖
			case 1: //获得加息
				Util.alertJiaxi("0.05", function() {
					signTaskEl.find(".task-status").addClass("done");
				})
				break;
			case 0: //未获得加息
				Util.alertCommon({
					type: 3,
					content: '<p>噢哦，未抽中加息特权～</p><p>明日再接再厉，签到赢加息特权</p>',
					closeCallback: function() {

					}
				});
				break;
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

		switch (statusTuanbi) { //团币
			case 1:
				tuanbiTaskEl.find(".task-status").addClass("done");
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
		interestTextEl.text("X");
	}
	uiShowLottery(); //是否显示签到抽奖按钮
	uiSetStatus(); //设置页面状态

	/**/
})();