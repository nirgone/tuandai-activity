(function() {
    FastClick.attach(document.body);
    window.onload = function(e) {
        $("#title").show();
    };
    //兑奖结果信息
    var _dialog_info = [{
            "icon": "icon-rabbit-pop2",
            "content": "多谢！油已加满！"
        }, {
            "icon": "icon-rabbit-pop3",
            "content": "油加一次就够啦！"
        }]
        //兑奖按钮
    $("#to_add").bind("click", function(e) {
        showResult(1);
    });
    
   
    // 兑奖结果弹窗 0－－加油成功 1-－已加满
    function showResult(type) {
        var _option = _dialog_info[type];
        dialog({
            "icon": _option.icon,
            "content": _option.content,
            "txt": ["亲手弹一弹", "你也可以赢取哈根达斯哦！"],
            "btns": [{
                "color": "red",
                "txt": "马上去弹",
                "callback": function() {
                    window.location.href = "./index.html";
                }
            }]
        });
    }
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
                ]
            }
        */
    function dialog(options) {
        var that = this;
        var _options = {
            "icon": "icon-rabbit-pop0",
            "content": "",
            "txt": [""],
            "btns": [{
                "color": "red",
                "txt": "马上去弹",
                "callback": null
            }]

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
        });

        function hide(target) {
            target.remove();
        }
    }
    /* ==================弹出框=======end============ */
})();
