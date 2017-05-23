/*--- 引入直播，即时通信相关的js ---*/
// 引入webim sdk
// import webim from './im/sdk/webim';
// import './im/sdk/json2';
// // webim demo js
// import * as base from './im/base';
// import * as groupNotice from './im/group_notice';

// import GiftSheet from './giftSheet';

// 弹幕
// import BarrageConstructor from './barrage';
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
    let _logininfo_str = window.sessionStorage['LOGIN_INFO'];
    let _userinfo_str = window.sessionStorage['USER_INFO'];
    if (!_logininfo_str) {
        Util.toast("没登录哦！！！");
        window.history.back();
    }

    let _login_info = JSON.parse(_logininfo_str);
    let _user_info = JSON.parse(_userinfo_str);
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
    console.log(listeners);

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

                Base.setProfilePortrait({
                    headerUrl: 'http://www.w3school.com.cn/i/eg_bg_04.gif'
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
        // let msgtosend = ;
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
    //初始化礼物列表
    function initGift() {
        //action Sheet礼物数据
        let giftList = [{
            id: 0,
            type: 0,
            name: '赞赞赞',
            price: '1团票',
            iconUrl: "../images/gift-zan.png"
        }, {
            id: 1,
            type: 0,
            name: '爱的小心心',
            price: '5团票',
            iconUrl: '../images/gift-love.png'
        }, {
            id: 2,
            type: 0,
            name: '红包打赏',
            price: '10团票',
            iconUrl: '../images/gift-redpacket.png'
        }, {
            id: 3,
            type: 0,
            name: '小π公仔',
            price: '100团票',
            iconUrl: '../images/gift-pai.png'
        }, {
            id: 4,
            type: 0,
            name: '幸运福袋',
            price: '200团票',
            iconUrl: '../images/gift-pocket.png'
        }, {
            id: 5,
            type: 0,
            name: '鲜花攻势',
            price: '300团票',
            iconUrl: '../images/gift-flower.png'
        }, {
            id: 6,
            type: 1,
            name: '浪漫约会',
            price: '500团票',
            iconUrl: '../images/gift-wine.png'
        }, {
            id: 7,
            type: 1,
            name: '闪闪钻石',
            price: '800团票',
            iconUrl: '../images/gift-diamon.png'
        }, {
            id: 8,
            type: 0,
            name: '赞赞赞',
            price: '1团票',
            iconUrl: "../images/gift-zan.png"
        }, {
            id: 9,
            type: 0,
            name: '爱的小心心',
            price: '5团票',
            iconUrl: '../images/gift-love.png'
        }];
        // giftSheet = new GiftSheet(giftList);

        // let temp = '';
        // let _pageStart = `<div><ul class="g-list">`;
        // let _pageEnd = `</ul></div>`;
        // let len = giftList.length;

        // giftList.forEach((item, index) => {
        //     let _gift = `<li class="g-item" data-type="${item.type}" data-id="${item.id}">
        //                     <div class="g-icon-container"><i class="g-icon" style="background-image: url(${item.iconUrl});"></i></div>
        //                     <span class="txt-green g-txt g-name">${item.name}</span>
        //                     <span class="g-txt g-tp">${item.price}</span>
        //                </li>`;
        //     if (index % 8 === 0) {
        //         temp = temp + _pageStart + _gift
        //     } else if (index % 8 === 7 || index === (len - 1)) {
        //         temp = temp + _gift + _pageEnd;
        //     } else {
        //         temp += _gift
        //     }
        // });
        // $('.g-swipe').append(temp);
        // giftSwipe = Swipe(document.getElementById('giftSlider'), {
        //  continuous: false
        // });

    }


    /* ----------事件绑定------------ */

    // 输入框对应的dom
    // 留言|弹幕的类型， 留言|弹幕的输入框 ， 留言|弹幕的提示
    let [$msgType, $inputMsg, $tipMsg, $tipQuestion, $btnMsg, $btnQuestion] = [$('#msg_type'), $('#textarea_msg'), $("#tip_msg"), $("#tip_question"), $('#send_msg'), $('#send_question')];
    // 礼物初始化
    let giftSheet;
    initGift();
    // 绑定切换按钮事件
    $('#msg_type').on('click', function(e) {
        let $target = $(e.currentTarget);
        // 输入类型 0 -- 留言 1--弹幕
        let _value = $inputMsg.val();
        let _type = $target.attr('data-type');
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
        let $target = $(e.currentTarget);
        let _value = $target.attr('data-value');
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
                break;
            case '4':
                giftSheet.show();
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
        let $target = $(e.currentTarget);
        let _type = $msgType.attr('data-type');
        let _msg = $inputMsg.val();

        if ($target.hasClass('btn-disable')) {
            return;
        }

        if (!selToID) {
            Util.toast("您还没有进入房间，暂不能发送消息");
            $("#popup-input-wrapper").hide();
            return;
        }
        sendMsg(_type, _msg, function() {
            $('#textarea_msg').val('');
            $('.popup-input-wrapper').hide();
        })

        // if (_type === '1') {
        //     Util.Ajax({
        //         "url": API.SEND_BARRAGE,
        //         "data": {
        //             "room_id": avChatRoomId,
        //             "user_id": _user_info.id
        //         },
        //         "type": "post",
        //         "dataType": "json",
        //         cbOk: function(data, textStatus, jqXHR) {
        //          console.log("===========")
        //             console.log(data);
        //             // window.sessionStorage['loginInfo'] = JSON.stringify(data);
        //         },
        //         cbErr: function(e, xhr, type) {

        //         }
        //     })
        // } else {
        //     sendMsg(_type, _msg, function() {
        //         $('#textarea_msg').val('');
        //         $('.popup-input-wrapper').hide();
        //     })

        // }

    });

    // 发送类型 0 -- 留言 1--弹幕 2--礼物
    function tip(type, value) {
        let _count = '';
        let _name = '';
        let [$tip, $btn] = [null, null];
        let _l = (value + "").length;
        switch (type) {
            case '0':
                _name = '留言';
                _count = 50;
                [$tip, $btn] = [$tipMsg, $btnMsg];
                break;
            case '1':
                _name = '弹幕';
                _count = 20;
                [$tip, $btn] = [$tipMsg, $btnMsg];
                break;
            case '2':
                _name = '提问';
                _count = 50;
                [$tip, $btn] = [$tipQuestion, $btnQuestion];
                break;
        }
        if (_l <= 0) {
            $tip.html('');
            $btn.addClass('btn-disable');
        } else if (_l > 0 && _l <= _count) {
            $tip.html('');
            $btn.removeClass('btn-disable');
        } else {
            $tip.html(`超过${_count}字，${_name}将无法发射哦`);
            $btn.addClass('btn-disable');
        }
    }
    // 监听留言/弹幕，提问的输入框
    $('.popup-input-wrapper').on('input', 'textarea', function() {
        if ($(this).prop('comStart')) return; // 中文输入过程中不截断
        let _id = $(this).attr('id');
        let _value = $(this).val();
        let _type = 0;
        if (_id === "textarea_msg") {
            _type = $msgType.attr('data-type');

        } else { // 提问
            _type = "2";
        }

        tip(_type, _value);

        // $
    }).on('compositionstart', function() {
        $(this).prop('comStart', true);
        // console.log('中文输入：开始');
    }).on('compositionend', function() {
        $(this).prop('comStart', false);
        // console.log('中文输入：结束');
    });

    //主播信息
    $('.video-info').on('click', function() {
        $('.anchor-info-wrapper').show();
    });
    $('.ai-close, .ai-masker').on('click', function() {
        $('.anchor-info-wrapper').hide();
    });
    /* ----------事件绑定--end---------- */

})();
