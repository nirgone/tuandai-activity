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
            duration = isNaN(duration) ? 3000 : duration;
            var m = document.createElement('div');
            $(m).addClass("toast-content");
            m.innerHTML = msg;
            var cssText = "width:70%; min-width:150px; background:#000; opacity:0.6; color:#fff; padding: " 
            + this.pxToRem(20) + "rem " +  this.pxToRem(20)+ "rem; text-align:center; border-radius:" + this.pxToRem(6) 
            + "rem; position:fixed; bottom:18%; left:50%; z-index:999999; -webkit-transform: translateX(-50%);transform: translateX(-50%); font-weight:bold;font-size:" 
            + this.pxToRem(30) + "rem;" + "line-height: " + this.pxToRem(42) + "rem;";
            m.style.cssText = cssText;
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
