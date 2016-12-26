(function() {
    FastClick.attach(document.body);

    var pageEl = $(".page");
    var dialogEl = $(".dialog");


  

   // 初始化判断是否已经登录
   
    Util.bbsInit();

    
    /*抽奖*/
    var lottery = {
        index: 0, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 20, //初始转动速度
        times: 0, //转动次数
        cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        init: function(id) {
            if ($("#" + id).find(".lottery-unit").length > 0) {
                $lottery = $("#" + id);
                $units = $lottery.find(".lottery-unit");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-" + this.index).find(".icon").addClass("active");
            };
        },
        roll: function() {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-" + index).find(".icon").removeClass("active");
            index += 1;
            if (index > count - 1) {
                index = 0;
            };
            $(lottery).find(".lottery-unit-" + index).find(".icon").addClass("active");
            this.index = index;
            return false;
        },
        clear: function(index) {
            $(this.obj).find(".active").removeClass("active");
        }
        
    };

    function roll() {
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
            clearTimeout(lottery.timer);
            setTimeout(function() {
                // showXsPresnet(lottery.prize);
                lottery.prize = -1;
                lottery.times = 0;
            }, 500);
            // click = false;
        } else {
            if (lottery.times < lottery.cycle) {
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) {
                // var index = Math.random() * (lottery.count) | 0;
                // lottery.prize = index;
            } else {
                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 20;
                }
            }
            if (lottery.speed < 40) {
                lottery.speed = 40;
            };
            lottery.timer = setTimeout(roll, lottery.speed);
        }
        return false;
    } 
    // 初始化抽奖配置
    (function() {
        lottery.init('lottery');
        lottery.speed = 100;
    })();
    //新手抽奖开始
    pageEl.on('click',".lotbtn", function() {
       
       lottery.prize = 6; //设置获取的奖品
        roll();
    });

    // 关闭弹窗
    dialogEl.on("click", ".icon-close, .close-btn, .mask", function() {
        onHideDialogs();
    })

    // 显示中奖弹窗
	var onShowLuckyDialog = function(i) {
		if(isNaN(Number(i))) {	//如果非数值
			return;
		}
		dialogEl.find(".lucky-dialog .lucky-prize-value").text(i);
		dialogEl.find(".lucky-dialog").addClass("show");
		dialogEl.addClass("show");
		var luckyValueEl = pageEl.find(".lucky-value");
		var luckyProgressEl = pageEl.find(".lucky-progress");
		var luckyValue = luckyValueEl.text() ? luckyValueEl.text() : 0;
		var luckyProgress = (Number(luckyValue) + Number(i)) > 100 ? 100 : (Number(luckyValue) + Number(i));
		luckyProgressEl.css("width",  luckyProgress+ "%");
		disableScrolling();
	}
	
	
    // 关闭弹窗
    var onHideDialogs = function() {
        $(".show").removeClass("show");
        enableScrolling();
    }

   

})();
