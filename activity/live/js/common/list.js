/*
 * List 
 *
 * 
 * 
 *
 */

(function() {
    var myScroll;

    function List(el, options) {
        "use strict";
        var _target = $(el);
        var listHeight = $(window).height() - _target.offset().top;
        _target.height(listHeight);
        myScroll = new IScroll(el, {
            probeType: 2,
            disableMouse: true
        });
        myScroll.on('scrollEnd', function() {
            if (this.y - this.maxScrollY < 10) {
                options.loadMore && options.loadMore.call(this);
            }
        });

    }

    List.prototype = {
        //刷新列表
        refresh: function(type) {
            myScroll && myScroll.refresh();
            //滚动到顶部
            if (type == '0') {
                myScroll.scrollTo(0, 0);
            }
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