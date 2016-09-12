(function() {
	FastClick.attach(document.body);
	//do your thing.
	var data = [];
	var curPage = 1;
	var pageSize = 20;
	var myScroll;
	var monthJson = {}; //记录每月佣金记录数量
	var requesting = false;
	var _list;

	function init() {
		//初始化list列表
		_list = new List('#chargesWrapper', {
			loadList: function() {
				loadData();
			},
		});
		//title右侧按钮
		Jsbridge.appLifeHook(null, null, function() {
			Jsbridge.setTitleComponent({
				titleContent: '每日佣金详情',
				rightbuttonVisible: true,
				rightbuttonContent: '已邀请好友',
				rightbuttonTyppe: 2
			});
		}, null, null);
		/*if (Util.isIOS()) {
			Jsbridge.setTitleComponent({
				titleContent: '每日佣金详情',
				rightbuttonVisible: true,
				rightbuttonContent: '排行榜',
				rightbuttonTyppe: 2
			});
		} else {
			Jsbridge.appLifeHook(null, null, function() {
				Jsbridge.setTitleComponent({
					titleContent: '每日佣金详情',
					rightbuttonVisible: true,
					rightbuttonContent: '已邀请好友',
					rightbuttonTyppe: 2
				});
			}, null, null);
		}*/
		//title右侧按钮点击事件 rightbuttonTyppe为1时有效
		Jsbridge.rightButtonClick(function() {
			console.info("rightButtonClick----");
			window.location.href = "./investList.html";
		});

	}


	function loadData() {

		if (requesting) {
			return;
		}
		Util.ajax({
			async: false,
			type: "post",
			url: Util.baseUrl,
			dataType: "json",
			hideLoading: false,
			data: {
				Cmd: "GettExtendEarnRecordList",
				pageIndex: curPage,
				extendKey: '25AA3274FF9C820B772E58F4EB73015A'
			},
			beforeSend: function() {
				requesting = true;
			},
			success: function(data) {
				console.info("data------", data);
				if (data.result && data.result == 1) {
					var list = data.list;
					if (list && list.length > 0) {
						var temp = "";
						list.forEach(function(item, index) {
							var _date = new Date(item.Adddate);
							var _y = _date.getFullYear();
							var _m = _date.getMonth() + 1 >= 10 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1);
							var _d = _date.getDate() >= 10 ? _date.getDate() : '0' + _date.getDate();

							var yestoday = Util.getDate(-1);
							var time = _m + "-" + _d;
							if (!monthJson[_y + _m]) {
								temp += '<li class="cl-month">' + _y + '年' + _m + '月</li>';
								monthJson[_y + _m] = 1;
							} else {
								monthJson[_y + _m] = +monthJson[_y + _m] + 1;
							}
							if (index == 0) {
								var itemDate = _y + "-" + _m + "-" + _d;
								if (itemDate == yestoday) {
									time = "昨天佣金";
								}
							}

							temp += ' <li class="c-row"><div class="c-date">' + time +
								'</div><div class="c-num">' + item.EarnMoney + '</div></li>';
						});
						$("#chargesList").append(temp);
						curPage++;
					} else {
						if (curPage == 1) {
							$(".no-data").show();
						}
					}
				} else if (data.result && data.result == 0) {
					Util.toast('获取数据失败');
					// $(".no-data").show();
				} else {
					Util.toast('服务器异常');
					// $(".no-data").show();
				}

			},
			complete: function(e) {
				requesting = false;
			}
		});
		/*//模拟获取json数据
		$(".icon-loader").show();
		var list;
		var startIndex;
		startIndex = pageSize * (curPage - 1);
		if (curPage * pageSize > data.length) {
			list = data.slice(startIndex, data.length);
		} else {
			list = data.slice(startIndex, startIndex + pageSize);
		}
		setTimeout(function() {
			$(".icon-loader").hide();
		}, 1000);*/


		// if (curPage == 1) {
		// 	myScroll = new IScroll('#chargesWrapper');
		// }

	}
	init();

	/*function getDate(dates) {
		var dd = new Date();
		dd.setDate(dd.getDate() + dates);
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1 >= 10 ? dd.getMonth() + 1 : '0' + (dd.getMonth() + 1);
		var d = dd.getDate() >= 10 ? dd.getDate() : '0' + dd.getDate();

		return y + "-" + m + "-" + d;
	}*/
	//如何赚取更多
	$(".btn-charges").on('click', function() {
		window.location.href = "./investList.html";
	});


})();