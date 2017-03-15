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

    // 点击押注
    pageEl.on('click', '.btn-bet', function(e) {
        var currentTarget = $(e.currentTarget);
        var tbNums = 50; //已押团币数量
        var isBetTime = true; //是否为押注时间
        if (!isBetTime) { //未到押注时间
            //UI提示未到押注时间
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-tips').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            return;
        }

        if (tbNums >= 500) {
            Util.toast('您今天已投注500团币，剩余0团币可投（一天最高投注500团币）');
            return;
        } else if (tbNums < 50) {
            Util.toast('啊哦~您的团币不足啦，凑够50团币再来挑战吧！');
            return;
        }

        if (currentTarget.hasClass('bet-up')) { //押上涨
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-up').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            dialogEl.find('.up-range').rangeslider({ //注册滚动条，只会初始化一次
                polyfill: false,

                // Default CSS classes
                rangeClass: 'my-rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: '',
                fillClass: 'up-rangeslider__fill',
                handleClass: 'rangeslider__handle',

                onInit: function() {},

                // Callback function
                onSlide: function(position, value) {},

                // Callback function
                onSlideEnd: function(position, value) { //押的团币数
                    dialogEl.find('.tb-num').text(value)
                }
            });
        } else if (currentTarget.hasClass('bet-down')) { //押下跌
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-down').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            dialogEl.find('.down-range').rangeslider({ //注册滚动条，只会初始化一次
                polyfill: false,

                // Default CSS classes
                rangeClass: 'my-rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: '',
                fillClass: 'down-rangeslider__fill',
                handleClass: 'rangeslider__handle',

                onInit: function() {},

                // Callback function
                onSlide: function(position, value) {},

                // Callback function
                onSlideEnd: function(position, value) { //押的团币数
                    dialogEl.find('.tb-num').text(value)
                }
            });
        }
    });

    // 点击提交押注
    dialogEl.on('click', '.btn-submit', function(e) {
        var currentTarget = $(e.currentTarget);
        var parentTarget = currentTarget.parents('.dialog-item');
        var tbNum = parentTarget.find('.tb-num').text();
        // debugger
        if (parentTarget.hasClass('dialog-bet-up')) { //押上涨
            console.log('您押涨' + tbNum + '团币')
        } else if (parentTarget.hasClass('dialog-bet-down')) { //押下跌
            console.log('您押跌' + tbNum + '团币')
        }
        
        var canSubmit = false;  //是否能提交
        if(!canSubmit) {    
            // TODO:xxx为变化值
            Util.toast('您今天已投注XXX团币，剩余XXX团币可投（一天最高投注500团币）');
            return;
        }
        
        // 关闭弹窗
        dialogEl.removeClass('show');
        Util.enableScrolling();
    });


    initCountDonw('2017-03-13 11:40:00');
})();