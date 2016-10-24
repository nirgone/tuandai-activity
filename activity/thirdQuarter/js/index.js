(function() {
	FastClick.attach(document.body);

	var mainSwiper, curIndex, curModule = 0;
	var regionSwiper, actSwiper, tdNewsSwiper, gyNewsSwiper, newsSwiper;


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
			//目录跳转先获取6页数据
			if ((startIndex + 6) < tempArr.length) {
				initArr = tempArr.slice(startIndex, startIndex + 6);
			} else {
				initArr = tempArr.slice(startIndex, tempArr.length);
			}

		}
		// console.info("initArr--",initArr);

		if (mainSwiper) {
			mainSwiper.removeAllSlides();
			initArr.forEach(function(item) {
				var str = '<div class="swiper-slide" name="main" data-index="' + item.index + '" data-module="' + item.module + '">' + item.temp + '</div>';
				mainSwiper.appendSlide(str);
			});
			$("#mainSwiper").find(".swiper-slide").find('.page').hide();
			$(".swiper-slide-active[name='main']").find('.page').show();
			//获取页面数据小于7页prepend相应数量的页面
			if (initArr.length < 7) {
				var len = 7 - initArr.length;
			}
			var lastIndex = startIndex - 1;
			for (var i = 0; i < len; i++) {
				var slideStr = '<div class="swiper-slide"  name="main"data-index="' + tempArr[lastIndex].index + '" data-module="' + tempArr[lastIndex].module + '">' + tempArr[lastIndex].temp + '</div>';
				lastIndex -= 1;
				mainSwiper.prependSlide(slideStr);
			}
			clearSwiper();
			// initPageData();
		} else {
			var temp = "";
			initArr.forEach(function(item) {
				temp += '<div class="swiper-slide" name="main" data-index="' + item.index + '" data-module="' + item.module + '">' + item.temp + '</div>';
			});
			$(".swiper-wrapper").html(temp);
			mainSwiper = new Swiper('#mainSwiper', {
				direction: 'vertical',
				onInit: function(swiper) {},
				onTransitionEnd: function(swiper) {
					curIndex = $(".swiper-slide-active[name='main']").attr('data-index');
					curModule = $(".swiper-slide-active[name='main']").attr('data-module');
					// console.info("change end-----", swiper.activeIndex, curIndex);
					if (curIndex > 0) {
						$(".icon-share").show();
						$(".icon-menu").show();
					} else {
						$(".icon-share").hide();
						$(".icon-menu").hide();
					}
					$("#mainSwiper").find(".swiper-slide").find('.page').hide();
					$(".swiper-slide-active[name='main']").find('.page').show();
					var length = swiper.slides.length;

					// console.info("previousIndex--" + swiper.previousIndex, "--activeIndex--" + swiper.activeIndex);
					// console.info("length--" + length);
					// return
					if (swiper.previousIndex <= swiper.activeIndex && swiper.activeIndex != 0) {
						//下滑到下一页
						if (swiper.activeIndex == length - 1 && curModule != 8) {
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
									var str = '<div class="swiper-slide" name="main" data-index="' + curIndex + '" data-module="' + tempArr[curIndex].module + '">' + tempArr[curIndex].temp + '</div>';
									// console.info("appendSlide---", curIndex);
									curIndex = (+curIndex) + 1;
									swiper.appendSlide(str);
								}
							}
							// console.info("length---next-", swiper.slides.length);

						}
					} else {
						//上滑上一页
						if (swiper.activeIndex == 0 && curModule > 0) {
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
								console.info("curIndex------prev--", curIndex);
								if (curIndex >= 0) {
									var str = '<div class="swiper-slide" name="main" data-index="' + curIndex + '" data-module="' + tempArr[curIndex].module + '">' + tempArr[curIndex].temp + '</div>';
									swiper.prependSlide(str);
								}
							}
							// console.info("length---prev-", swiper.slides.length);
						}
						clearSwiper();
					}

					//初始化页面具体内容
					initPageData();

				}
			});
		}


	}
	initPage(0);

	function initPageData() {
		var mainIndex = $(".swiper-slide-active[name='main']").attr('data-index');
		// console.info("initPageData-------",mainIndex);
		if (mainIndex < 21) {
			$(".icon-up").show();
		} else {
			$('.icon-up').hide();
		}
		var numArr;
		switch (+mainIndex) {
			case 1:
				console.info(years, days, hours);
				if (years > 9) {
					$("#num1").html('<i class="icon-rect c-num">0</i><i class="icon-rect c-num">0</i>');
				} else {
					$("#num1").html('<i class="icon-rect c-num">0</i>')
				}
				if (days > 99) {
					$("#num2").html('<i class="icon-rect c-num rect-left" >0</i><i class="icon-rect c-num" >0</i><i class="icon-rect c-num" >0</i>');
				} else if (days > 9) {
					$("#num2").html('<i class="icon-rect c-num rect-left" >0</i><i class="icon-rect c-num" >0</i>');
				} else {
					$("#num2").html('<i class="icon-rect c-num rect-left" >0</i>');
				}
				if (hours > 9) {
					$("#num3").html('<i class="icon-rect c-num rect-left">0</i><i class="icon-rect c-num">0</i>');
				} else {
					$("#num3").html('<i class="icon-rect c-num rect-left">0</i>');
				}
				numArr = [{
					id: 'num1',
					startValue: 0,
					endValue: years,
					speed: 100
				}, {
					id: 'num2',
					startValue: 0,
					endValue: days
				}, {
					id: 'num3',
					startValue: 0,
					endValue: hours
				}];


				break;
			case 2:
				numArr = [{
					id: 'num4',
					startValue: 200,
					endValue: 328,
				}, {
					id: 'num5',
					startValue: 2600,
					endValue: 2780
				}];
				break;
			case 3:
				numArr = [{
					id: 'num6',
					startValue: 0,
					endValue: 20,
				}, {
					id: 'num7',
					startValue: 4200,
					endValue: 4392
				}];
				break;
				/*case 4:
					numArr = [{
						id: 'num-zj1',
						startValue: 776000,
						endValue: 776689,
						mode: 1
					}, {
						id: 'num-zj2',
						startValue: 907000,
						endValue: 907766,
						mode: 1
					}];
					break;*/
			case 5:
				numArr = [{
					id: 'jyeNum1',
					startValue: 0,
					endValue: 97,
					mode: 1
				}, {
					id: 'jyeNum2',
					startValue: 7500,
					endValue: 7686,
					mode: 1
				}, {
					id: 'jyeNum3',
					startValue: 37801,
					endValue: 37955,
					decimals: 2,
					mode: 1
				}, {
					id: 'jyeNum4',
					startValue: 5500,
					endValue: 5649,
					decimals: 2,
					mode: 1
				}];
				break;
			case 6:
				numArr = [{
					id: 'syNum1',
					startValue: 0,
					endValue: 5,
					mode: 1
				}, {
					id: 'syNum2',
					startValue: 4200,
					endValue: 4307,
					mode: 1
				}, {
					id: 'syNum3',
					startValue: 25400,
					endValue: 25560,
					decimals: 2,
					mode: 1
				}, {
					id: 'syNum4',
					startValue: 6000,
					endValue: 6146,
					decimals: 2,
					mode: 1
				}];
				break;
			case 7:
				numArr = [{
					id: 'peoNum1',
					startValue: 400,
					endValue: 596,
					mode: 1
				}, {
					id: 'peoNum3',
					startValue: 4900,
					endValue: 5058,
					decimals: 2,
					mode: 1
				}, {
					id: 'peoNum4',
					startValue: 13800,
					endValue: 13978,
					decimals: 2,
					mode: 1
				}];
				break;
			case 8:
				numArr = [{
					id: 'rzNum1',
					startValue: 27600,
					endValue: 27703,
					mode: 1,
					divised: true
				}, {
					id: 'rzNum3',
					startValue: 56200,
					endValue: 56323,
					decimals: 2,
					mode: 1
				}, {
					id: 'rzNum4',
					startValue: 3500,
					endValue: 3699,
					decimals: 2,
					mode: 1
				}];
				break;
			case 9:
				numArr = [{
					id: 'yqNum',
					startValue: 0,
					endValue: 120,
					decimals: 2,
					mode: 1
				}];
				break;
			case 11:
				if (!regionSwiper) {
					regionSwiper = new Swiper('#regionSwiper', {
						direction: 'horizontal',
						onSlideChangeEnd: function(swiper) {
							var regionIndex = swiper.activeIndex;
							$(".region-tabs").find('span').removeClass('active');
							if (regionIndex == 0) {
								$(".region-tabs").find('span').eq(0).addClass('active');
								$(".txt-page11").html('（2016年第三季度投资人数地区TOP10）');
							} else {
								$(".region-tabs").find('span').eq(1).addClass('active');
								$(".txt-page11").html('（2016年第三季度投资金额地区TOP10）');
							}
						}
					});
				}
				break;
			case 16:
				if (!actSwiper) {
					actSwiper = new Swiper('#actSwiper', {
						direction: 'horizontal',
						pagination: '#actPagination',
					});
				}
				break;
			case 17:
				if (!tdNewsSwiper) {
					tdNewsSwiper = new Swiper('#tdNewsSwiper', {
						direction: 'horizontal',
						slidesPerView: 3,
						spaceBetween: 10,
						loop: true,
						pagination: '#tdNewsPagination',
						onInit: function(swiper) {
							$("#tdNewsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						},
						onSlideChangeStart: function(swiper) {
							$("#tdNewsSwiper").find('.n-slide').removeClass('to-scale');
						},
						onSlideChangeEnd: function(swiper) {
							$("#tdNewsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						}
					});
				}

				break;
			case 18:
				if (!gyNewsSwiper) {
					gyNewsSwiper = new Swiper('#gyNewsSwiper', {
						direction: 'horizontal',
						slidesPerView: 3,
						spaceBetween: 10,
						loop: true,
						pagination: '#gyNewsPagination',
						onInit: function(swiper) {
							$("#gyNewsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						},
						onSlideChangeStart: function(swiper) {
							$("#gyNewsSwiper").find('.n-slide').removeClass('to-scale');
						},
						onSlideChangeEnd: function(swiper) {
							$("#gyNewsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						}
					});
				}
				break;
			case 19:
				if (!newsSwiper) {

					newsSwiper = new Swiper('#newsSwiper', {
						direction: 'horizontal',
						slidesPerView: 3,
						spaceBetween: 10,
						loop: true,
						pagination: '#newsPagination',
						onInit: function(swiper) {
							$("#newsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						},
						onSlideChangeStart: function(swiper) {
							$("#newsSwiper").find('.n-slide').removeClass('to-scale');
						},
						onSlideChangeEnd: function(swiper) {
							$("#newsSwiper").find('.swiper-slide-active').find('.n-slide').addClass('to-scale');
						}
					});
				}
				break;

		}
		if (numArr && numArr.length > 0) {
			numArr.forEach(function(item) {
				numJson[item.id] = "";
			});
			initNumCount(numArr);
		}
	}

	//目录-选中模块
	$(".module-cont").on('click', function() {
		$(".module-cont").removeClass('module-selected');
		$(this).addClass('module-selected');
		var moduleId = $(this).attr('data-module');
		initPage(moduleId);
		$(".closecont").trigger('click');
		// $(".icon-share").show();
		// initPageData();

	});
	//打开目录
	$('body').on('click', '.icon-menu', function() {
		var moduleId = $(".swiper-slide-active[name='main']").attr('data-module');
		$(".module-cont").removeClass('module-selected');
		$(".module-cont[data-module='" + moduleId + "']").addClass('module-selected');
		$(".menucont").addClass('to-show');
	});
	//收起目录
	$(".closecont").on('click', function() {
		$(".menucont").removeClass('to-show');
	});
	//运营实录查看全部
	$('body').on('click', '.btn-check', function() {
		$(".popup-p15").show();
	});
	//运营实录关闭按钮
	$("body").on('click', '#reportClose', function() {
		$(".popup-p15").hide();
	});
	//点击二维码弹出二维码大图
	$('body').on('touchstart', '.icon-qrcode', function() {
		var type = $(this).attr('data-type');
		if (type === 'dyh') {
			//订阅号
			$(".pimg")[0].src = '../images/qrcode_dyh_big.png';
			$('ew-name').html('团贷网微信订阅号（tuandaiwang)');
			$('.ew-desc').html('长按并复制微信号查找添加<br>或截屏后在微信端打开识别二维码');
		} else if (type === 'fwh') {
			//服务号
			$(".pimg")[0].src = '../images/qrcode_fwh_big.png';
			$('ew-name').html('团贷网微信服务号（tuandaiservice)');
			$('.ew-desc').html('长按并复制微信号查找添加<br>或截屏后在微信端打开识别二维码');
		} else {
			//微博
			$(".pimg")[0].src = '../images/qrcode_wb_big.png';
			$('ew-name').html('新浪微博@团贷网');
			$('.ew-desc').html('在新浪微博搜索“团贷网”添加关注<br>或截屏后在微信端打开识别二维码');
		}
		$(".pop-qrcode").addClass('show-qrcode');
		// setTimeout(function() {
		// 	$("#ewClose").show();
		// }, 300);
	});


	//关闭二维码大图弹窗
	$('body').on('click', '#ewClose', function() {
		// setTimeout(function() {
		// 	$("#ewClose").hide();
		// }, 200);
		$(".pop-qrcode").removeClass('show-qrcode');
	});
	//分享
	$("body").on('click', '.icon-share', function() {
		if (isWeiXin()) {
			$(".mask").show();
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

	$(".mask").on('click', function() {
		$(".mask").hide();
	});

	$("body").on('click', '.region-tabs span', function() {
			var type = $(this).attr('data-type');
			$(".region-tabs").find("span").removeClass('active');
			if (type == 0) {
				$(".region-tabs").find("span").eq(0).addClass('active');
				regionSwiper.slideTo(0);
			} else {
				$(".region-tabs").find("span").eq(1).addClass('active');
				regionSwiper.slideTo(1);
			}
		})
		//数据滚动初始化
	var numJson = {};

	function initNumCount(objs) {
		if (objs && objs.length > 0) {
			objs.forEach(function(item) {
				if (numJson[item.id]) {
					// console.info("initNumCount------");
					numJson[item.id].count();
				} else {
					numJson[item.id] = new CountNum('#' + item.id, item);
					numJson[item.id].count();
				}
			})
		}

	}

	function clearSwiper() {
		regionSwiper = null;
		actSwiper = null;
		tdNewsSwiper = null;
		gyNewsSwiper = null;
		newsSwiper = null;
		initPageData();
	}

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

	function getTime() {
		var start = "2012-07-15";
		var curTime = new Date();
		var curYear = curTime.getFullYear();
		var curMonth = curTime.getMonth() + 1;
		var curDate = curTime.getDate();
		var time = {
			years: 0,
			dates: 0,
			hours: 0
		}
		if (curMonth >= 7 && curMonth >= 15) {
			time.years = curYear - 2012;

		} else {
			time.years = curYear - 2012 - 1;
		}
	}

})();