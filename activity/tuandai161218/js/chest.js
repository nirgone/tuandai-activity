(function() {
	FastClick.attach(document.body);

	var pageContentEl = $(".content");

	// 查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		$(".dialog-rule").show();
	});

	// 关闭弹窗
	$(".popup-close, .masker").on("click", function() {
		$(".dialog").hide();
	});

	// 点击宝箱
	pageContentEl.on("click", ".chest-body", function(e) {
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass("open")) { //打开状态
			return;
		}

		parentEl = currentTarget.parents(".chest-item"); //寻找父级元素
		if (parentEl.hasClass("chest-silver")) { //银宝箱
			var canOpenGoldChest = false; //是否能代开银宝箱
			if (canOpenSilverChest) {
				// TODO:获取的加息百分比
				var i = 2; // 获得的加息百分比
				currentTarget.find(".chest-gift").addClass("gift01"); //2 01 1.5 02  1 03 0.8 04 0.5 05 0.3 06 0.25 07 0.2 08
				currentTarget.find(".chest-gift").text(i);
				currentTarget.addClass("open");
			} else {
				Util.alertCommon({
					content: '<p>您还需加入指定的智能理财项目</p><p>满<font class="font-red">' + 1000 + '</font>元才能打开银箱哦～</p>',
					btn: {
						name: '立即投资',
						callback: function() {
							console.log('立即投资')
						}
					},
					closeCallback: function() {
						console.log('关闭');
					}
				});
			}
		} else if (parentEl.hasClass("chest-gold")) { //金宝箱
			var canOpenGoldChest = false; //是否能代开银宝箱
			if (canOpenGoldChest) {
				//夏普60寸4k电视机（LCD-60UF30A） 01 1.5 02  1 03 0.8 04 0.5 05 0.3 06 0.25 07 0.2 08
				currentTarget.find(".chest-gift").addClass("gift01");
				currentTarget.addClass("open");
			} else {
				Util.alertCommon({
					content: '<p>您还需加入指定的智能理财项目</p><p>满<font class="font-red">' + 1000 + '</font>元才能打开银箱哦～</p>',
					btn: {
						name: '立即投资',
						callback: function() {
							console.log('立即投资')
						}
					},
					closeCallback: function() {
						console.log('关闭');
					}
				});
			}
		}
	});
	$(".interest-ticket").on("click", function(e) {
		Util.alertPrize({
			content: '<p>恭喜你获得加息机会！</p><p class="grey align-justify">12月18日13时30分至12月19日24时00分，您只需额外充值12,000元，即可自动获得<font class="font-red">0.2%</font>加息特权，数量有限先到先哦。</p>',
			btn: {
				name: '充值领取',
				callback: function() {
					console.log('充值领取')
				}
			},
			closeCallback: function() {
				console.log('关闭');
			}
		});
	});

	// 控制列表滚动
	function anit() {
		var length = pageContentEl.find(".winner-item").length;
		var speed = 0.5 * length;
		if (length >= 6) {
			pageContentEl.find(".wrap").addClass('anit');
			pageContentEl.find(".anit").css({
				"-webkit-animation-duration": speed + "s",
				"animation-duration": speed + "s",
			});
		}
	}
	// 控制列表滚动
	anit();
})();