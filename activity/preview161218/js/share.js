(function() {
	FastClick.attach(document.body);
	var scratchEl = $('.scratch-byInvite, .scratch-byInvestment');
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
	var scratchByInveste = 1; //是否有投资刮奖机会 0 没有刮奖机会且未刮奖 1 有刮奖机会 2 已经刮奖
	var scratchByInvite = 2; //是否有分享刮奖机会 0 没有刮奖机会且未刮奖 1 有刮奖机会 2 已经刮奖
	function uiSetScratchStatus() { //设置抽奖状态
		var scratchInvestEl = $(".scratch-byInvestment");
		var scratchInviteEl = $(".scratch-byInvite");

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
	uiSetScratchStatus();


	scratchEl.on("touchstart", ".scratch-cover", function(e) {
		var currentTarget = $(e.currentTarget);
		console.log("您无抽奖机会");
	})

})();