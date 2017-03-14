(function() {
    FastClick.attach(document.body);
    var pageEl = $('.page');
    var dialogEl = $('.dialog');

    var countDownEl = pageEl.find('.countdown'); //倒计时DOM元素
    var startTime = 0; //倒计时开始时间
    var endTime = 0; //倒计时结束时间 
    var offset = 0; //倒计时修正数
    var count = 0; //倒计秒数
    var leftTime = 0; //倒计时剩余时间
    function initCountDonw(time) { //time为倒计时时间
        startTime = +new Date();
        endTime = +new Date(time);
        leftTime = Math.round((endTime - startTime) / 1000);
        leftTime > 0 && setTimeout(countDown, 0); //倒计时 大于0
    }

    function countDown() {
        offset = +new Date() - (startTime + count * 1000);
        var newTime = 1000 - offset; //修正后的倒计时间隔
        newTime = newTime < 0 ? 0 : newTime
        if (leftTime >= 0) {
            countDownEl.text(timeFormate(leftTime))
            leftTime = leftTime - 1; //剩余倒计时减去1s
            setTimeout(countDown, newTime);
        }
        count++;
    }

    function timeFormate(time) {
        var hours = Math.floor(time / 3600);
        var leave1 = time % (3600); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave1 / 60);
        //计算相差秒数
        var seconds = Math.round(leave1 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    }

    // 如何获取团币
    pageEl.on('click', '.btn-tbTips', function() {
        dialogEl.find('.dialog-item').removeClass('show');
        dialogEl.find('.dialog-tb-tips').addClass('show');
        dialogEl.addClass('show');
        Util.disableScrolling();
    });

    // 显示规则
    pageEl.on('click', '.btn-rule', function() {
        dialogEl.find('.dialog-item').removeClass('show');
        dialogEl.find('.dialog-rule').addClass('show');
        dialogEl.addClass('show');
        Util.disableScrolling();
    });


    // 关闭弹窗
    dialogEl.on('click', '.btn-confirm, .btn-close, .mask', function() {
        dialogEl.removeClass('show');
        Util.enableScrolling();
    });

    // 跳转至我的记录
    pageEl.on('click', '.btn-record', function() {
        window.location.href = './list.html';
    });



    initCountDonw('2017-03-13 11:40:00');
})();