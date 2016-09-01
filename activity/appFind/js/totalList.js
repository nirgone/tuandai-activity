(function() {
	FastClick.attach(document.body);
	var mySwiper;
	var requesting = false;
	var packetRequesting = false;
	var curPage = {
		charges: 1,
		redpacket: 1
	};
	var pageSize = 20;
	var _rankList;

	function init() {
		var h = $(window).height() - 45;
		$(".slide-page").height(h);
		//加载折线图数据
		Util.ajax({
			url: 'http://10.100.1.113:9005//ajaxCross/ajax_AppFind.ashx',
			type: 'post',
			dataType: 'json',
			data: {
				extendkey: '25AA3274FF9C820B772E58F4EB73015A',
				Cmd: 'GetAccumulatedData',
			},
			success: function(data) {
				console.info("data---charts-", data);
				if (data && data.result == 1) {
					$("#myRank").html(data.rank);
					$("#totalCharges").html(data.TotalEranMoney);
					var xData = [];
					var yData = [];
					if (data.list && data.list.length > 0) {
						data.list = data.list.reverse();
						data.list.forEach(function(item) {
							var itemDate = Util.dateFormat(new Date(item.Adddate), "yyyy-MM-dd");
							var yesterday = Util.getDate(-1);
							if (itemDate == yesterday) {
								xData.push('昨天');
							} else {
								var addDate = new Date(item.Adddate);
								var m = (addDate.getMonth() + 1) < 10 ? "0" + (addDate.getMonth() + 1) : addDate.getMonth() + 1;
								var d = addDate.getDate() < 10 ? "0" + addDate.getDate() : addDate.getDate();
								xData.push(m + "." + d);
							}
							yData.push(+item.EarnMoney);
						});
						// 基于准备好的dom，初始化echarts实例
						var myChart = echarts.init(document.getElementById('myChart'));
						// 指定图表的配置项和数据
						var option = {
							xAxis: {
								boundaryGap: false,
								//刻度标签文字设置
								axisLabel: {
									inside: false,
									textStyle: {
										color: "#808080",
										fontSize: 10
									}
								},
								//x轴刻度文字数据
								data: xData,
								//坐标轴刻度相关设置
								axisTick: {
									show: false,
									lineStyle: {
										color: '#e6e6e6',
										width: 1
									},

								},
								//坐标轴轴线设置
								axisLine: {
									lineStyle: {
										color: '#e6e6e6',
										width: 1
									}
								},
							},
							yAxis: {
								boundaryGap: false,
								axisLabel: {
									show: false,
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								//坐标轴的分割段数
								splitNumber: 3,
								//坐标轴分割线设置
								splitLine: {
									lineStyle: {
										width: 1,
										color: '#e6e6e6'
									}
								}

							},
							//表格位置设置
							grid: {
								left: 20,
								right: 20,
								top: 35,
								// bottom: 0
								// containLabel : true
							},
							//表格数据
							series: [{
								type: 'line',
								lineStyle: {
									normal: {
										color: '#fd6040',
										width: 1
									}
								},
								symbol: '',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								areaStyle: {
									normal: {}
								},
								data: yData
							}],
							color: ['rgba(245, 137, 127, 0.08)'],
							textStyle: {
								color: '#fd6040'
							}
						};

						// 使用刚指定的配置项和数据显示图表。
						myChart.setOption(option);
					} else {
						Util.toast('暂无佣金数据')
					}
				} else if (data && data.result == 0) {
					Util.toast('暂无佣金数据')
				} else {
					Util.toast('服务器异常');
				}
			}
		});

		initSwiper();
		// initRankList();
		_rankList = new List('#rankList', {
			height: 380,
			loadList: function() {
				initRankList();
			},
		});
	}
	//初始化swiper
	function initSwiper() {
		mySwiper = new Swiper('.swiper-container', {
			onTransitionEnd: function(swiper) {
				var activeIndex = swiper.activeIndex;
				$(".pl-tab").removeClass('pl-active');
				$(".pl-tab").eq(activeIndex).addClass('pl-active');
				var len = $(".rpg-list").find("li").length;
				if (activeIndex == 1 && len < 1) {
					loadRedPackageList();
				}
			}
		});
	}
	init();
	//初始化佣金排行榜
	function initRankList() {
		if (requesting) {
			return;
		}
		Util.ajax({
			url: 'http://10.100.1.113:9005//ajaxCross/ajax_AppFind.ashx',
			type: 'post',
			dataType: 'json',
			hideLoading: false,
			data: {
				pageIndex: curPage.charges,
				pageSize: pageSize,
				Cmd: 'GettExtendEarnRecordRank'
			},
			beforeSend: function() {
				requesting = true;
			},
			success: function(data) {
				console.info("ranking-------", data);
				if (data && data.result == 1) {
					var rankList = data.list;
					if (rankList && rankList.length > 0) {
						var temp = "";
						rankList.forEach(function(item) {
							var classStr = "tc-tr";
							if (+item.rowId < 4) {
								classStr += ' seq';
							}
							temp += '<li class="' + classStr + '"><div>' + item.rowId + '</div>' +
								'<div>' + item.TelNo + '</div><div>' + item.TotalEranMoney + '</div></li>';
						});
						$("#rankList").find('.tc-list').append(temp);
					}
					curPage.charges++;
				} else if (data && data.result == 0) {
					Util.toast('暂无佣金排名数据');
				} else {
					Util.toast('服务器异常');
				}
			},
			complete: function(e) {
				requesting = false;
			}
		})
	}
	//tab切换
	$(".pl-tab").on('click', function() {
		var index = $(this).attr('data-index');
		$(".pl-tab").removeClass('pl-active');
		$(this).addClass('pl-active');
		mySwiper.slideTo(+index);
	});
	//加载红包列表
	function loadRedPackageList() {
		if (packetRequesting) {
			return;
		}
		Util.ajax({
			url: 'http://10.100.1.113:9005//ajaxCross/ajax_AppFind.ashx',
			type: 'post',
			dataType: 'json',
			hideLoading: false,
			data: {
				pageIndex: curPage.redpacket,
				pageSize: pageSize,
				Cmd: 'GetRedPacketPrizeList',
				extendkey: '725A5B680DE776CF12E394486B565C14'
			},
			beforeSend: function() {
				packetRequesting = true;
			},
			success: function(data) {
				console.info("redpacketList------", data);
				if (data && data.result == 1) {
					var packetList = data.list;
					if (packetList && packetList.length > 0) {
						var temp = "";
						packetList.forEach(function(item) {
							temp += '<li class="rpg-tr"><div class="rpg-type">' + item.PrizeName + '</div>' +
								'<div class="rpg-det"><div class="rn"><font class="font-34">¥</font>' +
								'<font class="rpg-num">' + item.PrizeValue + '</font></div>' +
								'<div class="btn-cont"><div class="btn-use">使用</div></div></div>' +
								'<div class="rpg-time"><span>' + item.CreateDate + '</span>' +
								'<span>邀请' + item.FromTelNo + '获得</span><span>有效期至' + item.ExpirationDate + '</span></div></li>';
						});
						$(".rpg-list").append(temp);
					}
				} else if (data && data.result == 0) {
					Util.toast('暂无红包数据');
				} else {
					Util.toast('服务器异常');
				}
			},
			complete: function(e) {
				packetRequesting = false;
			}
		})
	}
	//赚取更多
	$(".tc-btn").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppInviteFriend();
		} else {

		}
	});
	//如何赚取更多
	$("#goAct").on('click', function() {

	});
	//使用红包
	$(".btn-use").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			//4.3.4以上版本跳转
			//跳转到投资列表-理财计划
			Jsbridge.toAppWePlan();
		} else {
			//旧版本app跳转
		}
	});
})();