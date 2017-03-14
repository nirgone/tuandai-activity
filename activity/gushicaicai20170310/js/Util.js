(function() {

    /* ==================弹出框==popup================= */
    /*
            options : {
                title: 弹窗框的title,
                icon: 弹窗的图标
                content: 内容
                btns: [{
                    name: 按钮名称
                    callback: function() {}
                }]
            }
        */


    function enableScrolling() {
        $(".page").addClass("scroll-active");
    }

    function disableScrolling() {
        $(".page").removeClass("scroll-active");
    }

    var util = {

        enableScrolling: enableScrolling,

        disableScrolling: disableScrolling,

        pxToRem: function(px, basePx) {
            var basePx = basePx || 23.4375;

            return px / (basePx * 2);
        },

        remToPx: function(rem, basePx) {
            var basePx = basePx || parseInt(document.querySelector("html").style.fontSize);

            return rem * basePx;
        },

        pxToPx: function(px, basePx) {

            return this.remToPx(this.pxToRem(px, basePx), basePx);
        },

        pxToRemAdapt: function(px) {
            return this.pxToRem(px, parseInt(document.querySelector("html").style.fontSize));
        },

        //冒泡提示
        toast: function(msg, duration) {
            duration = isNaN(duration) ? 1000 : duration;
            var m = document.createElement('div');
            $(m).addClass("toast-content");
            m.innerHTML = msg;
            m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.6;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
            document.body.appendChild(m);
            setTimeout(function() {
                var d = 0.5;
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                m.style.opacity = '0';
                setTimeout(function() {
                    if ($(".toast-content").size() > 0) {
                        document.body.removeChild(m);
                    }
                }, d * 1000);
            }, duration);
        }

    }

    window.Util = util;
})();
