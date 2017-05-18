(function() {
	FastClick.attach(document.body);
	var mySwiper;
	var isLogin = false; //是否已登录
	var hasLot = false; //是否已抽奖
	var t = new Date().getTime();
	var bgMusic = $("#bgMusic")[0];

	function init() {
		//初始化swiper
		mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			initialSlide: 0,
			onInit: function(swiper) {
				// $(".swiper-slide-active").find('.page-det').show();
				// $(".page-det").eq(0).show();
			},
			onTransitionStart: function(swiper) {
				if (swiper.isEnd) {
					$(".icon-next").hide();
				} else {
					$(".icon-next").show();
				}
				// $(".page-det").hide();
			},
			onTransitionEnd: function(swiper) {
				$(".page-det").hide();
				// console.info(swiper.activeIndex);
				var page = swiper.activeIndex + 1;
				preloadImg(page);
				$(".swiper-slide-active").find('.page-det').show();

			}
		});

		var clientHeight = $(window).height();
		$(".page").height(clientHeight);

		$(".det-p8").hide();
		if (!isLogin) {
			$(".unlogin").show();
		} else {
			if (hasLot) {
				$(".lot").show();
			} else {
				$(".unlot").show();
			}
		}
		//loading进度
		var i = 0;
		var interval = setInterval(function() {
			if (i == 4) {
				clearInterval(interval);
			} else {
				var proValue = i * 25 + '%';
				$(".loading-txt").html(proValue);
				i += 1;
			}
		}, 500);
		initData();
		autoPlayAudio();

	}
	function initData () {
		var data;
		if(window.sessionStorage) {
			data = window.sessionStorage['data'];
		}else{
			data = window.mySessionStorage['data'];
		}
		if(data) {
			data = JSON.parse(data);
			var bAge = +data.mother - (+data.myAge) - 1;
			var day = (+data.myAge - (+data.leave)) * 365;
			var comDay = (80 - (+data.mother)) * (+data.back);
			var times = comDay * 3;
			var leftTimes = 80 - (data.mother);
			$("#bAge").html(bAge);
			$("#day").html(day);
			$("#comDay").html(comDay);
			$("#times").html(times);
			$(".ltimes").html(leftTimes);
		}
	}
	//第一页图片加载完成后隐藏loading
	window.onload = function() {
		var cur = new Date().getTime();
		var duration = new Date().getTime() - t < 3000 ? 3000 - (new Date().getTime() - t) : 0;
		setTimeout(function() {
			$(".loading-container").hide();
			$(".swiper-slide-active").find('.page-det').show();
			setTimeout(function() {
				$(".pop-p3").show();
			}, 4000);
			setTimeout(function() {
				$(".pop-p3").hide();
			}, 7000);
			$(".icon-next").show();
			preloadImg(1);
		}, duration);


	};
	init();

	//音乐自动播放

	$('body').on('touchend', function() {
		if ($(".icon-music").hasClass('icon-play')) {
			bgMusic.play();
		}
	});
	//微信自动播放
	 function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            document.getElementById('bgMusic').play();
        });
    }
	$(".icon-music").on('click', function() {
		if (bgMusic.paused) {
			bgMusic.play();
			$(this).removeClass('icon-paused').addClass('icon-play');
		} else {
			bgMusic.pause();
			$(this).removeClass('icon-play').addClass('icon-paused');
		}
	});
	//分享
	$(".btn-share").on('click', function() {
		if (Jsbridge.isNewVersion()) {
			Jsbridge.toAppActivity(1);
		} else {
			$(".mask").show();
		}
	});
	//查看已领礼物
	$(".btn-check").on('click', function() {
		location.href = './gift.html';
	});
	$(".mask").on('click', function() {
		$(".mask").hide();
	});
	//马上领取
	$(".btn-get").on('click', function() {
		location.href = './lottery.html';
	});
	//挑份礼物送给妈妈
	$(".btn-golot").on('click', function() {
		location.href = './lottery.html';
	});

	//预加载图片
	function preloadImg(page) {
		var imgs = [];
		var list = imgData[page] ? imgData[page] : [];
		var def = $.Deferred(),
			len = list.length;
		$(list).each(function(i, e) {
			var img = new Image();
			img.src = e;
			if (img.complete) {
				imgs[i] = img;
				len--;
				if (len == 0) {
					def.resolve();
				}
			} else {
				img.onload = (function(j) {
					return function() {
						imgs[j] = img
						len--;
						if (len == 0) {
							def.resolve();
						}
					};
				})(i);
				img.onerror = function() {
					len--;
					console.log('fail to load image');
				};
			}
		});
		return def.promise();
	}
	//每一页的图片
	var imgData = {
		'1': ['../images/text/p4-txt.png', '../images/text/p4-txt2.png', '../images/text/p4-txt3.png', '../images/icon1-p4.png', '../images/icon2-p4.png'],
		'2': ['../images/text/p5-txt.png', '../images/icon-tv.png', '../images/icon3-p5.png', '../images/icon1-p5.png', '../images/icon2-p5.png', '../images/icon-photo-p5.png'],
		'3': ['../images/txt-p6.png', '../images/icon3-p6.png', '../images/icon1-p6.png'],
		'4': ['../images/txt-p7.png', '../images/icon2-p7.png', '../images/icon1-p7.png'],
		'5': ['../images/txt-p8.png', '../images/icon-p8.png', '../images/icon-btn.png', '../images/wx-share.png'],
	};


})();