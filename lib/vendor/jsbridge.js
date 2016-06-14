/*
android:
Z2000登录       : ToAppLoginOrRegister
Z2100注册       : ToAppLoginOrRegister
A1000首页（关闭活动页面并返回首页）: ColseWeb
B1000投资         : ToAppInvestList
项目详情            : InvestProjectDetails(参数：id, type, subtype, ProfitTypeId)
A1800我要借款 : ToAppLoan
B2000WE计划 : ToAppWEInvestList   
WE计划 * 项目详情:WXInvestDetail
  
D2000我的投资  ：InvestListActivity
投资详情           : MyInvestDetail
D1400团宝箱      : ToAppTBX
D1410现金红包   : ToAppCashRedPacket
D1420投资红包   : ToAppOrdinaryRedPacket
D1450加息卷      ; ToAppKasiRedPacket
D1430提现卷      : ToAppWithdrawalRoll
D1460抵扣卷      : ToAppRebateRedPacket
D1440签到卡       : ToAppSingInRoll
D1460精美礼品   : ToAppPresent
充值                  ToAppRecharge
安全中心            : ToAppSecurityCenter
手机验证            : ToAppMobileVerify
身份证验证        : ToAppIdentityVerify
我的财富	：ToAppPersonalCenter 
邀请好友		：ToAppInviteFriend
活动分享		：ToActivityAppInviteFriend

anadroid版本号：[tuandaiapp_android_4.3.3]

生命周期回调（WebonResume，WebonPause，WebonDestroy）*/

/*
  ios:                  
         Z2000登录       : ToAppIosLogin
         Z2100注册       : ToAppIosRegister
         A1000首页         : ToAppIosMainPage
         B1000投资         : ToAppIosInvest
         项目详情            : ToAppIosProjectDetail (参数：projectId)
         A1800我要借款 : ToAppIosBorrow
         B2000WE计划 : ToAppIosWePlan
         WE计划 * 项目详情:ToAppIosWePlanProjectDetail
         D2000我的投资  ：ToAppIosMyInvest
         投资详情           : ToAppIosInvestDetail
         D1400团宝箱      : ToAppIosTreasurChest
         D1410现金红包   : ToAppIosCashBonus
         D1420投资红包   : ToAppIosInvestBonus
         D1450加息卷      ; ToAppIosAddRateCoupon
         D1430提现卷      : ToAppIosWithdrawalCoupon
         D1460抵扣卷      : ToAppIosDeductionCoupon
         D1440签到卡       : ToAppIosAdCard
         D1460精美礼品   : ToAppIosBoutiqueGift
         充值                    ; ToAppIosRecharge
         安全中心            : ToAppIosSaftCenter
         手机验证            : ToAppIosPhoneValidtion
         身份证验证        : ToAppIosAuthenticationCode
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
		if(subStr) {
			return subStr[1];
		}else{
			return "";
		}
	}

	function connectWebViewJavascriptBridge(callback) {

		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
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

	function androidHandler(method, param) {
		if (param) {
			param = JSON.parse(param);
		}
		win.WebViewJavascriptBridge.callHandler(
			method, param,
			function(responseData) {
				// document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
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
					ToAppIosLogin();
				} else {
					androidHandler('ToAppLogin', null);

				}
			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到注册
		toAppRegister: function() {
			try {

				if (isIOS()) {
					ToAppIosRegister();
				} else {
					androidHandler('ToAppRegister', null);
				}
			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 返回首页
		toAppMainPage: function() {
			try {

				if (isIOS()) {
					ToAppIosMainPage();
				} else {
					androidHandler('ColseWeb', null);
				}
			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到投资列表
		toAppInvestList: function() {
			try {
				if (isIOS()) {
					ToAppIosInvest();
				} else {
					androidHandler('ToAppInvestList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到项目详情
		/**
			Id
			TypeId
			SubTypeId
			ProfitTypeId
			XmbSubType: boolean

		*/
		toAppInvestDetails: function(Id, TypeId, SubTypeId, ProfitTypeId, XmbSubType) {
			try {
				if (isIOS()) {
					ToAppIosProjectDetail(Id, TypeId, SubTypeId, ProfitTypeId, XmbSubType);
				} else {
					var investParam = {
						'Id': Id,
						'TypeId': TypeId,
						'SubTypeId': SubTypeId,
						'ProfitTypeId': ProfitTypeId,
						XmbSubType: XmbSubType
					};
					investParam = JSON.stringify(investParam);
					androidHandler('InvestProjectDetails', investParam);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到我要借款
		toAppLoan: function() {
			try {
				if (isIOS()) {
					ToAppIosBorrow();
				} else {
					androidHandler('ToAppLoan', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到我的投资
		toAppMyInvest: function() {
			try {
				if (isIOS()) {
					ToAppIosMyInvest();
				} else {
					androidHandler('InvestListActivity', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到投资详情
		/**
			ProjectId:
			Type:
			InvestId:
			ProfitTypeId:
			IsWePlanX
		*/
		toAppMyInvestDetail: function(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId) {
			try {
				if (isIOS()) {

					ToAppIosInvestDetail(ProjectId, Type, InvestId, ProfitTypeId, IsWePlanX, SubTypeId);
				} else {
					var investParam = {
						'ProjectId': ProjectId,
						'Type': Type,
						'InvestId': InvestId,
						'ProfitTypeId': ProfitTypeId,
						IsWePlanX: IsWePlanX
					};
					investParam = JSON.stringify(investParam);
					androidHandler('MyInvestDetail', investParam);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到团宝箱
		toAppTBX: function() {
			try {
				if (isIOS()) {
					ToAppIosTreasurChest();
				} else {
					androidHandler('ToAppTBX', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到现金红包
		toAppCashRedPacket: function() {
			try {
				if (isIOS()) {
					ToAppIosCashBonus();
				} else {
					androidHandler('ToAppCashRedPacket', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到投资红包
		toAppOrdinaryRedPacket: function() {
			try {
				if (isIOS()) {
					ToAppIosInvestBonus();
				} else {
					androidHandler('ToAppOrdinaryRedPacket', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到加息卷
		toAppKasiRedPacket: function() {
			try {
				if (isIOS()) {
					ToAppIosAddRateCoupon();
				} else {
					androidHandler('ToAppKasiRedPacket', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到提现卷
		toAppWithdrawalRoll: function() {
			try {
				if (isIOS()) {
					ToAppIosWithdrawalCoupon();
				} else {
					androidHandler('ToAppWithdrawalRoll', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到抵扣卷
		toAppRebateRedPacket: function() {
			try {
				if (isIOS()) {
					ToAppIosDeductionCoupon();
				} else {
					androidHandler('ToAppRebateRedPacket', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到签到卡 
		toAppSingInRoll: function() {
			try {
				if (isIOS()) {
					ToAppIosAdCard();
				} else {
					androidHandler('ToAppSingInRoll', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// 跳转到精美礼品
		toAppPresent: function() {
			try {
				if (isIOS()) {
					ToAppIosBoutiqueGift();
				} else {
					androidHandler('ToAppPresent', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//充值
		toAppRecharge: function() {
			try {
				if (isIOS()) {
					ToAppIosRecharge();
				} else {
					androidHandler('ToAppRecharge', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//安全中心
		toAppSecurityCenter: function() {
			try {
				if (isIOS()) {
					ToAppIosSaftCenter();
				} else {
					androidHandler('ToAppSecurityCenter', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//手机验证
		toAppMobileVerify: function() {
			try {
				if (isIOS()) {
					ToAppIosPhoneValidtion();
				} else {
					androidHandler('ToAppMobileVerify', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//身份证验证
		toAppIdentityVerify: function() {
			try {
				if (isIOS()) {
					ToAppIosAuthenticationCode();
				} else {
					androidHandler('ToAppIdentityVerify', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//我的财富
		toAppPersonalCenter: function() {
			try {
				if (isIOS()) {
					ToAppIosMyTreasure();
				} else {
					androidHandler('ToAppPersonalCenter', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//邀请好友
		toAppInviteFriend: function() {
			try {
				if (isIOS()) {
					ToAppIosInviteFriend();
				} else {
					androidHandler('ToAppInviteFriend', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//活动分享
		toActivityAppInviteFriend: function() {
			try {
				if (isIOS()) {
					ToAppIosActivityShare();
				} else {
					androidHandler('ToActivityAppInviteFriend', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		//WE计划
		toAppWePlan: function() {
			try {
				if (isIOS()) {
					ToAppIosWePlan();
				} else {
					androidHandler('ToAppWEInvestList', null);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		// WE计划 * 项目详情
		toAppWePlanDetail: function(productId) {
			try {
				if (isIOS()) {
					ToAppIosWePlanProjectDetail(productId);
				} else {
					var wxInvestParam = {
						ProductId: productId
					};

					wxInvestParam = JSON.stringify(wxInvestParam);
					androidHandler('WXInvestDetail', wxInvestParam);
				}

			} catch (e) {
				console.info("不支持jsbridge");
			}
		},
		appPlayMusic: function(musicUrl) {
			try {
				if (isIOS()) {
					ToAppIosPlayMusic(musicUrl);
				} else {
					var param = {
						url: musicUrl
					};
					param = JSON.stringify(param);
					androidHandler('WebViewOnPlayMusic', param);
				}

			} catch (e) {
				console.info("不支持jsbridge");
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
				console.info("不支持jsbridge");
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
		appLogin: function (url, loginToken, callback, errorCallback) {
                /*//'http://121.13.249.210:9006//weixin/Yuanxiao20160218/ajax/ajax.ashx?Action=AjaxLogin'
                var url = "http://121.13.249.210:9006/ajaxCross/Login.ashx?Action=UserLogin"; //106测试地址
                // var url = "http://hd.tuandai.com/ajaxCross/Login.ashx?Action=UserLogin"; //正式地址*/
                $.ajax({
                    url: url,
                    data: {
                        appActivityToken: loginToken
                    },
                    dataType: 'json',
                    type: 'post',
                    success: function(result) {
                        // console.info("result-------", result);
                        if(callback && typeof callback == "function") {
                        	arguments[0] = result;
                        	callback.apply(this, arguments);
                        }
                        
                    },
                    error: function(e) {
                    	if(errorCallback && typeof errorCallback == "function") {
                    		arguments[0] = e;
                    		errorCallback.apply(this, arguments);
                    	}
                    }
                });
            },
	

		// 生命周期
		appLifeHook: function(initCallback, loginTokenCallback, webonResumeCallback, webonPauseCallback, webonDestroyCallback) {
			if (isIOS()) {
				window.ToAppIosPostLoginToken = function(data) {
					//兼容ios某一版本返回错误数据格式
						if (loginTokenCallback && typeof loginTokenCallback == "function") {
							if(JSON.parse(data) && JSON.parse(data).ReturnCode) {
								arguments[0] = data;
							}else{
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