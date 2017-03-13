(function() {
    FastClick.attach(document.body);
    var pageEl = $('.page');

    var countDownEl = pageEl.find('.countdown'); //倒计时DOM元素
    var startTime = 0; //倒计时开始时间
    var endTime = 0;	//倒计时结束时间 
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
        var newTime = 1000 - offset;	//修正后的倒计时间隔
        newTime = newTime < 0 ? 0 : newTime
        if (leftTime >= 0) {	
            countDownEl.text(timeFormate(leftTime))
            leftTime = leftTime - 1;	//剩余倒计时减去1s
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

    initCountDonw('2017-03-13 11:40:00')
})();
