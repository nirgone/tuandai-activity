(function() {
    FastClick.attach(document.body);

    //查看活动规则
    $('.page').on('click', '.rule-btn', function() {
    	onShowRuleContent();
    })

    // TODO:我要参加活动
    $('.page').on('click', '.btn-join', function() {
    	console.log("我要参加活动")
    })

    var ruleContentEl = $('.rule-content'); 
    //点击关闭规则按钮
    ruleContentEl.on('click', '.mask', function() {
    	onHideRuleContent();
    })
    //点击遮罩层关闭规则
    ruleContentEl.on('click', '.icon-close', function() {
    	onHideRuleContent();
    })
    // 隐藏规则
    function onHideRuleContent() {
    	ruleContentEl.hide();
    }
    // 显示规则
    function onShowRuleContent() {
    	ruleContentEl.show();
    }
})();