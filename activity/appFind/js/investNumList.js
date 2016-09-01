(function() {
	FastClick.attach(document.body);
	var pageSize = 20;
	var curPage = {
		allCurPage: 1,
		weekCurPage: 1,
		monthCurPage: 1
	};
	var allList, weekList, monthList;
	var mySwiper;
	var requesting = false;
	var _inviteDate = {
		week: {},
		month: {},
		all: {}
	};


	$('.pl-tab').on('click', function() {
		var index = $(this).attr('data-index');
		console.info("index-----", index);
		$('.pl-tab').removeClass('pl-active');
		$(this).addClass('pl-active');
		mySwiper.slideTo(+index);
		// initList(index);
	});


	//页面初始化
	function init() {
		var h = $(window).height() - 45 - 100;
		$(".slide-page").height(h);
		mySwiper = new Swiper('.swiper-container', {
			onTransitionEnd: function(swiper) {
				var activeIndex = swiper.activeIndex;
				$(".pl-tab").removeClass('pl-active');
				$(".pl-tab").eq(activeIndex).addClass('pl-active');
				initList(activeIndex);
				changeFloat(activeIndex);
			}
		});
		weekList = new List('#weekList', {
			loadList: function() {
				loadData('#weekList');
			},
		});
	}
	init();
	//list数据加载
	function loadData(el) {
		if (requesting) {
			return;
		}
		var wrapper = $(el);
		var type = wrapper.attr('data-type');

		var reqData = {
			Cmd: "GetInvestNumList",
			pageSize: pageSize,
			// extendkey: "725A5B680DE776CF12E394486B565C14"
		};
		reqData.extendkey = Util.getParam('extendkey');
		if (type == 'all') {
			reqData.type = 0;
			reqData.pageIndex = curPage.allCurPage;
			$("#txt").html('我总共已邀请');
		} else if (type == 'month') {
			reqData.type = 1;
			reqData.pageIndex = curPage.monthCurPage;
			$("#txt").html('我上月已邀请');
		} else {
			reqData.type = 2;
			reqData.pageIndex = curPage.weekCurPage;
			$("#txt").html('我上周已邀请');
		}

		Util.ajax({
			url: 'http://10.100.1.114:9005/ajaxCross/ajax_AppFind.ashx',
			type: 'post',
			dataType: 'json',
			data: reqData,
			hideLoading: false,
			beforeSend: function() {
				requesting = true;
			},
			success: function(data) {
				console.info("data------", data);
				$(".no-data").hide();
				if (data.result && data.result == 1) {
					var msg = data.msg ? JSON.parse(data.msg) : '';
					console.info("msg00", msg);
					var myInvest = msg.MyInvestCount ? msg.MyInvestCount : 0;
					var diff = msg.Difference ? msg.Difference : 0;
					$("#investCount").html(myInvest);
					$("#diff").html(diff);
					var list = msg.InvestNum ? msg.InvestNum : [];
					if (list.length > 0) {
						var temp = "";
						list.forEach(function(item) {
							var classStr = "in-row";
							if (+item.Num < 4) {
								classStr += " in-top";
							}
							temp += '<li class="' + classStr + '"><div class="in-seq">' + item.Num + '</div>' +
								'<div class="in-phone">' + item.TelNo + '</div>' +
								'<div class="in-num">' + item.InvestCount + '</div> </li>';
						});
						wrapper.find(".in-list").append(temp);
						if (type == "all") {
							//全部
							curPage.allCurPage++;
							_inviteDate.all.myInvest = myInvest
							_inviteDate.all.diff = diff;
						} else if (type == "month") {
							//最近一月
							curPage.monthCurPage++;
							_inviteDate.month.myInvest = myInvest
							_inviteDate.month.diff = diff;
						} else {
							//最近一周
							curPage.weekCurPage++;
							_inviteDate.week.myInvest = myInvest
							_inviteDate.week.diff = diff;
						}
					} else {
						if (type == 'all' && curPage.allCurPage == 1) {
							//全部
							$("#noAll").show();
						} else if (type == 'week' && curPage.weekCurPage == 1) {
							//最近一周
							$("#noWeek").show();
						} else if (type == 'month' && curPage.monthCurPage == 1) {
							//最近一月
							$("#noMonth").show();
						}
					}

				} else if (data.result && data.result == 0) {
					Util.toast('获取数据失败');
				} else {
					Util.toast('服务器异常');
				}
			},
			complete: function(e) {
				requesting = false;
			}
		});

	}

	//初始化某个tablist数据
	function initList(index) {
		var len = 0;
		if (index == 0) {
			len = $("#weekList").find("li").length;
			if (!weekList) {
				weekList = new List('#weekList', {
					loadList: function() {
						loadData('#weekList');
					},
				});
			} else if (len < 1) {
				loadData('#weekList');
			}
		} else if (index == 1) {
			len = $("#monthList").find("li").length;
			if (!monthList) {
				monthList = new List('#monthList', {
					loadList: function() {
						loadData('#monthList');
					}
				});
			} else if (len < 1) {
				loadData('#monthList');
			}
		} else {
			len = $("#allList").find("li").length;
			if (!allList) {
				allList = new List('#allList', {
					loadList: function() {
						loadData('#allList');
					},
				});
			} else if (len < 1) {
				loadData('#allList');
			}
		}
	}

	function changeFloat(index) {
		console.info(index, _inviteDate);
		var str = "";
		var _myInvest, _diff;
		if (index == 0) {
			str = "我上周已邀请";
			_myInvest = _inviteDate.week.myInvest;
			_diff = _inviteDate.week.diff;
		} else if (index == 1) {
			str = "我上月已邀请";
			_myInvest = _inviteDate.month.myInvest;
			_diff = _inviteDate.month.diff;
		} else {
			str = "我总共已邀请";
			_myInvest = _inviteDate.all.myInvest;
			_diff = _inviteDate.all.diff;
		}
		$("#txt").html(str);
		$("#investCount").html(_myInvest);
		$("#diff").html(_diff);
	}
	//邀请好友
	$("#inviteFriends").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppInviteFriend();
		} else {
			window.location.href = "";
		}
	});

})();