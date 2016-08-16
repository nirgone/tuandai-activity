(function() {
    FastClick.attach(document.body);
    // alert($(window).height());
    //do your thing.
    //第一页，发现现金红包
    $("#open_btn").on("click", function(e) {
        $(".redpack-top").addClass("open");

        showOpenResult({
            "type": 1,
            "content": "<font>388</font>.13"
        });
        // showOpenResult({
        //  "type": 0,
        //  "content": "该红包已超过8小时的领取时间，红包已失效"
        // });

        // alertTip({
        //     "content": "哎哟喂，您是老团粉呀！<br/>放开这个红包，让新手来领取吧！",
        //     "btnText": "我知道了"
        // });
        // window.location.href = "./open_negative.html";
    });
    $("#get_btn").on("click", function(e) {
        alertTip({
            "content": "哎哟喂，您是老团粉呀！<br/>放开这个红包，让新手来领取吧！",
            "btnText": "我知道了"
        });
        console.log("领取");
    });

    //没有领到红包结果
    /*
     {
        type: 0--negavite, 1--positive;
        content: 内容
     }
    */
    function showOpenResult(config) {
        var _classname = "redpack-inside slideInUp ",
            _content = "";
        // if(config.type == 1) {
        //  $(".descri.negative").hide();
        // }  
        setTimeout(function showResult(e) {
            $(".open")[0].style.zIndex = 2;
            if (config.type == 0) {
                _classname += "negative flex";
                _content = config.content;
                $("#redpack_result").html(_content);
                $("#redpack_result")[0].className = _classname;
                $(".descri.negative").show();
                $("#down_btn").show();
            } else {
                _classname += "positive";
                _content = '<p>获取好友</p><p>' + config.content + '</p><p>现金红包</p>';
                $("#redpack_result").html(_content);
                $("#redpack_result")[0].className = _classname;

                $(".down").addClass("down-positive");

                // setTimeout(function showDownPart() {
                //     //隐藏logo
                //     $(".icons-sec").addClass("fadeOut");

                //     // $(".descri").addClass("positive").html("另外，团小贷为您精心准备一下礼品").show();
                // }, 800);
            }
        }, 400);
    }

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
        disableScrolling();
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
            enableScrolling();
        }
    }

    //拉起输入碳层
    $("#to_input").click(function(e) {
        $("#input_popup").removeClass("slideOutDown").addClass("slideInUp");
        $("#input_popup").show();
        // setTimeout(function() {
        //     $("#telNo").focus();
        // }, 500);
    });
    $("#input_popup").on("click", ".icon-close", function(e) {
        $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
    });
    /* ==================弹出框=======end============ */


    /* ==================禁止滚动======================== */
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
        }
    }

    function enableScrolling() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', scrolling, false);
            window.removeEventListener('touchmove', scrolling, false);
        }
        window.onmousewheel = document.onmousewheel = null;
    }

    /* ==================禁止滚动=====end=================== */

})();
