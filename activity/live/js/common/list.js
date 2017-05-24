/*
 * List 
 *
 * 
 * 
 *
 */

(function() {
    var myScroll;
    var _loading;
    var isLoading = false; //是否正在请求数据
    var _target;

    function addLoading() {
        var svgTemp = '<svg class="spinner show" viewBox="0 0 44 44"><circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle> </svg>';
        _loading = $('<div/>').addClass('load-more').html(svgTemp);
        _target.children().eq(0).append(_loading);
    }

    function List(el, options) {
        "use strict";
        _target = $(el);
        var wrapperHeight = $(window).height() - _target.offset().top;
        _target.height(wrapperHeight);
        addLoading();
        myScroll = new IScroll(el, {
            probeType: 2,
            disableMouse: true
        });
        myScroll.on('scrollEnd', function() {
            if (this.y - this.maxScrollY < 10) {
                !isLoading && options.loadMore && options.loadMore.call(this);
                // setTimeout(function() {
                //     _loading.remove();
                //     console.info('console',_loading);
                // }, 1000);
            }
        });

    }

    List.prototype = {
        //刷新列表
        refresh: function(type) {
            if (_target.find('.load-more').length < 1) {
                addLoading();
            }
            myScroll && myScroll.refresh();
            //滚动到顶部
            if (type == '0') {
                myScroll.scrollTo(0, 0);
            }
        },
        isLoading: function(bool) {
            if (bool) {
                // addLoading();
            } else {
                _loading.remove();
            }

            isLoading = bool;
            return bool;
        }
    }

    if (typeof module != 'undefined' && module.exports) {
        module.exports = List;
    } else if (typeof define == 'function' && define.amd) {
        define(function() {
            return List;
        });
    } else {
        window.List = List;
    }
})();