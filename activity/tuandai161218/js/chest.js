(function() {
	FastClick.attach(document.body);

	var pageContentEl = $(".content");

	// 查看加息说明
	pageContentEl.on("click", ".check-rule", function() {
		$(".dialog-rule").show();
		$(".scroll").removeClass("scroll-active");
	});

	// 关闭弹窗
	$(".popup-close, .masker").on("click", function() {
		$(".dialog").hide();
		$(".scroll").addClass("scroll-active");
	});

	// 点击宝箱
	pageContentEl.on("click", ".chest-body", function(e) {
		var currentTarget = $(e.currentTarget);
		if (currentTarget.hasClass("open")) { //打开状态
			return;
		}

		parentEl = currentTarget.parents(".chest-item"); //寻找父级元素
		if (parentEl.hasClass("chest-silver")) { //银宝箱
			var canOpenSilverChest = true; //是否能打开银宝箱
			if (canOpenSilverChest) {
				// TODO:获取的加息百分比
				// type:0 -- 银箱 1 -- 金箱 prize--{icon: 奖品图标 text: 奖品值或者奖品名字} callback--按钮回调
				//2 01 1.5 02  1.3 03 1.25 04 1.2 01  1 02  0.8 03  0.5 04  0.3 01  0.25 02  0.2 01
				// 加息劵的类 4个一组循环
				var i = 2; // 获得的加息百分比
				showPrizeDialog(0, {
					icon: "silver-gift04",
					text: i
				}, function() {
					console.log(123123123)
				});


				currentTarget.find(".chest-gift").addClass("silver-gift04");
				currentTarget.find(".chest-gift").text(i);
				currentTarget.addClass("open");
			} else {
				Util.alertCommon({
					content: '<p>您还需加入指定的智能理财项目</p><p>满<font class="font-red">' + 1000 + '</font>元才能打开银箱哦～</p>',
					btn: {
						name: '立即投资',
						callback: function() {
							// 投资链接
							window.location.href = "";
						}
					},
					closeCallback: function() {
						// console.log('关闭');
					}
				});
			}
		} else if (parentEl.hasClass("chest-gold")) { //金宝箱
			var canOpenGoldChest = true; //是否能打开金宝箱
			if (canOpenGoldChest) {
				//夏普60寸4k电视机（LCD-60UF30A） 01      团贷网年会邀请卡 02 
				// iPhone 7 Plus 128G 03     GoPro HERO4 Black高清4K运动摄像机 04
				// Kindle Paperwhite 3 05     富士趣奇instax mini8相机 06
				// 小米移动电源20000mAh 07     德尔玛DEM-F500加湿器 08
				// 100元京东E卡 09     50元投资红包 10
				// 10元投资红包 10
				showPrizeDialog(1, {
					icon: "gold-gift01",
					text: "夏普60寸4k电视机（LCD-60UF30A）"
				}, function() {
					console.log(111)
				});
				currentTarget.find(".chest-gift").addClass("gold-gift01");
				currentTarget.addClass("open");
			} else {
				Util.alertCommon({
					content: '<p>您还需加入指定的智能理财项目</p><p>满<font class="font-red">' + 20000 + '</font>元才能打开金箱哦～</p>',
					btn: {
						name: '立即投资',
						callback: function() {
							// 投资链接
							window.location.href = "";
						}
					},
					closeCallback: function() {
						// console.log('关闭');
					}
				});
			}
		}
	});
	$(".interest-ticket").on("click", function(e) {
		uiShowExtraInterest();
	});

	function uiShowExtraInterest() { //额外加息
		Util.alertPrize({
			content: '<p>恭喜你获得加息机会！</p><p class="grey align-justify">12月18日13时30分至12月19日24时00分，您只需额外充值12,000元，即可自动获得<font class="font-red">0.2%</font>加息特权，数量有限先到先哦。</p>',
			btn: {
				name: '充值领取',
				callback: function() {
					// console.log('充值领取')
				}
			},
			closeCallback: function() {
				// console.log('关闭');
			}
		});
	}
	// type:0 -- 银箱 1 -- 金箱 prize--{icon: 奖品图标 text: 奖品值或者奖品名字} callback--按钮回调
	function showPrizeDialog(type, prize, callback) {
		var _prizetext = "",
			_btn_name = "";
		switch (type) {
			case 0:
				_prizetext = prize.text + "%加息特权";
				_btn_name = "立即领取";
				break;
			case 1:
				_prizetext = prize.text;
				prize.text = "";
				_btn_name = "查看奖品";
		}
		var _content = '<div class="prize-bg"></div><i class="prize ' + prize.icon + '">' + prize.text + '</i><p>恭喜您获得<font class="font-red">' + _prizetext + '</font></p>';

		Util.alertPrize({
			content: _content,
			btn: {
				name: _btn_name,
				callback: function() {
					if (callback) {
						callback();
					}
				}
			},
			closeCallback: function() {
				console.log('关闭');
			},
			hasAnimation: true,
			popupClass: 'popup-prize'
		});
	}

	// 控制列表滚动
	function anit() {
		var goldWinnersEl = pageContentEl.find(".gold-winners");
		var silverWinnersEl = pageContentEl.find(".silver-winners");
		
		var goldLength = goldWinnersEl.find(".winner-item").length;
		var silverLength = silverWinnersEl.find(".winner-item").length;

		var goldSpeed = 0.5 * goldLength;
		var silverSpeed = 0.5 * silverLength;
		
		if (goldLength >= 5) {
			goldWinnersEl.find(".wrap").addClass('anit');
			goldWinnersEl.find(".anit").css({
				"-webkit-animation-duration": goldSpeed + "s",
				"animation-duration": goldSpeed + "s",
			});
		}

		if (silverLength >= 5) {
			silverWinnersEl.find(".wrap").addClass('anit');
			silverWinnersEl.find(".anit").css({
				"-webkit-animation-duration": silverSpeed + "s",
				"animation-duration": silverSpeed + "s",
			});
		}
	}

	// 控制列表滚动
	anit();
	//切换金银宝箱中奖名单
	var winnersWrapperEl = $(".winners-wrapper");
	pageContentEl.on("click", ".chest-type", function(e) {
		var currentTarget = $(e.currentTarget);
		var chestTypeIndex = 0; //默认为金箱
		var chestType = ["gold", "silver"];
		if (currentTarget.hasClass("silver")) { //银箱
			chestTypeIndex = 1; //银箱
		}
		winnersWrapperEl.find("." + chestType[chestTypeIndex]).addClass("active");
		winnersWrapperEl.find("." + chestType[chestTypeIndex] + "-winners").addClass("active");
		winnersWrapperEl.find(".active." + chestType[chestTypeIndex == 0 ? 1 : 0]).removeClass("active");
		winnersWrapperEl.find(".active." + chestType[chestTypeIndex == 0 ? 1 : 0] + "-winners").removeClass("active");


	})
	Util.bindShare();
})();