(function() {
    FastClick.attach(document.body);

    /* ==================弹出框==popup================= */
    /*
      var _options = {
            'icon': 弹窗图标类名,
            // 'hasClose': false,
            'content': 弹窗内容,
            'hasBtn': 是否有按钮，默认为true,
            'button': {
                'content': 按钮文字,
                'class': 按钮样式,
                'callback': 按钮回调函数
            }
        };
            
        */
    function popup(options) {
        var that = this;
        var _options = {
            'icon': '',
            // 'hasClose': false,
            'content': '',
            'contentStyle': '',
            'hasBtn': true,
            'button': {
                'content': '',
                'class': '',
                'callback': null
            }
        };
        _options = $.extend(_options, options || {});
        var mask = $("<div/>").addClass("mask"),
            masker = $("<div/>").addClass('masker'),
            popupWrapper = $('<div/>').addClass('pop-wrapper'),
            popupContent = $('<div/>').addClass('pop-content').html(_options.content);
        if (_options.icon) {
            var icon = $("<i/>").addClass(_options.icon);
            popupWrapper.append(icon);
        }
        if(_options.contentStyle) {
            popupContent.addClass(_options.contentStyle);
        }
        popupWrapper.append(popupContent);
        if (_options.hasBtn) {
            var btn = $("<div/>").addClass('btn-red btn-submit').html(_options.button.content);
            if (_options.button.class) {
                btn.addClass(_options.button.class);
            }
            btn.on('click', function(e) {
                var _callback = _options.button.callback;
                if (_callback) {
                    _callback();
                }
                hide(mask);
            });
            popupWrapper.append(btn);
        }
        mask.append(popupWrapper);
        mask.append(masker);
        $("body").append(mask);
        masker.on('click', function(e) {
            hide(mask);
        });


    }

    function hide(target) {
        target.remove();
    }



    var util = {
        showPopup: function(options) {
            popup(options);
        },
        getParam: function(name, url) {
            if (!url) {
                url = decodeURIComponent(location.href);
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
        showLoader: function() {
            var mask = $("<div/>").addClass('mask loader-mask');
            var loader = $("<i/>").addClass('icon-loader');
            mask.append(loader);
            $("body").append(mask);
        },
        hideLoader: function() {
            var target = $(".loader-mask");
            hide(target);
        }


    }

    window.Util = util;
})();