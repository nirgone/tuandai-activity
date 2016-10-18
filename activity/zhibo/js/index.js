(function() {
	FastClick.attach(document.body);
	var mianPicSwiper, thumbnailSwiper, guestSwiper;
	//do your thing.
	var s = '2016.9.23东莞·康帝酒店';
	var con = $('#timeAndPlace');
	var index = 0;
	var length = s.length;
	var tId = null;
	var guestData = [{
		name: '郭翰祥',
		avator: '../images/guohanxiang.png',
		position: '宏商资本执行合伙人',
		desc: '宏商资本合伙人，联席投资总监，近十年企业上市辅导顾问，创投机构，投资工作经历；曾任永安信（武汉）基金管理有限公司投资经理；2014年加盟东莞市宏商创业投资管理有限公司，现任执行董事，投资总监，新三板经理。'
	}, {
		name: '张劲春',
		avator: '../images/zhangjingchun.png',
		position: '东证锦信董事总经理',
		desc: '张劲春是东证锦信投资管理有限公司董事、总经理，东证锦信是东莞证券股份有限公司唯一从事直接投资的子公司。于2011年5月在东莞全资设立了东证锦信，公司注册资本2亿元人民币。'
	}, {
		name: '王宇杰',
		avator: '../images/wangyujie.png',
		position: '唯一网络董事长兼CEO',
		desc: '85后”福建青年王宇杰，2006年创办唯一网络，现已经成为国内领先的互联网增值业务提供商，年产值过亿，2016年4月，唯一网络获得了东莞证券和宏商创投5000万元的战略融资，估值已达5亿。2012年，王宇杰在厦门成立帝恩思网络科技有限公司，2016年3月，帝恩思在新三板挂牌。'
	}, {
		name: '王晓明',
		avator: '../images/wangxiaoming.png',
		position: '久奕资本合伙人',
		desc: '久奕资本合伙人王晓明在风投行业从业10余年，曾经担任中国TOP投资机构联创永宣管理合伙人，先后发起设立并管理联创永宣、联创永津、联创永钦、久奕新三成长基金、天循久奕新三板成长基金等多支人民币基金，管理基金的规模逾30亿元。投资过暴走漫画，19楼，证券之星、团贷网、36氪、锤子科技等成功案例'
	}, {
		name: '朱明春',
		avator: '../images/zhumingchun.png',
		position: ' 广东互联网金融协会秘书长',
		desc: '广东互联网金融协会秘书长，2011年联合创办网贷之家网站，现任盈灿集团执行副总裁，清华大学经济管理学院金融硕士行业导师，广东互联网金融协会副会长兼秘书长，民间金融互联网化、阳光化倡导者。多次接受中央二套、凤凰卫视等电视节目关于互联网金融报道的采访。'
	}, {
		name: '罗明雄',
		avator: '../images/luomingxiong.png',
		position: '连交所总裁',
		desc: '本科毕业于山东大学、硕士毕业于清华大学，现任连交所总裁、北京京北投资管理有限公司总裁 、搜狐互联网金融顾问、上海交通大学互联网金融研究所所长，《互联网金融》作者，为互联网金融领域代表性人物之一，被评为"2013中国互联网金融十大领军人物"。'
	}];

	function start() {
		con.text('');
		var me = this;

		tId = setInterval(function() {
			con.append(s.charAt(index));
			if (index++ === length) {
				clearInterval(tId);
				index = 0;
			}
			if (con.html() == "2016.9.23") {
				con.html("2016.9.23&nbsp;&nbsp;");
			}


		}, 100);
	}

	function init() {
		setTimeout(function() {
			start();
		}, 1500);
		initSwiper();

	}

	init();


	function initSwiper() {
		var picData = [{
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}, {
			img: "../images/pic1.png",
			thumbnail: '../images/pic2.png'
		}];
		var mainTemp = "";
		var thumTemp = "";
		var length = picData.length;
		//初始化大图及缩略图
		picData.forEach(function(item, index) {
			mainTemp += '<div class="swiper-slide"><div class="actcont">' +
				'<img src="' + item.img + '" class="actpic" data-index="' + index + '"><i class="icon-shadow"></i></div></div>';
			thumTemp += '<div class="swiper-slide"><img src="' + item.thumbnail + '" class="thumbnail" data-index="' + index + '"></div>'
		});

		$("#mainPic").find('.swiper-wrapper').html(mainTemp);
		$("#thumbnailSwiper").find('.swiper-wrapper').html(thumTemp);
		//大图swiper
		mianPicSwiper = new Swiper('#mainPic', {
			onTransitionEnd: function(swiper) {}
		});
		//缩略图swiper
		thumbnailSwiper = new Swiper("#thumbnailSwiper", {
			// spaceBetween: 10,
			centeredSlides: true,
			// slidesPerView: 'auto',
			touchRatio: 0.2,
			slideToClickedSlide: true,
			slidesPerView: 6,
			loop: true,
		});
		thumbnailSwiper.lockSwipes();
		mianPicSwiper.lockSwipes();
		// mianPicSwiper.params.control = thumbnailSwiper;
		// thumbnailSwiper.params.control = mianPicSwiper;

		var guestTemp = "";
		guestData.forEach(function(item, index) {
			guestTemp += '<div class="swiper-slide"><div class="guest">' +
				'<i class="icon-guest" style="background-image:url(' + item.avator + ');" data-index="' + index + '"></i>' +
				'<span>' + item.name + '</span><span>' + item.position + '</span></div></div>';
		});
		$("#guestSwiper").find('.swiper-wrapper').html(guestTemp);
		guestSwiper = new Swiper("#guestSwiper", {
			slidesPerView: 3,
			loop: true
		});
	}
	//点击缩略图
	$("body").on('click', '.thumbnail', function() {
		var activeIndex = $(this).attr('data-index');
		// var activeIndex = $(this).parent().attr('data-swiper-slide-index');
		console.info("activeIndex---------", activeIndex);
		mianPicSwiper.slideTo(activeIndex);
		// thumbnailSwiper.slideTo(activeIndex);
	});
	$(".pdetail").on('click', function() {
		var me = this;
		if ($(this).hasClass('ellipsis')) {
			$(this).removeClass('ellipsis').addClass('to-show');
		} else {
			$(this).removeClass('to-show');
			setTimeout(function() {
				$(me).addClass('ellipsis');
			}, 400);
		}
	});
	$("body").on('click', '.arrow-cont', function() {
		var type = $(this).attr('data-type');
		if (type === 'prev') {
			guestSwiper.slidePrev();
		} else {
			guestSwiper.slideNext();
		}
	});
	$('textarea').on('input', function() {
		var value = $(this).val();
		if (value.length > 0) {
			$("#post").removeClass('btn-disable').addClass('btn-pink-big');
		} else {
			$("#post").removeClass('btn-pink-big').addClass('btn-disable');
		}
		var num = 40 - value.length;
		// console.info("textarea----", $(this).val().length, num);
		if (num >= 0) {
			$("#num").html(num);
		}
	});
	//在线观看直播
	$("#online").on('click', function() {
		$(".popup-online").show();
		// disableScrolling();
	});
	//更多对话
	$("#moreMsg").on('click', function() {
		$(".popup-msg").show();
		// disableScrolling();
		//模拟添加留言
		var index = 0;
		var addMsgInterval = setInterval(function() {
			if (index < 20) {
				var msg = '<li><span class="msg-time">10:00:00</span><span>出借人代表恋恋风尘：我作为出借人跟宜贷网沟通比较多，' +
					'和宜贷网沟通的气氛也非常好，很开心参加这次宜贷网品牌升级发布会。' + index * 10 + '</span></li>';
				$("#allMsg").append(msg);
				index++;
				var containerHeight = $("#allMsg").height();
				var scrollHeight = $("#allMsg")[0].scrollHeight;
				if (scrollHeight >= containerHeight) {
					$("#allMsg")[0].scrollTop = scrollHeight;
				}
			}
		}, 500);
	})
	$(".pop-close").on('click', function() {
		$(".popup").hide();
		// enableScrolling();
	});
	//查看嘉宾详细信息
	$("body").on('click', '.icon-guest', function() {
		var index = $(this).attr('data-index');
		var guestObj = guestData[index];
		$("#iAvator")[0].src = guestObj.avator;
		$("#pTitle").html(guestObj.name + " " + guestObj.position);
		$("#pDesc").html(guestObj.desc);
		$("#guestDetail").show();

	});
	$(".icon-close-prism, #wxShare").on('click', function() {
		$(".masker").hide();
	});
	//分享
	$("#share").on('click', function() {
		if (isWeiXin()) {
			$("#wxShare").show();
		} else if (GetQueryString('type') == 'mobileapp') {
			if (Jsbridge.isNewVersion()) {
				if (Jsbridge.isCorrectVersion('4.5.0', 1)) {
					Jsbridge.ToAppActivity(7);
				} else {
					Jsbridge.toActivityAppInviteFriend();
				}
			} else {
				alert('版本过低，请升级团贷网app');
			}
		} else {
			//浏览器端分享
			alert('打开app即可分享');
		}
	});
	// $("#wxShare").on('click', function() {
	// 	$(this).hide();
	// });
	//发表
	$("#post").on('click', function() {
		if ($(this).hasClass('btn-disable')) {
			return;
		}
		//发表
	});

	function isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

})();