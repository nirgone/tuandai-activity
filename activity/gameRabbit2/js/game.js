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

    //音乐
    var bg_music = $("#bg_music"),
        _canplaymusic = 1;
    var music_img = $("#music");
    loadMusic(bg_music);


    // $("#gameover,#pass").bind("ended", function() {
    //     playMusic(bg_music);
    // });

    function loadMusic(music) {
        if (music.length > 0) {
            music[0].load();
        }
    }

    function playMusic(music) {
        return;
        if (_canplaymusic) {
            music[0].currentTime = 0;
            music[0].play();
        }
    }

    function preloadImg(images) {
        for(var i = 0; i < images.length; i ++) {
            var _image = new Image();
            _image.src = images[i];
        }
    }

    // 预加载图片
    var _balls = ['../images/ball1.png','../images/ball2.png','../images/ball3.png','../images/ball4.png','../images/broken1.png','../images/broken2.png','../images/broken3.png','../images/broken4.png'];
    preloadImg(_balls);
    // document.addEventListener('touchstart', function(e) {
    //     if (music_img.hasClass("pause")) {
    //         return;
    //     }
    //     bg_music[0].play();
    //     // playMusic(bg_music);
    // });
    $(".audio-btn").bind('touchstart', function(e) {
        if (!bg_music) {
            bg_music = $("#bg_music");
        }
        if (music_img.hasClass("play")) {
            _canplaymusic = 0;
            music_img.removeClass("play").addClass("pause");

            //关闭所有音乐
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
        _ball_width = pxToPx(120),
        _ball_height = pxToPx(202),
        _distance = $(window).height() * 0.74 - _ball_height, //天狗碰到兔子的距离
        _pai_step = 30, //兔子左右的步幅
        _pai_width = pxToPx(178),
        $paiFly = $("#pai_fly"),
        $progressBar = $('#progress_bar'),
        $progress = $('#progress'),
        $score = $('#score');

    var _origin_time = 20,
        _total_time = 20,
        _shield = false, // 是否有防护罩
        _score = 0; // 原始总时间 总时间 总分数

    // 定时器
    var to_pai_cash = null, // 小pai撞墙的定时器
        it_countdown = null; // 倒计时

    //生成参数
    var _canplay = true,
        _times = 0,
        _speed_fall = 2800, //天狗滑行时间
        _speed_generate = 750,
        _atime = 0, //加速度增加

        _last_ball_left = 0,

        _touchstart_time = 0,
        _group = 0; //第几阶段
    //兔子运动
    var _direct = 0,
        _cancel_animated = false;
    // 天空飞行阶段
    var _stage = 0,
        // _stages = ["离地300米", "低空飞行", "穿越大气层", "遨游外太空", "月亮之上"],
        //     _speed_falls = [4000, 3600, 2800, 2200, 1600],
        _group_steps = [15, 30, 45, 60, 70];
        // _group_steps = [10, 30, 90, 110, 150],
        // _speed_falls = [2800, 1750, 1250, 1000, 800];
        _speed_falls = [1850, 1250, 950, 820, 600];

    var _stay_stage3 = true; //停留在第四关

    $("#btn_play").bind("touchstart", function(e) {
        $('#rule').hide();
        $(".game-content").addClass("start-game");
        _canplaymusic = 1;
        music_img.removeClass("pause").addClass("play");
        bg_music[0].play();
        setTimeout(function() {
            // 现实气流
            $('.icon-air').show();
            startGame();
        }, 600);
    });
    $("#btn_play").bind("touchend", function(e) {
        $("#btn_play").removeClass("active");
    });
    // 道具
    $('.game-content').on('touchstart', '.prop', function(e) {
        var $target = $(e.currentTarget);
        var _type = $target.attr('data-type');
        // console.log(_type);
        switch (_type) {
            case '0':
                updateTime(3);
                _origin_time += 3;
                $('#overtime_sec').html('+3s');
                setTimeout(function() {
                    $('#overtime_sec').html('');
                }, 500);
                $target.remove();
                break;
            case '1':
                $paiFly.addClass('shield');
                _shield = true;
                setTimeout(function() {
                    $paiFly.removeClass('shield');
                    _shield = false;
                }, 2000);
                $target.remove();
                break;
        }
    });

    //开始游戏
    function startGame() {
        createBall(_speed_fall);
        ctrlCreateBall();
        //  倒计时
        if (it_countdown) {
            clearInterval(it_countdown);
        }

        it_countdown = setInterval(function() {
            if (_total_time <= 0) {
                gameover();
                return;
            }
            updateTime(-1);
            _score += 2; // 分数加2
            $score.html(_score);
        }, 1000);
    }

    // 时间修改
    function updateTime(time) {
        _total_time += time;
        $('.progress-part').find('span').html((_total_time < 0 ? 0 : _total_time) + 's');
        // $progress.width(pxToPx(_total_time / _origin_time * 260));
        var _percent = (_total_time / _origin_time - 1) * 100;
        $progress.css({
            'transform': 'translateX(' + _percent + '%)',
            '-webkitransform': 'translateX(' + _percent + '%)'
        });
        if (_total_time <= 0) {
            gameover();
        }
    }

    //控制生成天狗
    function ctrlCreateBall() {
        var _time_random = 0;
        var _pai_survie_time = _speed_fall * 180 / _translate_distance; // 兔子生存时间
        // console.log(_translate_distance, _pai_survie_time);

        _generate_offset = 10;
        setTimeout(function(e) {
            createBall(_speed_fall);
            if (_times < _group_steps[0]) {
                _stage = 0;
                _group = 0;
                _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 320;
                _generate_offset = 180;
            } else if (_times < _group_steps[1]) {
                _group = 1;
                _stage = 1;
                _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 160;
                _generate_offset = 180;
            } else if (_times < _group_steps[2]) {
                _group = 2;
                _stage = 2;
                _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 120;
                _generate_offset = 120;
            } else if (_times < _group_steps[3]) {
                _group = 3;
                _stage = 3;
                _speed_fall = _speed_fall <= _speed_falls[_stage] ? _speed_falls[_stage] : _speed_fall - 70;
                _generate_offset = 120;
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
            _speed_generate = _speed_generate <= _pai_survie_time ? _pai_survie_time : _speed_generate - _generate_offset;

            //修改文案
            // upgrade();
            _times++;
            if (_canplay) {
                // console.log(12345);
                ctrlCreateBall();
            }
            // console.log(_speed_generate, _time_random);
        }, _speed_generate + _time_random);
    }

    //生成天狗
    function createBall(speed) {
        if (!_canplay) {
            return;
        }
        var _ball = document.createElement('i');
        _ball.className = "ball ball" + random() + " group" + _group;
        _ball.style.webkitAnimationDuration = speed / 1000 + "s";

        var _offset_left = Math.random() * (_window_width - _ball_width);
        //生成左右
        _ball.style.left = _offset_left + "px";
        $("#ball_sec")[0].appendChild(_ball);
        _last_ball_left = _offset_left;
        _kill_pai_time = _distance * speed / _translate_distance;
        _kill_pai_time2 = (_distance + _pai_width / 3 * 2) * speed / _translate_distance;

        function ifKillPai() {
            if (!_canplay) {
                return;
            }
            var _pai_left = $paiFly[0].offsetLeft;
            // var _offset_x = _pai_width * 0.39;
            var _offset_x = pxToPx(32);
            if (!((_pai_left + _pai_width - _offset_x) < _offset_left || _pai_left > (_offset_left + _ball_width - _offset_x))) {


                $(_ball).addClass('broken');
                paiCrashed();
            }
        }
        setTimeout(function ifKillPaiTime() {
            if (!$(_ball).hasClass('broken') && !_shield) {
                ifKillPai();
            }
        }, _kill_pai_time);
        setTimeout(function ifKillPaiTime2() {
            if (!$(_ball).hasClass('broken') && !_shield) {
                ifKillPai();
            }
        }, _kill_pai_time2);

        setTimeout(function delBallTime() {
            $("#ball_sec")[0].removeChild(_ball);
        }, speed);
    }
    // 生成 1～4的随机数
    function random() {
        return Math.ceil(Math.random() * 4);
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
        movePai();
    });

    $("#ctrl").on("touchend", "i", function(e) {
        if (!_canplay) {
            return;
        }
        _cancel_animated = true;
        var $target = $(e.currentTarget);
        $target.removeClass("active");
        var _direct = $target.attr("data-value"), //0--left; 1--right
            _pai_left = $paiFly[0].offsetLeft;

        var _touchend_time = new Date().getTime();
        if (_touchend_time - _touchstart_time < 150) {
            if (_direct == 0) {
                var _left = _pai_left - _pai_step;
                $paiFly[0].style.left = (_left <= 0 ? 0 : _left) + "px";
            } else {
                var _left = _pai_left + _pai_step;
                $paiFly[0].style.left = (_left + _pai_width >= _window_width ? _window_width - _pai_width : _left) + "px";
                // console.log($rabbit[0].offsetLeft + _pai_width);
            }
        } else {
            window.cancelAnimationFrame(movePai);
        }
    });
    $('.list-prop').on('click', '.item-prop', function(e) {
        var $target = $(e.currentTarget);
        if ($target.hasClass('unactive')) {
            return;
        }
        var _type = $target.attr('data-type'); //0 -- 加时 1 -- 防护罩

        // 如果可兑换，那么兑换之后，替换状态
        $target.addClass('unactive');
        $target.find('.right-part').html('已兑换');

    });

    function movePai() {
        if (!_canplay) {
            return;
        }
        if (_cancel_animated) {
            return;
        }

        var _pai_left = $paiFly[0].offsetLeft;
        if (_direct == 0) {
            var _left = _pai_left - 10 <= 0 ? 0 : _pai_left - 10;
            $paiFly[0].style.left = _left + "px";
            if (_left > 0) {
                window.requestAnimationFrame(movePai);
            }

        } else {
            var _left = _pai_left + 10;
            _left = _left + _pai_width >= _window_width ? _window_width - _pai_width : _left;
            $paiFly[0].style.left = _left + "px";
            if (_left + _pai_width < _window_width) {
                window.requestAnimationFrame(movePai);
            }
        }
    }

    //游戏结束
    function gameover() {
        _canplay = false;
        clearInterval(it_countdown);
        bg_music[0].pause();
        /*
        options : {
                type: 类型：0--团币 1--现金红包 2--投资红包 3--没有红包
                score: 分数,
                count: 奖励的数量
                btns: [{
                    txt: 按钮文字
                    cb: function() {} 按钮事件
                },{
                    txt: 按钮文字
                    cb: function() {} 按钮事件
                }],
            }
        */

        dialog({
            "type": 3,
            "score": _score,
            "count": 30,
            "btns": [{
                "txt": "再玩一次",
                "cb": function() {
                    console.log("再玩一次");
                    window.location.reload();
                }
            }, {
                "txt": "玩玩别的",
                "cb": function() {
                    console.log("玩玩别的");
                }
            }]
        });
        // 小pai撞了
        // paiCrashed();

        //动画停止
        // $('.sky').addClass('paused');
        // $('#ball_sec').addClass('paused');

        // playMusic(gameover_music);


        // setTimeout(function(e) {
        //     // 过了第几关
        //     console.log(_stage);
        //     // window.location.href = "../html/result.html";
        // }, 600);
    }

    // 小pai 撞球了
    function paiCrashed() {
        $("#pai_crashed").show();
        $("#pai_alive").hide();

        // 时间减1
        updateTime(-1);
        $('#overtime_sec').html('-1s');
        if (to_pai_cash) {
            clearTimeout(to_pai_cash);
        }
        to_pai_cash = setTimeout(function() {
            paiFly();
            $('#overtime_sec').html('');
        }, 500);

    }

    // 小pai 继续飞
    function paiFly() {
        $("#pai_alive").show();
        $("#pai_crashed").hide();
    }


    function pxToPx(px) {
        return px / 23.4375 / 2 * _fontsize;
    }


    /* ==================弹出框==dialog================= */
    /*
            options : {
                type: 类型：0--团币 1--现金红包 2--投资红包 3--没有红包
                score: 分数,
                count: 奖励的数量
                btns: [{
                    txt: 按钮文字
                    cb: function() {} 按钮事件
                },{
                    txt: 按钮文字
                    cb: function() {} 按钮事件
                }],
            }
        */
    function getLevel(score) {
        if (score <= 10) {
            return "C";
        }
        if (score <= 15) {
            return "B";
        }
        if (score <= 20) {
            return "A";
        }
        if (score >= 21) {
            return "S";
        }
    }
    var dialog = function(options) {
            var that = this;
            var _options = {
                "type": "0",
                "score": 0,
                "count": '0',
                "btns": [{
                    "txt": "再玩一次",
                    "cb": null
                }, {
                    "txt": "玩玩别的",
                    "cb": null
                }],
            };
            _options = $.extend(_options, options || {});
            var _level = getLevel(_options.score);
            var _icon = "",
                _unit = "",
                _type_name = "";
            switch (_options.type + "") {
                case "0":
                    _icon = "coin";
                    _unit = "个";
                    _type_name = "团币";
                    break;
                case "1":
                    _icon = "cash";
                    _unit = "元";
                    _type_name = "现金红包";
                    break;
                case "2":
                    _icon = "invest";
                    _unit = "元";
                    _type_name = "投资红包";
                    break;
                case "3":
                    _icon = 'nogift';
                    break;
            }
            var pop_dialog = $("<div/>").addClass("popup").addClass("popup-dialog"),
                dialog_wrapper = $("<div/>").addClass("dialog-wrapper"),
                dialog_title = $("<div/>").addClass("dialog-title").html('<p>本局评价：<font class="font46">' +
                    _level + '</font>&nbsp;&nbsp;级别<font class="font18"> ( ' +
                    _options.score + '积分 )</font></p> <p class = "font24" > game over </p>'),
                icon = $("<i/>").addClass("present").addClass(_icon),
                text = $("<div/>").addClass('txt').html(_options.type == 3 ? '可惜了，红包与你擦肩而过' : ('恭喜您，获得<font class="color-red"> ' + _options.count + _unit + ' </font>' + _type_name)),
                p = $("<p/>").html(_options.type == 3 ? "&nbsp;" :"奖品可前往-我的团宝箱查看"),
                btns = $("<div/>").addClass("btns");


            for (var j = 0; j < _options.btns.length; j++) {
                (function(index) {
                    var _option = _options.btns[index];
                    var _btn = $("<div/>").addClass("btn-shadow").addClass("btn-" + (index == 0 ? "blue" : "yellow")).attr("data-value", _option.txt);
                    _btn.bind("click", function(e) {
                        _option.cb && _option.cb();
                        // hide(pop_dialog);
                    });
                    btns.append(_btn);
                })(j);
            }

            dialog_wrapper.append(dialog_title).append(icon).append(text).append(p).append(btns);
            pop_dialog.append(dialog_wrapper);

            $("body").append(pop_dialog);
            //事件绑定

            function hide(target) {
                target.remove();
            }
        }
        /* ==================弹出框=======end============ */

    // }

})();
