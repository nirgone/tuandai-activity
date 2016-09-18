(function($) {
    /* ==================弹出框==dialog================= */
    /*
            options : {
                icon: 兔子icon
                content: 提示内容,
                txt: 下面的小内容
                btns: [
                    color: 按钮颜色
                    txt: 按钮文字
                    callback: function() {} 按钮事件
                ],
                hideCallback: function() {} //隐藏的回调
            }
        */
    var dialog = function(options) {
            var that = this;
            var _options = {
                "icon": "icon-rabbit-pop0",
                "content": "",
                "txt": [""],
                "btns": [{
                    "color": "red",
                    "txt": "马上去弹",
                    "callback": null
                }],
                "hideCallback": null

            };
            _options = $.extend(_options, options || {});
            var dialog_component = $("<div/>").addClass("popup").addClass("popup-dialog"),
                masker = $("<div/>").addClass("masker"),
                dialog_content = $("<div/>").addClass("popup-content").addClass("dialog-content"),
                close = $("<i/>").addClass("icon-close"),
                icon = $("<i/>").addClass(_options.icon),
                info = $("<div/>").addClass("info").html(_options.content),
                txt = $("<div/>").addClass("txt"),
                txt_content = "";

            for (var i = 0; i < _options.txt.length; i++) {
                txt_content += "<p>" + _options.txt[i] + "</p>";
            }

            txt.append(txt_content);

            dialog_content.append(close).append(icon).append(info).append(txt);

            for (var j = 0; j < _options.btns.length; j++) {
                (function(index) {
                    var _option = _options.btns[index];
                    var _btn = $("<div/>").addClass("btn-pop").addClass("btn-" + _option.color).html(_option.txt);
                    _btn.bind("click", function(e) {
                        if (_option.callback) {
                            _option.callback();
                        }
                        hide(dialog_component);
                    });
                    dialog_content.append(_btn);
                })(j);
            }

            dialog_component.append(masker).append(dialog_content);

            $("body").append(dialog_component);
            //事件绑定
            masker.bind("click", function(e) {
                hide(dialog_component);
                if(_options.hideCallback) {
                	_options.hideCallback();
                }

            });
            close.bind("click", function(e) {
                hide(dialog_component);
                if(_options.hideCallback) {
                	_options.hideCallback();
                }
            });

            function hide(target) {
                target.remove();
            }
        }
        /* ==================弹出框=======end============ */
    window.popup = {
        dialog: dialog,
        alertPopup: function alertpopup(text) {
            dialog({
                "icon": "icon-rabbit-pop0",
                "content": "",
                "txt": [text],
                "btns": [{
                    "color": "green",
                    "txt": "确定",
                    "callback": function() {
                        // $("#share_popup").show();
                    }
                }]
            });
        }
    }

})(jQuery)
