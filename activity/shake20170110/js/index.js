(function() {
	FastClick.attach(document.body);
	var pageContentEl = $(".content");
	var ruleEl = $(".dialog-rule");
	// 查看规则
	pageContentEl.on("click", ".btn-rule", function() {
		onShowRule();
	});

	// 关闭规则
	ruleEl.on("click", ".mask", function() {
		onHideRule();
	});

	(function listentToShake() { //监听手机摇一摇
		var myShakeEvent = new Shake({
			threshold: 15
		});
		myShakeEvent.start();
		window.addEventListener('shake', shakeEventDidOccur, false);
	}());

	function shakeEventDidOccur() { //摇一摇callback
		if (!pageContentEl.hasClass("beingShake")) {

			// TODO:抽签中
			onShowLoading();
			// 抽签完成之后关闭，出现动画至少500毫秒
			setTimeout(function() {
				onHideLoading();
				//TODO: 与好友pk，则跳转至signPK.html
				window.location.href = "./Sign.html";
			}, 500);

			pageContentEl.addClass("beingShake");
		}

	}


	// 显示规则
	function onShowRule() {
		$(".dialog-rule").show();
		$(".scroll").removeClass("scroll-active");
	}

	// 隐藏规则
	function onHideRule() {
		$(".dialog-rule").hide();
		$(".scroll").addClass("scroll-active");
	}


	// 显示加载loading图标
	function onShowLoading() {
		$(".loading").show();
		$(".scroll").removeClass("scroll-active");
	}

	// 隐藏loading图标
	function onHideLoading() {
		$(".loading").hide();
		$(".scroll").addClass("scroll-active");
	}


})();