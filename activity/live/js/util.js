(function(global) {


    var Util = {
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
        setSessionStorage: function(key, param) {
            if (window.sessionStorage) {
                window.sessionStorage[key] = param
            } else {
                window.mySessionStorage[key] = param
            }
        },
        getSessionStorage: function(key) {
            if (window.sessionStorage) {
                return window.sessionStorage[key]
            } else {
                return window.mySessionStorage[key]
            }
        }
    }

    global.Util = Util;
})(window);

// if (typeof(module) !== undefined) {
//     module.exports = Util;
// }