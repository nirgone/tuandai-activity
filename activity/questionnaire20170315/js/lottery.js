(function() {
    FastClick.attach(document.body);
    //do your thing.
    // var _indexs = [0, 1, 2, 3, 4, 5, 6, 7]; //抽奖奖品图标下标
    var _prizes = [{
        "title": "谢谢参与",
        "icon": "icon-smile",
    }, {
        "title": "88元现金红包",
        "icon": "icon-rp88",
    }, {
        "title": "10团币",
        "icon": "icon-coin",
    }, {
        "title": "88团币",
        "icon": "icon-coins",
    }, {
        "title": "谢谢参与",
        "icon": "icon-smile",
    }, {
        "title": "8.8元现金红包",
        "icon": "icon-rp808",
    }, {
        "title": "10团币",
        "icon": "icon-coin",
    }, {
        "title": "0.88元现金红包",
        "icon": "icon-rp088",
    }];
    $("#btn_lottery").on("click", function(e) {
        lottery.init({
            id: 'lottery',
            speed: 60
        });
        //settimeout 之后可以替换成ajax,ajax成功回调后，设置获取的奖品
        setTimeout(function(e) {
            lottery.stop(7, function(index) {
                alert(_prizes[index].title + ":" + _prizes[index].icon);
            }); //设置获取的奖品
        }, 2000);
    });
    /*抽奖*/
    var lottery = {
        config: {
            id: "",
            index: -1, //当前转动到哪个位置，起点位置
            count: 0, //总共有多少个位置
            speed: 20, //初始转动速度
            cycle: 18, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
        },
        times: 0, //转动次数
        timer: 0, //setTimeout的ID，用clearTimeout清除
        lotteryCallback: null,
        init: function(config) {
            this.config = $.extend(this.config, config || {});
            var _config = this.config;
            if (_config.index < -1) {
                _config.index = -1
            }
            if (_config.index > 7) {
                _config.index = 7
            }
            if ($("#" + _config.id).find(".item").length > 0) {
                $lottery = $("#" + _config.id);
                $units = $lottery.find(".item");
                _config.obj = $lottery;
                _config.count = $units.length;
                $lottery.find("#item" + this.index).addClass("active");
            };
            this.lottery(this);
        },
        roll: function(index) {
            var _config = this.config;
            var _index = _config.index;
            var count = _config.count;
            var lottery = _config.obj;
            $(lottery).find("#item" + _index).removeClass("active");
            _index = _index + 1 > 7 ? 0 : _index + 1
            $(lottery).find("#item" + _index).addClass("active");
            this.config.index = _index;
            return false;
        },
        lottery: function(lo) {
            lo.times += 1;
            var _config = lo.config;
            if (_config.prize != -1 && lo.times > _config.cycle + 9 && (_config.prize - _config.index === 1 || _config.prize - _config.index === -7)) {
                clearTimeout(lo.timer);
                lo.roll(_config.prize);
                setTimeout(function() {
                    // showXsPresnet(lottery.prize);
                    if (lo.lotteryCallback) {
                        lo.lotteryCallback(_config.prize);
                        // console.log(_config.prize);
                    }
                    lo.config.prize = -1;
                    lo.config.times = 0;
                }, 500);
            } else {
                if (_config.prize != -1) {
                    if (lo.times > _config.cycle) {
                        lo.config.speed += 40;
                    } else {
                        lo.config.speed += 5;
                    }
                }
                lo.roll();
                lo.timer = setTimeout(function(e) {
                    lo.lottery(lo);
                }, _config.speed);
            }
        },
        clear: function(index) {
            $(this.obj).find(".active").removeClass("active");
        },
        stop: function(index, callback) {
            this.config.prize = parseInt(index);
            this.lotteryCallback = callback;
        }
    };
    Util.showPrize({
        title: '恭喜你，中奖了！',
        icon: {
            iconStyle: 'rp88',
            iconText: '88个团币'
        },
        btn: {
            style: '',
            text: '查看奖品',
            callback: function() {
                console.info('查看奖品');
            }
        }
    });
})();