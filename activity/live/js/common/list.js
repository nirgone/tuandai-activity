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
    //type为0表示添加刷新的loading， 为1表示添加加载下一页的loading
    function addLoading(type) {
        var svgTemp = '<svg class="spinner show" viewBox="0 0 44 44"><circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle> </svg>';
        if (type) {
            _loading = $('<div/>').addClass('load-more').html(svgTemp);
            _target.children().eq(0).append(_loading);
        } else {
            if (_target.find('.list-reload').length < 1) {
                var reloading = $('<div/>').addClass('list-reload').html(svgTemp);
                _target.children().eq(0).prepend(_loading);
            }
        }
    }

    function List(el, options) {
        "use strict";
        _target = $(el);
        var wrapperHeight = $(window).height() - _target.offset().top;
        _target.height(wrapperHeight);
        // var listHeight = _target.find('.list').eq(0).height();
        addLoading(1);

        myScroll = new IScroll(el, {
            probeType: 2,
            disableMouse: true
        });
        myScroll.on('scrollEnd', function() {
            //加载下一页
            if (this.y - this.maxScrollY < 10 && this.maxScrollY < 0) {
                !isLoading && options.loadMore && options.loadMore.call(this);
            }
            // console.info('end-----', this.y - this.maxScrollY, this.maxScrollY)
            //刷新
            if (this.maxScrollY === this.maxScrollY - this.y) {
                !isLoading && options.reload && options.reload.call(this);
            }
        });
        myScroll.on('scroll', function() {
            // console.info(this.y - this.maxScrollY, this.maxScrollY);
            if (this.y - this.maxScrollY >= 0 - this.maxScrollY) {
                options.reload && addLoading(0);
            }

        });

    }

    List.prototype = {
        //刷新列表
        refresh: function(type) {
            if (_target.find('.load-more').length < 1) {
                addLoading(1);
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
                _loading && _loading.remove();
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