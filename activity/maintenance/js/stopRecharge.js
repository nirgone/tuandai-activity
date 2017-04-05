(function() {
    FastClick.attach(document.body);
    var isStop = true; //是否停机维护中
    function webonResumeCallback(data) {
        //打开页面回调
        if (!isStop) {
            Jsbridge.closeWeb();
        }
    }

    function webonPauseCallback(data) {
        //离开页面回调
    }
    Jsbridge.appLifeHook(null, null, webonResumeCallback, webonPauseCallback, null);
    document.querySelector('.icon-close').addEventListener('click', function() {
        Jsbridge.closeWeb();
    });
})();