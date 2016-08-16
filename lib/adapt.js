//动态算rem
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                // if (docEl.style.fontSize) return;
                // clientWidth = docEl.clientWidth;
                clientWidth = docEl.clientWidth > 414 ? 414 : docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                if (document.body) {
                    document.body.style.fontSize = docEl.style.fontSize;
                }
            };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);