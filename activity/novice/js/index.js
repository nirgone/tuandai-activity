(function() {
	FastClick.attach(document.body);
	//do your thing.
	var isLogin = true; //是否已登录
	var hasUsed = true; //是否已使用体验金
	var firstInvest = false; //是否为首次投资
	var _d = $(".half-circle").offset().top + 30;
	// showTips('<span>您的体验金已过期！</span><span class="ptc">提示：体验金使用有效期为7天</span>');

	function init() {
		if (isLogin) {
			$("#goRegister").addClass('btn-disable'); //注册按钮置灰
		}
		if (_d < $(window).height()) {
			$(".welfare").addClass('anit');
		}
		//新手标数据
		var projectData = [{
			id: 1,
			apr: "12%",
			term: "15天",
			left: "13.70万"
		}, {
			id: 2,
			apr: "13%",
			term: "1个月",
			left: "15.70万"
		}];
		var projectTemp = "";
		projectData.forEach(function(item) {
			projectTemp += '<div class="swiper-slide"><div class="sw-page"><span class="txt-gray trow1">预期年化收益</span>' +
				'<span class="txt-orange trow2">' + item.apr + '</span>' +
				'<span class="txt-gray trow3">项目期限：' + item.term + '</span>' +
				'<span class="txt-gray trow4">剩余可投：' + item.left + '</span>' +
				'<div class="btn-yellow btn btn-invest" data-id="' + item.id + '">我要投资</div></div></div>';
		});
		$("#nhProject").html(projectTemp);
		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
		});
	}
	init();
	$(".content").on('touchmove', function() {
		_d = _d - document.body.scrollTop;
		if ($(".welfare").hasClass('.anit')) {
			return;
		} else if (_d < $(window).height()) {
			$(".welfare").addClass('anit');
		}
	});

	//我要投资
	$("body").on('click', '.btn-invest', function() {
		var id = $(this).attr('data-id');
		console.info("id-------", id);
		if (isLogin) {
			if (firstInvest) {
				if (id == 1) {
					window.location.href = "http://m.tuandai.com/pages/invest/gylds_detail.aspx?projectid=eb042acf-7018-4af2-8e58-929005335fab";
				} else {
					window.location.href = "http://m.tuandai.com/pages/invest/invest_detail.aspx?projectid=74274302-a39f-412f-97ff-d57d6c6fd626"
				}
			} else {
				showTips('新手标仅限未成功投资过的用户！');
			}
		} else {
			window.location.href = "https://m.tuandai.com/Index.aspx";
		}
	});
	//跳转到注册页面
	$("#goRegister").on('click', function() {
		if ($(this).hasClass('btn-disable')) {
			return;
		}
		window.location.href = "https://m.tuandai.com/user/register.aspx";
	});
	//查看我的红包
	$("#checkRedPacket").on('click', function() {
		if (isLogin) {
			window.location.href = "https://m.tuandai.com/Member/UserPrize/Index.aspx";
		} else {
			window.location.href = "https://m.tuandai.com/Index.aspx";
		}
	});
	//使用2888体验金
	$("#goTry").on('click', function() {
		if (isLogin) {
			if (hasUsed) {
				showTips('很抱歉，您的体验金已使用！');
			} else {
				window.location.href = "https://hd.tuandai.com/weixin/newhand/welfare/page2888.aspx?from=wxnewhand";
			}
		} else {
			window.location.href = "https://m.tuandai.com/Index.aspx";
		}
	});
	//马上领取
	$("#goActivity").on('click', function() {
		if (isLogin) {
			window.location.href = "https://hd.tuandai.com/weixin/yaoqianshu/index.aspx";
		} else {
			window.location.href = "https://m.tuandai.com/Index.aspx";
		}
	})

	$(".circle-outer").on('click', function() {
		var index = $(this).attr('data-index');
		var detData = jsonData[index];
		// console.info("detData-----", detData);

		$("#circleClass").addClass(detData.class);
		$("#detName").html(detData.content);
		$("#investCount").html(detData.investCount);
		$("#benefits").html(detData.benefits);
		$("#hike").html(detData.hike);
		var detTemp = '<li class="i-th"><div class="i-item">投资金额(元)</div><div class="i-item">期限(月)</div></li>';
		detData.list.forEach(function(item) {
			detTemp += '<li class="i-tr"><div class="i-item">' + item.money + '</div><div class="i-item">≥' + item.term + '</div></li>';
		});
		$("#detList").html(detTemp);
		$(".mask").show();
		$(".popup").hide();
		$(".pop-det").show();
		disableScrolling();
	});
	$(".masker, .btn-yes").on('click', function() {
		$(".mask").hide();
		$(".popup").hide();
		enableScrolling();
	});

	function showTips(content) {
		$(".mask").show()
		$(".popup").hide();
		$(".tips-content").html(content);
		$(".pop-tips").show();
		disableScrolling();
	}


	// ===============禁止滑动================
	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function scrolling(e) {
		preventDefault(e);
	}

	function disableScrolling() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', scrolling, false);
			window.addEventListener('touchmove', scrolling, false);
			// window.onmousewheel = document.onmousewheel = scrolling;
		}
	}

	function enableScrolling() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', scrolling, false);
			window.removeEventListener('touchmove', scrolling, false);
		}
		// window.onmousewheel = document.onmousewheel = null;
	}
	//弹出窗数据
	var jsonData = {
		"1": {
			"content": '土豪<br>玩法',
			"class": 'circle-yellow',
			"investCount": '106200元',
			"benefits": '518元(投资红包)',
			"hike": '1.49%',
			"list": [{
				"money": '200',
				"term": '1'
			}, {
				"money": '5000',
				"term": '1'
			}, {
				"money": '10000',
				"term": '3'
			}, {
				"money": '13000',
				"term": '3'
			}, {
				"money": '20000',
				"term": '3'
			}, {
				"money": '22000',
				"term": '6'
			}, {
				"money": '36000',
				"term": '6'
			}]
		},
		"2": {
			"content": '学生<br>玩法',
			"class": 'circle-blue',
			"investCount": '200',
			"benefits": '8元(投资红包)',
			"hike": '48%',
			"list": [{
				"money": '200元',
				"term": '1'
			}]
		},
		"3": {
			"content": '金领<br>玩法',
			"class": 'circle-blue',
			"investCount": '58000元',
			"benefits": '366元(投资红包)',
			"hike": '1.26%',
			"list": [{
				"money": '22000',
				"term": '6',
			}, {
				"money": '36000',
				"term": '6'
			}]
		},
		"4": {
			"content": '工薪<br>玩法',
			"class": 'circle-blue',
			"investCount": '10000元',
			"benefits": '18元(投资红包)',
			"hike": '2.16%',
			"list": [{
				"money": '10000',
				"term": '1'
			}]
		},
		"5": {
			"content": '白领<br>玩法',
			"class": 'circle-yellow',
			"investCount": '32200元',
			"benefits": '164元(投资红包)',
			"hike": '1.38%',
			"list": [{
				"money": '200',
				"term": '1'
			}, {
				"money": '10000',
				"term": '1'
			}, {
				"money": '22000',
				"term": '6'
			}]
		}
	}
})();