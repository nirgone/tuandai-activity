(function() {
    FastClick.attach(document.body);



    //兑换


    /* ==================弹出框==popup================= */
    /*
            options : {
                title: 弹窗框的title,
                icon: 弹窗的图标
                content: 内容
                btns: [{
                    name: 按钮名称
                    callback: function() {}
                }]
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            "title": "",
            "icon": "",
            "content": "",
            "btn": null,
            "closeCallback": null
        };
        _options = $.extend(_options, options || {});
        var popup = $("<div/>").addClass("popup");
        masker = $("<div/>").addClass("masker"),
            popup_wrapper = $("<div/>").addClass("popup-wrapper"),
            popup_header = $("<div/>").addClass("popup-header").attr("data-title", _options.title),
            popup_close = $("<div/>").addClass("popup-close").html('<i class="close"></i>'),
            popup_content = $("<div/>").addClass("popup-content").html(_options.content);



        if (_options.icon) {
            var i = $("<i/>").addClass("icon").addClass("icon-" + _options.icon);
            popup_header.append(i);
            popup.addClass("popup-icon");
        }
        popup_header.append(popup_close);
        if(_options.btn) {
            var btn = $("<div/>").addClass("btn-orange").html(_options.btn.name);

            popup_content.append(btn);
            btn.on("click", function(e) {
                var _callback = _options.btn.callback;
            if (_callback) {
                _callback();
            }
            hide(popup);
        });
        }
        popup_wrapper.append(popup_header).append(popup_content);
        popup.append(masker).append(popup_wrapper);
        $("body").append(popup);
        disableScrolling();
        

        popup_close.on("click", function(e) {
            var _closefun = _options.closeCallback;
            if (_closefun) {
                _closefun();
            }
            hide(popup);
        });

        function hide(target) {
            target.remove();
            enableScrolling();
        }
    }

    function enableScrolling() {
        $(".scroll").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".scroll").removeClass("scroll-active");
    }


    var util = {
        //普通带title带文字内容弹窗，content--html片段， closeCallback--关闭回调
        message: function(title, content, closeCallback) {
            popup({
                title: title,
                "content": content,
                "closeCallback": closeCallback
            });
        },
        //加息提示弹窗，percent--加息百分比
        alertJiaxi: function(percent, closeCallback) {
            popup({
                "icon":"pop0",
                "content": '<p>恭喜您获得加息特权</p><p class="percent">'+percent+'</p>',
                "closeCallback": closeCallback
            });
        },
        //加息提示弹窗，percent--加息百分比
        alertJiaxi: function(percent, closeCallback) {
            popup({
                "icon":"pop0",
                "content": '<p>恭喜您获得加息特权</p><p class="percent">'+percent+'</p>',
                "closeCallback": closeCallback
            });
        },
        //带icon和按钮的弹窗
        // option: {
        //     type:  取值[1, 2]--icon类型
        //     content: html片段
        //     btn : {
        //         name: 按钮名字
        //         callback: 按钮回调
        //     },
        //     closeCallback: 关闭回调
        // }
        alertCommon: function(option) {
            popup({
                "icon":"pop" + option.type,
                "content": option.content,
                "btn": option.btn,
                "closeCallback": option.closeCallback
            });
        }
    }

    window.Util = util;
})();
