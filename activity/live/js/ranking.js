(function() {
	var dayList, totalList;
	var pageSize = 10;
	var dayListPager = {
		curPage: 1
	};
	var totalListPager = {
		curPage: 1
	};
	FastClick.attach(document.body);
	//tab切换
	$('.rt-type').on('click', function() {
		$('.rt-type').removeClass('active');
		$(this).addClass('active');
		var type = $(this).attr('data-type');
		if (type == 0) {
			$('.rl-container').removeClass('total-list').addClass('day-list');
			if ($("#dayList").find('.ranking-row').length === 0) {
				loadList('#dayList', 0);
			}
		} else {
			$('.rl-container').removeClass('day-list').addClass('total-list');
			if ($("#totalList").find('.ranking-row').length === 0) {
				loadList('#totalList', 1);
			}
		}
		// var dis = $(window).width() * (+type);
		// $('.rl-container').css('transform','translateX(' + (-dis) + 'px)');

	});

	function init() {
		// var listHeight = $(window).height() - $('.list-wrapper').offset().top;
		// $('.list-wrapper').height(listHeight);
		loadList('#dayList', 0);

	}
	init();

	/*
		el: list的swaper选择器；
		type: list类型 0-日榜单 1-总榜单
	*/
	function loadList(el, type) {
		var temp = '';
		var pager = type ? totalListPager : dayListPager;
		var start = 1 + (pager.curPage - 1) * pageSize,
			end = pager.curPage * pageSize;

		//模拟数据请求
		//在ajax的beforeSend中修改显示loading
		if (type === 0 && dayList) {
			dayList.isLoading(true);
		} else if (type === 1 && totalList) {
			totalList.isLoading(true);
		}

		//数据请求结束，在ajax的complete中隐藏loading
		if (type === 0 && dayList) {
			dayList.isLoading(false);
		} else if (type === 1 && totalList) {
			totalList.isLoading(false);
		}
		for (var i = start; i <= end; i++) {
			temp += ' <li class="ranking-row">';
			var styleStr = i <= 3 ? 'top-three' : 'r-normal';
			switch (i) {
				case 1:
					temp += '<div><i class="icon-gold"></i></div>'; //第一名
					break;
				case 2:
					temp += '<div><i class="icon-sliver"></i></div>'; //第二名
					break;
				case 3:
					temp += '<div><i class="icon-bonze"></i></div>'; //第三名
					break;
				default:
					temp += '<div>' + i + '</div>'; //其他排名
					break;
			}
			temp += '<div class="' + styleStr + '"><i class="r-avator r-gold"><img src="../images/avator.png"></i><span>团小π</span></div>' +
				'<div>贡献<font class="txt-yellow">908</font>团票</div></li>';
		}
		$(el).find('.ranking-list').append(temp);
		// var str = '<div class="load-more"><svg class="spinner show" viewBox="0 0 44 44"><circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle></svg></div>';
		// $(el).find('.ranking-list').append(str);

		if (type === 0) {
			if (dayList) {
				dayList.refresh();
			} else {

				dayList = new List('#dayList', {
					loadMore: function() {
						console.info('dayList---loadmore--');
						dayListPager.curPage += 1;
						loadList('#dayList', 0);
					}
				});
			}
		} else if (type === 1) {
			if (totalList) {
				totalList.refresh();
			} else {
				totalList = new List('#totalList', {
					loadMore: function() {
						console.info('totalList---loadmore---');
						totalListPager.curPage += 1;
						loadList('#totalList', 1);
						totalList.refresh();
					}
				});
			}
		}

	}
})();