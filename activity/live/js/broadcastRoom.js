(function() {
    FastClick.attach(document.body);

    // Util.popup({
    //         'content': '提示内容提示内容提示内容提示内容提示内容提示内容',
    //         "btns": [{
    //             "name": "取消",
    //             "cb": function() {
    //                 console.log('cancel')
    //             }
    //         },{
    //             "name": "确定",
    //             "cb": function() {
    //                 console.log('confirm')
    //             }
    //         }]
    //     });

    /* ------------ 直播代码 ------------------ */

    //帐号模式，0-表示独立模式（用自己的账号），1-表示托管模式（用qq账号）
    var accountMode = 0;

    // 房间号
    var avChatRoomId = '100006';
    // var avChatRoomId = '';

    if (webim.Tool.getQueryString("groupid")) {
        avChatRoomId = webim.Tool.getQueryString("groupid"); //用户自定义房间群id
    }

    // 设置聊天类型，GROUP: 群聊， C2C： 私聊
    var selType = webim.SESSION_TYPE.GROUP;
    // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    // var selToID = avChatRoomId;
    var selToID = "";
    // 当前聊天会话
    var selSess = null;

    // 默认群组头像(选填)
    var selSessHeadUrl = '../images/avator.png';

    //当前用户身份
    var _login_info = Util.getSessionStorage('LOGIN_INFO');
    var _user_info = Util.getSessionStorage('USER_INFO');
    if (_login_info === null) {
        Util.toast("没登录哦！！！");
        window.history.back();
    }

    console.log(_login_info);
    var loginInfo = {
        'sdkAppID': _login_info.sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': _login_info.appIDAt3rd, //用户所属应用id，必填
        'accountType': _login_info.accountType, //用户所属应用帐号类型，必填
        'identifier': _login_info.identifier, //当前用户ID,必须是否字符串类型，选填
        'identifierNick': _login_info.identifierNick, //当前用户昵称，选填
        'userSig': _login_info.signature, //当前用户身份凭证，必须是字符串类型，选填
        'headurl': selSessHeadUrl //当前用户默认头像，选填
    };
    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    //注意每个数字代表的含义，比如，
    //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
    var onGroupSystemNotifys = {
        //"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
        //"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
        //"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
        //"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
        "5": GroupNotice.onDestoryGroupNotify, //群被解散(全员接收)
        //"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
        //"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
        //"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
        //"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
        //"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
        "11": GroupNotice.onRevokeGroupNotify, //群已被回收(全员接收)
        "255": GroupNotice.onCustomGroupNotify //用户自定义通知(默认全员接收)
    };


    //监听连接状态回调变化事件
    var onConnNotify = function(resp) {
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                //webim.Log.warn('连接状态正常...');
                break;
            case webim.CONNECTION_STATUS.OFF:
                webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                break;
            default:
                webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
                break;
        }
    };


    //监听事件
    var listeners = {
        "onConnNotify": onConnNotify, //选填
        "onBigGroupMsgNotify": Base.onBigGroupMsgNotify, //监听新消息(大群)事件，必填
        "onMsgNotify": Base.onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        "onGroupSystemNotifys": Base.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        "onGroupInfoChangeNotify": Base.onGroupInfoChangeNotify //监听群资料变化事件，选填
    };

    var isAccessFormalEnv = true; //是否访问正式环境

    if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
        isAccessFormalEnv = false; //访问测试环境
    }

    var isLogOn = true; //是否在浏览器控制台打印sdk日志

    //其他对象，选填
    var options = {
        'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
        'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
    };

    var curPlayAudio = null; //当前正在播放的audio对象


    //sdk登录
    function sdkLogin(loginInfo, listeners, options, avChatRoomId) {
        //web sdk 登录
        webim.login(loginInfo, listeners, options,
            function(identifierNick) {
                //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
                webim.Log.info('webim登录成功');
                applyJoinBigGroup(avChatRoomId); //加入大群

                // todo 登录成功后设置对应的头像
                Base.setProfilePortrait({
                    headerUrl: 'http://www.w3school.com.cn/i/eg_bg_04.gif'
                });

                // todo 如果没有设置昵称，那么设置昵称
                $('#dialog_nickname').show().on('click', '.btn', function(e) {
                    var $target = $(e.currentTarget);
                    if ($target.hasClass('negative-btn')) {
                        $('#dialog_nickname').hide();
                        return;
                    }
                    if ($target.hasClass('positive-btn')) {
                        var _nickname = $('#input_nickname').val();
                        var $tip = $('#tip_nickname');
                        if (_nickname.length < 2 || _nickname.length > 15) {
                            $tip.show();
                            return
                        }
                        if (/[\?\*\:\"\<\>\\\/\|\s]/.test(_nickname)) {
                            console.log(111)
                            $tip.show();
                            return
                        }
                        // todo ajax 修改昵称成功后操作回调函数 setTimeout模拟ajax的成功回调
                        setTimeout(function() {
                            $tip.hide();
                            $('#dialog_nickname').hide();
                            // 成功后设置 im的昵称
                            // todo 登录成功后设置对应的头像
                            Base.setProfilePortrait({
                                nickname: _nickname
                            }, function() {
                                Util.toast('设置成功！')
                            });

                        }, 1000)
                    }

                });



            },
            function(err) {
                alert(err.ErrorInfo);
            }
        ); //
    }

    //进入大群
    function applyJoinBigGroup(groupId) {
        var options = {
            'GroupId': groupId //群id
        };
        webim.applyJoinBigGroup(
            options,
            function(resp) {
                //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
                if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                    webim.Log.info('进群成功');
                    selToID = groupId;
                } else {
                    alert('进群失败');
                }
            },
            function(err) {
                alert(err.ErrorInfo);
            }
        );
    }
    sdkLogin(loginInfo, listeners, options, avChatRoomId);
    if (/debug/gi.test(location.hash)) {
        document.write('<script src="http://sdklog.isd.com/js/vconsole.min.js"></scr' + 'ipt>');
    }

    // 发送类型 0 -- 留言 1--弹幕 2--礼物
    function sendMsg(type, msg, cb) {
        switch (type) {
            case "0":
                msg = "common|" + msg;
                break;
            case "1":
                msg = "danmu|" + msg;
                break;
            case "2":
                msg = "gift|" + msg;
                break;
        }
        if (!loginInfo.identifier) { //未登录
            Util.toast('未登录！！！');
            return;
        }

        // 基础判断
        // 输入内容
        // var msgtosend = ;
        if (!selToID) {
            Util.toast("您还没有进入房间，暂不能聊天");
            $("#popup-input-wrapper").val('');
            return;
        }

        // var msgtosend = $("#send_msg_text").val();

        if (msg.length < 1) {
            Util.toast("发送的消息不能为空!");
            return;
        }

        selSess = Base.onSendMsg(msg, loginInfo, {
            "selToID": selToID,
            "selType": selType,
            "selSess": selSess,
            "selSessHeadUrl": selSessHeadUrl
        }, cb);
    }
    // ---------直播代码 ---- end--------------

    /******************礼物*************/

    //初始化礼物列表
    var giftSwiper; //礼物swiper对象
    function initGift() {
        Util.Ajax({
            url: Util.openApi + 'live/get-present-list',
            type: 'post',
            dataType: 'json',
            success: function(result) {
                // console.info('giftList-----', result);
                if (result.ResultCode && result.ResultCode == 1) {
                    var giftList = result.Data;
                    if (giftList && giftList.length > 0) {
                        var that = this;
                        var temp = '';
                        var _pageStart = ' <div class="swiper-slide"><ul class="g-list">';
                        var _pageEnd = '</ul></div>';
                        var len = giftList.length;
                        var giftJson = {};

                        giftList.forEach(function(item, index) {
                            var type;
                            if (item.gif_info) {
                                type = 2; //动画礼物
                            } else if (item.continue_times > 1) {
                                type = 0; //连送礼物
                            } else {
                                type = 1; //普通礼物
                            }
                            // type = 0;
                            if (!giftJson[item.id]) {
                                giftJson[item.id] = {
                                    coverUrl: item.cover_url,
                                    gifInfo: item.gif_info,
                                    presentName: item.present_name
                                };
                            }
                            var _gift = '<li class="g-item" data-type="' + type + '" data-id="' + item.id + '" data-times="' + item.continue_times + '">' +
                                '<div class="g-icon-container"><i class="g-icon" style="background-image: url(' + item.cover_url + ');"></i></div>' +
                                '<span class="txt-green g-txt g-name">' + item.present_name + '</span>' +
                                '<span class="g-txt g-tp">' + item.present_value + '团票</span></li>';
                            if (index % 8 === 0) {
                                temp = temp + _pageStart + _gift
                            } else if (index % 8 === 7 || index === (len - 1)) {
                                temp = temp + _gift + _pageEnd;
                            } else {
                                temp += _gift
                            }
                        });
                        //保存礼物数据，用于显示礼物
                        window.sessionStorage['giftJson'] = JSON.stringify(giftJson);
                        $("#giftSwiper").find('.swiper-wrapper').html(temp);
                        // giftSwiper = new Swiper("#giftSwiper");
                    }
                }
            }
        });
    }
    //显示礼物列表
    function showGiftActionSheet() {
        $('.g-item').removeClass('item-active');
        $('.gift-send').removeClass('btn-active btn-series').addClass('btn-disable');
        $('.g-wrapper').show();
        if (!giftSwiper) {
            giftSwiper = new Swiper("#giftSwiper");
        }
        setTimeout(function() {
            $('.g-content').addClass('show-gifts');
        }, 0);
    }
    //隐藏礼物列表
    function hideGiftActionSheet() {
        $('.g-content').removeClass('show-gifts');
        setTimeout(function() {
            $('.g-wrapper').hide();

        }, 500);
    }

    /******************礼物*************/

    //===============逻辑事件区==================
    // 站内信方法 type 1: 系统消息 2: 热门活动
    function roomMsgInit(type) {
        // var $tab = $('#msg_tab');
        $tab.show();
        $('#panel' + type).show();
        if (type === '2') {
            if (swiper_act === null) {
                swiper_act = new Swiper('#swiper_act', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    centeredSlides: true,
                    paginationClickable: true,
                    loop: true,
                    spaceBetween: 30
                });
            }
        }
    }

    // 发送类型 0 -- 留言 1--弹幕 2--礼物
    function tip(type, value) {
        var _count = '';
        var _name = '';
        var $tip = null,
            $btn = null;
        var _l = (value + "").length;
        switch (type) {
            case '0':
                _name = '留言';
                _count = 50;
                $tip = $tipMsg;
                $btn = $btnMsg;
                break;
            case '1':
                _name = '弹幕';
                _count = 20;
                $tip = $tipMsg;
                $btn = $btnMsg;
                break;
            case '2':
                _name = '提问';
                _count = 50;
                $tip = $tipQuestion;
                $btn = $btnQuestion;
                break;
        }
        if (_l <= 0) {
            $tip.html('');
            $btn.addClass('btn-disable');
        } else if (_l > 0 && _l <= _count) {
            $tip.html('');
            $btn.removeClass('btn-disable');
        } else {
            $tip.html('超过' + _count + '字，' + _name + '将无法发射哦');
            $btn.addClass('btn-disable');
        }
    }

    //===============逻辑事件区=end=================


    /* ----------事件绑定------------ */

    // 输入框对应的dom
    // 留言|弹幕的类型， 留言|弹幕的输入框 ， 留言|弹幕的提示
    var $msgType = $('#msg_type'),
        $inputMsg = $('#textarea_msg'),
        $tipMsg = $("#tip_msg"),
        $tipQuestion = $("#tip_question"),
        $btnMsg = $('#send_msg'),
        $btnQuestion = $('#send_question');
    var swiper_act = null;
    var $tab = $('#msg_tab'); // 站内信的tab
    var loading = false; // 是否正在加载站内信，系统消息
    // 礼物初始化
    initGift();
    // 绑定切换按钮事件
    $('#msg_type').on('click', function(e) {
        var $target = $(e.currentTarget);
        // 输入类型 0 -- 留言 1--弹幕
        var _value = $inputMsg.val();
        var _type = $target.attr('data-type');
        if (_type === '0') {
            $target.addClass('active').attr('data-type', 1);
            tip('1', _value);

        } else {
            $target.removeClass('active').attr('data-type', 0);
            tip('0', _value);

        }
    });

    // 绑定footer事
    $('#video_discuss_pane').on('click', '.item', function(e) {
        var $target = $(e.currentTarget);
        var _value = $target.attr('data-value');
        if (_value != 3 && _value != 5) {
            if (!loginInfo.identifier) { //未登录
                Utile.Toast('未登录！！！');
                return;
            }
        }
        switch (_value) {
            case '1':
                $('#input_msg').show();
                break;
            case '2':
                $('#input_question').show();
                break;
            case '3':
                $target.find('i').removeClass('redcode');
                var _panel = $('#tab_header').find('.nav.active').attr('data-panel');
                roomMsgInit(_panel)
                break;
            case '4':
                showGiftActionSheet();
                break;
        }
    });



    // 输入弹窗的masker事件，点击关闭
    $('.popup-input-wrapper').on('click', '.masker', function(e) {
        $('.popup-input-wrapper').hide();
    });

    // 绑定发送消息或者发送问题按钮
    $('.popup-input-wrapper').on('click', '#send_msg', function(e) {
        // sendMsg(, )
        var $target = $(e.currentTarget);
        var _type = $msgType.attr('data-type');
        var _msg = $inputMsg.val();

        if ($target.hasClass('btn-disable')) {
            return;
        }

        if (!selToID) {
            Util.toast("您还没有进入房间，暂不能发送消息");
            $("#popup-input-wrapper").hide();
            return;
        }

        // 如果是弹幕那么需要消耗团票才能发送
        if (_type === '1') {
            // todo 消耗团票，在成功回调中发送消息 settimeout 模拟ajax
            setTimeout(function(e) {
                // 发送消息
                sendMsg(_type, _msg, function() {
                    $('#textarea_msg').val('');
                    $('.popup-input-wrapper').hide();
                })
            }, 1000);

        } else {
            // 发送消息
            sendMsg(_type, _msg, function() {
                $('#textarea_msg').val('');
                $('.popup-input-wrapper').hide();
            })
        }

    });

    // 绑定发送问题按钮
    $('.popup-input-wrapper').on('click', '#send_question', function(e) {
        // sendMsg(, )
        var $target = $(e.currentTarget);
        var _msg = $('#textarea_question').val();

        if ($target.hasClass('btn-disable')) {
            return;
        }

        // todo 发送提问 setTimeou 模拟ajax请求后回调
        setTimeout(function() {
            $('#textarea_question').val('');
            $('.popup-input-wrapper').hide();
        }, 1000)

    });

    // 监听留言/弹幕，提问的输入框
    $('.popup-input-wrapper').on('input', 'textarea', function() {
        if ($(this).prop('comStart')) return; // 中文输入过程中不截断
        var _id = $(this).attr('id');
        var _value = $(this).val();
        var _type = _id === "textarea_msg" ? $msgType.attr('data-type') : '2';
        tip(_type, _value);

    }).on('compositionstart', function() {
        // 中文输入：开始;
        $(this).prop('comStart', true);
    }).on('compositionend', function() {
        // 中文输入：结束';
        $(this).prop('comStart', false);
    });

    //主播信息
    $('.video-info').on('click', function() {
        $('.anchor-info-wrapper').show();
    });
    $('.ai-close, .ai-masker').on('click', function() {
        $('.anchor-info-wrapper').hide();
    });

    // 站内信 事件绑定
    $('#tab_header').on('click', '.nav', function(e) {
        var $target = $(e.currentTarget);
        var _panel = $target.attr('data-panel');
        $('#tab_header').find('.nav').removeClass('active');
        $target.addClass('active');
        $('.panel').hide();
        $('#panel' + _panel).show();
        if (_panel === '2' && swiper_act === null) {
            swiper_act = new Swiper('#swiper_act', {
                pagination: '.swiper-pagination',
                slidesPerView: 3,
                centeredSlides: true,
                paginationClickable: true,
                loop: true,
                spaceBetween: 30
            });
        }
    });

    // 站内信点击遮罩，收起
    $tab.on('click', '.masker', function(e) {
        $tab.find('.msg-item').removeClass('redcode');
        console.log(1111)
        $('.msg-item:nth-child(n+11)').remove();
        $('#panel1').scrollTop(0);
        $tab.hide();
    });

    // 站内信 系统消息 事件绑定 
    var _loadmore_height = $('#loader_more').height();
    $('#panel1').on('scroll', function(e) {
        var $target = $(this);
        if ($('#list_msg').height() + _loadmore_height - $target.height() - $target.scrollTop() < 120) {
            if (loading) {
                return;
            }
            console.log('加载更多！！！！');

            // todo 发送请求
            // beforesend loading 要变为true
            loading = true;
            setTimeout(function() {
                if ($tab[0].style.display === 'block') { // 非hide状态下才渲染
                    var _html = '';
                    for (var i = 1; i < 11; i++) {
                        _html += '<li class="msg-item"><p>您已经成功兑换' + i + '团票，花费1000团币。</p><span>2016-04-28 13:59</span></li>';
                    }
                    $('#list_msg').append(_html);
                }
                // 请求成功后，loading要变为false
                loading = false;
            }, 2000);
        }
    });
    var isSeri = false; //按钮是否是连送状态
    var btnInterval; //按钮连送倒计时轮询
    //选中礼物
    $('.g-container').on('click', '.g-item', function() {
        $('.g-item').removeClass('item-active');
        var _target = $(this);
        var _sendBtn = $('.gift-send');
        _target.addClass('item-active');
        var type = _target.attr('data-type');
        var id = _target.attr('data-id');
        //如果正在连送倒计时则停止连送
        if (btnInterval) {
            clearInterval(btnInterval);
            isSeri = false;
        }
        _sendBtn.removeClass('btn-disable btn-series').addClass('btn-active');
        _sendBtn.html('发送');
        _sendBtn.attr('data-type', type);
        _sendBtn.attr('data-id', id);

    });
    //发送礼物
    $('.gift-send').on('click', function() {
        var _target = $(this);
        var type = _target.attr('data-type');
        var id = _target.attr('data-id');
        var giftStr = id + '-' + type;
        // console.error('id++++++', new Date().getTime(), giftStr);

        if (type == 0) {
            //连送礼物
            var _sendBtn = $('.gift-send');
            if (!isSeri) {
                var seriTime = 5000;
                isSeri = true;
                //连送倒计时
                btnInterval = setInterval(() => {
                    if (seriTime === 0) {
                        _sendBtn.removeClass('btn-series').addClass('btn-active');
                        clearInterval(btnInterval);

                        _sendBtn.html('发送');
                        isSeri = false;
                    } else {
                        _sendBtn.removeClass('btn-disable btn-active').addClass('btn-series');
                        var sec = (seriTime / 1000).toFixed(1);

                        _sendBtn.html('连送(' + sec + 'S)');
                        seriTime -= 100;
                    }
                }, 100);
                // console.info('send seri start ----');
                giftStr += '-' + '0' //连送开始
            } else {
                // console.info('send seri----');
                giftStr += '-' + '1'; //正在连送
            }

        } else {
            //不可连送礼物
            // console.info('send  gift once---', id);
            giftStr += '-' + '0'; //不可连送

        }
        //发送礼物，扣除团票成功后发送礼物信息到im
        sendMsg('2', giftStr, function(data) {});

    });
    $('.g-masker').on('click', function() {
        hideGiftActionSheet();
    });


    /* ----------事件绑定--end---------- */

})();