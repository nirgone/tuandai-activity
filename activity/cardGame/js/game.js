(function() {
    FastClick.attach(document.body);
    //do your thing.
    var _selected = "",
        _flip_time = 300,
        _round = 0, // _round = 8 闯关完成
        _cover_round = 5, // 遮挡关卡， 从_round = 5 开始
        _final_round = 8, //最后关卡
        _energy = 3,
        _roundover = 0, //通过关数
        _gamestart = 0, //0--未开始，1-－开始
        _gameover = 0, //0--未结束，1-－结束
        _cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], //卡片数组
        _cover_effects = [0, 1, 2, 3], //从_round = 5 开始出现的效果
        _canplaymusic = 1, //0--停止播放 1-－播放
        _time = 2, //倒数时间
        _start_timeout = null, //开始游戏倒计时
        _countdown_timeout = null; //倒计时
    //打乱出现顺序
    _cover_effects.sort(function() {
        return 0.5 - Math.random();
    });

    var bg_music = $("#bg_music"),
        flip_music = $("#flip"),
        clear_music = $("#clear"),
        pass_music = $("#pass"),
        gameover_music = $("#gameover");
    var music_img = $("#music");
    loadMusic(bg_music);
    loadMusic(flip_music);
    loadMusic(clear_music);
    loadMusic(pass_music);
    loadMusic(gameover_music);

    // $("#gameover,#pass").bind("play", function() {
    //     bg_music[0].pause();
    // });
    $("#gameover,#pass").bind("ended", function() {
        playMusic(bg_music);
    });
    // gameover_music[0].addEventListener("play", function() { //监听播放
    //     bg_music[0].pause();
    // }, false);
    // gameover_music[0].addEventListener("pause", function() { //监听暂停
    //     if(_canplaymusic) {
    //          bg_music[0].play();
    //     }
    // }, false);

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

    document.addEventListener('touchstart', function() {
        if (music_img.hasClass("pause")) {
            return;
        }
        if (_gameover) {
            return;
        }
        if (_gamestart) {
            return;
        }
        bg_music[0].play();
        // playMusic(bg_music);
    });

    $(".audio-btn").on('click', function(e) {
        if (!bg_music) {
            bg_music = $("#bg_music");
        }
        if (music_img.hasClass("play")) {
            _canplaymusic = 0;
            music_img.removeClass("play").addClass("pause");
            bg_music[0].pause();

            //关闭所有音乐
            flip_music[0].pause();
            clear_music[0].pause();
            pass_music[0].pause();
            gameover_music[0].pause();

        } else {
            _canplaymusic = 1;
            music_img.removeClass("pause").addClass("play");
            if (!_gamestart) {
                bg_music[0].play();
            }
        }
    });

    window.onload = function(e) {

        $("#before_start").addClass("fadeOut");
        /*var _onload_start_game_timeout = setTimeout(function() {
            startRound(_round);
            clearTimeout(_onload_start_game_timeout);
            _onload_start_game_timeout = null;
        }, 3000);*/

        $("#before_start")[0].addEventListener("webkitAnimationEnd", function() {
            startRound(_round);
        }, false);

        //开始游戏
        function startGame() {
            // console.log("start---game----");
            $("#before_round").show();
            if (_round >= _cover_round) {
                $(".cover").attr("data-cover", _cover_effects[_round - _cover_round]);
                // $(".cover").attr("data-cover", 3);
                $(".cover").show();
            }
            _start_timeout = setTimeout(function startGameTimeout() {
                $("#before_start,#before_round").hide();
                $(".cell").addClass("flipover");
                $(".cover").hide();
                clearTimeout(_start_timeout);
                _start_timeout = null;
                _gamestart = 1;
            }, 3000);
            startCountDown();

        }

        //生成卡片 0--第一关，4片；1-－第二关，6片；2-－第三关，8片，第四关，10片－－ 第五关及以上，12片
        function getCards(round) {
            var _card_num = 0;
            switch (round) {
                case 0:
                    _card_num = 2;
                    break;
                case 1:
                    _card_num = 3;
                    break;
                case 2:
                    _card_num = 4;
                    break;
                case 3:
                    _card_num = 5;
                    break;
                default:
                    _card_num = 6;
                    break;

            }
            var _cards_temp = randomCards(_card_num);
            _cards_temp = _cards_temp.concat(_cards_temp);
            _cards_temp.sort(function() {
                return 0.5 - Math.random()
            });
            var _cell_temp = "";
            // console.log(_cards_temp);
            for (var i = 0; i < _cards_temp.length; i++) {
                _cell_temp += '<li class="cell card' + _cards_temp[i] + '" data-value="' + _cards_temp[i] + '">' +
                    '<div class="cell-face"><i class="icon-card' + _cards_temp[i] + '"></i></div>' +
                    '<div class="cell-back"></div>' +
                    '</li>';
            }
            return _cell_temp;
            // $("cell_list")
        }
        //第几关游戏
        function startRound(round) {
            var _class = "cells round";
            if (round <= 3) {
                _class += round;
            } else {
                _class += "4";
            }
            $("#round_no").html(_round + 1);
            $("#cell_list")[0].className = _class;
            $("#cell_list").html(getCards(round));
            startGame();
        }
        //随机抽取图片
        function randomCards(num) {
            _cards.sort(function() {
                return 0.5 - Math.random();
            });
            return _cards.slice(0, num);
        }

        //选中清除
        function clearCard(cardno) {
            setTimeout(function clearCardTimeout() {
                $(".card" + cardno).addClass("cleared").html("");
                flip_music[0].pause();
                playMusic(clear_music);
                // clear_music[0].play();
                //判断是否全部clear
                if ($(".cell").length == $(".cleared").length) {
                    //判断是否最后一关，最后一对消除
                    if (_round == _final_round) {
                        // gameSuccessPopup();
                        _round = _final_round;
                        gameoverPopup(_round);
                    } else {
                        _roundover = _round;
                        _round += 1;
                        startRound(_round);
                    }
                }
            }, _flip_time);
        }

        //翻回去
        function flipCard(cardno) {
            $(".card" + cardno).removeClass("flip").addClass("flipover");
        }

        //对比卡片
        function compareCard() {

        }

        //减少能量
        function reduceEnergy() {
            _energy = _energy <= 0 ? 0 : _energy - 1;
            $("#energy").attr("data-energy", _energy);
            if (_energy >= 1) {
                showtip();
            }
            if (_energy == 0) {
                // gameFailPopup();
                gameoverPopup(_roundover);
            }
        }

        //重置游戏
        function resetGame() {
            _selected = "";
            _round = 0;
            _roundover = 0;
            _gamestart = 0;
            _gameover = 0;
            _energy = 3;
            $("#energy").attr("data-energy", _energy);
            _cover_effects.sort(function() {
                return 0.5 - Math.random();
            });
            //音乐关掉
            gameover_music[0].currentTime = 0;
            gameover_music[0].pause();
            playMusic(bg_music);
            startRound(0);
        }

        //翻牌
        $("#cell_list").on("touchstart", ".cell", function(e) {
            var $target = $(e.currentTarget);
            var _value = $target.attr("data-value");
            if (_gameover) {
                gameoverPopup(_roundover);
                return;
            }
            if ($target.hasClass("flip")) {
                return;
            }
            $target.removeClass("flipover").addClass("flip");
            // flip_music[0].pause();
            playMusic(flip_music);
            if (_selected) {
                // clearCard(_value);
                //对比卡片
                if (_selected == _value) { //如果相等，那么清除，否则 翻回去
                    clearCard(_selected);
                } else {
                    setTimeout(function() {
                        // flip_music[0].pause();
                        playMusic(flip_music);
                        $(".flip").addClass("flipover").removeClass("flip");
                        reduceEnergy();
                    }, _flip_time);
                }
                _selected = "";
            } else {
                // $(".flip").addClass("flipover");
                $target.removeClass("flipover");
                _selected = _value;
            }
        });

        //挑战失败弹窗
        /*function gameFailPopup() {
            _gameover = 0;
            gameover_music[0].play();
            popup({
                "type": 0,
                "btns": [{
                    "text": "不服再战",
                    callback: function() {
                        resetGame();
                    }
                }, {
                    "text": "求安慰",
                    callback: function() {
                        console.log("gameFailPopup1")
                    }
                }, {
                    "text": "呼叫好友帮忙",
                    callback: function() {
                        $("#share").show();
                    }
                }]
            });
        };
        //挑战成功弹窗
        function gameSuccessPopup() {
            _gameover = 1;
            popup({
                "type": 1,
                "btns": [{
                    "text": "领取奖励",
                    callback: function() {
                        console.log("gameSuccessPopup0");
                    }
                }, {
                    "text": "分享好友",
                    callback: function() {
                        $("#share").show();
                    }
                }]
            });
        };*/

        function gameoverPopup(round) {
            // _gameover = 1;
            var _content = "",
                _btns = "";
            if (round <= 1) {
                _content = ['身体被掏空了吗？', '你的记忆力落后宇宙300年'];
            } else if (round > 1 && round <= 3) {
                _content = ['喂？妖妖灵吗？', '这里有人脑回路打结了', '你才击败了30%的选手'];
            } else if (round > 3 && round <= 4) {
                _content = ['天呐！这画面太美！', '辣眼睛～', '你才击败了35%的选手'];
            } else if (round > 4 && round <= 6) {
                _content = ['套路玩的深，谁把谁当真', '80%的选手被你成功击败'];
            } else if (round > 6 && round < _final_round) {
                _content = ['实力装逼，本宝宝，只服你！', '90%的人不是你的对手'];
            } else if (round == _final_round) {
                _content = ['天了噜！这个游戏被你承包了', '你已经全部通关'];
            }
            if (round < _final_round) {
                if (!_gameover) {
                    playMusic(gameover_music);
                }
                _btns = [{
                    "text": "不服再战",
                    callback: function() {
                        resetGame();
                    }
                }, {
                    "text": "分享好友",
                    callback: function() {
                        $("#share").show();
                    }
                }, {
                    "text": "领取安慰红包",
                    callback: function() {
                        console.log("callback");
                    }
                }];
            } else {
                if (!_gameover) {
                    playMusic(pass_music);
                }
                _btns = [{
                    "text": "领取奖励",
                    callback: function() {
                        console.log("gameSuccessPopup0");
                    }
                }, {
                    "text": "分享好友",
                    callback: function() {
                        $("#share").show();
                    }
                }];
            }

            popup({
                "round": round,
                "content": _content,
                "btns": _btns
            });

            _gameover = 1;
        }
        $("#share").on("click", function(e) {
            $(this).hide();
            // if (_gameover === 0) {
            //     gameFailPopup();
            // } else if (_gameover === 1) {
            //     gameSuccessPopup();
            // }
            gameoverPopup(_roundover);
        });
        /* ==================弹出框==popup================= */
        /*
                options : {
                    round: 对应关数,
                    content:[]，结果的两行文字
                    btns:[{
                        text: 按钮文字，
                        callback: function() {} 回调
                    },{
                        text: 按钮文字，
                        callback: function() {} 回调
                    },{
                        text: 按钮文字，
                        callback: function() {} 回调
                    }]
                   
                }
            */
        function popup(options) {
            var that = this;
            var _options = {
                "round": 0,
                "content": ["身体被掏空了吗？", "你的记忆力落后宇宙300年"],
                "btns": [{
                    "text": "不服再战",
                    callback: function() {}
                }, {
                    "text": "分享好友",
                    callback: function() {}
                }, {
                    "text": "领安慰红包",
                    callback: function() {}
                }]
            };
            _options = $.extend(_options, options || {});
            var popup_sec = $("<div/>").addClass("popup-sec"),
                // masker = $("<div/>").addClass("masker"),
                popup_wrapper = $("<div/>").addClass("popup-wrapper"),
                popup_icons = $("<div/>").addClass("popup-icons"),
                medal = $("<i/>").addClass("medal"),
                icon_star1 = $("<i/>").addClass("icon-star1"),
                icon_star2 = $("<i/>").addClass("icon-star2"),
                icon_star3 = $("<i/>").addClass("icon-star3"),
                popup_text = $("<div/>").addClass("popup-text"),
                _text = "";
            // p0 = $("<p/>").html(_options.content[0]),
            // p1 = $("<p/>").html(_options.content[1]);
            // icon_text5 = "",
            // icon_text6 = "",
            // icon_text7 = "",
            // icon_text8 = "";
            //对应奖牌
            if (_options.round <= 1) {
                medal.addClass("icon-iron");
            } else if (_options.round > 1 && _options.round <= 4) {
                medal.addClass("icon-copper");
            } else if (_options.round > 4 && _options.round <= 7) {
                medal.addClass("icon-silver");
            } else {
                medal.addClass("icon-gold");
            }
            for (var i = 0; i < _options.content.length; i++) {
                _text += '<p>' + _options.content[i] + '</p>'
            };
            popup_icons.append(medal).append(icon_star1).append(icon_star2).append(icon_star3);
            popup_text.append(_text);
            popup_wrapper.append(popup_icons).append(popup_text);

            if (_options.round != _final_round) {
                // icon_text5 = $("<i/>").addClass("icon-text5");
                // icon_text6 = $("<i/>").addClass("icon-text6");
                var btn0 = $("<div/>").addClass("btn ").html(_options.btns[0].text).attr("data-value", 0),
                    btn1 = $("<div/>").addClass("btn ").html(_options.btns[1].text).attr("data-value", 1),
                    btn2 = $("<div/>").addClass("btn-long ").html(_options.btns[2].text).attr("data-value", 2);
                popup_wrapper.append(btn0).append(btn1).append(btn2);

            } else {
                // icon_text7 = $("<i/>").addClass("icon-text7");
                // icon_text8 = $("<i/>").addClass("icon-text8");
                var btn0 = $("<div/>").addClass("btn ").html(_options.btns[0].text).attr("data-value", 0),
                    btn1 = $("<div/>").addClass("btn ").html(_options.btns[1].text).attr("data-value", 1);
                popup_wrapper.append(btn0).append(btn1);
            }


            popup_sec.append(popup_wrapper);
            $("body").append(popup_sec);
            // disableScrolling();

            popup_wrapper.on("click", ".btn, .btn-long", function(e) {
                var $target = $(e.currentTarget),
                    _index = parseInt($target.attr("data-value"), 10),
                    _callback = _options.btns[_index].callback
                if (_callback) {
                    _callback();
                    hide(popup_sec);
                }
            });

            function hide(target) {
                target.remove();
                // enableScrolling();
            }
        }

        /* ================= show tip =============== */
        function showtip() {
            $(".icon-tip-text").remove();
            var tip = $("<div/>").addClass("icon-tip-text").addClass("slideThrough");
            $(".content").append(tip);
        }

        /*============ time count down ========*/

        function countdown() {
            _countdown_timeout = setTimeout(function countdownTimeout() {
                _time -= 1;
                _class = "";
                var $target = $("#countdown");
                if (_time < 0) {
                    $("#countdown").hide();
                    //关闭背景音乐；
                    // if (music_img.hasClass("play")) {
                    //     music_img.removeClass("play").addClass("pause");
                    bg_music[0].pause();
                    // }
                    clearTimeout(_countdown_timeout);
                    _countdown_timeout = null;
                } else if (_time == 0) {
                    _class = "countdown go";
                    $target[0].className = _class;
                    $target.html("GO");
                    countdown();
                } else {
                    _class = "countdown count" + _time;
                    $target[0].className = _class;
                    $("#countdown").html(_time);
                    countdown();
                }
            }, 1000);
        }

        function startCountDown() {
            _time = 2;
            var $countdown = $("#countdown");
            $countdown.removeClass("go").html(_time);
            $countdown.show();
            countdown();
        }


    }


})();
