(function(global) {
    /* ==================弹出框==dialog================= */
    /*
            options : {
                title: 提示标题,
                content: 提示内容,
                btns: [{
                    name: 按钮名称
                    cb: callback
                }] // 若按钮数组只有一个，那么是alert，按钮数组两个，第一个为negative按钮，第二个为positive按钮
            }
        */
    function popup(options) {
        var _options = {
            "title": "",
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
        if(_options.title) {
            var _title = $("<div/>").addClass("dialog-title").html(_options.title);
            dialog_wrapper.append(_title);
        }
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
        Util.disableScroll();
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

    // 测试地址
    var IP_OPERA = 'http://10.103.8.188:1022/v1/';

    // 发送弹幕消息扣除团票
    var SEND_BARRAGE = IP_OPERA + 'live/send-bullet-screen';
    var Util = {
        openApi: IP_OPERA,
        getElemetByTarget: function(target, cls, until) { //获取某个元素的父级或同级dom节点
            var result = target;
            if (!result) { //不存在target
                return false;
            }
            var classList = Array.from(result.classList); //转换成数组

            // 寻找到until类名位置为止，默认为body
            if (classList.indexOf(until) > -1 || result.tagName.toLocaleLowerCase() === "body") {
                return false;
            }

            if (classList.indexOf(cls) > -1) { //存在该类名
                return result;
            } else {
                return this.getElemetByTarget(result.parentElement, cls);
            }
        },
        getParam: function(name, url) {
            if (!url) {
                url = location.href;
            }
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var returnValue;
            for (var i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];
                if (tempParas === name)
                    returnValue = parasValue;
            }

            if (!returnValue) {
                return "";
            } else {
                if (returnValue.indexOf("#") != -1) {
                    returnValue = returnValue.split("#")[0];
                }
                return returnValue;
            }
        },
        toast: function(msg, duration) {
            duration = duration || 1500;
            var _toast = $("<div/>").addClass('toast').html(msg);
            $('body').append(_toast);
            setTimeout(function() {
                _toast.remove();
            }, duration);
        },
        setSessionStorage: function(key, obj) {
            window.sessionStorage[key] = JSON.stringify(obj)
        },
        getSessionStorage: function(key) {
            var objStr = window.sessionStorage[key];
            return objStr == null ? null : JSON.parse(objStr);
        },
        /* ==================禁止滚动======================== */
        disableScroll: function() {
            $(".scroll").removeClass("scroll-active");
        },
        enableScroll: function() {
            $(".scroll").addClass("scroll-active");
        },
        popup: popup,
        /* 
            config: {
                url: 请求路径,
                type: 请求类型，
                dataType: 返回的数据类型，
                cbOk: 成功回调，
                cbErr: 失败回调，
                cbCp: 完成回调
            }
        */
        Ajax: function(config) {
            var me = this;
            $.ajax({
                timeout: 20 * 1000,
                url: config.url,
                type: config.type,
                data: config.data,
                dataType: config.dataType,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("If-Modified-Since", "0");
                },
                success: function(data, textStatus, jqXHR) {
                    config.success && config.success(data, textStatus, jqXHR);
                },
                error: function(e, xhr, type) {
                    config.error && config.error(e, xhr, type);
                },
                complete: function(xhr, status) {
                    config.complete && config.complete(xhr, status);
                }
            });
        },
    }

    global.Util = Util;
})(window);
