/*
跳转到登录: toAppLogin
跳转到注册: toAppRegister
返回首页: toAppMainPage
跳转到散标投资列表#--投资-优质项目--#: toAppInvestList
跳转到散标项目详情: toAppInvestDetails
跳转到申请资产标借款（我要借款子页面）: toAppLoan
跳转到我的投资列表: toAppMyInvest
跳转到我的投资详情: toAppMyInvestDetail
跳转到团宝箱: toAppTBX
跳转到现金红包: toAppCashRedPacket
跳转到投资红包: toAppOrdinaryRedPacket
跳转到加息卷: toAppKasiRedPacket
跳转到提现卷: toAppWithdrawalRoll
跳转到签到卡: toAppSingInRoll
跳转到精美礼品: toAppPresent
充值: toAppRecharge
我的财富: toAppPersonalCenter
邀请好友: toAppInviteFriend
活动分享: toAppActivity
WE计划列表#--投资-理财计划--#: toAppWePlan
跳转到WE计划项目详情: toAppWePlanDetail
发现: toAppFind
新手专区: toAppBeginnersArea
团贷公告列表: toAppPublicNoticeList
团贷公告详情: toAppPublicNoticeDetails
系统消息列表: toAppSystemMessagesList
系统消息详情: toAppSystemMessagesDetails
我要借款: toAppIWantBorrow
意见反馈: toAppFeedBack
团贷社区: toAppTuandaiBBS
自动投标: toAppAutoBid
我的借款列表: toAppMyBorrowing
我的借款详情: toAppMyBorrowingDetails
理财日历: toAppDebtCollectionCalendar
播放音乐: appPlayMusic
停止播放音乐: appStopMusic
设置原生标题栏文字及右侧按钮: setTitleComponent
title右侧按钮的type为2时的按钮点击事件: rightButtonClick
分享成功之后的回调: shareActivitySuccessed
投资列表-P2P-债权转让: toAppBondsTransferList
投资列表-定期理财-理财计划: toAppFinancialPlanListFi
投资列表-定期理财-定期项目: toAppRegularProjectListFi
P2P-债权转让项目详情: toAppBondsTransferDetails
定期理财-理财计划项目详情: toAppFinancialPlanDetailsFi
定期理财-定期项目项目详情: toAppRegularProjectDetailsFi
团贷签到: toAppSignIn
P2P-投资记录-we计划: toAppMyInvestWePlanList
we计划投资详情: toAppMyInvestWePlanDetails
定期理财-投资记录-理财计划: toAppMyInvestFinancialPlanListFi
定期理财-投资记录-定期项目: toAppMyInvestRegularProjectListFi
定期理财-充值: toAppTopUpFi
定期理财-理财日历: toAppDebtCollectionCalendarFi
理财计划投资详情: toAppMyInvestFinancialPlanDetailsFi
定期项目投资详情: toAppMyInvestRegularProjectListDetailsFi
证券交易: toAppSecuritiesTrading
开通存管提示弹窗: toAppBankOpenDepositoryAlert
非固定插件调用: exec
投资列表-定期理财-定期转让: toAppBondsTransferList_fi
定期理财-定期转让项目详情: toAppBondsTransferDetails_fi
会员中心: toAPPMenberCenter
新手体验金: toAppNoviceExperienceGold
个人资料: toAppPersonalData
个人资料-详细资料: toAppDetails
更新app（android）: toAppUpdateAPK
*/
(function(win) {

	function isIOS() {
		return navigator.userAgent.match(/(iPad|iPhone)/);
	}

	function connectWebViewJavascriptBridge(callback) {

		if (window.WebViewJavascriptBridge) {
			typeof callback === 'function' && callback.call(this, WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					typeof callback === 'function' && callback.call(this, WebViewJavascriptBridge);
				},
				false
			);
		}
	}

	function iosHandler(method, param, callback) {
		window[method](param, function(respones) {
			typeof callback && callback.call(this, respones);
		});
	}

	function androidHandler(method, param, callback) {

		win.WebViewJavascriptBridge.callHandler(
			method, param,
			function(responseData) {
				typeof callback === 'function' && callback.apply(this, arguments);
			}
		);
	}
	/*版本对比 
		@params: equal 是否包含等于 true 包含 false 不包含
		例：v1 > v2 return true 
			v1 >= v2 return true 
	*/
	function compareVersion(v1, v2, equal) {
		var arr = v1 && v1.split(".");
		var list = v2 && v2.split(".");
		if (!arr || !list) return;

		var i = 0;
		var arrlength = arr.length;
		var listlength = list.length;
		var length = arrlength > listlength ? arrlength : listlength; //取最长的数组长度
		var isEqual = false;
		var item1 = "";
		var item2 = "";
		for (; i < length; i++) {
			item1 = Number(arr[i]);
			item2 = Number(list[i]);

			item1 = isNaN(item1) ? 0 : item1;
			item2 = isNaN(item2) ? 0 : item2;
			if (i == length - 1)
				isEqual = item1 === item2 && equal; //是否包含等于

			if (item1 > item2 || isEqual) {
				return true;
			} else if (item1 < item2) {
				return false
			}
		}
		return false;
	}


	var Jsbridge = function() {};
	Jsbridge.prototype = {
		//关闭页面
		closeWeb: function() {
			try {
				if (isIOS()) {
					typeof CloseWeb === 'function' && CloseWeb();
				} else {
					androidHandler('CloseWeb', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//跳转到登录
		toAppLogin: function() {
			try {
				if (isIOS()) {
					typeof ToAppLogin === 'function' && ToAppLogin();
				} else {
					androidHandler('ToAppLogin', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到注册
		toAppRegister: function() {
			try {

				if (isIOS()) {
					typeof ToAppRegister === 'function' && ToAppRegister();
				} else {
					androidHandler('ToAppRegister', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 返回首页
		toAppMainPage: function() {
			try {

				if (isIOS()) {
					typeof ToAppHomePage === 'function' && ToAppHomePage();
				} else {
					androidHandler('ToAppHomePage', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到散标投资列表#--投资-优质项目--#
		toAppInvestList: function() {
			console.info(typeof ToAppIosInvest);
			try {
				if (isIOS()) {
					typeof ToAppScatteredList === 'function' && ToAppScatteredList();
				} else {
					androidHandler('ToAppScatteredList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到散标项目详情
		/**
			Id：string 项目id
			TypeId：int 项目类型 1-商友贷 6-净值标 7-股权抵押标9-车贷 10-消费贷 11-房贷 15-分期宝 17-股票配资 20-供应链22-项目宝（固定期限）23-项目宝（浮动期限）25-分期宝-正合普惠
			SubTypeId： int 项目类型子类型 1-分期宝 2-分期乐3-小树时代4-快来贷5-你我金融
			ProfitTypeId： int 收益类型 1-浮动 2-固定
			XmbSubType： boolean 项目宝子类型  0-默认值 1-私募股权2-房地产3-其它

		*/

		toAppInvestDetails: function(id, typeId, subTypeId, profitTypeId, xmbSubType) {
			try {
				if (isIOS()) {
					typeof ToAppScatteredDetails === 'function' && ToAppScatteredDetails(id, typeId, subTypeId, profitTypeId, xmbSubType);

				} else {
					var investParam = {
						'Id': id,
						'TypeId': typeId,
						'SubTypeId': subTypeId,
						'ProfitTypeId': profitTypeId,
						XmbSubType: xmbSubType
					};
					androidHandler('ToAppScatteredDetails', investParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到申请资产标借款（我要借款子页面）
		toAppLoan: function() {
			try {
				if (isIOS()) {
					typeof ToAppApplyForAssets === 'function' && ToAppApplyForAssets();

				} else {
					androidHandler('ToAppApplyForAssets', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到我的投资列表
		toAppMyInvest: function() {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestment === 'function' && ToAppMyInvestment();

				} else {
					androidHandler('ToAppMyInvestment', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到我的投资详情
		/**
			ProjectId:项目类型
			Type: 申购id
			InvestId:项目ID
			ProfitTypeId:
			IsWePlanX：是否为we计划X 可不传
			SubTypeId： 项目类型子id
			weXPlanType: 0：普通WE计划 1：WE分期宝 2：复投宝 3:复投宝新手标
		*/
		toAppMyInvestDetail: function(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestmentDetails === 'function' && ToAppMyInvestmentDetails(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title);
				} else {
					var investParam = {
						'ProjectId': projectId,
						'Type': type,
						'InvestId': investId,
						'ProfitTypeId': profitTypeId,
						'IsWePlanX': isWePlanX,
						'TDWeXPlanType': weXPlanType,
						'Title': title
					};
					androidHandler('ToAppMyInvestmentDetails', investParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到团宝箱
		toAppTBX: function() {
			try {
				if (isIOS()) {
					typeof ToAppTreasureChest === 'function' && ToAppTreasureChest();

				} else {
					androidHandler('ToAppTreasureChest', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到现金红包
		toAppCashRedPacket: function() {
			try {
				if (isIOS()) {
					typeof ToAppCashBonus === 'function' && ToAppCashBonus();

				} else {
					androidHandler('ToAppCashBonus', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到投资红包
		toAppOrdinaryRedPacket: function() {
			try {
				if (isIOS()) {
					typeof ToAppInvestBonus === 'function' && ToAppInvestBonus();

				} else {
					androidHandler('ToAppInvestBonus', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到加息卷
		toAppKasiRedPacket: function() {
			try {
				if (isIOS()) {
					typeof ToAppRateIncreaseBonus === 'function' && ToAppRateIncreaseBonus();

				} else {
					androidHandler('ToAppRateIncreaseBonus', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到提现卷
		toAppWithdrawalRoll: function() {
			try {
				if (isIOS()) {
					typeof ToAppReflectBonus === 'function' && ToAppReflectBonus();

				} else {
					androidHandler('ToAppReflectBonus', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		// 跳转到签到卡 
		toAppSingInRoll: function() {
			try {
				if (isIOS()) {
					typeof ToAppSignInCard === 'function' && ToAppSignInCard();

				} else {
					androidHandler('ToAppSignInCard', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到精美礼品
		toAppPresent: function() {
			try {
				if (isIOS()) {
					typeof ToAppExquisiteGift === 'function' && ToAppExquisiteGift();
				} else {
					androidHandler('ToAppExquisiteGift', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//充值
		toAppRecharge: function() {
			try {
				if (isIOS()) {
					typeof ToAppTopUp === 'function' && ToAppTopUp();
				} else {
					androidHandler('ToAppTopUp', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},


		//我的财富
		toAppPersonalCenter: function() {
			try {
				if (isIOS()) {
					typeof ToAppMy === 'function' && ToAppMy();
				} else {
					androidHandler('ToAppMy', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//邀请好友
		toAppInviteFriend: function() {
			try {
				if (isIOS()) {
					typeof ToAppInvitedShare === 'function' && ToAppInvitedShare();
				} else {
					androidHandler('ToAppInvitedShare', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		//活动分享
		/*
			shareType: 1-活动分享；2-邀请有礼；3-签到分享；4-活动分享2；5-活动分享3；
					   6-运营报告分享；7：品牌专题分享1；8-品牌专题分享2；9-活动分享4；
					   10-活动分享5；11-活动分享6；12-活动分享7；13-活动分享8；14-活动分享9；
					   15-活动分享10；16-活动分享11；17-活动分享12；18-活动分享13 ； 
					   19-活动分享14；20-活动分享15；21-活动分享16；22-活动分享17 ；
					   23-活动分享18；24-活动分享19；25-活动分享20；

		*/
		toAppActivity: function(shareType) {
			//不允许传2,3
			if (shareType == 2 || shareType == 3) {
				// alert("参数错误！");
				console.error('toAppActivity参数错误！');
				return;
			}
			try {
				if (isIOS()) {
					typeof ToAppActivity === 'function' && ToAppActivity(shareType);
				} else {
					var param = {
						FunctionType: shareType
					}
					androidHandler('ToAppActivity', param);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		//WE计划列表#--投资-理财计划--#
		toAppWePlan: function() {
			try {
				if (isIOS()) {
					typeof ToAppWePlanList === 'function' && ToAppWePlanList();
				} else {
					androidHandler('ToAppWePlanList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到WE计划项目详情
		/**
			weXPlanType: 0：普通WE计划 1：WE分期宝 2：复投宝 3:复投宝新手标
		*/
		toAppWePlanDetail: function(productId, typeId, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppWePlanDetails === 'function' && ToAppWePlanDetails(productId, typeId, subTypeId, weXPlanType, title);
				} else {
					var wxInvestParam = {
						ProductId: productId,
						TypeId: typeId,
						SubTypeId: subTypeId,
						TDWeXPlanType: weXPlanType,
						Title: title
					};

					// wxInvestParam = JSON.stringify(wxInvestParam);
					androidHandler('ToAppWePlanDetails', wxInvestParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		/*
		--------------------------------------------新增方法开始--------------------------------------------
		*/
		//发现
		toAppFind: function() {
			try {
				if (isIOS()) {
					typeof ToAppFind === 'function' && ToAppFind();
				} else {
					androidHandler('ToAppFind', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//新手专区
		toAppBeginnersArea: function() {
			try {
				if (isIOS()) {
					typeof ToAppBeginnersArea === 'function' && ToAppBeginnersArea();
				} else {
					androidHandler('ToAppBeginnersArea', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//团贷公告列表
		toAppPublicNoticeList: function() {
			try {
				if (isIOS()) {
					typeof ToAppPublicNoticeList === 'function' && ToAppPublicNoticeList();
				} else {
					androidHandler('ToAppPublicNoticeList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//团贷公告详情
		/*
			id: 公告id
			url: 如果有值表示跳转到该url地址的h5页面，否则跳转到原生页面,
			title: 目标页面标题
		*/
		toAppPublicNoticeDetails: function(id, url, title) {
			try {
				if (isIOS()) {
					typeof ToAppPublicNoticeDetails === 'function' && ToAppPublicNoticeDetails(id, url, title);
				} else {
					var reqParam = {
						id: id,
						url: url,
						title: title
					};
					androidHandler('ToAppPublicNoticeDetails', reqParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//系统消息列表
		toAppSystemMessagesList: function() {
			try {
				if (isIOS()) {
					typeof ToAppSystemMessagesList === 'function' && ToAppSystemMessagesList();
				} else {
					androidHandler('ToAppSystemMessagesList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//系统消息详情
		/*
			id: 系统消息id
			url: 如果有值表示跳转到该url地址的h5页面，否则跳转到原生页面,
			title: 目标页面标题
		*/
		toAppSystemMessagesDetails: function(id, url, title) {
			try {
				if (isIOS()) {
					typeof ToAppSystemMessagesDetails === 'function' && ToAppSystemMessagesDetails(id, url, title);
				} else {
					var reqParam = {
						id: id,
						url: url,
						title: title
					};
					androidHandler('ToAppSystemMessagesDetails', reqParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//我要借款
		toAppIWantBorrow: function() {
			try {
				if (isIOS()) {
					typeof ToAppIWantBorrow === 'function' && ToAppIWantBorrow();
				} else {
					androidHandler('ToAppIWantBorrow', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//意见反馈
		toAppFeedBack: function() {
			try {
				if (isIOS()) {
					typeof ToAppFeedBack === 'function' && ToAppFeedBack();
				} else {
					androidHandler('ToAppFeedBack', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//团贷社区
		toAppTuandaiBBS: function(title, url) {
			try {
				if (isIOS()) {
					typeof ToAppTuandaiBBS === 'function' && ToAppTuandaiBBS(title, url);
				} else {
					var reqParam = {
						'title': title,
						'url': url
					};
					androidHandler('ToAppTuandaiBBS', reqParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//自动投标
		toAppAutoBid: function() {
			try {
				if (isIOS()) {
					typeof ToAppAutoBid === 'function' && ToAppAutoBid();
				} else {
					androidHandler('ToAppAutoBid', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//我的借款列表
		toAppMyBorrowing: function() {
			try {
				if (isIOS()) {
					typeof ToAppMyBorrowing === 'function' && ToAppMyBorrowing();
				} else {
					androidHandler('ToAppMyBorrowing', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//我的借款详情
		/**
			ProjectId:项目类型
			Type: 申购id
			InvestId:项目ID
			ProfitTypeId:
			IsWePlanX：是否为we计划X 可不传
			SubTypeId： 项目类型子id
		*/
		toAppMyBorrowingDetails: function(projectId, type, investId, profitTypeId, isWePlanX, subTypeId) {
			try {
				if (isIOS()) {
					typeof ToAppMyBorrowingDetails === 'function' && ToAppMyBorrowingDetails(projectId, type, investId, profitTypeId, isWePlanX, subTypeId);
				} else {
					var investParam = {
						'ProjectId': projectId,
						'Type': type,
						'InvestId': investId,
						'ProfitTypeId': profitTypeId,
						IsWePlanX: isWePlanX
					};
					// investParam = JSON.stringify(investParam);
					androidHandler('ToAppMyBorrowingDetails', investParam);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		//理财日历
		toAppDebtCollectionCalendar: function() {
			try {
				if (isIOS()) {
					typeof ToAppDebtCollectionCalendar === 'function' && ToAppDebtCollectionCalendar();
				} else {
					androidHandler('ToAppDebtCollectionCalendar', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		/*
		 *--------------------------------------------新增方法结束--------------------------------------------
		 */
		appPlayMusic: function(musicUrl) {
			try {
				if (isIOS()) {
					typeof ToAppIosPlayMusic === 'function' && ToAppIosPlayMusic(musicUrl);
				} else {
					var param = {
						url: musicUrl
					};
					androidHandler('WebViewOnPlayMusic', param);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}

		},
		appStopMusic: function() {
			try {
				if (isIOS()) {
					typeof ToAppIosStopMusic === 'function' && ToAppIosStopMusic();
				} else {
					androidHandler('WebViewOnPauseMusic', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		//设置原生标题栏文字及右侧按钮
		/*
				titleContent 标题栏内容
				rightbuttonVisible 右侧按钮是否显示
				rightbuttonContent 右侧按钮内容
				rightbuttonTyppe 右侧按钮类型（ 1: 邀请好友、 2: 调用js事件） 为2时，点击按钮触发rightButtonClick
				*/
		setTitleComponent: function(params) {
			try {
				if (isIOS()) {
					typeof setTitleComponent === 'function' && setTitleComponent(params);
				} else {
					androidHandler('setTitleComponent', params);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		/*1124新增方法-----------4.9.0----*/
		//投资列表-P2P-债权转让
		toAppBondsTransferList: function() {
			try {
				if (isIOS()) {
					typeof ToAppBondsTransferList === 'function' && ToAppBondsTransferList();
				} else {
					androidHandler('ToAppBondsTransferList', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//投资列表-定期理财-理财计划
		toAppFinancialPlanListFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppFinancialPlanList_fi === 'function' && ToAppFinancialPlanList_fi();
				} else {
					androidHandler('ToAppFinancialPlanList_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//投资列表-定期理财-定期项目
		toAppRegularProjectListFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppRegularProjectList_fi === 'function' && ToAppRegularProjectList_fi();
				} else {
					androidHandler('ToAppRegularProjectList_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//P2P-债权转让项目详情
		toAppBondsTransferDetails: function(Id, TypeId) {
			try {
				if (isIOS()) {
					typeof ToAppBondsTransferDetails === 'function' && ToAppBondsTransferDetails(Id, TypeId);
				} else {
					var param = {
						Id: Id,
						TypeId: TypeId
					};
					androidHandler('ToAppBondsTransferDetails', param);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-理财计划项目详情

		toAppFinancialPlanDetailsFi: function(id, typeId, subTypeId) {
			try {
				if (isIOS()) {
					typeof ToAppFinancialPlanDetails_fi === 'function' && ToAppFinancialPlanDetails_fi(id, typeId, subTypeId);
				} else {
					var param = {
						"Id": id,
						"TypeId": typeId,
						"SubTypeId": subTypeId,
					};
					androidHandler('ToAppFinancialPlanDetails_fi', param);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-定期项目项目详情
		/**
			Id：string 项目id
			TypeId：int 项目类型 1-商友贷 6-净值标 7-股权抵押标9-车贷 10-消费贷 11-房贷 15-分期宝 17-股票配资 20-供应链22-项目宝（固定期限）23-项目宝（浮动期限）25-分期宝-正合普惠
			SubTypeId： int 项目类型子类型 1-分期宝 2-分期乐3-小树时代4-快来贷5-你我金融
			ProfitTypeId： int 收益类型 1-浮动 2-固定
			XmbSubType： boolean 项目宝子类型  0-默认值 1-私募股权2-房地产3-其它

		*/
		toAppRegularProjectDetailsFi: function(id, typeId, subTypeId, profitTypeId, xmbSubType) {
			try {
				if (isIOS()) {
					typeof ToAppRegularProjectDetails_fi === 'function' && ToAppRegularProjectDetails_fi(id, typeId, subTypeId, profitTypeId, xmbSubType);
				} else {
					var investParam = {
						'Id': id,
						'TypeId': typeId,
						'SubTypeId': subTypeId,
						'ProfitTypeId': profitTypeId,
						'XmbSubType': xmbSubType
					};
					androidHandler('ToAppRegularProjectDetails_fi', investParam);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//团贷签到
		toAppSignIn: function() {
			try {
				if (isIOS()) {
					typeof ToAppSignIn === 'function' && ToAppSignIn();
				} else {
					androidHandler('ToAppSignIn', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//P2P-投资记录-we计划
		toAppMyInvestWePlanList: function() {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestWePlanList === 'function' && ToAppMyInvestWePlanList();
				} else {
					androidHandler('ToAppMyInvestWePlanList', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//we计划投资详情
		/**
			ProjectId:项目类型
			Type: 申购id
			InvestId:项目ID
			ProfitTypeId:
			IsWePlanX：是否为we计划X 可不传
			SubTypeId： 项目类型子id
			weXPlanType: 0：普通WE计划 1：WE分期宝 2：复投宝 3:复投宝新手标
		*/
		toAppMyInvestWePlanDetails: function(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestWePlanDetails === 'function' && ToAppMyInvestWePlanDetails(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title);
				} else {
					var param = {
						'ProjectId': projectId,
						'Type': type,
						'InvestId': investId,
						'ProfitTypeId': profitTypeId,
						'IsWePlanX': isWePlanX,
						'TDWeXPlanType': weXPlanType,
						'Title': title
					};
					androidHandler('ToAppMyInvestWePlanDetails', param);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-投资记录-理财计划
		toAppMyInvestFinancialPlanListFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestFinancialPlanList_fi === 'function' && ToAppMyInvestFinancialPlanList_fi();
				} else {
					androidHandler('ToAppMyInvestFinancialPlanList_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-投资记录-定期项目
		toAppMyInvestRegularProjectListFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestRegularProjectList_fi === 'function' && ToAppMyInvestRegularProjectList_fi();
				} else {
					androidHandler('ToAppMyInvestRegularProjectList_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-充值
		toAppTopUpFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppTopUp_fi === 'function' && ToAppTopUp_fi();
				} else {
					androidHandler('ToAppTopUp_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-理财日历
		toAppDebtCollectionCalendarFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppDebtCollectionCalendar_fi === 'function' && ToAppDebtCollectionCalendar_fi();
				} else {
					androidHandler('ToAppDebtCollectionCalendar_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//理财计划投资详情
		/**
			ProjectId:项目类型
			Type: 申购id
			InvestId:项目ID
			ProfitTypeId:
			IsWePlanX：是否为we计划X 可不传
			SubTypeId： 项目类型子id
			weXPlanType: 0：普通WE计划 1：WE分期宝 2：复投宝 3:复投宝新手标
		*/
		toAppMyInvestFinancialPlanDetailsFi: function(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestFinancialPlanDetails_fi === 'function' && ToAppMyInvestFinancialPlanDetails_fi(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title);
				} else {
					var investParam = {
						'ProjectId': projectId,
						'Type': type,
						'InvestId': investId,
						'ProfitTypeId': profitTypeId,
						'IsWePlanX': isWePlanX,
						'TDWeXPlanType': weXPlanType,
						'Title': title
					};
					androidHandler('ToAppMyInvestFinancialPlanDetails_fi', investParam);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期项目投资详情
		/**
			ProjectId:项目类型
			Type: 申购id
			InvestId:项目ID
			ProfitTypeId:
			IsWePlanX：是否为we计划X 可不传
			SubTypeId： 项目类型子id
			weXPlanType: 0：普通WE计划 1：WE分期宝 2：复投宝 3:复投宝新手标
		*/
		toAppMyInvestRegularProjectListDetailsFi: function(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppMyInvestRegularProjectListDetails_fi === 'function' && ToAppMyInvestRegularProjectListDetails_fi(projectId, type, investId, profitTypeId, isWePlanX, subTypeId, weXPlanType, title);
				} else {
					var investParam = {
						'ProjectId': projectId,
						'Type': type,
						'InvestId': investId,
						'ProfitTypeId': profitTypeId,
						'IsWePlanX': isWePlanX,
						'TDWeXPlanType': weXPlanType,
						'Title': title
					};
					androidHandler('ToAppMyInvestRegularProjectListDetails_fi', investParam);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

		/*1124新增方法 ---end*/

		/*161226新增方法----4.9.3-------*/
		//证券交易
		toAppSecuritiesTrading: function() {
			try {
				if (isIOS()) {
					typeof ToAppSecuritiesTrading === 'function' && ToAppSecuritiesTrading();
				} else {
					androidHandler('ToAppSecuritiesTrading', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//开通存管提示弹窗
		toAppBankOpenDepositoryAlert: function() {
			try {
				if (isIOS()) {
					typeof ToAppBankOpenDepositoryAlert === 'function' && ToAppBankOpenDepositoryAlert();
				} else {
					androidHandler('ToAppBankOpenDepositoryAlert', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		/*161226新增方法-----------end*/

		/*170324新增方法开始------.5.0.1-------------------*/
		//投资列表-定期理财-定期转让
		toAppBondsTransferListFi: function() {
			try {
				if (isIOS()) {
					typeof ToAppBondsTransferList_fi === 'function' && ToAppBondsTransferList_fi();
				} else {
					androidHandler('ToAppBondsTransferList_fi', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//定期理财-定期转让项目详情
		/**
			productId: 项目ID
			typeId: 项目类型 1:商友贷 3:零售贷 6:净值标 7:股权抵押标 9:车贷 11:房贷 15:分期宝  18:私募宝 20:供应链金融   22:项目宝固定 23：项目宝浮动 25正合普惠 100：we计划 
			subTypeId: 子类型
			weXPlanType: we计划类型
			title: 标题
		*/
		toAppBondsTransferDetailsFi: function(productId, typeId, subTypeId, weXPlanType, title) {
			try {
				if (isIOS()) {
					typeof ToAppBondsTransferDetails_fi === 'function' && ToAppBondsTransferDetails_fi(productId, typeId, subTypeId, weXPlanType, title);
				} else {
					var param = {
						'Id': productId,
						'TypeId': typeId
					};
					androidHandler('ToAppBondsTransferDetails_fi', param);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//会员中心
		toAPPMenberCenter: function() {
			try {
				if (isIOS()) {
					typeof ToAPPMenberCenter === 'function' && ToAPPMenberCenter();
				} else {
					androidHandler('ToAPPMenberCenter', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//新手体验金
		toAppNoviceExperienceGold: function() {
			try {
				if (isIOS()) {
					typeof ToAppNoviceExperienceGold === 'function' && ToAppNoviceExperienceGold();
				} else {
					androidHandler('ToAppNoviceExperienceGold', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//个人资料
		toAppPersonalData: function() {
			try {
				if (isIOS()) {
					typeof ToAppPersonalData === 'function' && ToAppPersonalData();
				} else {
					androidHandler('ToAppPersonalData', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//个人资料-详细资料
		toAppDetails: function() {
			try {
				if (isIOS()) {
					typeof ToAppDetails === 'function' && ToAppDetails();
				} else {
					androidHandler('ToAppDetails', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//更新app（android调用原生方法，ios直接唤起AppStore）
		toAppUpdateAPK: function() {
			console.info('toAppUpdateAPK--');
			try {
				if (isIOS()) {
					window.location.href = 'https://itunes.apple.com/cn/app/%E5%9B%A2%E8%B4%B7%E7%BD%91-%E5%AE%89%E5%85%A8%E5%90%88%E8%A7%84%E7%9A%84%E7%90%86%E8%B4%A2%E5%B9%B3%E5%8F%B0/id796440356?mt=8';
				} else {
					androidHandler('ToAppUpdateAPK', null);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},


		/*------170324新增方法开始-----end--------------*/

		//非固定插件调用
		/*
		params,--参数 （json），
		iosName：ios方法名
		androidName：android方法名
		callback：回调函数

		*/
		exec: function(methodName, params, callback) {
			try {
				if (isIOS()) {
					console.log("ios-func", methodName);
					iosHandler(methodName, params, callback);

				} else {
					console.log("android-func");
					androidHandler(methodName, params, callback);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		isNewVersion: function() {
			var str = navigator.userAgent;
			var arr = str.match(/\[([^\[\]]*)\]/);

			if (arr && arr[1]) {
				var vst = arr[1].split('_');
				var vstr = vst[0] + vst[1];
				if (vst && vst[vst.length - 1] >= '4.3.4' && (vstr == "tuandaiappandroid" || vstr == "tuandaiappIOS")) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		},

		isCorrectVersion: function(v, equal) {
			var str = navigator.userAgent;
			var arr = str.match(/\[([^\[\]]*)\]/);
			if (arr && arr[1]) {
				var vst = arr[1].split('_');
				var curVersion = vst[vst.length - 1];
				var isCorrect = compareVersion(curVersion, v, equal);
				return isCorrect;
			} else {
				return false;
			}
		},


		//监听app事件
		registeEvent: function(method, callback) {
			if (isIOS()) {
				window[method] = function(data) {
					typeof callback === 'function' && callback.apply(this, arguments);
				}
			} else {
				//android需要注册方法
				connectWebViewJavascriptBridge(function(bridge) {
					try {
						if (!window.WebViewJavascriptBridge._messageHandler) {
							bridge.init(function(message, responseCallback) {
								responseCallback(data);
							});
						}
					} catch (e) {
						console.error("jsbridge-----error--", e);
					}

					bridge.registerHandler(method, function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						responseCallback(responseData);
						typeof callback === 'function' && callback.apply(this, arguments);
					});

				});
			}

		},
		//title右侧按钮的type为2时的按钮点击事件
		rightButtonClick: function(callback) {
			this.registeEvent('RightButtonClick', callback);
		},

		//分享成功之后的回调
		shareActivitySuccessed: function(callback) {
			this.registeEvent('shareActivitySuccessed', callback);
		},



		// 生命周期
		/*
            initCb：初始化回调
            loginTokenCb：获取loginToken用于登录（已废弃）
            readyCb：打开活动页回调（只执行一次）
            webonPauseCb：离开活动页回调
            webonDestroyCb：销毁进程回调
            webonResumeHomeCb: 离开后回到页面时回调
         **/
		appLifeHook: function(initCb, readyCb, webonPauseCb, webonDestroyCb, webonResumeHomeCb) {
			if (isIOS()) {
				/*				window.ToAppIosPostLoginToken = function(data) {

									loginTokenCb.apply(this, arguments);
								}*/
				/*
				step:
				1： h5界面加载完毕 注册h5调用原生的方法， 此时原生调用h5 传参数1
				2： 当前的h5界面 将进入了下一个界面或者上一个界面。 此时传参2
				3: 用户按home键 将程序退至后台， 此时传参3
				4: 用户重新启动程序(程序由后台切换至前台), 此时传数4
				*/
				win.ToAppLifeCycle = function(step) {
					switch (step) {
						case 1:
							typeof readyCb === 'function' && readyCb.apply(this, arguments);
							break;
						case 2:
							typeof webonPauseCb === 'function' && webonPauseCb.apply(this, arguments);
							break;
						case 3:
							typeof webonPauseCb === 'function' && webonPauseCb.apply(this, arguments);
							break;
						case 4:
							typeof webonResumeHomeCb === 'function' && webonResumeHomeCb.apply(this, arguments);
							break;
					}

				}
			} else {
				connectWebViewJavascriptBridge(function(bridge) {
					try {
						if (!window.WebViewJavascriptBridge._messageHandler) {

							bridge.init(function(message, responseCallback) {
								console.log('JS got a message', message);
								var data = {
									'Javascript Responds': '测试中文!'
								};
								console.log('JS responding with', data);
								typeof initCb === 'function' && initCb.apply(this, arguments);
								responseCallback(data);
							});
						}
					} catch (e) {
						console.error("jsbridge-----error--", e);
					}

					bridge.registerHandler("LoginToken", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						// typeof loginTokenCb === 'function' && loginTokenCb.apply(this, arguments);
						responseCallback(responseData);
					});

					bridge.registerHandler("WebonResume", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						typeof readyCb === 'function' && readyCb.apply(this, arguments);
						responseCallback(responseData);
					});
					bridge.registerHandler("WebonResumeHome", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						typeof webonResumeHomeCb === 'function' && webonResumeHomeCb.apply(this, arguments);
						responseCallback(responseData);
					});

					bridge.registerHandler("WebonPause", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						typeof webonPauseCb === 'function' && webonPauseCb.apply(this, arguments);

						responseCallback(responseData);
					});
					bridge.registerHandler("WebonDestroy", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						typeof webonDestroyCb === 'function' && webonDestroyCb.apply(this, arguments);
						responseCallback(responseData);
					});
				});
			}

		}

	}
	var jsbridge = new Jsbridge();
	win.Jsbridge = jsbridge;
})(window);