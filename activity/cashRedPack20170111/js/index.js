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

//规则遮罩事件绑定
    $("#rule_sec").on("click", ".masker, .icon-close", function(e) {
        $("#rule_sec").hide();
        $("#rule_sec").find('.rule-scroll').addClass('zoomIn')
        enableScroll();
    });

    /* ==================弹出框==alertTip================= */
    /*
        options : {
            content: 提示内容,
            btnText: 按钮文字
            callback: function() {

            }
        }
    */
    function alertTip(options) {
        var that = this;
        var _options = {
            "content": "",
            "btnText": "",
        };
        _options = $.extend(_options, options || {});
        var alert_component = $("<div/>").addClass("component-alert"),
            masker = $("<div/>").addClass("masker"),
            alert_wrapper = $("<div/>").addClass("alert-wrapper"),
            alert_content = $("<div/>").addClass("alert-content").html(_options.content),
            alert_btn = $("<div/>").addClass("btn").html(_options.btnText);

        alert_wrapper.append(alert_content).append(alert_btn);

        alert_component.append(masker).append(alert_wrapper);

        $("body").append(alert_component);
        disableScroll();
        //事件绑定
        masker.bind("click", function(e) {
            hide(alert_component);
        });

        alert_btn.bind("click", function(e) {
            if (_options.callback) {
                _options.callback();
            }
            hide(alert_component);
        });

        function hide(target) {
            target.remove();
            enableScroll();
        }
    }

    /* ==================弹出框=======end============ */
    /* ==================弹出框==dialog================= */
    /*
            options : {
                content: 提示内容,
                positiveBtnTxt: 积极按钮文字
                positiveCallback: function() {}
                negativeBtnTxt: 消极按钮文字
                negativeCallback: function() {}
            }
        */
    function dialog(options) {
        var that = this;
        var _options = {
            "content": "",
            "positiveBtnTxt": "",
            positiveCallback: null,
            "negativeBtnTxt": "",
            negativeCallback: null
        };
        _options = $.extend(_options, options || {});
        var dialog_component = $("<div/>").addClass("component-dialog"),
            masker = $("<div/>").addClass("masker"),
            dialog_wrapper = $("<div/>").addClass("dialog-wrapper"),
            dialog_content = $("<div/>").addClass("dialog-content").html(_options.content),
            btns = $("<div/>").addClass("btns"),
            positive_btn = $("<div/>").addClass("btn").addClass("positive-btn").html(_options.positiveBtnTxt);
            negative_btn = $("<div/>").addClass("btn").addClass("negative-btn").html(_options.negativeBtnTxt);

        btns.append(negative_btn).append(positive_btn);

        dialog_wrapper.append(dialog_content).append(btns);

        dialog_component.append(masker).append(dialog_wrapper);

        $("body").append(dialog_component);
        // disableScrolling();
        disableScroll();
        //事件绑定
        masker.bind("click", function(e) {
            hide(dialog_component);
        });

        negative_btn.bind("click", function(e) {
            if (_options.negativeCallback) {
                _options.negativeCallback();
            }
            hide(dialog_component);
        });

        positive_btn.bind("click", function(e) {
            if (_options.positiveCallback) {
                _options.positiveCallback();
            }
            hide(dialog_component);
        });

        function hide(target) {
            target.remove();
            // enableScrolling();
            enableScroll();
        }
    }

    /* ==================禁止滚动======================== */
    function disableScroll() {
        $(".scroll").removeClass("scroll-active");
    }

    function enableScroll() {
        $(".scroll").addClass("scroll-active");
    }
    /* ==================禁止滚动=====end=================== */
})();