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
	//页面初始化
	function init() {

		mySwiper = new Swiper('.swiper-container', {
			onTransitionEnd: function(swiper) {
				var activeIndex = swiper.activeIndex;
				$(".tab").removeClass('tab-active');
				$(".tab").eq(activeIndex).addClass('tab-active');
				initList(activeIndex);
			}
		});
		allList = new List('#allList', {
			loadList: function() {
				loadData('#allList');
			},
		});
	}
	init();
	//list数据加载
	function loadData(el) {
		if(requesting) {
			return;
		}
		var wrapper = $(el);
		var type = wrapper.attr('data-type');
		//模拟ajax请求数据
		/*var list = [];
		for (var i = 0; i < 20; i++) {
			var obj = {
				phone: "145****3333",
				status: '是',
				time: '2016-08-26'
			};
			list.push(obj);
		}*/
		var reqData = {
			Cmd: "GetInvestList",
			pageSize: pageSize,
			extendkey: "725A5B680DE776CF12E394486B565C14"
		};
		if (type == 0) {
			reqData.type = 0;
			reqData.pageIndex = curPage.allCurPage;
		} else if (type == 1) {
			reqData.type = 2;
			reqData.pageIndex = curPage.monthCurPage;
		} else {
			reqData.type = 1;
			reqData.pageIndex = curPage.monthCurPage;
		}

		Util.ajax({
			url: 'http://10.100.1.114:9005/ajaxCross/ajax_AppFind.ashx',
			type: 'post',
			dataType: 'json',
			data: reqData,
			hideLoading: false,
			success: function(data) {
				console.info("data------", data);
				$(".no-data").hide();
				if (data.result && data.result == 1) {
					var list = data.msg ? JSON.parse(data.msg).InvestList : [];
					if (list.length > 0) {
						var temp = "";
						list.forEach(function(item) {
							var regiserTime = Util.dateFormat(new Date(item.AddDate), 'yyyy-MM-dd');
							temp += '<li class="c-row"><div class="il-item">' + item.TelNo + '</div>' +
								'<div class="il-item">' + item.IsTender + '</div>' +
								'<div class="il-item">' + regiserTime + '</div></li>';
						});
						wrapper.find(".c-list").append(temp);
						if (type == 0) {
							//全部
							curPage.allCurPage++;

						} else if (type == 1) {
							//最近一周
							curPage.weekCurPage++;
						} else {
							//最近一月
							curPage.monthCurPage++;
						}
					}else{
						if (type == 0 && curPage.allCurPage == 1) {
							//全部
							$("#noAll").show();
						} else if (type == 1 && curPage.weekCurPage == 1) {
							//最近一周
							$("#noWeek").show();
						} else if(type == 2 && curPage.monthCurPage == 1) {
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
	//点击tab切换
	$('.tab').on('click', function() {
		var index = $(this).attr('data-index');
		// console.info("index-----", index);
		$('.tab').removeClass('tab-active');
		$(this).addClass('tab-active');
		mySwiper.slideTo(+index);

		// initList(index);

	});
	//初始化某个tablist数据
	function initList(index) {
		var len = 0;
		if (index == 1) {
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
		} else if (index == 2) {
			len = $("#monthList").find("li").length;
			if (!monthList) {
				monthList = new List('#monthList', {
					loadList: function() {
						loadData('#monthList');
					}
				});
			}else if(len < 1) {
				loadData('#monthList');
			}
		} else {
			len = $("#allList").find("li").length;
			if(len < 1) {
				loadData('#allList');
			}
		}
	}
	//如何赚取更多佣金
	$(".btn-charges").on('click', function() {

	});
})();