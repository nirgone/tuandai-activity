(function() {
	FastClick.attach(document.body);

	var mySwiper, curIndex, curModule = 0;

	function initPage(moduleId) {
		var initArr = [];
		var moduleArr = [];
		var startIndex = 0;
		if (moduleId == 0) {
			initArr = tempArr.slice(0, 7);
		} else {
			moduleArr = tempArr.filter(function(item) {
				return item.module == moduleId;
			});
			startIndex = moduleArr[0].index;
			if ((startIndex + 6) < tempArr.length) {
				initArr = tempArr.slice(startIndex, startIndex + 6);
			} else {
				initArr = tempArr.slice(startIndex, tempArr.length);
			}
			/*if (moduleArr.length < 6) {
				initArr = moduleArr;
			} else {
				initArr = moduleArr.slice(0, 6);
			}*/

		}

		if (mySwiper) {
			mySwiper.removeAllSlides();
			initArr.forEach(function(item) {
				var str = '<div class="swiper-slide" data-index="' + item.index + '" data-module="' + item.module + '">' + item.temp + '</div>';
				mySwiper.appendSlide(str);
			});
			$(".swiper-slide").find('.page').hide();
			$(".swiper-slide-active").find('.page').show();
			if (initArr.length < 7) {
				var len = 7 - initArr.length;
			}
			var lastIndex = startIndex - 1;
			for (var i = 0; i < len; i++) {
				var slideStr = '<div class="swiper-slide" data-index="' + tempArr[lastIndex].index + '" data-module="' + tempArr[lastIndex].module + '">' + tempArr[lastIndex].temp + '</div>';
				lastIndex -= 1;
				mySwiper.prependSlide(slideStr);
			}
		} else {
			var temp = "";
			initArr.forEach(function(item) {
				temp += '<div class="swiper-slide" data-index="' + item.index + '" data-module="' + item.module + '">' + item.temp + '</div>';
			});

			$(".swiper-wrapper").html(temp);
			mySwiper = new Swiper('.swiper-container', {
				direction: 'vertical',
				onInit: function(swiper) {},
				onTransitionEnd: function(swiper) {
					curIndex = $(".swiper-slide-active").attr('data-index');
					curModule = $(".swiper-slide-active").attr('data-module');
					// console.info("change end-----", swiper.activeIndex, curIndex);
					if (swiper.activeIndex > 0) {
						$(".btn-share").show();
					} else {
						$(".btn-share").hide();
					}
					$(".swiper-slide").find('.page').hide();
					$(".swiper-slide-active").find('.page').show();
					var length = swiper.slides.length;
					// console.info("previousIndex--" + swiper.previousIndex, "--activeIndex--" +swiper. activeIndex);
					// console.info("length--" + length);
					if (swiper.previousIndex <= swiper.activeIndex && swiper.activeIndex != 0) {

						//下滑到下一页
						if (swiper.activeIndex == length - 1 && curModule != 9) {
							var removeIndexs = [];
							var removeIndex = swiper.activeIndex - 1;
							for (var k = 0; k < length - 2; k++) {
								removeIndex -= 1;
								removeIndexs.push(removeIndex);
							}
							swiper.removeSlide(removeIndexs);
							curIndex = (+curIndex) + 1;
							for (var m = 0; m < length - 2; m++) {
								if (tempArr[curIndex]) {
									var str = '<div class="swiper-slide" data-index="' + curIndex + '" data-module="' + tempArr[curIndex].module + '">' + tempArr[curIndex].temp + '</div>';
									curIndex = (+curIndex) + 1;
									swiper.appendSlide(str);
								}
							}
							// console.info("length---next-", swiper.slides.length);

						}
					} else {
						//上滑上一页
						if (swiper.activeIndex == 0 && curModule > 1) {
							var removeIndexs = [];
							var removeIndex = swiper.activeIndex + 1;
							for (var i = 0; i < length - 2; i++) {
								removeIndex += 1;
								removeIndexs.push(removeIndex);
							}
							// console.info("removeIndex------prev--", removeIndexs, length);
							swiper.removeSlide(removeIndexs);
							for (var m = 0; m < length - 2; m++) {
								curIndex = (+curIndex) - 1;
								// console.info("curIndex------prev--", curIndex);
								var str = '<div class="swiper-slide" data-index="' + curIndex + '" data-module="' + tempArr[curIndex].module + '">' + tempArr[curIndex].temp + '</div>';
								swiper.prependSlide(str);
							}
							// console.info("length---prev-", swiper.slides.length);
						}

					}
				}
			});
		}

	}
	initPage(0);

	//目录-选中模块
	$(".mc").on('click', function() {
		$(".mc").removeClass('selected');
		$(this).removeClass('unselected').addClass('selected');
		var moduleId = $(this).attr('data-module');
		initPage(moduleId);
		$(".closecont").trigger('click');
		$(".btn-share").show();
	});
	//打开目录

	$('body').on('click', '.fmcont, .icon-menu', function() {
		$(".menucont").addClass('to-show');
	});
	//收起目录
	$(".closecont").on('click', function() {
		$(".menucont").removeClass('to-show');
	});
	$("body").on('touchstart', '.ewcont img', function() {
		var type = $(this).attr('data-type');
		if (type == "fwh") {
			$(".pimg")[0].src = "../images/wxfwh-big.png";
			$(".ew-name").html('团贷网微信服务号（tuandaiservice）');
			$('.ewtxt').html('<span>长按并复制微信号查找添加</span><span>或截屏后在微信端打开识别二维码</span>');
		} else if (type == "dyh") {
			$(".pimg")[0].src = "../images/wxdyh-big.png";
			$(".ew-name").html('团贷网微信订阅号（ tuandaiwang）');
			$('.ewtxt').html('<span>长按并复制微信号查找添加</span><span>或截屏后在微信端打开识别二维码</span>');
		} else {
			$(".pimg")[0].src = "../images/weibo-big.png";
			$(".ew-name").html('新浪微博@团贷网');
			$('.ewtxt').html('<span>在新浪微博搜索“团贷网”添加关注</span><span>或截屏后在微信端打开识别二维码</span>');
		}
		$(".ew").show();
	});
	$(".p-cancle").on('click', function() {
		$(".ew").hide();
	});
	//分享
	$("body").on('click', '.btn-share', function() {
		if (isWeiXin()) {
			$(".wx-mask").show();
		} else {
			if (Jsbridge.isNewVersion()) {
				if (Jsbridge.isCorrectVersion('4.5.0', 1)) {
					Jsbridge.ToAppActivity(1);
				}else{
					Jsbridge.toActivityAppInviteFriend();
				}
			} else {
				alert('版本过低，请升级团贷网app');
			}
		}
	});

	$(".wx-mask").on('click', function() {
		$(".wx-mask").hide();
	});

	function isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
})();