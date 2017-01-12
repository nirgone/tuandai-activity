(function() {
    FastClick.attach(document.body);
    //do your thing.
    var _starttime = 0, //开始滚动时间
        _puppets = ['pai0', 'rabbit0', 'monkey1', 'pai1', 'chicken1', 'rabbit1', 'monkey0', 'chicken0'], // 对应的娃娃列表（第一个抓到的是小派）4,7-幸运鸡
        _puppet_caught = [],
        _puppet_length = $(".list-puppet").width(), // 娃娃的总长度
        _godowntime = 1150, // 杠子下来抓娃娃的时间 单位，ms
        _catchtime = 0, // 爪子抓的时间点
        _scrolltime = 12000, // 娃娃从头滚到尾的时间 单位： ms
        _spacetime = _scrolltime / 8, // 每个娃娃滚动的时间
        _gametime = 30000, // 游戏时长
        _catching = false, // 正在抓取
        _count = 0, // 抓住鸡的数量
        _canplay = true, // 能否游戏
        _usetool = false; // 是否使用数据


    //音乐
    var bg_music = $("#bg_music");
    var music_img = $("#music");
    loadMusic(bg_music);


    function loadMusic(music) {
        if (music.length > 0) {
            music[0].load();
        }
    }

    document.addEventListener('touchstart', function(e) {
        if (music_img.hasClass("pause")) {
            return;
        }
        // if(_can)
        bg_music[0].play();
    });
    $(".audio-btn").bind('touchstart', function(e) {
        if (!bg_music) {
            bg_music = $("#bg_music");
        }
        if (music_img.hasClass("play")) {
            music_img.removeClass("play").addClass("pause");

            //关闭所有音乐
            bg_music[0].pause();

        } else {
            music_img.removeClass("pause").addClass("play");
            bg_music[0].play();
        }
    });



    init();

    function init() {
        $(".list-puppet").addClass("active");
        _starttime = new Date().getTime();
        // console.log(_starttime, _puppet_length);
        setTimeout(function() {
            _canplay = false;
            if (!_catching) {
                gameover();
            }
        }, _gametime);
    }

    function gameover() {
        _canplay = false;
        $(".btn-game").addClass("disabled");
        if (_count < 2) {
            $("#popup").show();
        } else {
            $(".btn-common").removeClass("disabled");
        }
    }

    function restart() {
        //  $(".list-puppet").removeClass("active").addClass("active");
        // _starttime = new Date().getTime();
        // _canplay = true;
        // _puppet_caught = [];
        // _count = 0;
        // $("#btn_game").removeClass("disabled");
        // $(".puppet").removeClass("caught");
        // setTimeout(function() {
        //        gameover();
        //    }, 30000);

        window.location.reload();
    }

    function useTool() {
        var _claw = $(".stick-big");
        _claw.addClass("godown");
        setTimeout(function() {
            $(".puppet").addClass("caught");
            _claw.find(".icon-caught").show();

            setTimeout(function() {
                // 抓杆上升
                _claw.addClass("goup");
                setTimeout(function() {
                    // 抓杆放开
                    _claw[0].className = "stick-big active";
                    _catching = false;
                    _claw.find(".icon-caught").hide();
                    var _frame = $("#frame");
                    _frame.addClass("active");
                    _count = 2;
                    $("#count").html(_count);
                    _frame.find("i")[0].className = "icon-block icon-chicken-catch";
                    gameover();
                }, 900);
            }, 600);
        }, _godowntime);
    };

    function catchPuppet() {
        var _claw = $(".stick"),
            _caught = $("#claw_caught");
        _claw.addClass("godown");
        setTimeout(function() {
            _catchtime = new Date().getTime();
            var _dura = _catchtime - _starttime,
                _index = getIndex(_dura),
                _canCatch = canGetPuppet(_dura) && !_puppet_caught[_index];
                // console.log(!_puppet_caught[_index])
            if (_canCatch) {
                var _puppet = $("." + _puppets[_index]);
                // 抓杆抓起
                if (_puppet.hasClass("caught")) {
                    return;
                }
                _puppet.addClass("caught");
                _caught[0].className = "icon-caught icon-" + _puppets[_index];
                _puppet_caught[_index] = _index;
                if ((_index == 4 || _index == 7) && _count === 0) {
                    $("#tip").show().find("span").html('还有一只幸运鸡，别漏了哦');
                } else if(!(_puppet_caught[4] && _puppet_caught[7])) {
                    $("#tip").show().find("span").html('捉错了哦～');
                }
            } 
            // console.log(_puppets[_index]);
            setTimeout(function() {
                // 抓杆上升
                _claw.addClass("goup");
                setTimeout(function() {
                    // 抓杆放开
                    _claw[0].className = "stick active";
                    if (_canCatch && (_index == 4 || _index == 7)) {
                        _caught.addClass("got");
                        setTimeout(function() {
                            _caught[0].className = "icon-caught";
                            var _frame = $("#frame");
                            // if (_frame.hasClass("active")) {
                            //     _count = 2;
                            //     $("#count").html(_count);
                            //     gameover();
                            // } else {
                            //     _frame.addClass("active");
                            //     _count = 1;
                            //     $("#count").html(_count);
                            //     _frame.find("i")[0].className = "icon-block icon-chicken-catch";
                            // }
                            getChickCount(_count + 1);
                            if (_count >= 2) {
                                gameover();
                                _canplay = false;
                            }
                            //判断游戏是否结束
                            if (!_canplay) {
                                gameover();
                            }
                        }, 800)
                    } else {
                        _caught[0].className = "icon-caught";
                        //判断游戏是否结束
                        if (!_canplay) {
                            gameover();
                        }
                    }
                    $("#tip").hide();
                    _catching = false;

                }, 900);
            }, 600);
        }, _godowntime);
    }
    $("#btn_game").on("click", function(e) {
        if (!_canplay) {
            return;
        }
        if (_catching) {
            return;
        }
        _catching = true;
        var _stick = $(".stick"),
            _stick_big = $(".stick-big");
        if (_usetool) {
            // if (!_stick_big.hasClass("active")) {
            //     _stick_big.addClass("active");
            //     _stick.removeClass("active");
            // }
            useTool();

        } else {
            // var _stick = $(".stick");
            // if (!_stick.hasClass("active")) {
            //     _stick.addClass("active");
            //     _stick_big.removeClass("active");
            // }
            catchPuppet();
        }


    })

    //popup 按钮事件绑定
    $("#popup").on("click", ".btn0, .btn1", function(e) {
        var _id = $(e.currentTarget).attr("id");
        switch (_id) {
            case "usetool":
                _usetool = true;
                _canplay = true;
                $("#btn_game").removeClass("disabled");
                $(".puppet").removeClass("caught");
                $(".stick").removeClass("active");
                $(".stick-big").addClass("active");
                getChickCount(0);
                break;
            case "restart":
                restart();
                break;
        }
        $("#popup").hide();
    });

    // 兑换按钮
    $("#exchange").on("click", function(e) {
        if (_count == 2 && !$(this).hasClass("disabled")) {
            window.location.href = "./register.html";
        }
    });

    function getChickCount(no) {
        var _frame = $("#frame"),
            _classname = "",
            _i_classname = "";
        if (no <= 0) {
            _count = 0;
            _classname = "page1-frame";
            _i_classname = "icon-block icon-chicken-empty";
        } else {
            _count = no;
            _classname = "page1-frame active";
            _i_classname = "icon-block icon-chicken-catch";
        }
        _frame[0].className = _classname;
        $("#count").html(_count);
        _frame.find("i")[0].className = _i_classname;
    }

    function getIndex(no) {
        var _index = parseInt(no / _spacetime)
            // console.log(no, _index, _index%8, _puppets[_index%8])
        return _index % 8;
    }

    function canGetPuppet(no) {
        var _t = no % _spacetime;
        // console.log(_t);
        return _t >= 500 && _t <= 1000;
    }

})();
