(function() {
	FastClick.attach(document.body);

	//输入框失去焦点事件
	$("input").on('blur', function() {
		var type = $(this).attr('data-type');
		var value = $(this).val();
		var flag = check(type);
		// type === 'phone' && flag && getPhoneData(value);
		/*switch (type) {
			case 'name':
				if (value && value.trim().length > 0) {
					removeError(type);
				} else {
					showError(type, '请输入姓名');
				}
				break;
			case 'phone':
				var reg = /^1[0-9]{10}$/; //以1开头的11为数字
				// console.info(reg.test(phoneNo));
				if (reg.test(value)) {
					removeError(type);

				} else {
					showError(type, '手机号码格式不正确');
				}
				break;
			case 'num':
				if (value && isNaN(value)) {
					showError(type, '请输入数字')
				} else if (value.trim().length > 0) {
					if (value < 0 || value > 1000000000) {
						showError(type, '金额限制在0＜借款金额≤1亿');
					}
				} else {
					removeError(type);
				}
				break;
		}*/

	});
	var applyData = {};
	//提交申请
	$(".form-btn").on('click', function() {
		var flag = check('name') && check('phone') && check('num');
		if (!flag) {
			return;
		}
		applyData.BorrowType = $(".r-type:checked").val() ? $(".r-type:checked").val() : 0;
		console.info('', applyData);
		/*if (applyData.PhoneAddress) {
			submitApply();
		} else {
			getPhoneData(applyData.Phone, submitApply);
		}*/
		getPhoneData(applyData.Phone, submitApply);
		// showPopUp(1, '您已成功提交申请 ，1个工作日内信贷顾问会联系您！');
	});

	function submitApply() {
		console.info('submitApply---', applyData);
		// var url = 'http://oatest.bujidele.com:8010/api/project/Do'; //测试地址
		var url = 'http://oatest.bujidele.com:8010/api/project/DoOld '; //测试地址
		// var url = 'http://bmapi.yinliancn.com/api/project/Do';//正式地址
		applyData.UserNo = getUrlParam('userno');
		// applyData.UserNo = '37687034-1433-11e6-a74c-02004c4f4f50';
		var reqParam = {
			Ip: '',
			Version: '',
			Token: '',
			UserId: '',
			MethodName: 'BusinessPrototype_Add',
			Data: JSON.stringify(applyData)
		}
		reqParam.SystemName = getSys();
		$.ajax({
			url: url,
			data: reqParam,
			dataType: 'json',
			type: 'post',
			success: function(result) {
				if (result.ReturnCode == 1) {
					showPopUp(1, '您已成功提交申请 ，1个工作日内信贷顾问会联系您！');
				} else if (result.ReturnCode == 36001) {
					showPopUp(1, '借款请求处理中，请耐心等待');
				} else {
					showPopUp(0, result.ReturnMessage);
				}
			},
			error: function(e) {
				console.info('apply fail--', e);
			}
		})
	}
	$(".masker").on('click', function() {
		hidePopUp();
	});
	//返回首页
	// var isAppOpen = true;
	$(".go-main").on('click', function() {
		/*if(isAppOpen && Jsbridge.isNewVersion) {
		    Jsbridge.toAppMainPage()
		}else{
		    //web版跳转首页
		}*/

		//web版跳转首页
		hidePopUp();
	});
	//获取手机归属地信息
	function getPhoneData(phoneNo, callback) {
		$.ajax({
			url: 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
			type: 'get',
			data: {
				tel: phoneNo
			},
			success: function(result) {
				console.info(result);
				// console.log(_data)
				if (result) {
					var _data = result.split('=')[1]
					_data = _data.replace(/\s+/g, "").replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "").replace(/\'/g, '"').replace(/\:/g, '":').replace(/\,/g, ',"').replace('{', '{"')
					var phoneData = JSON.parse(_data);
					console.log(phoneData)
					if (phoneData.catName === '中国移动') {
						applyData.PhoneType = 1;
					} else if (phoneData.catName === '中国联通') {
						applyData.PhoneType = 2
					} else if (phoneData.catName === '中国电信') {
						applyData.PhoneType = 3
					} else {
						applyData.PhoneType = 0
					}
					applyData.PhoneAddress = phoneData.province
					typeof callback === 'function' && submitApply();
				}
			},
			error: function(result) {
				console.info('无法获取手机归属地信息');
			}
		})
	}
	/*
	    显示弹窗
	    type:0-错误提示；1-正确提示
	    msg:提示内容
	*/
	function showPopUp(type, msg) {
		if (type == 0) {
			$(".pop-icon").removeClass('icon-success').addClass('icon-error');
		} else {
			$(".pop-icon").removeClass('icon-error').addClass('icon-success');
		}
		$(".pop-content").html(msg);
		$(".mask").show();
	}

	function hidePopUp() {
		$(".mask").hide();
	}
	/*
	       输入框错误提示
	       name:输入框名称
	       msg:提示内容
	   */
	function showError(name, msg) {
		if (name) {
			var obj = $("li[name='" + name + "']");
			obj.addClass('input-error');
			obj.attr('data-content', msg);
		}
	}

	function removeError(name) {
		if (name) {
			var obj = $("li[name='" + name + "']");
			obj.removeClass('input-error');
			obj.attr('data-content', '');
		}
	}
	//校验输入
	function check(name) {
		var value = $("input[name='" + name + "']").val();
		if (name === 'name') {
			if (value && value.trim().length > 0) {
				removeError(name);
				applyData.CustomerName = value;
				return true;
			} else {
				showError(name, '请输入姓名');
				return false;
			}
		} else if (name === 'phone') {
			var reg = /^1[0-9]{10}$/; //以1开头的11为数字
			// console.info(reg.test(phoneNo));
			if (value.trim().length === 0) {
				showError(name, '请输入手机号');
				return false;
			} else if (reg.test(value)) {
				removeError(name);
				applyData.Phone = value;

				return true;
			} else {
				showError(name, '手机号码格式不正确');
				return false;
			}
		} else if (name === 'num') {
			if (value && isNaN(value)) {
				showError(name, '请输入数字')
				applyData.BorrowMoney = 0;
				return false;
			} else if (value.trim().length > 0) {
				if (+value < 0 || +value > 1000000000) {
					showError(name, '金额限制在0＜借款金额≤1亿');
					applyData.BorrowMoney = 0;
					return false;
				} else {
					removeError(name);
					applyData.BorrowMoney = +value;
					return true;
				}
			} else {
				removeError(name);
				applyData.BorrowMoney = 0;
				return true;
			}
		}

	}


	function getSys() {
		var sys = ''
		if (navigator.userAgent.match(/(iPad|iPhone)/)) {
			sys = 'IOS';
		} else if (navigator.userAgent.match(/(Android)/)) {
			sys = 'Android';
		}
		return sys;
	}

	function getUrlParam(name, url) {
		if (!url) {
			url = location.href;
		}
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var returnValue;
		for (var i = 0; i < paraString.length; i++) {
			var tempParas = paraString[i].split('=')[0];
			var parasValue = paraString[i].split('=')[1];
			if (tempParas === name)
				returnValue = parasValue;
		}

		if (!returnValue) {
			return "";
		} else {
			if (returnValue.indexOf("#") != -1) {
				returnValue = returnValue.split("#")[0];
			}
			return returnValue;
		}
	}
})();