(function(doc, win) {
    var dpr, rem, scale;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';


    /*isAndroid = navigator.userAgent.match(/(Android)/) ? true:false;
    isIos = navigator.userAgent.match(/(iPad|iPhone)/) ? true:false;*/
    if (navigator.userAgent.match(/(Android)/)) {
        dpr = 1;
    } else {
        dpr = win.devicePixelRatio || 1;
    }
    scale = 1 / dpr;
    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no,shrink-to-fit=no');
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);
    var recalc = function() {
        // if (docEl.style.fontSize) return;
        var clientWidth = docEl.clientWidth;
        // console.log(clientWidth);
        if (!clientWidth) return;
        rem = clientWidth / 10
        docEl.style.fontSize = rem + 'px';
        if (doc.body) {
            doc.body.style.fontSize = docEl.style.fontSize;
        }
        if (dpr == 1) {
            // 动态写入样式
            var fontEl = doc.getElementById('init_style');
            var pxscale = clientWidth / 750;
            docEl.firstElementChild.appendChild(fontEl);
            fontEl.innerHTML = '.px-scale{transform:scale(' + pxscale + ') !important;-webkit-transform:scale(' + pxscale + ') !important;}'; //雪碧图缩放
        }
    };
    recalc();

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    // doc.addEventListener('touchstart', function(e) { e.preventDefault();}, false);

})(document, window);
