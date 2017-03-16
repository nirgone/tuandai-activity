(function() {
    FastClick.attach(document.body);

    /* ==================弹出框==popup================= */
    /*
            options : {
                message: 提示内容,
                contentStyle: 提示内容样式,
                icon: {
                    iconStyle: 图标样式,
                    iconText: 图标描述,
                },
                btn: {
                    style: 按钮样式,
                    text: 按钮文字,
                    callback: 按钮回调
                }
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            message: '',
            contentStyle: '',
            icon: {
                iconStyle: '',
                iconText: '',
            },
            btn: {
                style: '',
                text: '',
                callback: null
            }
        };
        _options = $.extend(_options, options || {});
        var mask = $('<div/>').addClass('mask'),
            masker = $('<div/>').addClass('masker'),
            popWrapper = $('<div/>').addClass('pop-wrapper').addClass('pop-container'),
            popContent = $('<div/>').addClass('pop-content').html(_options.message);

        if (_options.contentStyle) {
            popContent.addClass(_options.contentStyle);
        }
        // if (_options.btn.style) {
        //     btn.addClass(_options.btn.style);
        // }
        popWrapper.append(popContent);
        if (_options.btn.text) {
            _options.btn.style && btn.addClass(_options.btn.style);
            var btn = $('<div/>').addClass('btn-pop').html(_options.btn.text);
            //弹窗按钮点击事件
            btn.on('click', function(e) {
                var _callback = _options.btn.callback;
                typeof _callback === 'function' && _callback();
                hide(mask);
            });
            popWrapper.append(btn);
        }
        mask.append(masker);
        mask.append(popWrapper);
        $('body').append(mask);

        masker.on("click", function(e) {
            hide(mask);
        });

        function hide(target) {
            target.remove();
        }
    }

    function enableScrolling() {
        $(".scroll").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".scroll").removeClass("scroll-active");
    }

    var util = {
        message: function(options) {
            var msg = typeof options === 'string' ? options : options.content;
            popup({
                message: msg,
                contentStyle: 'toast-content',
                btn: {
                    text: '确定',
                    callback: options.callback
                }
            });
        },
        toast: function(msg, duration) {
            duration = duration ? duration : 1500;
            var _toast = $('<div/>').addClass('toast').html(msg);
            $('body').append(_toast);
            setTimeout(function() {
                _toast.remove();
            }, duration);
        }
    }

    window.Util = util;
})();