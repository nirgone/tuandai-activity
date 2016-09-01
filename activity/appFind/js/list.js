(function($) {
	function List(el, options) {
		// this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.wrapper = typeof el == 'string' ? $(el) : el;
		this.options = {
			el: el
		};
		for (var i in options) {
			this.options[i] = options[i];
		}
		var h;
		if (this.options.height) {
			h = this.options.height;
		} else {
			h = $(window).height() - this.wrapper.offset().top;
		}
		this.wrapper.height(h);
		this.init();
	}
	List.prototype = {
		init: function() {
			if (this.options.loadList && typeof this.options.loadList == "function") {
				this.options.loadList();
			}
			// if (!this.scroller) {
			// 	this.scroller = new IScroll(this.options.el, {
			// 		probeType: 2
			// 	});
			// }

			this.bindEvent();
		},
		bindEvent: function() {
			var me = this;
			this.wrapper.on('scroll', function(e) {
				var target = e.currentTarget,
					height = $(target).height(),
					scrollHeight = target.scrollHeight,
					scrollTop = target.scrollTop;
				var time = new Date() - me.startTime;
				/*if (scrollTop - me.scrollTop > 100) {
					console.info("111111111");
				} else if (scrollTop - me.scrollTop < -100) {
					console.info("22222");
				}*/
				if (height + scrollTop - scrollHeight >= -2) {
					// me.wrapper.find('.list-tips').show();
					if (me.options.loadList && typeof me.options.loadList == "function") {
						me.options.loadList.apply();
						// me.wrapper.find('.list-tips').hide();

					}
					/*	if (!me.nomore) {
							// me.loading = true;
							setTimeout(function() {
								me.getData(false);
							}, 0);
						}*/

				}
			});
			this.wrapper.on('touchstart', function() {
				me.startTime = new Date();
			});
			this.wrapper.on('touchend', function(e) {
				/*var target = e.currentTarget,
					height = $(target).height(),
					scrollHeight = target.scrollHeight,
					scrollTop = target.scrollTop;
				me.endTime = new Date();
				if (this.endTime - this.startTime < 200) {
					me.hidefloatcont = scrollTop - me.scrollTop > 0 ? true : false;

				}
				if (Math.abs(height + scrollTop - scrollHeight) < 3) {
					if(me.options.loadList && typeof me.options.loadList == "function") {
						me.options.loadList.apply();
						// me.wrapper.find('.list-tips').hide();

					}
				}
				me.scrollTop = scrollTop;*/
			});

		}
	};
	if (typeof module != 'undefined' && module.exports) {
		module.exports = List;
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return List;
		});
	} else {
		window.List = List;
	}

})(window.Zepto || window.jQuery);