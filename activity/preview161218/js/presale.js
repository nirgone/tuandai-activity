(function() {
	FastClick.attach(document.body);
	var hasStarted = true; //预售活动是否开始
	var objs = $(".btn-countdown"); //倒计时对象
	var timeJson = {};
	var sTime = 0;
	var startTime = new Date().getTime();
	var count = 0;
	var isApp = true; //是否为app端打开
	var isLogined; //是否已登录
	var option;
	var timeArr = [];


	function init() {
		if (hasStarted) {
			$(".no-pro").hide();
			$(".pro-wrapper").show();
			// $(".icon-list").show();
		} else {
			$(".no-pro").show();
			$(".pro-wrapper").hide();
			// $(".icon-list").hide();
		}
		//获取登录状态
		if (isApp) {
			option = Util.getParam('option');
			isLogined = Util.checkLogin(option);
			// console.info("juan------", isLogined);
		} else {
			//获取触屏版登录状态
		}
		//开始倒计时
		start();
	}
	init();

	//查看详情
	$(".rule-text").on('click', function() {
		Util.message("温馨提示", "<p>1、用户加入预售专场后，将在12月18日00:00后匹配标的，按照各理财项目计息规则进行收益结算；</p><p>2、成功加入预售专场的金额，将计入本次活动的个人累计加入指定的智能理财、安盈计划总金额；</p><p>3、加入预售专场，同样享有加息特权奖励，12月18日可优先匹配标的。</p>",
			function() { //点击关闭按钮

			});
	});
	//爱心榜单
	$(".icon-list").on('click', function() {
		window.location.href = "./loveList.html?option=" + option;
	});

	
	function start() {
		// console.info("objs----", objs);
		if (objs && objs.length > 0) {
			for (var i = 0; i < objs.length; i++) {
				var item = objs.eq(i);
				var itemTime = item.attr('data-time');
				// console.info(itemTime);
				// itemTime = new Date(itemTime).getTime() - new Date().getTime();
				// console.info("sTime=" + sTime, "itemTime=" + itemTime);
				if (+itemTime > sTime) {
					sTime = itemTime;
				}
				var itemId = item.attr('data-id');
				/*if (!timeJson[itemId]) {
					timeJson[itemId] = itemTime;
				}*/
				if(!timeJson[itemTime]) {
					timeJson[itemTime] = itemTime;
					timeArr.push(itemTime);
				}
			}

		}
		console.info(timeArr, timeJson);
		// console.info("sTime-----", sTime, timeJson);
		sTime = Math.round(sTime / 1000);
		if (sTime > 0) {
			setTimeout(countDown, 0);
		}
	}
	// start();

	function countDown() {
		// sTime = sTime - count * 1000;
		var offset = new Date().getTime() - (startTime + count * 1000);
		var newTime = 1000 - offset;
		if (newTime < 0) {
			newTime = 0;
		}
		// console.info(new Date().getTime() - (startTime + count * 1000));
		console.info("sTime-----", sTime);
		if (sTime >= 0) {
			// var showTime = timeFormate(sTime);
			// obj.html(showTime);

			/*if (objs && objs.length > 0) {
				for (var i = 0; i < objs.length; i++) {
					var oItem = objs.eq(i);
					var id = oItem.attr('data-id');
					var iTime = timeJson[id];
					if (+iTime > 0) {
						var showTime = timeFormate(iTime);
						oItem.html(showTime);
						timeJson[id] = +iTime - 1000;
					} else {
						oItem.removeClass('btn-countdown').addClass('btn-get');
						oItem.html('立即抢');
					}
				}

			}*/
			if(timeArr) {
				var arrLength = timeArr.length;
				for(var i = 0; i < arrLength; i++) {
					var key = timeArr[i];
					var btns = $(".btn-countdown[data-time='" + key + "']");
					var iTime = timeJson[key];
					console.info(Math.round(+iTime/1000));
					if(Math.round(+iTime/1000) > 0) {
						var showTime = timeFormate(iTime);
						btns.html(showTime);
						timeJson[key] = +iTime - 1000; 
					}else{
						btns.removeClass('btn-countdown').addClass('btn-get');
						btns.html('立即抢');
					}
				}
				/*timeArr.forEach(function(time, index) {
					console.info("time-------", time);
					if(+time > 0) {
						var showTime = timeFormate(time);
						$(".btn-countdown[data-time='" + time + "']").html(showTime);
						time = +time - 1000;
					}else{
						$(".btn-countdown[data-time='" + time + "']").removeClass('btn-countdown').addClass('btn-get');
						$(".btn-countdown[data-time='" + time + "']").html('立即抢');
					}
				})*/
			}
			sTime = sTime - 1;
			setTimeout(countDown, newTime);
		}

		count++;

	}

	function timeFormate(time) {
		var hours = Math.floor(time / (3600 * 1000));
		var leave1 = time % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave1 / (60 * 1000))
			//计算相差秒数
		var leave2 = leave1 % (60 * 1000) //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave2 / 1000);
		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return hours + "小时" + minutes + "分" + seconds + "秒"
	}
	//抢完标修改按钮状态
	function disableBtn(wrapper) {
		wrapper.removeClass('icon-btn-item btn-item-active btn-get').addClass('btn-disable');
	}
	/*var wrapper = $(".btn-get[data-id='2']");
	setTimeout(function() {
		disableBtn(wrapper);
	},2000);*/

	//跳转到WE计划项目详情
	$("body").on('click', '.btn-get', function() {
		var id = $(this).attr('data-id');
		if (isLogined) {
			if (Jsbridge.isNewVersion()) {
				Jsbridge.toAppWePlanDetail(productId, typeId, subTypeId, weXPlanType, title);
			} else {

			}
		} else {
			//打开登录页面
			Util.openLogin();
		}
	});


})();