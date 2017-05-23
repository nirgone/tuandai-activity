(function() {
	FastClick.attach(document.body);
	$('body').on('click', '.tp-item', function() {
		$('.tp-item').removeClass('active');
		$(this).addClass('active');
		//选中快捷键，清除自定义输入的兑换数量
		$("#count").val('');
		$(".tp-input-tips").html('');
	});
	$("#goDetail").on('click', function() {
		location.href = './tpDetail.html';
	});

	//输入兑换的团票数量
	$("#count").on('input', function() {
		var num = $(this).val();
		if (num && num > 0) {
			var ratio = 100; //团票与团币兑换比例
			var calu = num * ratio + '团币';
			$(".tp-input-tips").html(calu);
			//输入自定义兑换数量的话取消快捷键的选中
			$('.tp-item').removeClass('active');
		} else {
			$(".tp-input-tips").html('');
		}
	});

	//充值
	$('.btn-recharge').on('click', function() {
		var _selected = $('.tp-list').find('.active');
		//需要兑换的团票数量
		var number = _selected && _selected.length > 0 ? _selected.attr('data-num') : $("#count").val(); 
		// console.info('number----', number);
		if(!number || +number < 1) {
			Util.toast('请选择兑换团票数量');
			return;
		}

		// Util.toast('充值成功！');
		var options = {
			"title": "充值确认",
			"content": "购买<font class='txt-yellow'>30</font>团票，将花费您<font class='txt-yellow'>300</font>个团币",
			"btns": [{
				"name": "取消",
				"cb": function() {}
			}, {
				"name": "确定",
				"cb": function() {
					//充值
				}
			}]
		};
		Util.popup(options);
	});
})();