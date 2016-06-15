(function($, win) {
    var Util = {

        // 阻止冒泡事件。
        stopBubble: function(el) {
            if (el && el.stopPropagation) {
                //因此它支持W3C的stopPropation()方法
                el.stopPropagation();
            } else {
                //否则,我们得使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
        },

        isWeiXin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
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


    }
    win.Util = Util;
    // return Util;

})($, window);