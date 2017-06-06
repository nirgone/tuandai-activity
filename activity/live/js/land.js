(function() {
	FastClick.attach(document.body);
	// Util.toast('嘘！主播休息中...');
	//主播信息
	$('.video-info').on('click', function() {
		$('.anchor-info-wrapper').show();
	});
	$('.ai-close, .ai-masker').on('click', function() {
		$('.anchor-info-wrapper').hide();
	});
	// 绑定footer事
	$('#video_discuss_pane').on('click', '.item', function(e) {
		var $target = $(e.currentTarget);
		var _value = $target.attr('data-value');
		if (_value == 5) {
			showTips(1);
		} else {
			var options = {
				"content": "想和主播多点互动？<br>马上下载团贷网APP吧！",
				"btns": [{
					"name": "确定",
					"cb": function() {}
				}, {
					"name": "使用APP",
					"cb": function() {
						showTips(0);
					}
				}]
			}
			Util.popup(options);
		}
	});

	// 直播结束返回首页按钮时间绑定
    $('.live-end').on('click', '.btn', function(e){
        window.history.back();
    });

	function isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		return ua.match(/MicroMessenger/i) == 'micromessenger';
	}
	/*
	蒙层提示
	type: 0-提示打开浏览器下载app 1-提示分享  
	*/
	function showTips(type) {
		var temp = type ? '<i class="icon-share-txt1"></i>' : '<i class="icon-share-txt2"></i>';
		$('.icon-share').html(temp);
		$('.share-masker').show();
	}
	$('.share-masker').on('click', function() {
		$(this).hide();
	});

})();