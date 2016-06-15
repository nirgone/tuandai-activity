(function() {
		var isIOS = function() {
			var flag = false;
			if (navigator.userAgent.match(/(iPad|iPhone)/)) {
				flag = true;
			} else if (navigator.userAgent.match(/(Android)/)) {
				flag = false;
			}
			return flag;
		};

		var connectWebVdiewJavascriptBridge = function(callback) {
			if (window.WebViewJavascriptBridge) {
				callback(WebViewJavascriptBridge)
			} else {
				document.addEventListener(
					'WebViewJavascriptBridgeReady',
					function() {
						callback(WebViewJavascriptBridge);
					},
					false
				);
			}

		};

		var androidHandler = function(method, param, callback) {
			if (param) {
				param = JSON.parse(param);
			}
			window.WebViewJavascriptBridge.callHandler(
				method, param,
				function(responseData) {
					// document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
					if (callback && typeof callback == "function") {
						callback(responseData);
					}
				}
			);
		};

		var Bbsbridge = function() {
			var me = this;
		};

		Bbsbridge.prototype = {
			constructor: Bbsbridge,
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

			//非固定插件调用
			/*
			params,--参数 （json），
			name:方法名
			callback：回调函数
			*/
			exec: function(name, params, callback) {
				try {
					if (isIOS()) {
						console.log("ios 暂时没有这个方法");
					} else {
						console.log("android-func");
						androidHandler(name, params, callback);
					}
				} catch (e) {
					console.info("不支持jsbridge");
				}
			},
			// 生命周期
			appLifeHook: function(initCallback, loginTokenCallback, webonResumeCallback, webonPauseCallback, webonDestroyCallback) {
				if (isIOS()) {
					window.LoginTokenBBS = function(data) {
						if (bbsLoginCallback && typeof bbsLoginCallback == "function") {
							// bbsLoginCallback(data);
							arguments[0] = data;
							bbsLoginCallback.apply(this, arguments);
						}
					}

				} else {
					connectWebViewJavascriptBridge(function(bridge) {
							console.info("bbsbridge-------", window.WebViewJavascriptBridge._messageHandler);
							if (!window.WebViewJavascriptBridge._messageHandler) {
								try {
									bridge.init(function(message, responseCallback) {
										console.log('JS got a message', message);
										var data = {
											'Javascript Responds': '测试中文!'
										};
										console.log('JS responding with', data);
										if (initCallback && typeof initCallback == "function") {
											arguments[0] = message;
											initCallback.apply(this, arguments);
										}
										responseCallback(data);
									});
								} catch (e) {
									console.info("Bbsbridge----er--", e);
								}
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
						}

					}
				};
				var bbsbridge = new Bbsbridge();
				window.Bbsbridge = bbsbridge;
			})();