(function() {
    FastClick.attach(document.body);
    //do your thing.
    // 0 - 剪刀 1 - 石头 2 - 布
    var _game_area = $('#game_area').height(), // 游戏高度
        _window_width = $(window).width(), // 窗口宽度
        _canplay = true, // 是否还能进行游戏
        _gameover = false,
        _canclick = true, // 是否能点击按钮
        _canplaymusic = true,
        _interval = null,
        _times = 0, // 次数
        _speed_generate = 800,
        _speed_fall = 3000, // 下降速度
        _atime = 0, //加速度增加
        _signs = ['icon-scissors-s', 'icon-rock-s', 'icon-paper-s'], // 各个手势
        _score = 0,
        _dom_index = [],
        _pro_len = $("#progress").width(); //进度条长度

    var _clientWidth = document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth,
        _fontsize = 20 * (_clientWidth / 320),
        _sign_width = [pxToPx(68), pxToPx(76), pxToPx(85)]; // 每个手势对应的宽度

    function pxToPx(px) {
        return px / 23.4375 / 2 * _fontsize;
    }

    // ---------- 音乐 ----
    var bg_music = $("#bg"),
        win_music = $("#win"),
        lose_music = $("#lose"),
        tie_music = $("#tie"),
        gift_music = $("#gift"),
        gameover_music = $("#gameover");

    //loadmusic
    loadMusic([bg_music, win_music, lose_music, tie_music, gift_music, gameover_music]);

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

    // $("body").on("touchstart", function(e) {
    //     // e.preventDefault();
    //     if (_gameover) {
    //         return;
    //     }
    //     bg_music[0].play();
    // });
    $("#game_tips").on("click", function(e) {
    	$(this).hide();
    	bg_music[0].play();
    	gameStart();
    });
    // -----------音乐 结束----------
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
    // 0 :lose 1: win 2: tie
    function showResultEffect(type) {
        // _score = type === 1 ? _score + 2 : _score;
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
            _v = 0;
        $target.addClass("active");
        // 判断打中
        var _dom_current = $("#dom" + _dom_index[0]);
        if (_dom_current.length < 1) {
            return;
        }
        _v = parseInt(_dom_current.attr("data-value"), 10);
        //判断结果
        // 0 :lose 1: win 2: tie
        var _result = _current - _v;
        switch (_result) {
            case 1:
            case -2:
                _result = 1;
                _score += 2;
                break;
            case -1:
            case 2:
                _result = 0;
                _score = _score - 2  <=0 ? 0 : _score - 2;
                break;
            default:
                _result = 2;
                break;
        }
        showResultEffect(_result);
        // if (_result === 1 && _dom_current.attr('data-move') == 1) {
            _dom_current.remove();
            _dom_index = _dom_index.slice(1);
        // }

        _canclick = true;

    });

    $(".bottom-sec").on("touchend", ".btn-game", function(e) {
        $(this).removeClass("active");
    });
    //获取0-2的随机数
    function getRandom() {
        return Math.floor(Math.random() * 3);
    }

    function createDom(speed) {
        if (!_canplay) {
            return;
        }
        if (_dom_index.length <= 0) {
            _dom_index.push(0);
        } else {
            _dom_index.push(_dom_index[_dom_index.length - 1] + 1);
        }
        var _sign = getRandom();
        var _el_sign = document.createElement('i');
        var _el_area = $('#game_area')[0];
        // var _el_sign = $('i').addClass('icon-paper-s').attr('data-value', _sign);
        _el_sign.className = _signs[_sign];
        _el_sign.setAttribute('data-value', _sign);
        _el_sign.id = "dom" + _dom_index[_dom_index.length - 1];
        _el_sign.setAttribute('data-move', 0);
        _el_sign.style.transform = 'translateY(0)';
        _el_sign.style.webkitTransform = 'translateY(0)';
        _el_sign.style.transitionDuration = speed / 1000 + 's';
        var _offset_left = Math.random() * (_window_width - _sign_width[_sign]);
        //随机左右
        _el_sign.style.left = _offset_left + "px";
        _el_area.appendChild(_el_sign);
        setTimeout(function() {
        	_el_sign.setAttribute('data-move', 1);
            _el_sign.style.transform = 'translateY(' + _game_area + 'px)';
            _el_sign.style.webkitTransform = 'translateY(' + _game_area + 'px)';
            setTimeout(function() {
                if ($(_el_sign).parent().length > 0) {
                    _el_area.removeChild(_el_sign);
                    _dom_index = _dom_index.slice(1);
                }
            }, speed);
        }, 100)

    }
    //时间控制生成 圆圈
    function ctrlCreate() {
        var _time_random = Math.floor(Math.random() * 100 - 50);
        _atime = _times % 10 == 0 ? _times : _atime;
        setTimeout(function(e) {
            createDom(_speed_fall);
            if (+_score <= 40) {
                _speed_fall = _speed_fall <= 1900 ? _speed_fall : _speed_fall - 180;
            } else {
                _speed_fall = _speed_fall <= 1400 ? _speed_fall : _speed_fall - 80;
            }

            // console.log(_speed_fall);
            _speed_generate = _speed_generate <= 500 ? _speed_generate : _speed_generate - (30 + 20 * _atime);

            _times++;
            if (_canplay) {
                // console.log(12345);
                ctrlCreate();
            }
        }, _speed_generate + _time_random);
    }


    // 开始游戏
    function gameStart() {
        countdown(3, function() {
            _canplay = true;
            ctrlCreate();
            progress(30, function() {
                gameover();
            })
        });
    }


    // gameStart();
})();
