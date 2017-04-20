(function() {
    FastClick.attach(document.body);

    /* ==================弹出框==dialog================= */
    /*
            options : {
                content: 提示内容,
                btns: [{
                    name: 按钮名称
                    cb: callback
                }] // 若按钮数组只有一个，那么是alert，按钮数组两个，第一个为negative按钮，第二个为positive按钮
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            "content": "",
            "btns": [{
                "name": "",
                "cb": function() {}
            }, {
                "name": "",
                "cb": function() {}
            }]
        };
        _options = $.extend(_options, options || {});
        var dialog_component = $("<div/>").addClass("component-dialog"),
            masker = $("<div/>").addClass("masker"),
            dialog_wrapper = $("<div/>").addClass("dialog-wrapper"),
            dialog_content = $("<div/>").addClass("dialog-content").html(_options.content),
            btns = $("<div/>").addClass("btns"),
            negative_btn = '',
            positive_btn = '',
            ne_cb = null,
            po_cb = null;
        dialog_wrapper.append(dialog_content);
        if (_options.btns.length > 1) {
            negative_btn = $("<div/>").addClass("btn").addClass("negative-btn").html(_options.btns[0].name);
            positive_btn = $("<div/>").addClass("btn").addClass("positive-btn").html(_options.btns[1].name);
            btns.append(negative_btn).append(positive_btn);
            ne_cb = _options.btns[0].cb;
            po_cb = _options.btns[1].cb;
            dialog_wrapper.append(btns);
        } else {
            positive_btn = $("<div/>").addClass("btn").addClass("positive-btn").html(_options.btns[0].name);
            dialog_wrapper.append(positive_btn);
            po_cb = _options.btns[0].cb;
        }

        // dialog_wrapper.append(dialog_content).append(btns);

        dialog_component.append(masker).append(dialog_wrapper);

        $("body").append(dialog_component);
        // disableScrolling();
        that.disableScroll();
        //事件绑定
        masker.bind("click", function(e) {
            hide(dialog_component);
        });

        negative_btn && negative_btn.bind("click", function(e) {
            ne_cb && ne_cb.call(this, arguments);
            hide(dialog_component);
        });

        positive_btn.bind("click", function(e) {
            po_cb && po_cb.call(this, arguments);
            hide(dialog_component);
        });

        function hide(target) {
            target.remove();
            // enableScrolling();
            Util.enableScroll();
        }
    }

    /* ==================禁止滚动======================== */
    // function disableScroll() {
    //     $(".scroll").removeClass("scroll-active");
    // }


    /* ==================禁止滚动=====end=================== */


    var util = {
        // 普通弹窗 （alert，confirm）
        tip: popup,

        // 显示输入碳层
        /*
        cb: 回调函数
        */
        showInputPopup: function(cb) {
            var that = this;
            var input_popup = $('#input_popup');
            if (input_popup.length > 0) {
                input_popup.removeClass("slideOutDown").addClass("slideInUp")
                input_popup.show();
            } else {
                var input_wrapper = $('<div/>').addClass('input-wrapper'),
                    input = $('<input>').attr('type', 'tel').attr('id', 'telNo').attr('placeholder', '请输入手机号码'),
                    btn = $('<div/>').addClass('btn').attr('id', 'get_btn').html('马上领取'),
                    close = $('<div/>').addClass('close-part').html('<i class="icon-close-b" id="close"></i>');
                input_popup = $('<div/>').addClass('input-popup').addClass('slideInUp').attr('id', 'input_popup');
                input_wrapper.append(input);
                input_popup.append(input_wrapper).append(btn).append(close);
                $("body").append(input_popup);
            }
            // disableScrolling();
            that.disableScroll();
            input_popup.on('click', '#get_btn', function(e) {
                var _phone = input_popup.find("#telNo").val();
                // 判断号码是否合法
                if (!(/^1[34578]\d{9}$/.test(_phone))) {
                    that.tip({
                        "content": "手机号码有误，请重填",
                        btns: [{
                            "name": "确定",
                            "cb": function() {}
                        }]
                    });
                    return false;
                }


                // 验证电话号码
                Util.tip({
                    "content": "该号码已领取<br/>请提供新的手机号码",
                    btns: [{
                        "name": "确定",
                        "cb": function() {}
                    }]
                });

                // cb是传入的回调，用于成功后的操作
                cb && cb.call(this, arguments);

            });
            input_popup.on('click', '#close', function() {
                hide(input_popup);
            })
          
            function hide(target) {
                target.removeClass("slideInUp").addClass("slideOutDown");
                // enableScrolling();
                that.enableScroll();
            }

        },
        showPrize: function(options) {
            var that = this;
            var _options = {
                "type": 0, // 0 -- 团币， 1 -- 投资红包 2 -- 现金红包
                "num": 0 // 数量
            };
            _options = $.extend(_options, options || {});
            var _icon = '',
                _prize = '';
            switch (_options.type) {
                case 0:
                    _icon = "coin";
                    _prize = "团币";
                    break;
                case 1:
                    _icon = "invest-red";
                    _prize = "元投资红包";
                    break;
                case 2:
                    _icon = "cash-red";
                    _prize = "元现金红包";
                    break;

            }
            var dialog_component = $("<div/>").addClass("component-dialog"),
                masker = $("<div/>").addClass("masker"),
                prize_wrapper = $("<div/>").addClass("prize-wrapper"),
                prize_content = $("<div/>").addClass("prize-content"),
                icon = $("<i/>").addClass("icon").addClass("icon-" + _icon).attr("data-value", _options.num),
                p = $("<p/>").addClass('prize-txt').html("获得" + _options.num + _prize + "～"),
                btn = $("<div/>").addClass('btn').html("我知道了");

            prize_content.append(icon).append(' <p class="title">恭喜！</p>').append(p).append('<p class="info">请前往“我-团宝箱”进行查看</p>');
            prize_wrapper.append(prize_content).append(btn);
            dialog_component.append(masker).append(prize_wrapper);

            $("body").append(dialog_component);
            btn.on('click', function() {
                hide(dialog_component);
            });

            function hide(target) {
                target.remove();
                // enableScrolling();
                that.enableScroll();
            }
        },
        /* ==================禁止滚动======================== */
        disableScroll: function() {
            $(".scroll").removeClass("scroll-active");
        },
        enableScroll: function() {
            $(".scroll").addClass("scroll-active");
        }

    }

    window.Util = util;
})();
