(function() {
    FastClick.attach(document.body);
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

    //窗口滚动高度
    var _top = 0;
    //兑奖结果信息
    var _dialog_info = [{
            "icon": "icon-rabbit-pop0",
            "content": "兑奖成功！"
        }, {
            "icon": "icon-rabbit-pop1",
            "content": "还没“弹”过瘾？！"
        }]
    //奖品信息
    var _prizes = [{
        "icon": "icon-present-coin",
        "info": "这就很尴尬啦！<br>离地300米，兔子就被天狗咬啦！<br/> 快领了酬金洗洗睡吧！",
        "ps":"团币也是钱，可以换礼品哦！",
    },{
        "icon": "icon-present-redpack5",
        "info": "夜太黑，狗猛追<br>低空飞行竟也铩羽归！<br/> 还是领个红包压压惊吧！",
        "ps":"红包人气高，领了就知道！",
    },{
        "icon": "icon-present-redpack10",
        "info": "成功穿越大气层！<br/>能飞这么高～<br>值得领个大红包！",
        "ps":"红包人气高，领了就知道！",
    },{
        "icon": "icon-present-youku",
        "info": "躲过无数天狗，<br>抵达外太空！<br>很棒，这真的很棒！",
        "ps":"送你优酷会员，让你畅游影视圈！",
    },{
        "icon": "icon-present-hagendaz",
        "info": "天狗算shěn mó?<br>全是战五渣！<br>多亏你，兔子成功登月啦！",
        "ps":"你的哈根达斯，记得领走哇！",
    }];

    var _prizes_get = [0,1,2,3,4],
        _prizes_current_index = 0;

    //换一个礼物
    $("#change_prize").bind("click", function(e) {
        _prizes_current_index = _prizes_current_index + 1 >= _prizes_get.length ? 0 : _prizes_current_index + 1;
        chagnePrize(_prizes_get[_prizes_current_index]);
    });
        //兑奖按钮
    $("#to_exchange").bind("click", function(e) {
        exchangeResult(0);
        
    });
    //返回顶部
    $("#go_top").bind("click", function(e) {
        // console.log($("#result_content").;
        _top = $("#result_content").scrollTop()
        scrollToTop();
    });
    //返回游戏 
     $("#go_game").bind("click", function(e) {
        window.location.href = "./game.html";
    });
    //滚回顶部方法
    function scrollToTop() {
        _top = _top - 30 < 0 ? 0 : _top - 30;
        $("#result_content").scrollTop(_top);
        console.log(_top);
        if (_top > 0) {
            window.requestAnimationFrame(scrollToTop);
        }
    }
    //显示分享
    $("#show_share").bind("click", function(e) {
        $("#share_popup").show();
    });
    //关闭所有弹窗
    $(".masker, .icon-close,.icon-arrow-share").click(function(e) {
        $(".popup").hide();
    });
    // 兑奖结果弹窗 0－－兑奖成功 1-－兑奖机会用完
    function exchangeResult(type) {
        var _option = _dialog_info[type];
        popup.dialog({
            "icon": _option.icon,
            "content": _option.content,
            "txt": ["马上邀请胖友们一起“弹”", "还能额外获得游戏机会哦！"],
            "btns": [{
                "color": "red",
                "txt": "马上邀请",
                "callback": function() {
                    $("#share_popup").show();
                }
            }, {
                "color": "green",
                "txt": "查看奖品",
                "callback": function() {
                    console.log("查看奖品");
                }
            }],
            "hideCallback": function() {
                // console.log("hide");
            }
        });
    }
    //换礼物方法
    function chagnePrize(index) {
        var _prize = _prizes[index];
        $("#prize_contain").html(' <i class="'+_prize.icon+'"></i>');
        $("#info").html(_prize.info);
        $("#ps").html("P.S:" + _prize.ps);
    }
    
})();
