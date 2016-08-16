(function() {
    FastClick.attach(document.body);
    //do your thing.
    window.onload = function(e) {
        $(".circle-part").addClass("add-animation");
    };

    //发红包
    $("#distribute_btn").on("click", function(e) {
        dialog({
            content: "暂没有红包可发送，投资获取红包？",
            negativeBtnTxt: "取消",
            positiveBtnTxt: "我要投资",
            positiveCallback: function() {
                console.log("positiveCallback");
            }
        })
    });
    //跳转到规则页面
    $("#go_rule").on("click", function(e) {
        // window.location.href = "./rule.html";
        disableScroll();
        $("#rule_sec").show();
    });

    //规则遮罩事件绑定
    $("#rule_sec").on("click", ".masker, .icon-close", function(e) {
        $("#rule_sec").hide();
        enableScroll();
    });
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
    /* ==================弹出框=======end============ */

    function disableScroll() {
        $(".scroll").removeClass("active");
    }

    function enableScroll() {
        $(".scroll").addClass("active");
    }
   

})();
