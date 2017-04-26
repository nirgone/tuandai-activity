(function() {
    FastClick.attach(document.body);

    /* ==================弹出框==popup================= */
    /*
            options : {
                type: 0 -- 普通弹窗， 1: 奖品弹窗
                message: 提示内容,
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
            type: 0,
            message: '',
            btn: {
                style: '',
                text: '',
                callback: null
            }
        };
        _options = $.extend(_options, options || {});
        // var pop_type = type == 0 ? 'alert-wrapper' : 'prize-wrapper';
        var popWrapper = $('<div/>').addClass('mask').addClass('pop-wrapper'),
            masker = $('<div/>').addClass('masker'),
            // popWrapper = $('<div/>').addClass('pop-wrapper'),
            popContent = $('<div/>').addClass('pop-content');
            p = $('<p/>').html(_options.message);
            btn = $('<div/>').addClass(_options.btn.style).html(_options.btn.text);

        if (_options.type === 0) {
            popWrapper.addClass('alert-wrapper');
        } else {
            popWrapper.addClass('prize-wrapper');
            icon_contain = $('<div/>').addClass('icon-contain').html('<i class="icon-prize"></i>');
            popContent.append(icon_contain);
        }

        popContent.append(p).append(btn);
        popWrapper.append(popContent);

        
        $('body').append(popWrapper);

        masker.on("click", function(e) {
            hide(popWrapper);
        });
        btn.on("click", function(e) {
            _options.btn.callback && _options.btn.callback();
            hide(popWrapper);
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
        // 普通弹窗 
        // options = {
            // content: 信息
            // callback: 按钮回调
        // }
        message: function(options) {
            var msg = typeof options === 'string' ? options : options.content;
            popup({
                message: msg,
                type: 0,
                btn: {
                    text: '确定',
                    style: 'btn-common-y',
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
        },
        // 奖品弹窗 
        // options = {
            // content: 奖品
            // callback: 按钮回调
        // }
        showPrize: function(options) {
            var msg = typeof options === 'string' ? options : options.content;
            popup({
                message: '恭喜获得<font class="font-red">' + msg + '</font>',
                type: 1,
                btn: {
                    text: '查看奖品',
                    style: 'btn-common-r',
                    callback: options.callback
                }
            });
        }
    }

    window.Util = util;
})();