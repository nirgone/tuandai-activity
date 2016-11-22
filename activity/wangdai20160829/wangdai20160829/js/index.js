(function() {
	FastClick.attach(document.body);
	if (Swiper) {
		var mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			loop: true,
			centeredSlides: true,
			initialSlide: 0,
			onInit: function(swiper) {

			},
			onSlideChangeStart: function(swiper) {

			},
			onSlideChangeEnd: function(swiper) {

			}

		});

		// 大咖有话说
		var hSwiper = new Swiper(".content-wrapper", {
			slidesPerView: 4,
			spaceBetween: -10,
			loop: true
		})
	}
	var pageEl = $(".page");
	// 点击遮罩层 关闭弹窗
	pageEl.on("click", ".mask", function(event) {
		hideDialog();
	});

	// 网贷细则
	pageEl.on("click", ".rule", function(event) {
		var currentTarget = $(event.currentTarget);
		var index = currentTarget.attr("class").split(" ")[1];
		var icon, title, text;
		switch (index) {
			case 'rule01':
				icon = "../images/page02-rule01.png";
				title = "界定行业定位";
				text = "界定了网贷内涵，明确了适用范围及网贷活动基本原则，重申了从业机构作为信息中介的法律地位。";
				break;
			case 'rule02':
				icon = "../images/page02-rule02.png";
				title = "确立监管机制";
				text = "确立网贷机构的监管体制安排、适度监管、协同监管的理念，实行中央部门和地方机构双负责制。";
				break;
			case 'rule03':
				icon = "../images/page02-rule03.png";
				title = "明确业务规范";
				text = "坚持底线思维，加强事中事后行为监管，引导其回归信息中介、小额分散、服务实体以及普惠金融的本质。以负面清单形式规定了业务边界。";
				break;
			case 'rule04':
				icon = "../images/page02-rule04.png";
				title = "加强风险控制";
				text = "规定实行客户资金由银行业金融机构第三方存管制度，保障客户资金安全，严守风险底线，同一借款人在同一网贷机构及不同网贷机构的借款余额上限。";
				break;
			case 'rule05':
				icon = "../images/page02-rule05.png";
				title = "保护投资者权益";
				text = "明确对出借人进行风险揭示及纠纷解决途径等要求，明确出借人应当具备的条件，明确了纠纷、投诉和举报等解决渠道和途径，保护消费者合法权益。";
				break;
			case 'rule06':
				icon = "../images/page02-rule06.png";
				title = "加强信息披露";
				text = "规定网贷机构应履行的信息披露责任，充分披露借款人和融资项目信息，定期披露网贷平台有关经营管理信息，对信息披露情况等进行审计和公布。";
				break;
			default:
				icon = "";
				title = "";
				text = "";
		}
		showDialog(icon, title, text);
	});

	// 网贷细则
	pageEl.on("click", ".button", function(event) {
		var currentTarget = $(event.currentTarget);
		var index = currentTarget.attr("class").split(" ")[1];
		console.log(index);
		var icon, title, text;
		switch (index) {
			case 'button01':
				icon = "../images/page05-icon01.png";
				title = "行业·利好";
				text = "《暂行办法》的出台是在意料之中的。政策正式出台，让我们这个行业有了合法的社会地位，作为国家认可的、由银监会监管的一个行业，以后我们做很多事情都是名正言顺的，不会再受到社会的歧视和各种负面舆论的影响。我们姑且不去说它的内容完不完善，未来会不会根据行业、市场的发展有一些大的改动或者改变，单单是确立了合法的社会地位，对行业及企业而言，就是非常大的利好。";
				break;

			case 'button03':
				icon = "../images/page05-icon03.png";
				title = "自律·合规";
				text = "政策的具体内容方面，监管要求怎么做我们就怎么做。目前看来，我们完全能达到标准。一直坚持“小额分散”的原则，虽然我们的服务对象以小微企业为主，但2016年上半年，我们的平均单笔借款金额只有23万。老板们用厂房、自己的车子、房产等做抵押，借款上限大部分也都在500万以内。只有很少量的超过500万，这部分我们将在12个月的整改期内尽快整改完善。而今年新增的、跟正合普惠合作的消费金融及普惠金融一块，金额就更加小了，消费金融只有几千元，普惠金融一般在4-5万。所以，政策的正式出台，对我们不会有任何影响，只会增强我们的公信力。";
				break;

			default:
				icon = "";
				title = "";
				text = "";
		}
		showDialog(icon, title, text);
	});



	var showDialog = function(icon, title, text) {
		var maskEl = pageEl.find(".mask");
		var dialogEl = pageEl.find(".dialog");
		dialogEl.find(".icon").css("background-image", "url(" + icon + ")");
		dialogEl.find(".title").text(title);
		dialogEl.find(".dialog-content").text(text);
		dialogEl.removeClass("hide").addClass("show");
		maskEl.removeClass("hide").addClass("show");
		disableScrolling();
	}
	var hideDialog = function() {
		var maskEl = pageEl.find(".mask");
		var dialogEl = pageEl.find(".dialog");

		dialogEl.removeClass("show").addClass("hide");
		maskEl.removeClass("show").addClass("hide");
		enableScrolling();
	}

	// ===============禁止滑动================
	var preventDefault = function(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}
	var scrolling = function(e) {

		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}
	var disableScrolling = function() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', scrolling, false);
			window.addEventListener('touchmove', scrolling, false);
			// window.onmousewheel = document.onmousewheel = scrolling;
		}
	}
	var enableScrolling = function() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', scrolling, false);
			window.removeEventListener('touchmove', scrolling, false);
		}
		// window.onmousewheel = document.onmousewheel = null;
	}
})();