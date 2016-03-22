(function() {
    FastClick.attach(document.body);

    var _canplay = true,
        _music_display = $("#music"),
        _bg_music = $("#bg_music"),
        _success_music = $("#success_music"),
        _fail_music = $("#fail_music"),
        _show_result_delay = false,
        _touchend_play_music = false,
        _btn_delay_timeout = null;
    // 音乐
    function loadMusic() {
        _bg_music[0].load();
        _success_music[0].load();
        _fail_music[0].load();
    }
    loadMusic();

    //  如果是android，那么屏蔽免责声明
    if (!isIosPlatform()) {
        $(".exonerate").hide();
    }

    $(".audio-btn").on('click', function(e) {
        if (_music_display.hasClass("pause")) {
            _touchend_play_music = true;
            playMusic();
        } else {
            _touchend_play_music = false;
            pauseMusic();
        }
    });

    // document.addEventListener('touchend', function() {
    //     if(_touchend_play_music) {
    //         // console.log(_bg_music[0].paused);
    //         if(_bg_music[0].paused) {
    //             console.log("----touchend---");
    //             playMusic();
    //         }
    //     }

    // });

    function playMusic() {
        _music_display.removeClass("pause");
        _bg_music[0].play();
    }

    function pauseMusic() {
        _music_display.addClass("pause");
        _bg_music[0].pause();
    }
    $(".game-rule-sec").on("click", ".icon-start-tip", function(e) {
        $(".icon-left-hand").removeClass("left-hand-infinite");
        $(".icon-right-hand").removeClass("right-hand-infinite");
        // $(".bottom-part").hide();
        // $(".downcount").show();
        loadMusic();
        startCountDown();
        // $(".game-rule-sec").hide();

    });

    function startCountDown() {
        $(".bottom-part").hide();
        $(".downcount").find("#number")[0].className = "icon-no3";
        $(".downcount").show();
        countdown();
    }
    //倒数
    function countdown() {

        setTimeout(function(e) {
            var $number = $("#number")[0],
                _number = $number.className.split("icon-no")[1];
            _number = +_number - 1;
            if (_number > 0) {
                $number.className = "icon-no" + _number;
                countdown();
            } else {
                $number.className = "icon-no" + _number;
                setTimeout(function(e) {

                    $(".downcount").hide();
                    $(".bottom-part").show();
                    $(".game-rule-sec").hide();

                    //＊＊＊＊＊＊＊＊游戏开始
                    startGame();

                }, 500);

            }
        }, 1000);
    }

    // 如果一进来页面，SelfBoxCount>0,证明此用户已经领取过了
    if (!canplay()) {
        showAlreadyGet();
        //
    }

    function canplay() {
        console.log(+SelfBoxCount);
        if (+SelfBoxCount <= 0 || IsPkWithInviteUser != "1") {
            return true;
        } else {
            return false;
        }
    }

     function showAlreadyGet() {
        // $("#result").hide();
        var $alreadyget = $("#already_get");
        if ($alreadyget.length <= 0) {
            var pkStr = "K.O成功";
            var htmlVal = "";
            if (InviteUserOpenId != "" && IsPkWithInviteUser == "1") {
                if (isWinInviterUser == "1") {
                    pkStr = "PK成功";
                    htmlVal = '<div class="result success-pk" id="result">' +
                        '<div class="result-top"><p>本轮挑战击中<span>' + SelfBoxCount + '</span>拳</p>成功击败“' + InviteUserNickName + '“</div>' +
                        '<div class="result-bottom">' +
                        '<p class="font-big" id="result_txt">' + pkStr + '</p>' +
                        '<p id="reward_txt">获得奖励</p></div>' +
                        '<div class="icon-red-btn">' + SelfPrizeValue + '元红包</div></div>';
                } else {
                    pkStr = "PK失败";
                    htmlVal = '<div class="result fail" id="result">' +
                        '<div class="result-top"><p>本轮挑战击中<span>' + SelfBoxCount + '</span>拳</p>还差' + (+InviteUserBoxCount + 1 - +SelfBoxCount) + '拳可击败“' + InviteUserNickName + '“</div>' +
                        '<div class="result-bottom">' +
                        '<p class="font-big" id="result_txt">' + pkStr + '</p></div></div>';
                }

            } else {
                htmlVal = "<div class=\"result\"><div class=\"result-top\">" + "<p>本轮挑战击中<span>" + SelfBoxCount + "</span>拳</p></div>" + "<div class=\"result-bottom\">" + "<p class=\"font-big\">" + pkStr + "</p><p>获得奖励</p></div>" + "<div class=\"icon-red-btn\"><span>" + SelfPrizeValue + "</span>元红包</div></div> ";
            }
            var invite_btn = '<a class="icon-blue-btn btn invite-btn" data-type="invite">马上约战</a>',
                redpack_btn = '<a class="icon-blue-btn btn " data-type="redpack">使用红包</a>',
                chart_btn = '<a class="icon-blue-btn btn" data-type="chart">PK榜单</a>',
                result_div = document.createElement("div"),
                result_content = document.createElement("div");
            result_div.className = "result-sec";
            result_content.innerHTML = htmlVal + invite_btn + redpack_btn + chart_btn;
            result_div.id = "already_get";
            result_content.className = "result-content";
            result_div.appendChild(result_content);
            $("body")[0].appendChild(result_div);
        }
        $("#already_get").show();
    }

    /* *************************************** 游戏开始 *************************************** */
    var _interval = null,
        _times = 0,
        _speed_generate = 800,
        _speed_fall = 3000,
        _atime = 0, //加速度增加
        _circle_index = [],
        _fist_count_store = 0;

    function startGame() {
        $(".game-sec").attr("data-start", 1);
        generateCircle(_speed_fall);
        controllTime();
        _touchend_play_music = true;
        playMusic();
    }

    //时间控制生成 圆圈
    function controllTime() {
        var _time_random = Math.floor(Math.random() * 100 - 50);
        _atime = _times % 10 == 0 ? _times : _atime;
        setTimeout(function(e) {
            generateCircle(_speed_fall);
            if (+_fist_count_store <= 40) {
                _speed_fall = _speed_fall <= 1500 ? _speed_fall : _speed_fall - 180;
            } else {
                _speed_fall = _speed_fall <= 1100 ? _speed_fall : _speed_fall - 80;
            }

            // console.log(_speed_fall);
            _speed_generate = _speed_generate <= 400 ? _speed_generate : _speed_generate - (30 + 20 * _atime);

            _times++;
            if (_canplay) {
                // console.log(12345);
                controllTime();
            }
        }, _speed_generate + _time_random);
    }
    // 生成circle 0--left 1--right
    function generateCircle(speed) {

        //记录circle的序号
        if (!_canplay) {
            return;
        }
        if (_circle_index.length <= 0) {
            _circle_index.push(0);
        } else {
            _circle_index.push(_circle_index[_circle_index.length - 1] + 1);
        }
        var _direct = Math.floor(Math.random() * 2);
        var _circle = document.createElement('i');
        _circle.className = _direct == 0 ? "icon-left-circle" : "icon-right-circle";
        _circle.innerHTML = _direct == 0 ? "左" : "右";
        _circle.id = "circle" + _circle_index[_circle_index.length - 1];
        _circle.style.webkitAnimationDuration = speed / 1000 + "s";

        $("#track")[0].appendChild(_circle);

        setTimeout(function(e) {
            if ($(_circle).parent().length > 0) {
                $(_circle).addClass("fail");
                // 降低能量
                if (_canplay) {
                    reduceEnery();
                }

                setTimeout(function(e) {
                    // console.log($(_circle).parent().length);
                    $("#track")[0].removeChild(_circle);
                    _circle_index = _circle_index.slice(1);
                }, 110);
            }
        }, speed);


        /*var _direct = Math.floor(Math.random() * 2);
        var _circle = document.createElement('i');
        _circle.className = _direct == 0 ? "icon-left-circle" : "icon-right-circle";
        _circle.innerHTML = _direct == 0 ? "左" : "右";
        _circle.style.webkitTransitionDuration = "6s";
        $("#track")[0].appendChild(_circle);
        setTimeout(function(e) {
            _circle.style.transform = "translate3d(0, 300px, 0)";
            _circle.style.webkitTransform = "translate3d(0, 300px, 0)";
            console.log(_circle);
        }, 5);*/

    }
    $("body").bind("touchstart", function(e) {
        e.preventDefault();
    });
    // 拳套事件绑定
    $(".hands-sec").on("touchstart", ".icon-left-hand,.icon-right-hand", function(e) {
        // e.preventDefault();
        //点击手套效果
        var $target = $(this);
        if ($target.hasClass("left-hand-infinite") || $target.hasClass("right-hand-infinite")) {
            return;
        }
        if ($target.hasClass("icon-left-hand")) {
            $target[0].style.transform = "translate3d(18px, -26px, 0)";
            $target[0].style.webkitTransform = "translate3d(18px, -26px, 0)";
        } else {
            $target[0].style.transform = "translate3d(-18px, -26px, 0)";
            $target[0].style.webkitTransform = "translate3d(-18px, -26px, 0)";
        }
    });
    // 拳套事件绑定
    $(".hands-sec").on("touchend", ".icon-left-hand,.icon-right-hand", function(e) {
        var $target = $(this);
        $target[0].style.transform = "translate3d(0, 0, 0)";
        $target[0].style.webkitTransform = "translate3d(0, 0, 0)";

        // 判断打中
        var _circle_current = $("#circle" + _circle_index[0]);
        if (_circle_current.length < 1) {
            return;
        }
        if (!_circle_current.hasClass("fail")) {
            //打错就显示x，然后消失，_circle_index slice
            if ($target.hasClass("icon-left-hand") && !_circle_current.hasClass("icon-left-circle")) {
                _circle_current.addClass("fail");
                // 降低能量
                reduceEnery();
                setTimeout(function(e) {
                    _circle_current.remove();
                    _circle_index = _circle_index.slice(1);
                }, 110);
                return;
            }
            if ($target.hasClass("icon-right-hand") && !_circle_current.hasClass("icon-right-circle")) {
                _circle_current.addClass("fail");
                // 降低能量
                reduceEnery();
                setTimeout(function(e) {
                    _circle_current.remove();
                    _circle_index = _circle_index.slice(1);
                }, 110);
                return;
            }
            // console.log("打中了！！！");
            // _circle_current.attr("data-cilck", 1);
            //打中就消失
            _circle_current.remove();
            //去掉数组中多余的元素
            _circle_index = _circle_index.slice(1);

            // 计算打中的拳数
            // var _fist_count = $("#fist_count").html();
            _fist_count_store += 1;
            $("#fist_count").html(_fist_count_store);
        }

        // console.log($("#circle" + _circle_index[0])[0]);
    });

    //减能量
    function reduceEnery() {
        var $enery = $("#enery_count"),
            _enery_count = +$enery.attr("data-count") - 1,
            _enery_classname = 'enery-count ';
        console.log("降低能量");
        switch (_enery_count) {
            case 3:
                _enery_classname += 'enery-full';
                break;
            case 2:
                _enery_classname += 'enery-middle';
                break;
            case 1:
                _enery_classname += 'enery-min';
                break;
        }

        $enery[0].className = _enery_classname;
        $enery.attr("data-count", _enery_count);
        //游戏结束
        if (_enery_count <= 0) {
            _canplay = false;
            setTimeout(function(e) {
                $(".game-sec").attr("data-start", 0);
                _touchend_play_music = false;
                var _type = InviteUserOpenId != "" ? 1 : 0;
                if (_type == 0) {
                    showResult(_type, _fist_count_store);
                } else {
                    showResult(_type, _fist_count_store, InviteUserNickName, +InviteUserBoxCount);
                }
            }, 200);
            //游戏结束，弹出提示
        }
    }

    /* *************************************** 游戏结束 *************************************** */

    // 游戏结果
    /* 参数
      type:0--ko 自己玩； 1 -- pk 和别人比赛
      fistCount:击中的拳数
      rivalName:对手名字
      fistCountRival:对手击中的拳数
    */
    function showResult(type, fistCount, rivalName, fistCountRival) {
        _show_result_delay = true;
        // 停掉的背景音乐
        pauseMusic();
        // 是否是第一次，
        var isFirstTime = parseInt(SelfBoxCount) > 0 ? 0 : 1;
        // ＝＝＝＝＝＝
        var $result = $("#result"),
            $exchangeBtn = $("#exchange_btn"),
            $resultText = $("#result_txt"),
            $resultTop = $result.find(".result-top"),
            $resultBottom = $result.find(".result-bottom"),
            _result_top_html = '<p>本轮挑战击中<span>' + fistCount + '</span>拳</p>',
            $rewardTxt = $("#reward_txt"),
            $redBtn = $(".icon-red-btn");
        // $money = $result.find(".icon-red-btn span");
        if (fistCount < 10) { //无论ko失败还是pk失败，显示一样；
            console.log('fail');
            $result[0].className = "result fail";
            $exchangeBtn[0].className = "icon-grey-btn";
            _result_top_html += '<p>还差<span>' + (-fistCount + 10) + '</span>拳可获得奖励～</p>';
            $resultTop.html(_result_top_html);
            $resultText[0].innerHTML = type == 0 ? "K.O失败" : "PK失败";
            if ($rewardTxt.length > 0) {
                $rewardTxt.remove();
            }
            if ($redBtn.length > 0) {
                $redBtn.remove();
            }
            _fail_music[0].play();
        } else {
            if (type == 1) {
                var _temp_html = fistCount <= fistCountRival ? "还差" + (+fistCountRival - +fistCount + 1) + "拳可击败“" + rivalName + "“" : "成功击败“" + rivalName + "“";
                _result_top_html += _temp_html;
                $resultText[0].innerHTML = fistCount <= fistCountRival ? "PK失败" : "PK成功";
                if ($rewardTxt.length > 0) {
                    if (SelfBoxCount > 0) {
                        $rewardTxt.html("");
                    } else {
                        $rewardTxt.html(fistCount <= fistCountRival ? '安慰奖' : '获得奖励');
                    }
                } else {
                    if (!SelfBoxCount > 0) {
                        $resultBottom.append(fistCount <= fistCountRival ? '<p id="reward_txt">安慰奖</p>' : '<p id="reward_txt">获得奖励</p>');
                    }
                }
            } else {
                $resultText[0].innerHTML = "K.O成功";
                if ($rewardTxt.length > 0) {
                    $rewardTxt.html('获得奖励');
                } else {
                    $resultBottom.append('<p id="reward_txt">获得奖励</p>');
                }

            }
            $resultTop.html(_result_top_html);
            // var _isAdd = fistCount < fistCountRival ? 0 : 1;
            var _isAdd = 0;
            if (type == 1) {
                _isAdd = fistCount <= fistCountRival ? 0 : 1;
            }
            var _money = getMoney(fistCount, _isAdd, isFirstTime);
            if (_money > 0) {
                if ($redBtn.length > 0) {
                    $redBtn.html(_money + '元红包');
                } else {
                    $result.append('<div class="icon-red-btn btn" >' + _money + '元红包</div>')
                }
                $result[0].className = type == 0 ? "result" : "result success-pk"; // pk成功了要加上 success-pk 样式
                $exchangeBtn[0].className = "icon-blue-btn"; //只要成功就有红包获取，所以可以兑奖
            } else {
                $result[0].className = "result fail";
            }
            _success_music[0].play();
        }

        $("#result_sec").show();
    }

    // 获取红包数量
    /* 
        fistCount:出拳数
        isAdd:是否＋5，如果pk赛中胜利了，就＋5；0-- 不是，1-－是
        isFirstTime:是否是第一次参加  0-- 不是 1-－是
    */
    function getMoney(fistCount, isAdd, isFirstTime) {
        var money = 0;
        fistCount = +fistCount;
        if (isFirstTime == 1) {
            console.log(fistCount);
            if (fistCount >= 10 && fistCount <= 30) {
                money = 10;
            }
            if (fistCount > 30) {
                money = 20;
            }
        }

        money = isAdd == 0 ? money : money + 5;
        return money;

    }

    // $("#result_sec").on("click", "#exchange_btn", function(e) {
    //     if ($(this).hasClass("icon-grey-btn")) {
    //         return;
    //     }
    //     window.location.href = "../html/exchange.html";
    // });

    //游戏结束结果事件绑定
    $(".result-sec").bind("click", ".icon-red-btn", function() {
        var inbox = fnStringJM(_fist_count_store.toString());
        window.sessionStorage["boxCount"] = inbox;
        window.location.href = "Exchange.aspx?selfOpenId=" + SelfOpenId + "&inviteUserOpenId=" + InviteUserOpenId + "&boxCount=" + inbox;
    });

    $(".result-sec").on("click", ".btn", function(e) {
        if (_show_result_delay) {
            if (!_btn_delay_timeout) {
                _btn_delay_timeout = setTimeout(function(e) {
                    _show_result_delay = false;
                    _btn_delay_timeout = null;
                }, 250);
            }
            return;
        }
        var _btn_type = $(this).attr("data-type");
        if (_btn_type === "exchange") {
            if ($(this).hasClass("icon-grey-btn")) {
                return;
            }
            window.location.href = "../html/exchange.html";
            return;
        }
        if (_btn_type === "restart") {
            // 结果隐藏
            $('#result_sec').hide();
            //能量重置
            var $enery = $("#enery_count");
            $enery.attr("data-count", 3);
            $enery[0].className = "enery-count enery-full";
            //拳数量重置
            _fist_count_store = 0;
            $("#fist_count").html(_fist_count_store);
            // 重置参数
            _times = 0;
            _speed_generate = 800;
            _speed_fall = 3000;
            _atime = 0; //加速度增加
            _circle_index = [];
            _fist_count_store = 0;
            _canplay = true;
            //重新倒数
            startCountDown();

            // playMusic();
            return;
        }
        if (_btn_type === "chart") {
            window.location.href = "../html/chart.html";
            return;
        }
        if (_btn_type === "redpack") {
            window.location.href = "http://m.tuandai.com/pages/invest/invest_list.aspx";
            return;
        }

    });
    $(".bottom-part").on("click", ".bottom-close", function(e) {
        $(".bottom-part").hide();
    });

    //弹出邀请好友提示
    $("body").on("click", ".invite-btn", function(e) {
        //隐藏弹窗
        $(".masker,.popup,.result-sec").hide();
        var $inviteDiv = $(".invite");
        if ($inviteDiv.length <= 0) {
            var $inviteDiv = document.createElement("div");
            $inviteDiv.className = 'invite popup';
            $inviteDiv.innerHTML = '<i class="icon-close"></i><p>出拳完毕</p><p>发送给朋友或者分享到朋友圈</p><p>向朋友约战吧！</p>';
            $("body")[0].appendChild($inviteDiv);
        }

        $(".masker").show();
        $(".invite").show();
    });
    //点击masker和close，所有popup关闭
    $("body").on("click", ".masker,.close,.icon-close", function(e) {
        // $(".rule-sec").hide();
        if (canplay()) {
            $(".popup").hide();
            $(".masker").hide();
        } else {
            showAlreadyGet();
        }

    });
    // showResult(1, 19, "莫晓梦", 18, 10);

    // ===============禁止滑动================
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function scrolling(e) {
        preventDefault(e);
    }

    function disableScrolling() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', scrolling, false);
            window.addEventListener('touchmove', scrolling, false);
            // window.onmousewheel = document.onmousewheel = scrolling;
        }
    }

    function enableScrolling() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', scrolling, false);
            window.removeEventListener('touchmove', scrolling, false);
        }
        // window.onmousewheel = document.onmousewheel = null;
    }

    // =============禁止滑动 end======================
    //冒泡提示
    function toast(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        $(m).addClass("toast-content");
        m.innerHTML = msg;
        m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.5;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; top:48%; left:20%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:10px;";
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
    };
    //判断是否是ios平台
    function isIosPlatform() {
        if (navigator.userAgent.match(/(iPad|iPhone)/)) {
            return true;
        } else {
            return false;
        }
    }
})();
