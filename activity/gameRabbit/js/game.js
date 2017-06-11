(function() {
    FastClick.attach(document.body);


    //do your thing.
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
    $("body").bind("touchstart", function(e) {
        e.preventDefault();
    });
    //音乐
    var bg_music = $("#bg_music"),
        upgrade_music = $("#upgrade"),
        gameover_music = $("#gameover"),
        _canplaymusic = 1;
    var music_img = $("#music");
    loadMusic(bg_music);
    loadMusic(upgrade_music);
    loadMusic(gameover_music);


    // $("#gameover,#pass").bind("ended", function() {
    //     playMusic(bg_music);
    // });

    function loadMusic(music) {
        if (music.length > 0) {
            music[0].load();
        }
    }

    function playMusic(music) {
        if (_canplaymusic) {
            music[0].currentTime = 0;
            music[0].play();
        }
    }

    document.addEventListener('touchstart', function(e) {
        if (music_img.hasClass("pause")) {
            return;
        }
        // if(_can)
        bg_music[0].play();
        // playMusic(bg_music);
    });
    $(".audio-btn").bind('touchstart', function(e) {
        if (!bg_music) {
            bg_music = $("#bg_music");
        }
        if (music_img.hasClass("play")) {
            _canplaymusic = 0;
            music_img.removeClass("play").addClass("pause");

            //关闭所有音乐
            console.log(bg_music);
            bg_music[0].pause();
            // upgrade_music[0].pause();
            // gameover_music[0].pause();

        } else {
            _canplaymusic = 1;
            music_img.removeClass("pause").addClass("play");
            bg_music[0].play();
        }
    });
    // window.onload = function() {
        var _window_width = $(window).width(),
            // _fontsize = $("body")[0].style.fontSize.replace("px", ""),
            _clientWidth = document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth,
            _fontsize = 20 * (_clientWidth / 320),
            _translate_distance = 32 * _fontsize, //天狗共滑行距离
            // _dog_width = 130 / 23.4375 / 2 * _fontsize,
            // _dog_height = 117 / 23.4375 / 2 * _fontsize,
            _dog_width = pxToPx(130),
            _dog_height = pxToPx(117),
            _distance = $(window).height() * 0.62 - _dog_height, //天狗碰到兔子的距离
            _rabbit_step = 30, //兔子左右的步幅
            _rabbit_width = pxToPx(169);

            console.log(_fontsize);

        //生成参数
        var _interval = null,
            _canplay = true,
            _times = 0,
            _speed_fall = 5000, //天狗滑行时间
        _speed_generate = 800,
            _atime = 0, //加速度增加

            _last_dog_left = 0,

            _touchstart_time = 0,
            _group = 0; //第几阶段
        //兔子运动
        var _direct = 0,
            _cancel_animated = false;
        // 天空飞行阶段
        var _stage = 0,
            _stages = ["离地300米", "低空飞行", "穿越大气层", "遨游外太空", "月亮之上"],
        //     _speed_falls = [4000, 3600, 2800, 2200, 1600],
        // _group_steps = [10, 20, 30, 40, 50];
        _group_steps = [10, 30, 90, 110, 150],
        _speed_falls = [2800, 1750, 1250, 1000, 800];

        var _stay_stage3 = false; //停留在第四关

        $("#btn_play").bind("touchstart", function(e) {
            $(".icon-rabbit1,.icon-spring, #btn_play").addClass("active");
            $(".game-content").addClass("start-game");
            setTimeout(function() {
                startGame();
                $(".sky0").remove();
            }, 3000);
        });
        $("#btn_play").bind("touchend", function(e) {
            $("#btn_play").removeClass("active");
        });

        //开始游戏
        function startGame() {
            createDog(_speed_fall);
            ctrlCreateDog();
        }

        //控制生成天狗
        function ctrlCreateDog() {
            var _time_random = 0;
            var _rabbit_survie_time = _speed_fall * 180 / _translate_distance; // 兔子生存时间
            console.log(_translate_distance, _rabbit_survie_time);

            _generate_offset = 10;
            setTimeout(function(e) {
                createDog(_speed_fall);
                if (_times < _group_steps[0]) {
                    _stage = 0;
                    _group = 0;
                    _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 420;
                    _generate_offset = 180;
                } else if (_times < _group_steps[1]) {
                    _group = 1;
                    _stage = 1;
                    _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 320;
                    _generate_offset = 180;
                } else if (_times < _group_steps[2]) {
                    _group = 2;
                    _stage = 2;
                    _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 160;
                    _generate_offset = 120;
                } else if (_times < _group_steps[3]) {
                    _group = 3;
                    _stage = 3;
                    _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 120;
                    _generate_offset = 130;
                } else if (_times < _group_steps[4]) {
                    if (_stay_stage3) {
                        _speed_fall = _speed_fall <= 600 ? 600 : _speed_fall - 80;
                    } else {
                        _stage = 4;
                        _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 80;
                    }
                    _generate_offset = 90;
                }
                // _time_random = Math.floor(Math.random() * _generate_offset);
                _speed_generate = _speed_generate <= _rabbit_survie_time ? _rabbit_survie_time : _speed_generate - _generate_offset;

                //修改文案
                upgrade();
                _times++;
                if (_canplay) {
                    // console.log(12345);
                    ctrlCreateDog();
                }
                // console.log(_speed_generate, _time_random);
            }, _speed_generate + _time_random);
        }

        //生成天狗
        function createDog(speed) {
            if (!_canplay) {
                return;
            }
            var _dog = document.createElement('i');
            _dog.className = "dog group" + _group;
            _dog.style.webkitAnimationDuration = speed / 1000 + "s";

            var _offset_left = Math.random() * (_window_width - _dog_width);
            //生成左右
            _dog.style.left = _offset_left + "px";
            $("#dog_sec")[0].appendChild(_dog);
            _last_dog_left = _offset_left;
            _kill_rab_time = _distance * speed / _translate_distance;
            _kill_rab_time2 = (_distance + _rabbit_width / 2) * speed / _translate_distance;

            function ifKillRab() {
                if (!_canplay) {
                    return;
                }
                var _rabbit_left = $("#rabbit_fly")[0].offsetLeft;
                var _offset_x = _rabbit_width * 0.3;
                // console.log(_offset_left, _rabbit_left + _rabbit_width + _offset_x);
                if (!((_rabbit_left + _rabbit_width - _offset_x) < _offset_left || _rabbit_left > (_offset_left + _dog_width - _offset_x))) {
                    gameover();
                }
            }
            setTimeout(function ifKillRabTime() {
                ifKillRab();
            }, _kill_rab_time);
            setTimeout(function ifKillRabTime() {
                ifKillRab();
            }, _kill_rab_time2);

            setTimeout(function delDogTime() {
                if (!_canplay) {
                    return;
                }
                $("#dog_sec")[0].removeChild(_dog);
            }, speed);
        }

        //左右控制
        $("#ctrl").on("touchstart", "i", function(e) {
            if (!_canplay) {
                return;
            }
            _touchstart_time = new Date().getTime();
            var $target = $(e.currentTarget);
            _direct = $target.attr("data-value"); //0--left; 1--right
            $target.addClass("active");
            _cancel_animated = false;
            // window.requestAnimationFrame(moveRabbit);
            moveRabbit();
        });



        $("#ctrl").on("touchend", "i", function(e) {
            if (!_canplay) {
                return;
            }
            _cancel_animated = true;
            var $target = $(e.currentTarget);
            $target.removeClass("active");
            var _direct = $target.attr("data-value"), //0--left; 1--right
                $rabbit = $("#rabbit_fly"),
                _rabbit_left = $rabbit[0].offsetLeft;

            var _touchend_time = new Date().getTime();
            if (_touchend_time - _touchstart_time < 150) {
                if (_direct == 0) {
                    var _left = _rabbit_left - _rabbit_step;
                    $rabbit[0].style.left = (_left <= 0 ? 0 : _left) + "px";
                } else {
                    var _left = _rabbit_left + _rabbit_step;
                    $rabbit[0].style.left = (_left + _rabbit_width >= _window_width ? _window_width - _rabbit_width : _left) + "px";
                    // console.log($rabbit[0].offsetLeft + _rabbit_width);
                }
            } else {
                window.cancelAnimationFrame(moveRabbit);
            }


        });

        function moveRabbit() {
            if (!_canplay) {
                return;
            }
            if (_cancel_animated) {
                return;
            }
            $rabbit = $("#rabbit_fly"),
                _rabbit_left = $rabbit[0].offsetLeft;
            if (_direct == 0) {
                var _left = _rabbit_left - 10 <= 0 ? 0 : _rabbit_left - 10;
                $rabbit[0].style.left = _left + "px";
                if (_left > 0) {
                    window.requestAnimationFrame(moveRabbit);
                }

            } else {
                var _left = _rabbit_left + 10;
                _left = _left + _rabbit_width >= _window_width ? _window_width - _rabbit_width : _left;
                $rabbit[0].style.left = _left + "px";
                if (_left + _rabbit_width < _window_width) {
                    window.requestAnimationFrame(moveRabbit);
                }
                // console.log($rabbit[0].offsetLeft + _rabbit_width);
            }
        }

        //游戏结束
        function gameover() {
            _canplay = false;
            // _cancel_animated = tru;
            //兔子死掉
            rabbitDie();
            //动画停止
            $(".stars")[0].style.webkitAnimationPlayState = "paused";
            $(".stars")[1].style.webkitAnimationPlayState = "paused";
            var $dogs = $(".dog");
            for (var i = 0; i < $dogs.length; i++) {
                $dogs[i].style.webkitAnimationPlayState = "paused";
            }

            playMusic(gameover_music);


            setTimeout(function(e) {
                // 过了第几关
                alert(_stage);
                // window.location.href = "../html/result.html";
            }, 600);
        }

        function rabbitDie() {
            $("#rabbit_dead").show();
            $("#rabbit_alive").hide();

        }

        function upgrade() {
            var $current_stage = $("#current_stage");
            if (_stage != $current_stage.attr("data-stage")) {
                playMusic(upgrade_music);
                // console.log("upgrade");
                $current_stage.attr("data-stage", _stage);
                $current_stage.html(_stages[_stage]);
                $("#next_stage").html(_stages[_stage + 1]);
                if (_stage >= 4) {
                    $("#next_stage").parent().hide();
                }
            }
        }

        function pxToPx(px) {
            return px / 23.4375 / 2 * _fontsize;
        }

   

    // popup.alertPopup("网络闹情绪了，稍后再试试！");
     

    // }
})();
