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
        var pop_dialog = $("<div/>").addClass('pop-dialog');
            mask = $("<div/>").addClass('mask');
            popWrap = $('<div/>').addClass('pop-wrap'),
            // popContent = $('<div/>').addClass('pop-content'),
            p = $('<p/>').html(_options.message),
            btn_message = $('<div/>').addClass(_options.btn.style).html(_options.btn.text),
            btn_cls =  $('<div/>').addClass('btn-cls');
            popWrap.append(p).append(btn_message).append(btn_cls);
            pop_dialog.append(mask).append(popWrap);
            

        if (_options.type === 1) { //团币兑换
            if(_options.tips_text){
                var tip = $('<p/>').addClass('tip').html(_options.tips_text);
                popWrap.append(tip);
                
            }

        }


        
        $('body').append(pop_dialog);

        mask.on("click", function(e) {
        });
        btn_message.on("click", function(e) {
            _options.btn.callback && _options.btn.callback();
            hide(pop_dialog);
        });
        btn_cls.on("click", function(e) {
            hide(pop_dialog);
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
            var _options = {
                "type": options.type || 0,
                "message": options.message || '',
                "btn": {
                    style: options.btn_style || 'btn-message',
                    text: options.btn_text || '获取更多机会',
                    callback: options.callback
                },
                "tips_text": options.tips_text
            };
            // _options = $.extend(_options, options || {});
            popup(_options);
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
        hide: function(target) {
            var that = this;
            target.remove();
            // enableScrolling();
            enableScrolling();
        },

        showPrize: function(options) {
            var that = this;
            var _options = {
                "dumplingIndex": 1, // 1 -- 左边的棕子，2 -- 中间的棕子 3 -- 右边的棕子
                "prizeIndex": 1, // 1 -- 团币 2-ipadair2 3 -- 现金红包 4 -- 超级会员 5 -- 相机
                "num": '' //数量
            };
            _options = $.extend(_options, options || {});
            var _icon = '',
                _prize = '';
            switch (_options.prizeIndex) {
                case 1:
                    _icon = "coin";
                    _prize = "团币";
                    break;
                case 2:
                    _icon = "ipadair2";
                    _prize = "ipad";
                    
                    break;
                case 3:
                    _icon = "red-pack";
                    _prize = "元投资红包";
                    break;
                case 4:
                    _icon = "vip";
                    _prize = "24小时vip";
                    break;
                case 5:
                    _icon = "camera";
                    _prize = "mini相机";
                    break;

            }
            var dialog_component = $("<div/>").addClass('component-dialog');
            var mask = $("<div/>").addClass('mask');
            var prize_wrap = '<div class="prize-wrap">'+
                                '<div class="prize-content">'+
                                    '<div class="prize icon-'+ _icon +'"></div>'+
                                    '<div class="dumpling icon-dumpling'+ _options.dumplingIndex +'"></div>'+
                                    '<p>恭喜获得<span class="prize-name">'+ _options.num + _prize + '</span></p>'+
                                    '<div class="btn btn-open">继续拆</div>'+
                                    '<div class="btn btn-prize">去看看</div>'+
                                '</div>'+
                            '</div>';
            dialog_component.append(mask).append(prize_wrap);
            $("body").append(dialog_component);
            dialog_component.find('.btn-open').on('click', function() {
                that.hide(dialog_component)
            })
        }
        
    }

    window.Util = util;
})();