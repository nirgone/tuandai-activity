(function(global) {
	var Util = {
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
		toast: function(options) {
			var msg = typeof options == 'string' ? options : options.message;
			duration = options.duration || 1500;
			position = options.position || 'bottom';
			var posClass = 'toast-' + position;
			var _toast = $("<div/>").addClass('toast').html(msg);
			_toast.addClass(posClass);
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