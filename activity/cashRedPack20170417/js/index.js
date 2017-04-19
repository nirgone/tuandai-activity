(function() {
    FastClick.attach(document.body);
	    //do your thing.
	window.onload = function() {
		$(".icon-title").addClass('bounceInDown');
	}
	    //跳转到规则页面
    $("#go_rule").on("click", function(e) {
        // window.location.href = "./rule.html";
        disableScroll();
        $("#rule_sec").show();
        setTimeout(function(e) {
            $("#rule_sec").find('.rule-scroll').removeClass('zoomIn')
        }, 500)
    });
    $("#btn_share").on("click", function(e) {
    	// window.location.href = "./toopen.html";
        window.location.href = 'weixin://'
    });
    $("#tab-welfare .tab").on('click',function(e){
        var index = $(this).attr('data-index') - 1;
        $(this).addClass('on').siblings().removeClass('on');
        $("#welfare-cons .welfare-con").eq(index).removeClass('hide').siblings().addClass('hide');
    })

    //规则遮罩事件绑定
    $("#rule_sec").on("click", ".masker, .icon-close", function(e) {
        $("#rule_sec").hide();
        $("#rule_sec").find('.rule-scroll').addClass('zoomIn')
        enableScroll();
    });
})();