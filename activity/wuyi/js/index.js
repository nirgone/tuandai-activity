(function() {
	FastClick.attach(document.body);
	//do your thing.
	var isLogin = false;

	function rotateFn(type, angles) {
		// flag = !flag;
		$('.turntable').stopRotate();
		$('.turntable').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 8000,
			callback: function() {
				var _str = "恭喜您获得";
				switch (type) {
					case 1:
						//宏碁 四核超薄笔记本
						_str += "宏碁 四核超薄笔记本";
						break;
					case 2:
						//派宝智能机器人
						_str += "派宝智能机器人";
						break;
					case 3:
						//苹果6SP
						_str += "苹果6SP";
						break;
					case 4:
						//乐视TV40英寸电视
						_str += "乐视TV40英寸电视";
						break;
					case 5:
						//莱尔克斯扫地机器人
						_str += "莱尔克斯扫地机器人";
						break;
					case 6:
						//全包裹足疗机
						_str += "全包裹足疗机";
						break;
					case 7:
						//长帝智能电烤箱
						_str += "长帝智能电烤箱";
						break;
					case 8:
						//10元投资红包
						_str += "10元投资红包";
						break;
					case 9:
						//VR虚拟现实眼镜
						_str += "VR虚拟现实眼镜";
						break;
					case 10:
						//创迪Wifi空气炸锅
						_str += "创迪Wifi空气炸锅";
						break;

				}
				showPopup(4, _str);
			}
		});

	};
	//开始抽奖
	var qmCount = 1;
	var qmInvest = true;
	$(".startbtn").off('click').on('click', function() {
		if (qmCount < 1) {
			showPopup(5, "");
			return;
		}
		if (!qmInvest) {
			var money = 1000;
			showPopup(6, money);
			return;
		}
		var type = 3;
		var angles = 36 * type;
		rotateFn(type, angles);
		qmCount -= 1;
	});
	//初始化数据
	function initData() {
		var temp = "";
		var length = 20;
		var speed = 1;
		for (var i = 0; i < length; i++) {
			temp += '<li class="bitem citem"><div>4月19号</div><div>团贷网团贷网' + i + '</div><div>苹果6skkkkkkkkkkkkkk</div></li>';
		}
		$(".xslist").html(temp);
		$(".xslist").append(temp);
		$(".qmlist").html(temp);
		$(".qmlist").append(temp);
		if (length > 5) {
			$(".xslist").addClass('scroll');
			$(".xslist")[0].style.animationDuration = speed * length + "s";
			$(".xslist")[0].style.webkitAnimationDuration = speed * length + "s";
			$('.qmlist').addClass('scroll');
			$(".qmlist")[0].style.animationDuration = speed * length + "s";
			$(".qmlist")[0].style.webkitAnimationDuration = speed * length + "s";

		}

	}
	initData();


	/*新手抽奖*/
	var lottery = {
		index: -1, //当前转动到哪个位置，起点位置
		count: 0, //总共有多少个位置
		timer: 0, //setTimeout的ID，用clearTimeout清除
		speed: 20, //初始转动速度
		times: 0, //转动次数
		cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize: -1, //中奖位置
		init: function(id) {
			if ($("#" + id).find(".lottery-unit").length > 0) {
				$lottery = $("#" + id);
				$units = $lottery.find(".lottery-unit");
				this.obj = $lottery;
				this.count = $units.length;
				$lottery.find(".lottery-unit-" + this.index).addClass("active");
			};
		},
		roll: function() {
			var index = this.index;
			var count = this.count;
			var lottery = this.obj;
			$(lottery).find(".lottery-unit-" + index).removeClass("active");
			index += 1;
			if (index > count - 1) {
				index = 0;
			};
			$(lottery).find(".lottery-unit-" + index).addClass("active");
			this.index = index;
			return false;
		},
		clear: function(index) {
			$(this.obj).find(".active").removeClass("active");
		},
		// stop: function(index) {
		// 	this.prize = index;
		// 	return false;
		// }
	};

	function roll() {
		lottery.times += 1;
		lottery.roll();
		if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
			clearTimeout(lottery.timer);
			setTimeout(function() {
				showXsPresnet(lottery.prize);
				lottery.prize = -1;
				lottery.times = 0;
			}, 500);
			// click = false;
		} else {
			if (lottery.times < lottery.cycle) {
				lottery.speed -= 10;
			} else if (lottery.times == lottery.cycle) {
				// var index = Math.random() * (lottery.count) | 0;
				// lottery.prize = index;
			} else {
				if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
					lottery.speed += 110;
				} else {
					lottery.speed += 20;
				}
			}
			if (lottery.speed < 40) {
				lottery.speed = 40;
			};
			//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
			lottery.timer = setTimeout(roll, lottery.speed);
		}
		return false;
	}
	var lotCount = 1;
	var isNewUser = true;
	var isInvest = true;
	//新手抽奖开始
	$(".lotbtn").off('click').on('click', function() {
		if (!isNewUser) {
			showPopup(2, "");
			return;
		}
		if (!isInvest) {
			showPopup(3, "");
			return;
		}
		if (lotCount < 1) {
			showPopup(1, "");
			return;
		}
		lottery.init('lottery');
		lottery.speed = 100;
		lottery.prize = 7; //设置获取的奖品
		roll();
		lotCount -= 1;
	});

	function showPopup(type, str) {
		$(".popup").hide();
		$(".mask").show();
		switch (type) {
			case 0:
				//新手抽中奖品
				$(".present").html(str);
				$(".xspresent-popup").show();
				// $("#continueBtn").html('继续投资');
				$("#continueBtn").hide();
				$("#continueInvest").show();
				break;
			case 1:
				//新手只有一次抽奖
				$("#txt1").html('不好意思，本环节每人只有1次');
				$("#txt2").html('机会，您可以继续投资参与');
				$("#txt3").html('“全民狂欢”活动哦！');
				$("#investBtn").html('马上投资');
				$(".disable-popup2").show();
				break;
			case 2:
				//新手抽奖只限新用户
				$(".xslimit-popup").show();
				break;
			case 3:
				//新手抽奖投资额不足
				// $("#txt4").html('不好意思，您单笔投资不足');
				// $("#txt5").html('2000元，请继续加油哦！');
				$("#disbleTip").html('<span>不好意思，您单笔投资不足</span><span>2000元，请继续加油哦！</span>')
				$("#goInvest").html('马上投资');
				$(".disable-popup").show();
				break;
			case 4:
				//全民抽奖抽中奖品
				$(".present").html(str);
				$(".xspresent-popup").show();
				// $("#continueBtn").html('继续抽奖');
				$("#continueInvest").hide();
				$("#continueBtn").show();
				break;
			case 5:
				//全民抽奖次数用完
				$("#txt1").html('不好意思，本环节每人最多3次');
				$("#txt2").html('参与机会，您可以投资赚取更');
				$("#txt3").html('多收益哦！');
				$("#investBtn").html('继续投资');
				$(".disable-popup2").show();
				break;
			case 6:
				//全民抽奖投资额不足
				$("#disbleTip").html('不好意思， 您还差' + str + "元即可参与活动，请继续加油！");
				$("#goInvest").html('马上投资');
				$(".disable-popup").show();
				break;
			case 7:
				//呼朋唤友
				if (packageNum1 < 1) {
					$("#copyBtn").removeClass('btn-yellow').addClass('btn-grey');
				} else {
					$("#copyBtn").removeClass('btn-grey').addClass('btn-yellow');
				}
				$('.redpag-popup').show();
				break;
			case 8:
				//领取红包提示
				$(".pick-popup").removeClass('spopup');
				$(".pick-tips").html("<span>恭喜您获得40元红包，</span><span>您可以马上投资抽大奖！</span>");
				$(".pick-btn").hide();
				$("#loginBtn").show();
				$(".pick-popup").show();
				break;
			case 9:
				//领取红包提示
				$(".pick-popup").removeClass('spopup');
				$(".pick-tips").html("<span>恭喜您获得40元红包，</span><span>您可以马上投资抽大奖！</span>");
				$(".pick-btn").hide();
				$("#goInvest2").show();
				$("#goLot").show();
				$(".pick-popup").show();
				break;
			case 10:
				//领取红包提示
				$(".pick-popup").addClass('spopup');
				$(".pick-tips").html('亲，您好友的红包已被领完！您可以自己来参与活动，既可以赢大奖，又可以赢红包发给好友哦！');
				$(".pick-btn").hide();
				$("#check").show();
				$(".pick-popup").show();
				break;
			case 11:
				$("#disbleTip").html('不好意思，您目前没有可用分享的红包，请继续加油哦！！');
				$("#goInvest").html('继续投资');
				$(".disable-popup").show();
				break;

		}
		disableScrolling();
	}
	// showPopup(11, "");
	// $("#loginBtn").on('click', function() {
	// 	alert(11);
	// });

	function showXsPresnet(prize) {
		// console.info("prize-----" + prize);
		var str = "恭喜您获得";
		switch (prize) {
			case 0:
				str += "8元红包";
				break;
			case 1:
				str += "人体感应灯";
				break;
			case 2:
				str += "悬浮地球仪套装";
				break;
			case 3:
				str += "艺术挂钟";
				break;
			case 4:
				str += "多功能面包机";
				break;
			case 5:
				str += "即热式电热水器";
				break;
			case 6:
				str += "佳能无线打印机";
				break;
			case 7:
				str += "美的净水器";
				break;
			case 8:
				str += "智能机器人";
				break;
			case 9:
				str += "苹果6S";
				break;
		}
		str += "，您可以继续投资享受“全民福利”大礼哦！";
		// $("#xspresent").html(str);
		// $(".popup").hide();
		// $(".mask").show();
		// $(".xspresent-popup").show();
		// disableScrolling();
		showPopup(0, str);

	}

	//关闭弹窗
	$(".closecont, .masker, #continueBtn, .go-lot").on('click', function() {
		$(".mask").hide();
		$(".share-popup").hide();
		enableScrolling();
		lottery.clear();
	});
	var packageNum1 = 0; //10元红包数量
	var packageNum2 = 0; //40元红包数量
	var packageNum3 = 0; //100元红包数量
	$(".sharebtn").off('click').on('click', function() {
		if(packageNum1 < 1 && packageNum2 < 1 && packageNum3 < 1) {
			showPopup(11, "");
			return;
		}
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toActivityAppInviteFriend();
		} else if (GetQueryString('type') == "mobileapp") {
			//旧版本活动分享
		} else {
			showPopup(7, "");
		}


	});
	$(".pag-bg").on('click', function() {
		$(".pag-bg").removeClass('selected');
		var dataNum = $(this).attr('data-num');
		if ((dataNum == "10" && packageNum1 < 1) || (dataNum == "40" && packageNum2 < 1) || (dataNum == "100" && packageNum3 < 1)) {
			$("#copyBtn").removeClass('btn-yellow').addClass('btn-grey');
		} else {
			$("#copyBtn").removeClass('btn-grey').addClass('btn-yellow');
		}
		$(this).addClass('selected');
	});
	//分享复制
	// var url = window.location.href;
	// url = url.split("#");
	// url = url[0];
	var selectedPag = "";
	$("#copyBtn").off('click').on('click', function() {
		// selectedNum: 10表示选中10元红包， 40表示选中40元红包， 100表示选中100元红包
		if ($(this).hasClass('btn-grey')) {
			return;
		}
		var selectedNum = $(".selected").attr('data-num');
		selectedPag = selectedNum;
		$(".redpag-popup").hide();
		$(".closecont").hide();
		$(".share-popup").show();

	});
	//跳转到投资页面
	$("#continueInvest, #investBtn, #goInvest2").off('click').on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppInvestList();
		} else if (GetQueryString('type') == "mobileapp") {
			//旧版本app
			// window.location.href = "";
		} else {
			//微信或手机浏览器
		}
	});
	//查看奖品 
	$("#checkPrize").off('click').on('click', function() {
		if (Jsbridge.isNewVersion()) {
			//打开团宝箱
			Jsbridge.ToAppTBX();
		} else if (GetQueryString('type') == "mobileapp") {

		} else {

		}
	});
	$(".maodian").on('click', function() {
		var id = $(this).attr('data-id');
		var _scrollY = $("#" + id).offset().top;
		window.scrollTo(0, _scrollY);
	});


	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	function scrolling(e) {
		preventDefault(e);
	}

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	function disableScrolling() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', scrolling, false);
			window.addEventListener('touchmove', scrolling, false);
			window.onmousewheel = document.onmousewheel = scrolling;
			// document.onkeydown = keydown;
		}
	}

	function enableScrolling() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', scrolling, false);
			window.removeEventListener('touchmove', scrolling, false);
		}
		// window.onmousewheel = document.onmousewheel = document.onkeydown = null;
		window.onmousewheel = document.onmousewheel = null;
	}


	//新版本登陆验证
	Jsbridge.appLifeHook(function(message) {
		console.info("app-page-init--");

	}, function(data) {
		data = JSON.parse(data);
		if (data.ReturnCode == 1) {
			var loginToken = data.Data.LoginToken;
			//调用后台接口登录
			// appLogin(loginToken);
			// var url = "http://121.13.249.210:9006/ajaxCross/Login.ashx?Action=UserLogin"; //106测试地址
			// var url = "http://hd.tuandai.com/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址
			var url = "http://10.100.11.110:9006/ajaxCross/Login.ashx?Action=UserLogin"; //110地址
			Jsbridge.appLogin(url, loginToken, function(result) {
				if (result.Status == 1) {
					isLogin = true;
				} else {
					isLogin = false;
				}
			}, function(e) {
				alert("error--" + JSON.stringify(e));
			});

		} else {
			//没有获得到loginToken，跳转到登录页面
			// Jsbridge.toAppLogin();
			// $("#show3").html(data.ReturnMessage);

		}

	}, function(data) {
		// 打开页面

	}, function(data) {
		// 离开页面
	}, function(data) {

	});

})();