(function() {
    //variables
    var _values = [getRandom(), getRandom(), getRandom()], //【下下个， 下一个，当前，上一个】
        _score = 0,
        _canplay = false,
        _gameover = false,
        _canclick = true,
        _canplaymusic = true,
        _result_music = null,
        // _final_result = null,
        _final_result = {
            "type": 0,
            "value": 100,
            "hasChance": 0,
            "callback0": function() {
                console.log("查看奖品");
            },
            "callback1": function() {
                Util.showPopChance();
            }
        },
        _pro_len = $("#progress").width(); //进度条长度

    var bg_music = $("#bg"),
        win_music = $("#win"),
        lose_music = $("#lose"),
        tie_music = $("#tie"),
        gift_music = $("#gift"),
        gameover_music = $("#gameover");

    //loadmusic
    loadMusic([bg_music, win_music, lose_music, tie_music, gift_music, gameover_music]);

    // $("#gameover,#pass").bind("ended", function() {
    //     playMusic(bg_music);
    // });

    function loadMusic(musics) {
        for (var i = 0; i < musics.length; i++) {
            var _music = musics[i];
            if (_music.length > 0) {
                _music[0].load();
            }
        }
    }

    function playMusic(music) {
        if (_canplaymusic) {
            music[0].currentTime = 0;
            music[0].play();
        }
    }

    function pauseMusic(music) {
        music[0].pause();
    }

    $("body").on("touchstart", function(e) {
        // e.preventDefault();
        if (_gameover) {
            return;
        }
        bg_music[0].play();
    });
    //绑定按钮touch事件
    $(".bottom-sec").on("touchstart", ".btn-game", function(e) {
        if (!_canplay) {
            return;
        }
        if (!_canclick) {
            return;
        }
        var $target = $(e.currentTarget),
            _current = parseInt($target.attr("data-type"), 10),
            _v = _values[2];
        $target.addClass("active");

        //判断结果
        // 0 :lose 1: win 2: tie
        var _result = _current - _v;
        switch (_result) {
            case 1:
            case -2:
                _result = 1;
                break;
            case -1:
            case 2:
                _result = 0;
                break;
            default:
                _result = 2;
                break;
        }
        showResultEffect(_result);
        _canclick = false;
        setTimeout(function() {
            next();
        }, 350);

    });

    $(".bottom-sec").on("touchend", ".btn-game", function(e) {
        $(this).removeClass("active");
    });

    gameStart();
    //初始化页面
    function initPage(values) {
        $("#next").html('<i class="sign next1" data-value="' + values[0] + '"></i><i class="sign next0" data-value="' + values[1] + '"></i>');
        $("#current").html('<i class="battle cur1" data-value="' + values[1] + '"></i><i class="battle cur0"  data-value="' + values[2] + '"></i>');
        $("#prev").html('<i class="sign prev1" data-value="' + values[2] + '"></i> ');
    }

    //开始游戏
    function gameStart() {
        initPage(_values);

        countdown(3, function() {
            _canplay = true;
            progress(5, function() {
                gameover();
            })
        });
    }
    //游戏结束
    function gameover() {
        _canplay = false;
        _gameover = true;
        //todo ajax 提交结果(用setTimeout模拟ajax)
        pauseMusic(bg_music);
        playMusic(gameover_music);
        Util.showLoader();
        setTimeout(function() {
            //ajax成功回调提示
            Util.hideLoader();

            // score--分数 type：0--再玩一局（没获奖，有机会），1--获取游戏机会（没获奖，没机会） 2--领取奖品（获奖了）， callback--回调函数

            // Util.gameOverTip(_score,0,function() {
            //     gameRestart();
            // });

            Util.gameOverTip(_score, 1, function() {
                //显示获取更多机会
                 Util.showPopChance();
            });

            // Util.gameOverTip(_score,2,function() {
            //     //todo 领取奖品
            //     //type:0--团币 1--红包 value--数值 hasChance--是否还有游戏机会 0:没有 1:有    callback0--第一个按钮回调，callback1--第二个按钮回调
            //     Util.rewardTip(1, 5, 0, function() {
            //         console.log('查看奖品');
            //     }, function() { //没有机会的话就回去更多机会
            //         Util.showPopChance();
            //     }, function(e) {
            //         console.log('close');
            //     });
            // },function(e) {
            //         console.log('close');
            //     });

        }, 1000);

    }
    //重新开始
    function gameRestart() {
        _values = [getRandom(), getRandom(), getRandom()]; //【下下个， 下一个，当前，上一个】
        _score = 0;
        _canplay = false;
        _canclick = true;
        $("#progress").width(_pro_len);
        $("#score").html(_score);
        gameStart();
    }

    //获取0-2的随机数
    function getRandom() {
        return Math.floor(Math.random() * 3);
    }

    // 0 :lose 1: win 2: tie
    function showResultEffect(type) {
        $(".center-part, .result").attr("data-value", type);
        _score = type === 1 ? _score + 2 : _score;
        $("#score").html(_score);
        switch (type) {
            case 0:
                _result_music = lose_music;
                break;
            case 1:
                _result_music = win_music;
                break;
            case 2:
                _result_music = tie_music
                break;
        }
        playMusic(_result_music);
    }
    // 去掉结果效果
    function removeResultEffect() {
        pauseMusic(_result_music);
        _result_music = null;
        $(".center-part, .result").attr("data-value", "");
    }
    //下一个
    function next() {
        //动画
        $(".next0").addClass("next-1").removeClass("next0");
        $(".next1").addClass("next0").removeClass("next1");
        $(".cur0").addClass("cur-1").removeClass("cur0");
        $(".cur1").addClass("cur0").removeClass("cur1");
        $(".prev0").addClass("prev-1").removeClass("prev0");
        $(".prev1").addClass("prev0").removeClass("prev1");

        //数组修改
        _values = [getRandom()].concat(_values.splice(0, 3));
        removeResultEffect();

        // 加入dom
        $("#next").prepend('<i class="sign next1" data-value="' + _values[0] + '"></i>');
        $("#current").prepend('<i class="battle cur1" data-value="' + _values[1] + '"></i>');
        $("#prev").prepend('<i class="sign prev1" data-value="' + _values[2] + '"></i> ');
        setTimeout(function() {
            _canclick = true;
        }, 150);
    }
    //游戏开始倒计时
    function countdown(val, callback) {
        $("#countdown").attr("data-value", val);
        if (val >= 0) {
            val -= 1;
            setTimeout(function() {
                countdown(val, callback);
            }, 1000);
        } else {
            $("#countdown").attr("data-value", "");
            if (callback) {
                callback();
            }
        }
    }
    //游戏60s进度条倒计时
    function progress(val, callback) {
        $("#progress").width(_pro_len * val / 30);
        if (val === 5) {
            $("#game_count").show();
            gameCountdown(5);
        }
        if (val > 0) {
            setTimeout(function() {
                val -= 1;
                progress(val, callback);
            }, 1000);
        } else {
            if (callback) {
                callback();
            }
        }
    }

    //游戏最后5s倒计时
    function gameCountdown(val, callback) {
        $("#game_count").html(val);
        if (val > 0) {
            setTimeout(function() {
                val -= 1;
                gameCountdown(val, callback);
            }, 1000);
        } else {
            $("#game_count").hide();
            if (callback) {
                callback();
            }
        }
    }





})();
