(function() {
    FastClick.attach(document.body);

    //查看活动规则
    $('.page').on('click', '.rule-btn', function() {
        onShowRuleContent();
    })

    // TODO:我要参加活动
    $('.page').on('click', '.btn-join', function() {
        var t = Util.getParam('t');
        var s = Util.getParam('s');
        var type = Util.getParam('type');
        window.location.href = "./page2.html?t=" + t + "&s=" + s + "&type=" + type;
    })

    var ruleContentEl = $('.rule-content');
    //点击关闭规则按钮
    ruleContentEl.on('click', '.mask', function() {
        onHideRuleContent();
    });
    //点击遮罩层关闭规则
    ruleContentEl.on('click', '.icon-close', function() {
        onHideRuleContent();
    });
    // 隐藏规则
    function onHideRuleContent() {
        enableScrolling();
        ruleContentEl.hide();
    }
    // 显示规则
    function onShowRuleContent() {
        disableScrolling();
        ruleContentEl.show();
    }

    function scrolling(e) {
        preventDefault(e);
    }

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function disableScrolling() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', scrolling, false);
            window.addEventListener('touchmove', scrolling, false);
            window.onmousewheel = document.onmousewheel = scrolling;
            // document.onkeydown = keydown;
        }
    }

    function enableScrolling() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', scrolling, false);
            window.removeEventListener('touchmove', scrolling, false);
        }
        // window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        window.onmousewheel = document.onmousewheel = null;
    }
})();