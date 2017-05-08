(function() {
	var Util = {
		triggerSlideArrow: function(selector, swiper) {
			var prevObj = $(selector).find('.icon-prev');
			var nextObj = $(selector).find('.icon-next');
			if (swiper.isBeginning) {
				prevObj.hide();
			} else {
				prevObj.show();
			}
			if (swiper.isEnd) {
				nextObj.hide();
			} else {
				nextObj.show();
			}
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
	window.Util = Util;
})();