/*
旧版android，新版参考APP对照表文档:
登录       			: ToAppLoginOrRegister
注册       			: ToAppLoginOrRegister
首页（关闭活动页面并返回首页）: ColseWeb
散标投资列表#--优质项目--#         : ToAppInvestList
散标项目详情        : InvestProjectDetails(参数：id, type, subtype, ProfitTypeId)
我要借款 			: ToAppLoan
WE计划列表#--理财计划--# : ToAppWEInvestList   
WE计划项目详情		:WXInvestDetail
我的投资列表  		：InvestListActivity
投资详情           	: MyInvestDetail
团宝箱      		: ToAppTBX
现金红包   			: ToAppCashRedPacket
投资红包   			: ToAppOrdinaryRedPacket
加息卷      		：ToAppKasiRedPacket
提现卷      		: ToAppWithdrawalRoll
抵扣卷      		: ToAppRebateRedPacket
签到卡       		: ToAppSingInRoll
精美礼品   			: ToAppPresent
充值                ：ToAppRecharge
安全中心            : ToAppSecurityCenter
手机验证            : ToAppMobileVerify
身份证验证        	: ToAppIdentityVerify
我的财富			：ToAppPersonalCenter 
邀请好友			：ToAppInviteFriend
活动分享			：ToActivityAppInviteFriend

anadroid版本号：[tuandaiapp_android_4.3.3]

生命周期回调（WebonResume，WebonPause，WebonDestroy）*/

/*
旧版ios，新版参考APP对照表文档:                  
登录       			: ToAppIosLogin
注册       			: ToAppIosRegister
首页         		: ToAppIosMainPage
散标投资列表#--优质项目--#        : ToAppIosInvest
散标项目详情        : ToAppIosProjectDetail (参数：projectId)
我要借款 			: ToAppIosBorrow
WE计划列表#--理财计划--# : ToAppIosWePlan
WE计划项目详情		:ToAppIosWePlanProjectDetail
我的投资列表  		：ToAppIosMyInvest
投资详情           	: ToAppIosInvestDetail
团宝箱      		: ToAppIosTreasurChest
现金红包   			: ToAppIosCashBonus
投资红包   			: ToAppIosInvestBonus
加息卷      		：ToAppIosAddRateCoupon
提现卷      		: ToAppIosWithdrawalCoupon
抵扣卷      		: ToAppIosDeductionCoupon
签到卡       		: ToAppIosAdCard
精美礼品   			: ToAppIosBoutiqueGift
充值                ：ToAppIosRecharge
安全中心            : ToAppIosSaftCenter
手机验证            : ToAppIosPhoneValidtion
身份证验证        	: ToAppIosAuthenticationCode
                    **/

(function(win) {
	// console.info("Jsbridge--------");

	function isIOS() {
		var flag = false;
		if (navigator.userAgent.match(/(iPad|iPhone)/)) {
			flag = true;
		} else if (navigator.userAgent.match(/(Android)/)) {
			flag = false;
		}
		return flag;
	}

	function getParams(str, key) {
		str = str.replace(/\s+/g, "");
		var reg = new RegExp(key + "=([^;]+);");
		var subStr = str.match(reg);
		if (subStr) {
			return subStr[1];
		} else {
			return "";
		}
	}

	function connectWebViewJavascriptBridge(callback) {

		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
		}
	}

	function androidHandler(method, param, callback) {
		/*if (param) {
			param = JSON.parse(param);
		}*/
		win.WebViewJavascriptBridge.callHandler(
			method, param,
			function(responseData) {
				// document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
				if (callback && typeof callback == "function") {
					console.log(23434);
					callback(responseData);
				}
			}
		);
	}

	var Jsbridge = function() {
		var me = this;
	};
	Jsbridge.prototype = {
		constructor: Jsbridge,
		getVersion: function() {
			var userAgent = navigator.userAgent;
		},
		//跳转到登录
		toAppLogin: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosLogin == "function") {
						ToAppIosLogin();
					}
					if (typeof ToAppLogin == "function") {
						ToAppLogin();
					}
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
					if (typeof ToAppIosRegister == "function") {
						ToAppIosRegister();
					}
					if (typeof ToAppRegister == "function") {
						ToAppRegister();
					}
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
					if (typeof ToAppIosMainPage == "function") {
						ToAppIosMainPage();
					}
					if (typeof ToAppHomePage == "function") {
						ToAppHomePage();
					}
				} else {
					androidHandler('ColseWeb', null);
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
					if (typeof ToAppIosInvest == "function") {
						ToAppIosInvest();
					}
					if (typeof ToAppScatteredList == "function") {
						ToAppScatteredList();
					}
				} else {
					androidHandler('ToAppInvestList', null);
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

		toAppInvestDetails: function(Id, TypeId, SubTypeId, ProfitTypeId, XmbSubType) {
			try {
				if (isIOS()) {
					if (typeof ToAppIosProjectDetail == "function") {
						// console.info("11111");
						ToAppIosProjectDetail(Id, TypeId, SubTypeId, ProfitTypeId, XmbSubType);
					}
					if (typeof ToAppScatteredDetails == "function") {
						// console.info("222222222");
						ToAppScatteredDetails(Id, TypeId, SubTypeId, ProfitTypeId, XmbSubType);
					}
				} else {
					var investParam = {
						'Id': Id,
						'TypeId': TypeId,
						'SubTypeId': SubTypeId,
						'ProfitTypeId': ProfitTypeId,
						XmbSubType: XmbSubType
					};
					// investParam = JSON.stringify(investParam);
					androidHandler('InvestProjectDetails', investParam);
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
					if (typeof ToAppIosBorrow == "function") {
						ToAppIosBorrow();

					}
					if (typeof ToAppApplyForAssets == "function") {
						ToAppApplyForAssets();
					}
				} else {
					androidHandler('ToAppLoan', null);
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
					if (typeof ToAppIosMyInvest == "function") {
						ToAppIosMyInvest();
					}
					if (typeof ToAppMyInvestment == "function") {
						ToAppMyInvestment();
					}
				} else {
					androidHandler('InvestListActivity', null);
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
		*/
		toAppMyInvestDetail: function(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId) {
			try {
				if (isIOS()) {
					if (typeof ToAppIosInvestDetail == "function") {
						ToAppIosInvestDetail(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId);
					}
					if (typeof ToAppMyInvestmentDetails == "function") {
						ToAppMyInvestmentDetails(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId);
					}
				} else {
					var investParam = {
						'ProjectId': ProjectId,
						'Type': Type,
						'InvestId': InvestId,
						'ProfitTypeId': ProfitTypeId,
						IsWePlanX: IsWePlanX
					};
					// investParam = JSON.stringify(investParam);
					androidHandler('MyInvestDetail', investParam);
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
					if (typeof ToAppIosTreasurChest == "function") {
						ToAppIosTreasurChest();
					}
					if (typeof ToAppTreasureChest == "function") {
						ToAppTreasureChest();
					}
				} else {
					androidHandler('ToAppTBX', null);
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
					if (typeof ToAppIosCashBonus == "function") {
						ToAppIosCashBonus();
					}
					if (typeof ToAppCashBonus == "function") {
						ToAppCashBonus();
					}
				} else {
					androidHandler('ToAppCashRedPacket', null);
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
					if (typeof ToAppIosInvestBonus == "function") {
						ToAppIosInvestBonus();
					}
					if (typeof ToAppInvestBonus == "function") {
						ToAppInvestBonus();
					}
				} else {
					androidHandler('ToAppOrdinaryRedPacket', null);
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
					if (typeof ToAppIosAddRateCoupon == "function") {
						ToAppIosAddRateCoupon();
					}
					if (typeof ToAppRateIncreaseBonus == "function") {
						ToAppRateIncreaseBonus();
					}
				} else {
					androidHandler('ToAppKasiRedPacket', null);
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
					if (typeof ToAppIosWithdrawalCoupon == "function") {
						ToAppIosWithdrawalCoupon();
					}
					if (typeof ToAppReflectBonus == "function") {
						ToAppReflectBonus();
					}
				} else {
					androidHandler('ToAppWithdrawalRoll', null);
					androidHandler('ToAppReflectBonus', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到抵扣卷（已废弃）
		toAppRebateRedPacket: function() {
			try {
				if (isIOS()) {
					ToAppIosDeductionCoupon();
				} else {
					androidHandler('ToAppRebateRedPacket', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到签到卡 
		toAppSingInRoll: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosAdCard == "function") {
						ToAppIosAdCard();
					}
					if (typeof ToAppSignInCard == "function") {
						ToAppSignInCard();
					}
				} else {
					androidHandler('ToAppSingInRoll', null);
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
					if (typeof ToAppIosBoutiqueGift == "function") {
						ToAppIosBoutiqueGift();
					}
					if (typeof ToAppExquisiteGift == "function") {
						ToAppExquisiteGift();
					}
				} else {
					androidHandler('ToAppPresent', null);
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
					if (typeof ToAppIosRecharge == "function") {
						ToAppIosRecharge();
					}
					if (typeof ToAppTopUp == "function") {
						ToAppTopUp();
					}
				} else {
					androidHandler('ToAppRecharge', null);
					androidHandler('ToAppTopUp', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//安全中心
		toAppSecurityCenter: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosSaftCenter == "function") {
						ToAppIosSaftCenter();
					}
					if (typeof ToAppSecurityCenter == "function") {
						ToAppSecurityCenter();
					}
				} else {
					androidHandler('ToAppSecurityCenter', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//手机验证
		toAppMobileVerify: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosPhoneValidtion == "function") {
						ToAppIosPhoneValidtion();
					}
					if (typeof ToAppPhoneVerification == "function") {
						ToAppPhoneVerification();
					}
				} else {
					androidHandler('ToAppMobileVerify', null);
					androidHandler('ToAppPhoneVerification', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//身份证验证
		toAppIdentityVerify: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosAuthenticationCode == "function") {
						ToAppIosAuthenticationCode();
					}
					if (typeof ToAppIDVerification == "function") {
						ToAppIDVerification();
					}
				} else {
					androidHandler('ToAppIdentityVerify', null);
					androidHandler('ToAppIDVerification', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//我的财富
		toAppPersonalCenter: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosMyTreasure == "function") {
						ToAppIosMyTreasure();
					}
					if (typeof ToAppMy == "function") {
						ToAppMy();
					}
				} else {
					androidHandler('ToAppPersonalCenter', null);
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
					if (typeof ToAppIosInviteFriend == "function") {
						ToAppIosInviteFriend();
					}
					if (typeof ToAppInvitedShare == "function") {
						ToAppInvitedShare();
					}
				} else {
					androidHandler('ToAppInviteFriend', null);
					androidHandler('ToAppInvitedShare', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//活动分享
		toActivityAppInviteFriend: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosActivityShare == "function") {
						ToAppIosActivityShare();
					}
					if (typeof ToAppActivitiesShare == "function") {
						ToAppActivitiesShare();
					}
				} else {
					androidHandler('ToActivityAppInviteFriend', null);
					androidHandler('ToAppActivitiesShare', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//活动分享
		/*
			shareType: 1-活动分享；2-邀请有礼；3-签到分享；4-活动分享2；5-活动分享3；
					   6-运营报告分享；7：品牌专题分享1；8-品牌专题分享2
		*/
		ToAppActivity: function(shareType) {
			//不允许传2,3
			if (shareType == 2 || shareType == 3) {
				alert("参数错误！");
				return;
			}
			try {
				if (isIOS()) {

					if (typeof ToAppActivity == "function") {
						ToAppActivity(shareType);
					}
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
		toAppActivity: function(shareType) {
			this.ToAppActivity(shareType);
		},
		//WE计划列表#--投资-理财计划--#
		toAppWePlan: function() {
			try {
				if (isIOS()) {
					if (typeof ToAppIosWePlan == "function") {
						ToAppIosWePlan();
					}
					if (typeof ToAppWePlanList == "function") {
						ToAppWePlanList();
					}
				} else {
					androidHandler('ToAppWEInvestList', null);
					androidHandler('ToAppWePlanList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		// 跳转到WE计划项目详情
		toAppWePlanDetail: function(productId, typeId, subTypeId) {
			try {
				if (isIOS()) {
					if (typeof ToAppIosWePlanProjectDetail == "function") {
						ToAppIosWePlanProjectDetail(productId, typeId, subTypeId);
					}
					if (typeof ToAppWePlanDetails == "function") {
						ToAppWePlanDetails(productId, typeId, subTypeId);
					}
				} else {
					var wxInvestParam = {
						ProductId: productId,
						TypeId: typeId,
						SubTypeId: subTypeId
					};

					// wxInvestParam = JSON.stringify(wxInvestParam);
					androidHandler('WXInvestDetail', wxInvestParam);
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
					ToAppFind();
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
					ToAppBeginnersArea();
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
					ToAppPublicNoticeList();
				} else {
					androidHandler('ToAppPublicNoticeList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//团贷公告详情
		toAppPublicNoticeDetails: function(id) {
			try {
				if (isIOS()) {
					ToAppPublicNoticeDetails(id);
				} else {
					var reqParam = {
						id: id
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
					ToAppSystemMessagesList();
				} else {
					androidHandler('ToAppSystemMessagesList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},
		//系统消息详情
		toAppSystemMessagesDetails: function(id) {
			try {
				if (isIOS()) {
					ToAppSystemMessagesDetails(id);
				} else {
					var reqParam = {
						id: id
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
					ToAppIWantBorrow();
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
					ToAppFeedBack();
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
					ToAppTuandaiBBS(title, url);
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
					ToAppAutoBid();
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
					ToAppMyBorrowing();
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
		toAppMyBorrowingDetails: function(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId) {
			try {
				if (isIOS()) {
					ToAppMyBorrowingDetails(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId);
				} else {
					var investParam = {
						'ProjectId': ProjectId,
						'Type': Type,
						'InvestId': InvestId,
						'ProfitTypeId': ProfitTypeId,
						IsWePlanX: IsWePlanX
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
					ToAppDebtCollectionCalendar();
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
					ToAppIosPlayMusic(musicUrl);
				} else {
					var param = {
						url: musicUrl
					};
					// param = JSON.stringify(param);
					androidHandler('WebViewOnPlayMusic', param);
				}

			} catch (e) {
				console.info("不支持jsbridge", e);
			}

		},
		appStopMusic: function() {
			try {
				if (isIOS()) {
					ToAppIosStopMusic();
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
					setTitleComponent(params);
				} else {
					androidHandler('setTitleComponent', params);
				}
			} catch (e) {
				console.info("不支持jsbridge", e);
			}
		},

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
					 console.log("ios-func",methodName);
                    window[methodName]([params,callback]);

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
		/*
			version: 版本号
			mode: 0-等于；1-大于等于
		*/
		isCorrectVersion: function(version, mode) {
			mode = mode ? mode : 1;
			var str = navigator.userAgent;
			var arr = str.match(/\[([^\[\]]*)\]/);

			if (arr && arr[1]) {
				var vst = arr[1].split('_');
				var vstr = vst[0] + vst[1];
				if (mode == 1) {
					if (vst && vst[vst.length - 1] >= version && (vstr == "tuandaiappandroid" || vstr == "tuandaiappIOS")) {
						return true;
					} else {
						return false;
					}
				} else {
					if (vst && vst[vst.length - 1] == version && (vstr == "tuandaiappandroid" || vstr == "tuandaiappIOS")) {
						return true;
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		},
		isDisable: function() {
			var str = navigator.userAgent;
			var arr = str.match(/\[([^\[\]]*)\]/);

			if (arr && arr[1]) {
				var vst = arr[1].split('_');
				var vstr = vst[0] + vst[1];
				if (vst && vst[vst.length - 1] == '4.3.5' && (vstr == "tuandaiappandroid" || vstr == "tuandaiappIOS")) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		actLogin: function(url, params, callback, errorCallback) {

			$.ajax({
				url: url,
				data: {
					appActivityToken: params
				},
				dataType: 'json',
				type: 'post',
				success: function(result) {
					console.info("result---login----", result);
					if (callback && typeof callback == "function") {
						arguments[0] = result;
						callback.apply(this, arguments);
					}

				},
				error: function(e) {
					if (errorCallback && typeof errorCallback == "function") {
						arguments[0] = e;
						errorCallback.apply(this, arguments);
					}
				}
			});
		},
		//title右侧按钮的type为2时的按钮点击事件
		rightButtonClick: function(callback) {
			if (isIOS()) {
				window.RightButtonClick = function(data) {
					if (callback && typeof callback == 'function') {
						arguments[0] = data;
						callback.apply(this, arguments);
					}
				}
			} else {
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

					/*	bridge.init(function(message, responseCallback) {
							responseCallback(data);
						});*/
					bridge.registerHandler("RightButtonClick", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						responseCallback(responseData);
						if (callback && typeof callback == "function") {
							arguments[0] = data;
							callback.apply(this, arguments);
						}
					});

				})


			}
		},

		//分享成功之后的回调
		shareActivitySuccessed: function(callback) {
			if (isIOS()) {
				window.shareActivitySuccessed = function(data) {
					if (callback && typeof callback == "function") {
						arguments[0] = data;
						callback.apply(this, arguments);
					}
				}
			} else {
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

					bridge.registerHandler("shareActivitySuccessed", function(data, responseCallback) {
						var responseData = "Javascript Says Right back aka!";
						responseCallback(responseData);
						if (callback && typeof callback == "function") {
							arguments[0] = data;
							callback.apply(this, arguments);
						}
					});

				})


			}
		},

		// 生命周期
		appLifeHook: function(initCallback, loginTokenCallback, webonResumeCallback, webonPauseCallback, webonDestroyCallback) {
			if (isIOS()) {
				window.ToAppIosPostLoginToken = function(data) {
						//兼容ios某一版本返回错误数据格式
						if (loginTokenCallback && typeof loginTokenCallback == "function") {
							if (JSON.parse(data) && JSON.parse(data).ReturnCode) {
								arguments[0] = data;
							} else {
								var returnData = {
									"Token": getParams(data, "Token"),
									"ReturnCode": getParams(data, 'ReturnCode'),
									"ReturnMessage": getParams(data, 'ReturnMessage'),
									"Data": {
										"LoginToken": getParams(data, 'LoginToken')
									}
								};
								arguments[0] = JSON.stringify(returnData);
							}

							// arguments[0] = data;
							loginTokenCallback.apply(this, arguments);
						}
					}
					//step:1表示打开页面；2表示离开页面
				win.ToAppLifeCycle = function(step) {
					if (step == 1) {
						if (webonResumeCallback && typeof webonResumeCallback == "function") {
							// document.getElementById("show2").innerHTML = ("data from ios: = ");
							webonResumeCallback.apply(this, arguments);
						}
					} else if (step == 2) {
						if (webonPauseCallback && typeof webonPauseCallback == "function") {

							webonPauseCallback.apply(this, arguments);
						}
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
								if (initCallback) {
									arguments[0] = message;
									initCallback.apply(this, arguments);
								}
								responseCallback(data);
							});
						}
					} catch (e) {
						console.error("jsbridge-----error--", e);
					}

					bridge.registerHandler("LoginToken", function(data, responseCallback) {
						// document.getElementById("show2").innerHTML = ("data from Java: = " + data);
						var responseData = "Javascript Says Right back aka!";
						if (loginTokenCallback && typeof loginTokenCallback == "function") {
							// loginTokenCallback(data);
							arguments[0] = data;
							loginTokenCallback.apply(this, arguments);
						}
						responseCallback(responseData);
					});

					bridge.registerHandler("WebonResume", function(data, responseCallback) {
						// document.getElementById("show").innerHTML = ("data from Java: = " + data);
						var responseData = "Javascript Says Right back aka!";
						if (webonResumeCallback && typeof webonResumeCallback == "function") {
							arguments[0] = data;
							webonResumeCallback.apply(this, arguments);
						}
						responseCallback(responseData);
					});

					bridge.registerHandler("WebonPause", function(data, responseCallback) {
						// document.getElementById("show").innerHTML = "time-----" + new Date().getTime();
						var responseData = "Javascript Says Right back aka!";
						if (webonPauseCallback && typeof webonPauseCallback == "function") {
							arguments[0] = data;
							webonPauseCallback.apply(this, arguments);
						}
						responseCallback(responseData);
					});
					bridge.registerHandler("WebonDestroy", function(data, responseCallback) {
						// document.getElementById("show").innerHTML = ("data from Java: = " + data);
						var responseData = "Javascript Says Right back aka!";
						if (webonDestroyCallback && typeof webonDestroyCallback == "function") {
							arguments[0] = data;
							webonDestroyCallback.apply(this, arguments);
						}
						responseCallback(responseData);
					});
				});
			}

		}

	}
	var jsbridge = new Jsbridge();
	win.Jsbridge = jsbridge;
})(window);