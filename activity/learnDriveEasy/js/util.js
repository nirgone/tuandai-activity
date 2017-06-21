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
            popContent = $('<div/>').addClass('pop-con'),
            p_str = '',
            // btn_message = $('<div/>').addClass(_options.btn.style).html(_options.btn.text),
            cls_btn =  $('<div/>').addClass('cls-btn');

        if(!_options.message){
            switch(_options.type) {
                case 0:
                    p_str = '<p class="title">运营商授权认证</p>' +
                            '<p>1、运营商服务密码只用于信息校验，以便进行分期申请审核，不存在安全隐患，后期可自行修改运营商服务密码。</p>' +
                            '<p>2、若忘记运营商服务密码，可通过：<br/>' +
                                '联通用户：编辑短信405发送到10010，通过短信营业厅重置服务密码。<br/>' +
                                '移动用户：编辑短信CZMM发送到10086，通过短信营业厅重置服务密码。<br/>' +
                                '电信用户：编辑短信503发送到10001，通过短信营业厅重置服务密码。<br/>' +
                            '</p>';
                    break;
                case 1:
                    
                    break;
            }
        }

        popContent.append(p_str).append(cls_btn);
        popWrap.append(popContent);
        pop_dialog.append(mask).append(popWrap);

        $('body').append(pop_dialog);

        cls_btn.on("click", function(e) {
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
        // 获取url参数值
        getQueryString: function(name) { 
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) return unescape(r[2]); return null; 
        },
        bindEvent: function() {
            var that = this;
            var $input = $("input"),
                value;
            // 输入框事件
            $input.on('focus', function(event) {
                var target = $(event.target);
                value = target.val();
            })
            $input.on('blur', function(event) {
                var target = $(event.target);
                if(target.val() === ''){
                    // that.toast('不能为空');
                    target.val(value);
                }
            })
        },
        message: function(options) {
            var msg = typeof options === 'string' ? options : options.message;
            popup({
                "type": options.type || 0,
                "message": msg
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
        hide: function(target) {
            var that = this;
            target.remove();
            // enableScrolling();
            enableScrolling();
        },

        showPrize: function(options) {
            var that = this;
            var _options = {
               
            };
            _options = $.extend(_options, options || {});
        }
        
    }

    window.Util = util;
})();