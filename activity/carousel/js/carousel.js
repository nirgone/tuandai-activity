var Carousel = (function($) {
    'use strict';
    // 偏移量
    var _left = 0,
        _top = 0,
        _touchstart_time = null,
        _touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        },
        _current_slide_index = 0,
        _current_slide_index_temp = 0,
        _dxrad = 0.1,
    _transition_timeout = null;

    //设置对象位置
    var _setPosition = function(obj, rad, config) {
        // obj.style.left = this._a * Math.cos(rad) + this._x + "px";
        // obj.style.top = this._b * Math.sin(rad) + this._y + "px";
        var _x = config.a * Math.sin(rad) + _left;
        var _y = config.b * Math.cos(rad) + _top;
        var _scale = 1 - 0.25 * (1 - Math.cos(rad));

        obj.style.webkitTransform = "translate3d(" + _x + "px, " + _y + "px, " + 1 + "px) scale(" + _scale + ")";
        if (Math.cos(rad) > 0) {
            obj.style.zIndex = 3;
        } else {
            obj.style.zIndex = 2;
        }
    };
    //根据轨迹运动
    var _transition = function(slides, deg, diff, config) {
        var n = slides.length;
        // return(deg);
        console.log("---transition----" + _current_slide_index);
        // return;
        var _cantransition = true;
        for (var i = 0; i < n; i++) {
            _setPosition(slides[i], 2 * Math.PI * (i - _current_slide_index) / n + _dxrad, config);
        }
        if (diff > 0) {
            _dxrad = _dxrad + 0.03;
            if (_dxrad >= deg) {
                _dxrad = deg;
                _cantransition = false;
            }
        } else {
            _dxrad = _dxrad - 0.03;
            if (Math.abs(_dxrad) >= deg) {
                _dxrad = deg;
                _cantransition = false;
            }
        }
        // console.log(_dxrad, deg)
        // console.log(_cantransition);
        // if (_dxrad >= Math.PI) _dxrad = _dxrad - Math.PI;
        if (_cantransition) {
            // setTimeout(this.uid + ".transition(" + n + ", " + deg + "," + diff + ")", 1000 / 60 / 10);
            // _transition_timeout = null;
            _transition_timeout = setTimeout(function() {
                _transition(slides, deg, diff, config);
            }, 1000 / 60 / 10);
        } else {
            _dxrad = 0.1;
            if (diff < 0) {
                _current_slide_index = _current_slide_index + 1 >= n ? 0 : _current_slide_index + 1;
            } else {
                _current_slide_index = _current_slide_index - 1 < 0 ? n : _current_slide_index - 1;
            }
            for (var i = 0; i < n; i++) {
                var _item = slides[i];
                _setPosition(_item, 2 * Math.PI * (i - _current_slide_index) / n, config);
            }

            // console.log("---transition-end---" + _current_slide_index);
            // 给当前slide加入current-slide样式;
            // that.el.find(".carousel-slide").removeClass("current-slide");
            // that.el.find(".carousel-slide:nth-child(" +(_current_slide_index + 1) +")").addClass("current-slide");
            // if (that.config.onTransitionEnd) {
            //     that.config.onTransitionEnd(_current_slide_index, $(".current-slide")[0], that);
            // }
        }
    };

    var Carousel = function(selector, options) {
        var el = $(selector);
        var opt = options || {};
        return new Carousel.prototype.init(el, opt);
    }
    Carousel.prototype = {
        constructor: Carousel,

        init: function(el, opt) {
            this.el = el;
            // this.uid = "move_" + Math.random();
            // this.uid = this.uid.replace(".", "");
            // eval("window." + this.uid + "=this;");
            this.config = {
                a: 100,
                b: 60
            };
            this.config = $.extend(this.config, opt || {});
            this.items = [];

            _left = (this.el.width() - this.el.find(".carousel-slide").width()) / 2;
            _top = this.config.b * 0.5;
            // _dxrad = 1.58;
            var images = this.el.find(".carousel-slide");
            images.eq(0).addClass("current-slide");
            var n = images.length;
            for (var i = 0; i < n; i++) {
                this.items = images;
                _setPosition(images[i], 2 * Math.PI * i / n, this.config);
                // this.setAlpha(images[i - 1], 2 * Math.PI * i / n);
            }
            this.onTouchStart();
            this.onTouchMove();
            this.onTouchEnd();

            // 绑定slide点击事件
            var that = this;
            that.el.on("click", ".carousel-slide", function(e) {
                if (that.config.slideClick) {
                    // var $target = $(e.currentTarget);
                    var index = $(this).index();
                    that.config.slideClick(index, this);
                }
            });
            // this.play(n);
        },
        //设定透明度
        // setAlpha: function(obj, rad) {
        //     var _config = this.config;
        //     var p = (Math.sin(rad) < 0) ? 2 * _config.a - Math.abs(_config.a * Math.cos(rad)) : _config.a * Math.abs(Math.cos(rad));
        //     p = 100 - 40 * p / _config.a + 20;
        //     obj.style.filter = 'alpha(opacity=' + p + ')';
        //     obj.style.opacity = p / 100;
        // },
        //根据轨迹运动
        // play: function(n) {
        //     // console.log("---play----");
        //     for (var i = 0; i < this.items.length; i++) {
        //         this.setPosition(this.items[i], 2 * Math.PI * i / n + _dxrad);
        //         // this.setAlpha(this.items[i], 2 * Math.PI * i / n + _dxrad);
        //     }
        //     _dxrad = _dxrad - 0.03;
        //     if (_dxrad >= Math.PI) _dxrad = _dxrad - Math.PI;
        //     window.setTimeout(this.uid + ".play(" + n + ")", 120);
        // },
        // //根据轨迹运动
        // transition: function(n, deg, diff) {
        //     var that = this;
        //     // return(deg);
        //     console.log("---transition----" + _current_slide_index);
        //     // return;
        //     var _cantransition = true;
        //     for (var i = 0; i < n; i++) {
        //         _setPosition(this.items[i], 2 * Math.PI * (i - _current_slide_index) / n + _dxrad, that.config);
        //     }
        //     if (diff > 0) {
        //         _dxrad = _dxrad + 0.03;
        //         if (_dxrad >= deg) {
        //             _dxrad = deg;
        //             _cantransition = false;
        //         }
        //     } else {
        //         _dxrad = _dxrad - 0.03;
        //         if (Math.abs(_dxrad) >= deg) {
        //             _dxrad = deg;
        //             _cantransition = false;
        //         }
        //     }
        //     // console.log(_dxrad, deg)
        //     // console.log(_cantransition);
        //     // if (_dxrad >= Math.PI) _dxrad = _dxrad - Math.PI;
        //     if (_cantransition) {
        //         // setTimeout(this.uid + ".transition(" + n + ", " + deg + "," + diff + ")", 1000 / 60 / 10);
        //         setTimeout(function() {
        //             that.transition(n,deg,diff);
        //         }, 1000 / 60 /10);
        //     } else {
        //         _dxrad = 0.1;
        //         if (diff < 0) {
        //             _current_slide_index = _current_slide_index + 1 >= n ? 0 : _current_slide_index + 1;
        //         } else {
        //             _current_slide_index = _current_slide_index - 1 < 0 ? n : _current_slide_index - 1;
        //         }
        //         for (var i = 0; i < n; i++) {
        //             var _item = that.items[i];
        //             _setPosition(_item, 2 * Math.PI * (i - _current_slide_index) / n, that.config);
        //         }

        //         // console.log("---transition-end---" + _current_slide_index);
        //         // 给当前slide加入current-slide样式;
        //         that.el.find(".carousel-slide").removeClass("current-slide");
        //         that.el.find(".carousel-slide:nth-child(" +(_current_slide_index + 1) +")").addClass("current-slide");
        //         if (that.config.onTransitionEnd) {
        //             that.config.onTransitionEnd(_current_slide_index, $(".current-slide")[0], that);
        //         }
        //     }
        // },
        onTouchStart: function() {
            /*$(".luckey-bags-slide").css({
                        "-webkit-transition-duration": "0ms"
            });*/
            var that = this;
            that.el.on("touchstart", function(e) {

                _touchstart_time = new Date();
                if (e.originalEvent) {
                    e = e.originalEvent;
                }
                // console.log(e.originalEvent.targetTouches[0]);
                _touches.startX = _touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                _touches.startY = _touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                // console.log(_touches);
                if (that.config.onTouchStart) {
                    // var $target = $(e.currentTarget);
                    that.config.onTouchStart(_current_slide_index, that);
                }
            });
        },
        onTouchMove: function() {
            var that = this;
            that.el.on("touchmove", function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.originalEvent) e = e.originalEvent;
                // if (isTouchEvent && e.type === 'mousemove') return;
                if (e.targetTouches && e.targetTouches.length > 1) return;
                _touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var diff = _touches.diff = _touches.currentX - _touches.startX; // <0 向左，>0 向右滑
                var _clientWidth = $(window).width();
                // console.log(diff);
                that.direction = diff > 0 ? 'prev' : 'next';
                var _ratio = diff / _clientWidth;
                // console.log(Math.abs(diff));
                // if (Math.abs(diff) < 30) {
                //     return;
                // }
                // 向右加，向左减
                _dxrad = Math.PI * _ratio;
                // if (diff > 0) {
                //     _dxrad = _dxrad + 0.1;
                // } else {
                //     _dxrad = _dxrad - 0.1;
                // }
                // console.log(_dxrad);
                that.el.find('.carousel-slide').css({
                    "webkitTransitionDuration": "0ms"
                });
                var n = that.items.length;
                // if (_dxrad >= Math.PI) _dxrad = _dxrad - Math.PI;
                var _current_slide = "";
                var _max_cos = -2;
                // console.log(that)
                for (var i = 0; i < that.items.length; i++) {
                    var _item = that.items[i];
                    var _deg = 2 * Math.PI * (i - _current_slide_index) / n + _dxrad;
                    _setPosition(_item, _deg, that.config);
                    // console.log(that.items[i].id + "---" + Math.cos( 2 * Math.PI * i / n + _dxrad));
                    // 获得当前slide
                    var _cos = Math.cos(_deg);
                    if (_item.style.zIndex == 3) {
                        if (_cos > _max_cos) {
                            _max_cos = _cos;
                            _current_slide = _item;
                            _current_slide_index_temp = i;
                        }
                    }
                    // $(_item).attr("data-y",_cos);
                    // this.setAlpha(this.items[i], 2 * Math.PI * i / n + _dxrad);
                }
                // console.log(_current_slide.id);
                that.el.find(".carousel-slide").removeClass("current-slide");
                $(_current_slide).addClass("current-slide");

                if (that.config.onTouchMove) {
                    // var $target = $(e.currentTarget);
                    that.config.onTouchMove(_current_slide_index_temp, that);
                }

                // 向右加，向左减
                // if(diff > 0) {
                //     _dxrad = _dxrad + 0.1;
                // } else {
                //     _dxrad = _dxrad - 0.1;
                // }

            });
        },
        onTouchEnd: function() {
            var that = this;
            that.el.on("touchend", function(e) {

                var n = that.items.length;
                var _nowTime = new Date();
                if (_current_slide_index_temp >= 0) {
                    _current_slide_index = _current_slide_index_temp;
                    _current_slide_index_temp = -1;
                }

                // console.log(_current_slide_index);
                if (_nowTime - _touchstart_time < 200 && Math.abs(_touches.diff) > 50) {
                    if (_transition_timeout) {
                        clearTimeout(_transition_timeout);
                        _transition_timeout = null;
                    }
                    _transition(that.items, 2 * Math.PI / n, _touches.diff, that.config);
                } else {
                    that.el.find('.carousel-slide').css({
                        "webkitTransitionDuration": "120ms"
                    });
                    for (var i = 0; i < n; i++) {
                        var _item = that.items[i];
                        _setPosition(_item, 2 * Math.PI * (i - _current_slide_index) / n, that.config);
                    }
                    if (that.config.onTransitionEnd) {
                        that.config.onTransitionEnd(_current_slide_index, $(".current-slide")[0], that);
                    }
                }
                _touches.diff = 0;
            });
        },
        slideTo: function(index) {
            // console.log(n);
            var that = this;
            var n = that.items.length;
            // _current_slide_index = _current_slide_index + 1 >= n ? 0 : _current_slide_index + 1;
            _current_slide_index = index;
            for (var i = 0; i < n; i++) {
                var _item = that.items[i];
                _setPosition(_item, 2 * Math.PI * (i - _current_slide_index) / n, that.config);
            }
        },
        next: function() {
            var _next = _current_slide_index + 1 >= this.items.length ? 0 : _current_slide_index + 1;
            this.slideTo(_next);
        },
        prev: function() {
            var _prev = _current_slide_index - 1 < 0 ? this.items.length : _current_slide_index - 1;
            this.slideTo(_prev);
        }
    };
    Carousel.prototype.init.prototype = Carousel.prototype;

    return Carousel;

})(window.jQuery || window.Zepto || window.$ || {});

/*=========================
Carousel AMD Export
=========================*/
if (typeof(module) !== 'undefined') {
    module.exports = Carousel;
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return Carousel;
    });
}
