(function() {
	FastClick.attach(document.body);
	var pageEl = $(".page");
	var dialogEl = $(".dialog-success");
	

	var phoneEl = pageEl.find(".phone");
	var pwdEl = pageEl.find(".password");
	var imgCodeEl = pageEl.find(".img-code");
	var messageCodeEl = pageEl.find(".message-code");

	// 点击确认领奖
	pageEl.on('click', ".btn-registe", function() {
		// 点击领奖之前先判断手机号码状态
		var phoneNum = pageEl.find(".phone-input").val(); //手机号码

		if(!checkPhoneNum(phoneNum)) {
			phoneEl.find(".tips-error").addClass("show").html("手机号码格式不正确");
			return;
		}

		var isRegiste = false; //需要后台判断号码状态
		if (isRegiste) { //号码已注册
			phoneEl.find(".tips-error").addClass("show").html("手机号已注册");
			return;
		}

		var imgCode = pageEl.find(".img-code-input").val(); //图形验证码
		var messageCode = pageEl.find(".message-code-input").val(); //短信验证码

		var canSubmitFlag = true; //用于判断是否能提交
		// TDDO：如果验证码错误 把“请输入图片验证码”换成“请输入正确的图片验证码”
		if (imgCode.trim() == "") {
			imgCodeEl.find(".tips-error").addClass("show").html("请输入正确的短信验证码");
			canSubmitFlag = false;
		} else {
			imgCodeEl.find(".tips-error").removeClass("show");
		}
		// TDDO：如果验证码错误 把“请输入短信验证码”换成“请输入正确的图片验证码”
		if (messageCode.trim() == "") {
			messageCodeEl.find(".tips-error").addClass("show").html("请输入短信验证码");
			canSubmitFlag = false;
		} else {
			messageCodeEl.find(".tips-error").removeClass("show");
		}
			
		if (canSubmitFlag) {

			// TODO: 提交成功之后 页面注册成功
			dialogEl.addClass("show");
		}
	});

	// 点击切换图形验证码
	pageEl.on("click", ".img-code-img", function() {
		console.log("切换图形验证码")
	});

	// 点击获取手机短信验证码
	pageEl.on("click", ".get-message-code", function(e) {
		// 验证手机号码
		var currentTarget = $(e.currentTarget);
		// 处于不可点击状态
		if(currentTarget.hasClass("disable")) {
			return;
		}

		var phoneNum = phoneEl.find(".phone-input").val();
		if (checkPhoneNum(phoneNum)) { //号码有效
			phoneEl.find(".tips-error").removeClass("show");
			// TODO:判断号码的状态
			var isRegiste = false; //需要后台判断号码状态
			if (isRegiste) { //号码未注册
				phoneEl.find(".tips-error").addClass("show").html("您是我们的老用户了，可直接参与投资送好礼");
			} else {
				// TODO:发送验证码
				currentTarget.addClass("disable");
				var leftTime = 60;
				currentTarget.html(leftTime + "s");
				var si = setInterval(function cuntdown() {
					leftTime--;
					currentTarget.html(leftTime + "s");
					// 倒计时结束
			      	if(leftTime < 0) {
			        	clearInterval(si);
			        	currentTarget.removeClass("disable");
			        	currentTarget.html("重新获取");
			      	}
				}, 1000);
			}
		} else {
			phoneEl.find(".tips-error").addClass("show").html("手机号码格式不正确");
		}
	});

	// 检查手机号码正则
	function checkPhoneNum(phoneNum) {
		var patTel = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
		if (!phoneNum.match(patTel)) {
			return false;
		} else {
			return true;
		}
	}
})();