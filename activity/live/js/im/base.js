(function(win) {
    // =---------弹幕-----------
    var Barrage = null;
    var BarrageConstructor = (function() {
        // [弹幕出去字体的宽度， 单位字体的长度, 弹幕间隔]
        var _barrage_offset = 92,
            _barrage_unit = 24,
            _barrage_gap = 80;
        // [屏幕宽度，弹幕运行时间]
        var _barrage_dis = 1330,
            _dura = 8000;
        // 初始延时时间
        var _delay_origin = [850, 0];
        var _line_index = 1;
        // 第一第二行的弹幕数据，延时时间，延时时间相对的起始点
        var _delay_obj = {
            "line1": {
                "delay": _delay_origin[0],
                "ostime": 0,
                "time": 0
            },
            "line2": {
                "delay": _delay_origin[1],
                "ostime": 0,
                "time": 0
            }
        };

        var _queue_run = [];
        var _queue = [];

        var $brg = $("#video_barrage_pane");

        // 创建弹幕dom
        function createBarrageDom(type, brg, className) {

            var _avator = brg.avator;

            var _html = '';
            // 弹幕模版
            _html = '<div class="user-msg-info barrage line' + type + ' ' + className + '" style="animation-delay: ' + (brg.delay / 1000) + 's;-webkit-animation-delay: ' + (brg.delay / 1000) + 's;"> ' +
                '<img src=" ' + _avator + '">' +
                '<div>' + brg.name + '</div>' +
                '<div class="txt-glaucous">' +
                brg.content +
                '</div> ' +
                '</div>';

            return _html;
        }

        // 拿到数据后生成弹幕
        /*
            type : 1--第一行，2--第二行
            barrages: 弹幕数据
            delayOrigin ：原始的延时时间
        */
        function createBarrageLine(barrages, className) {
            // var _delay = delayOrigin;
            console.log("===append 弹幕啦！！！======");
            var _html = ''
            for (var i = 0; i < barrages.length; i++) {
                // 获取较长字符串，用于计算宽度
                var _content = getLongStr(barrages[i].name, barrages[i].content);
                // 计算运行了多少时间之后，能让下一个元素append上去
                var _offset_time = getBarrageDelay(_content);
                _line_index = _line_index === 2 ? 1 : 2;
                // 记录对应的运行时间
                barrages[i].ostime = _offset_time;
                var _obj_temp = _delay_obj['line' + _line_index];
                _obj_temp.delay = _obj_temp.delay + _obj_temp.ostime;
                _obj_temp.ostime = _offset_time;
                _obj_temp.time = new Date().getTime();
                barrages[i].delay = _obj_temp.delay;
                _html += createBarrageDom(_line_index, barrages[i], className);

            }
            $brg.append(_html);
            setTimeout(function() {
                var _doms = $brg.find('.' + className);
                _doms.remove();
                if (_queue.length > 0) {
                    createBarrages()
                }
            }, (_delay_obj.line1.delay > _delay_obj.line2.delay ? _delay_obj.line1.delay : _delay_obj.line2.delay) + _dura);
        }

        // 对比两个字符串，返回比较长的字符串
        function getLongStr(str1, str2) {
            str1 = str1 + "";
            str2 = str2 + "";
            return str1.length > str2.length ? str1 : str2;
        }

        // 获取delay
        function getBarrageDelay(content) {
            var _width = content.length * _barrage_unit + _barrage_offset; // 弹幕宽度
            return (_width + _barrage_gap) / _barrage_dis * 8000;
        }
        // 计算第二次创建弹幕的时间差
        function timegap(delayObj, delayOrigin) {
            // 对应的数组数据，最后一个弹幕的到下一个弹幕的间隔时间， 现在和刚才创建的弹幕的时间差
            var _interval = new Date().getTime() - delayObj.time;
            var _last = delayObj.ostime + delayObj.delay;
            if (_interval >= _last) {
                delayObj.ostime = 0;
                delayObj.delay = delayOrigin;

            } else {
                if (delayObj.time !== 0) {
                    delayObj.delay = delayObj.delay - _interval;
                }
            }

        }

        // 创建弹幕
        function createBarrages() {
            timegap(_delay_obj.line1, _delay_origin[0]);
            timegap(_delay_obj.line2, _delay_origin[1]);
            var _class = 'class' + (new Date()).getTime();

            var _l = $brg.children().length;
            if (_l < 30) {
                createBarrageLine(_queue.splice(0, 30 - _l > 10 ? 10 : 30 - _l), _class);
            }

        }

        var BarrageConstructor = function(barrages) {
            // 初始化 
            console.log(this);
            this.init(barrages);

        }

        BarrageConstructor.prototype = {
            constructor: BarrageConstructor,
            init: function(barrages) {
                _queue = _queue.concat(barrages);
                _queue_run = _queue_run.concat(_queue.splice(0, 30));

                for (var i = 0; i < 3; i++) {
                    if ($brg.children().length < 30) {
                        var _brgs = barrages.slice(i * 10, 10 * (i + 1));
                        if (_brgs.length > 0) {
                            createBarrageLine(_brgs, 'class' + (new Date()).getTime());

                        }
                    }
                }
            },
            getQueueRun: function() {
                return _queue_run;
            },
            pushQueue: function(barrages) {
                _queue = _queue.concat(barrages);
                // pushQueueRun();
                if ($brg.children().length < 30) {
                    console.log("==========进队列啦！！！==========")
                    createBarrages();
                }
            }
        }
        return BarrageConstructor;
    })();
    // =---------弹幕--end---------

    // 显示消息
    function showMsg(msg) {
        console.log('====show===========show========');
        console.log(msg)
        var fromAccount, fromAccountNick, sessType, subType, isSelfSend;
        fromAccount = msg.getFromAccount();
        if (!fromAccount) {
            fromAccount = '';
        }
        fromAccountNick = decodeURIComponent(msg.getFromAccountNick());
        if (!fromAccountNick) {
            fromAccountNick = '未知用户';
        }
        console.log(fromAccountNick);
        // ul = document.getElementById("video_sms_list");

        //解析消息
        //获取会话类型，目前只支持群聊
        //webim.SESSION_TYPE.GROUP-群聊，
        //webim.SESSION_TYPE.C2C-私聊，
        sessType = msg.getSession().type();
        //获取消息子类型
        //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
        //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
        subType = msg.getSubType();

        isSelfSend = msg.getIsSend(); //消息是否为自己发的

        // webim.GROUP_MSG_SUB_TYPE.COMMON: 0, 普通群消息 （我们只用普通群消息）
        // webim.GROUP_MSG_SUB_TYPE.LOVEMSG：1， 群点赞消息,
        // webim.GROUP_MSG_SUB_TYPE.TIP：2， 群提示消息
        // webim.GROUP_MSG_SUB_TYPE.REDPACKET 3: 群红包消息
        if (subType === webim.GROUP_MSG_SUB_TYPE.COMMON) {
            var elems = msg.getElems()
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                if (elem.getType() === webim.MSG_ELEMENT_TYPE.TEXT) {
                    // 获取元素对象
                    var content = elem.getContent().getText();
                    console.log(content)
                    var arr = content.split('|');
                    var text = arr.splice(1).join('');
                    console.log(arr, text);
                    switch (arr[0]) {
                        case 'common':
                            convertMsgCommon(fromAccountNick, text);
                            break;
                        case 'danmu':
                            getProfile([fromAccount], function(data) {
                                console.log("++++++++++++++++++")
                                console.log(data);
                                var _barrage = {
                                    "avator": data[0].Image,
                                    "name": fromAccountNick,
                                    "content": text
                                };
                                if (Barrage) {
                                    Barrage.pushQueue([_barrage]);
                                } else {
                                    Barrage = new BarrageConstructor([_barrage]);
                                }
                            })

                            break;
                        case 'gift':
                            getProfile([fromAccount], function(data) {
                                // console.error('get gift data-----', text, fromAccount, data);
                                var msgArr = text.split('-');
                                var _gift = {
                                    'id': msgArr[0],
                                    'giftType': msgArr[1],
                                    'status': msgArr[2],
                                    'fromAccount': fromAccount,
                                    'avator': data[0].Image,
                                    'username': fromAccountNick,
                                };
                                showGift(_gift);

                            });

                            break;
                    }

                }
            }
        }
    }
    //显示礼物
    // var giftJson = sessionStorage['giftJson'];
    // giftJson = giftJson && JSON.parse(giftJson);
    var giftJson;
    var anitQueue = [], //动画礼物队列
        anitInterval = null, //动画礼物轮询对象
        curAnitIndex = 0; //动画礼物当前显示内容索引

    var curQueue = {}, //当前显示礼物队列
        normalQueue = [], //普通礼物队列
        normalTimeout = null,
        // normalInterval = null, //普通礼物轮询对象
        normalJson = {}, //普通礼物队列（用于计算连送次数）
        curNormalIndex = 0; //普通礼物当前显示内容索引

    function showGift(_gift) {
        if(!giftJson) {
            giftJson = Util.getSessionStorage('giftJson');
        }
        var giftData = giftJson[_gift.id];
        // giftData = Object.assign(giftData, _gift);
        _gift = $.extend(_gift, giftData);

        if (_gift.giftType == 2) {
            //动画礼物
            anitQueue.push(_gift);
            // console.info('curAnitIndex------', curAnitIndex);
            if (anitQueue.length == 1) {
                replaceAnitGift(curAnitIndex, 1);
                anitInterval = setInterval(function() {
                    curAnitIndex++;
                    if (curAnitIndex === anitQueue.length) {
                        // console.info('interval end----------------');
                        clearInterval(anitInterval);
                        curAnitIndex = 0;
                        anitQueue = [];
                        replaceAnitGift(curAnitIndex, 0);
                    } else {
                        replaceAnitGift(curAnitIndex, 1);
                    }
                }, 5000);
            }

        } else {
            var key = _gift.fromAccount + _gift.id;
            // console.error('kkkkkkkkkkk', _gift.status);
            if (_gift.status == 0) {
                //连送开始或者单单次礼物
                _gift.times = 1;
                _gift.key = key;
                normalQueue.push(_gift);
                normalJson[key] = _gift;

                if (Object.keys(curQueue).length < 2) {
                    replaceNormalGift(_gift.fromAccount);
                }
                // normalJson[key] = {
                //     times: 1,
                //     index: normalQueue.length
                // };
                // normalQueue.push(giftData);
                // // console.error('queue-------------', Object.keys(curQueue));
                // if (Object.keys(curQueue).length < 2) {
                //     replaceNormalGift(curNormalIndex, giftData.fromAccount, 1);
                // }
                // //从数组第三个数据开始排队
                // if (normalQueue.length == 2) {
                //     normalInterval = setInterval(function() {
                //         console.error('setInterval--------', curNormalIndex, normalQueue.length);
                //         if (curNormalIndex >= (normalQueue.length + 2)) {
                //             //结束轮询
                //             clearInterval(normalInterval);
                //             curNormalIndex = 0;
                //             normalQueue = [];
                //         } else {
                //             replaceNormalGift(curNormalIndex, giftData.fromAccount, 1);
                //         }

                //     }, 5000);
                // }

            } else {
                //连送礼物
                if (curQueue[key]) {
                    //当前正在显示该礼物则直接在礼物上修改连送次数
                    curQueue[key].times += 1;
                    $('.cur').html('X' + curQueue[key].times);
                    //连送重置5s倒计时
                    clearTimeout(normalTimeout);
                    normalTimeout = setTimeout(function() {
                        replaceNormalGift(_gift.fromAccount);
                    }, 5000);
                } else {
                    //修改正在排队的连送礼物的连送次数
                    if (normalJson[key]) {
                        normalJson[key].times += 1;
                    }
                }
                // console.error(curQueue);
                /*if (curQueue[key]) {
                    //当前正在显示该礼物则直接在礼物上修改连送次数
                    curQueue[key].times += 1;
                    $('.cur').html('X' + curQueue[key].times);
                } else {
                    //修改正在排队的连送礼物的连送次数
                    if (normalJson[key]) {
                        normalJson[key].times += 1;
                    } else {
                        normalJson[key] = {
                            times: 1,
                            index: normalQueue.length
                        };
                    }
                }*/
            }
        }
    }

    function replaceAnitGift(index, type) {
        // console.info('replace============', curAnitIndex, anitQueue.length, anitQueue[curAnitIndex]);
        var temp = '';
        if (type === 1) {
            var item = anitQueue[curAnitIndex];
            if (!item) return;
            temp = '<div class="user-msg-info user-msg-gift">' +
                '<img src="' + item.avator + '">' +
                '<div>' + item.username + '</div>' +
                '<div>送出' + item.presentName + '</div></div>' +
                '<img src="' + item.gifInfo + '" class="img-anit">';
        }
        $('.gift-anit').removeClass('fadeIn').addClass('fadeOut');
        setTimeout(function() {
            $('.gift-anit').html(temp);
            $('.gift-anit').removeClass('fadeOut').addClass('fadeIn')
        }, 500);
    }
    var startTime;

    function replaceNormalGift(fromAccount) {
        var itemArr = normalQueue.splice(0, 1);
        // console.error('itemArr---', itemArr);
        var temp = '';
        var _giftList = $('.gift-normal').find('.user-msg-info');
        var _removeObj = _giftList.eq(0);
        var removeId = fromAccount + _removeObj.attr('data-id');
        if (itemArr.length > 0) {
            var item = itemArr[0];
            //显示新的礼物
            temp = '<div class="user-msg-info user-msg-gift" data-id="' + item.id + '">' +
                '<img src="' + item.avator + '">' +
                '<div>' + item.username + '</div>' +
                '<div>送出' + item.presentName + '</div>' +
                '<i class="img-normal" style="background-image: url(' + item.coverUrl + ')">' +
                '<i class="g-num cur" id="' + item.id + '">X' + item.times + '</i></i></div>';
            $('.g-num').removeClass('cur');
            curQueue[item.key] = item;
            if (_giftList.length == 2) {
                _removeObj.remove();
                delete curQueue[removeId]; //删除当前显示队列的旧数据
            }
            normalTimeout = setTimeout(function() {
                replaceNormalGift(fromAccount);
            }, 5000);
            startTime = new Date().getTime();
            $('.gift-normal').append(temp);

        } else {
            // console.error('delete----', new Date().getTime() - startTime);
            if (_giftList.length > 0) {
                if (new Date().getTime() - startTime >= 5000) {
                    _removeObj.remove();
                    delete curQueue[removeId]; //删除当前显示队列的旧数据
                    normalTimeout = setTimeout(function() {
                        replaceNormalGift(fromAccount);
                    }, 5000);
                }
            } else {
                clearTimeout(normalTimeout);
            }
        }

        /*var temp = '';
        var item = index < normalQueue.length && normalQueue[index];
        var _removeObj = $('.gift-normal').find('.user-msg-info').eq(0);
        var removeId = fromAccount + _removeObj.attr('data-id');
        var key = '';
        console.error('replace-----', index, item);
        if (item) {
            //显示新的礼物
            temp = '<div class="user-msg-info user-msg-gift" data-id="' + item.id + '">' +
                '<img src="' + item.avator + '">' +
                '<div>' + item.username + '</div>' +
                '<div>送出' + item.presentName + '</div>' +
                '<i class="img-normal" style="background-image: url(' + item.coverUrl + ')">' +
                '<i class="g-num cur" id="' + item.id + '">X1</i></i></div>';
            key = fromAccount + item.id;
            // console.error('key-----', key, curQueue);
            $('.g-num').removeClass('cur');
            curQueue[key] = {
                times: 1
            };
            //如果当前正在显示的礼物有两个，则删除第一个
            // console.error('curQueue---', Object.keys(curQueue));
            var curQueueLength = Object.keys(curQueue).length;
            if (curQueueLength > 2) {
                _removeObj.remove();
                delete curQueue[removeId]; //删除当前显示队列的旧数据
            }
            $('.gift-normal').append(temp);
            //当前礼物数量大于1，从1开始递加
            if (normalJson[key] && normalJson[key].times > 1) {
                var timesInterval = setInterval(function() {
                    // console.info(onList, normalJson[key]);
                    if (!curQueue[key] || (curQueue[key].times == normalJson[key].times)) {
                        clearInterval(timesInterval);
                    } else {
                        $("#" + item.id).html('X' + curQueue[key].times);
                        curQueue[key].times += 1;

                    }
                }, 500);
            }
            curNormalIndex++;
        } else {
            //队列轮询结束，删除当前显示的礼物
            _removeObj.remove();
            delete curQueue[removeId]; //删除当前显示队列的旧数据
        }*/


    }

    function convertMsgCommon(nickname, text) {
        var maxDisplayMsgCount = 20;
        var $sms = $('#video_sms_list');
        var $smsList = $sms.children();
        if ($smsList.length == maxDisplayMsgCount) {
            $sms.children(":first").remove();
        }
        $sms.append('<li>' +
            '<span class="txt-yellow">' + nickname + '：</span>' +
            '<span>' + text + '</span>' +
            '</li>');
        $('.video-sms-pane').scrollTop($('.video-sms-pane')[0].scrollHeight);

    }
    //获取用户属性
    function getProfile(accountIds, cb) {
        var tag_list = [
            "Tag_Profile_IM_Nick", //昵称
            "Tag_Profile_IM_Gender", //性别
            "Tag_Profile_IM_AllowType", //加好友方式
            "Tag_Profile_IM_Image" //头像
        ];

        var options = {
            'To_Account': accountIds,
            'TagList': tag_list
        };

        webim.getProfilePortrait(
            options,
            function(resp) {
                var data = [];
                if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
                    webim.Log.info(resp.UserProfileItem);
                    for (var i = 0; i < resp.UserProfileItem.length; i++) {
                        var userProfile = resp.UserProfileItem[i];
                        var toAccount = userProfile.To_Account;
                        var nick, gender, allowType, imageUrl;
                        console.log(userProfile)

                        for (var j = 0; j < userProfile.ProfileItem.length; j++) {
                            var item = userProfile.ProfileItem[j];
                            switch (item.Tag) {
                                case 'Tag_Profile_IM_Nick':
                                    nick = item.Value;
                                    break;
                                case 'Tag_Profile_IM_Gender':
                                    switch (item.Value) {
                                        case 'Gender_Type_Male':
                                            gender = '男';
                                            break;
                                        case 'Gender_Type_Female':
                                            gender = '女';
                                            break;
                                        case 'Gender_Type_Unknown':
                                            gender = '未知';
                                            break;
                                    }
                                    break;
                                case 'Tag_Profile_IM_AllowType':
                                    switch (item.Value) {
                                        case 'AllowType_Type_AllowAny':
                                            allowType = '允许任何人';
                                            break;
                                        case 'AllowType_Type_NeedConfirm':
                                            allowType = '需要确认';
                                            break;
                                        case 'AllowType_Type_DenyAny':
                                            allowType = '拒绝任何人';
                                            break;
                                        default:
                                            allowType = '需要确认';
                                            break;
                                    }
                                    break;
                                case 'Tag_Profile_IM_Image':
                                    imageUrl = item.Value;
                                    break;
                            }
                        }
                        data.push({
                            'To_Account': toAccount,
                            'Nick': webim.Tool.formatText2Html(nick),
                            'Gender': gender,
                            'AllowType': allowType,
                            'Image': imageUrl
                        });
                    }
                    cb && cb(data);
                }
            },
            function(err) {
                webim.Log.info(err.ErrorInfo);
            }
        );
    }



    var base = {
        //监听大群新消息（普通，点赞，提示，红包）
        onBigGroupMsgNotify: function(msgList) {
            console.log(msgList.length);
            for (var i = msgList.length - 1; i >= 0; i--) { //遍历消息，按照时间从后往前
                var msg = msgList[i];
                //console.warn(msg);
                webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
                //显示收到的消息
                showMsg(msg);
            }
        },

        //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
        //newMsgList 为新消息数组，结构为[Msg]
        onMsgNotify: function(newMsgList) {
            var newMsg;
            for (var j in newMsgList) { //遍历新消息
                newMsg = newMsgList[j];
                handlderMsg(newMsg); //处理新消息
            }
        },

        //处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
        handlderMsg: function(msg) {
            var fromAccount, fromAccountNick, sessType, subType, contentHtml;

            fromAccount = msg.getFromAccount();
            if (!fromAccount) {
                fromAccount = '';
            }
            fromAccountNick = msg.getFromAccountNick();
            if (!fromAccountNick) {
                fromAccountNick = fromAccount;
            }

            //解析消息
            //获取会话类型
            //webim.SESSION_TYPE.GROUP-群聊，
            //webim.SESSION_TYPE.C2C-私聊，
            sessType = msg.getSession().type();
            //获取消息子类型
            //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
            //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
            subType = msg.getSubType();

            switch (sessType) {
                case webim.SESSION_TYPE.C2C: //私聊消息
                    switch (subType) {
                        case webim.C2C_MSG_SUB_TYPE.COMMON: //c2c普通消息
                            //业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
                            //或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
                            contentHtml = convertMsgtoHtml(msg);
                            webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
                            //c2c消息一定要调用已读上报接口
                            var opts = {
                                'To_Account': fromAccount, //好友帐号
                                'LastedMsgTime': msg.getTime() //消息时间戳
                            };
                            webim.c2CMsgReaded(opts);
                            alert('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
                            break;
                    }
                    break;
                case webim.SESSION_TYPE.GROUP: //普通群消息，对于直播聊天室场景，不需要作处理
                    break;
            }
        },

        //退出大群
        quitBigGroup: function() {
            var options = {
                'GroupId': avChatRoomId //群id
            };
            webim.quitBigGroup(
                options,
                function(resp) {

                    webim.Log.info('退群成功');
                    $("#video_sms_list").find("li").remove();
                    //webim.Log.error('进入另一个大群:'+avChatRoomId2);
                    //applyJoinBigGroup(avChatRoomId2);//加入大群
                },
                function(err) {
                    alert(err.ErrorInfo);
                }
            );
        },

        //登出
        logout: function() {
            //登出
            webim.logout(
                function(resp) {
                    webim.Log.info('登出成功');
                    loginInfo.identifier = null;
                    loginInfo.userSig = null;
                    $("#video_sms_list").find("li").remove();
                    var indexUrl = window.location.href;
                    var pos = indexUrl.indexOf('?');
                    if (pos >= 0) {
                        indexUrl = indexUrl.substring(0, pos);
                    }
                    window.location.href = indexUrl;
                }
            );
        },

        //设置用户头像属性
        /*
        {
            nickname: 昵称
            headUrl: 用户头像
        }
        */
        setProfilePortrait: function(user) {
            var profile_item = [];
            if (user.nickname) {
                profile_item.push({
                    "Tag": "Tag_Profile_IM_Nick",
                    "Value": user.nickname || ''
                });
            }
            if (user.headerUrl) {
                profile_item.push({
                    'Tag': 'Tag_Profile_IM_Image',
                    'Value': user.headerUrl
                });
            }

            var options = {
                'ProfileItem': profile_item
            };

            webim.setProfilePortrait(
                options,
                function(resp) {
                    webim.Log.info('设置头像成功');
                },
                function(err) {
                    webim.Log.info(err.ErrorInfo);
                }
            );

        },

        //发送消息(普通消息)
        onSendMsg: function(msgtosend, loginInfo, selConfig, cb) {

            if (!loginInfo.identifier) { //未登录
                Util.toast('请重新登陆！');
                // todo 重新登陆操作！
                return;
            }

            // 输入内容
            // var msgtosend = ;
            // if (!selConfig.selToID) {
            //     Util.toast("您还没有进入房间，暂不能聊天或者送礼物");
            //     return;
            // }

            // var msgtosend = $("#send_msg_text").val();
            var msgLen = webim.Tool.getStrBytes(msgtosend);

            if (msgtosend.length < 1) {
                Util.toast("发送的消息不能为空!");
                return;
            }

            // 在我们直播的条件下不会超出
            var maxLen, errInfo;
            if (selConfig.selType == webim.SESSION_TYPE.GROUP) {
                maxLen = webim.MSG_MAX_LENGTH.GROUP;
                errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
            } else {
                maxLen = webim.MSG_MAX_LENGTH.C2C;
                errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
            }
            if (msgLen > maxLen) {
                Util.toast(errInfo);
                return;
            }

            if (!selConfig.selSess) {
                selConfig.selSess = new webim.Session(selConfig.selType, selConfig.selToID, selConfig.selToID, selConfig.selSessHeadUrl, Math.round(new Date().getTime() / 1000));
            }

            var isSend = true; //是否为自己发送
            var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
            var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
            var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
            var subType; //消息子类型
            if (selConfig.selType == webim.SESSION_TYPE.GROUP) {
                //群消息子类型如下：
                //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
                //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
                //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
                //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
                subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

            } else {
                //C2C消息子类型如下：
                //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
                subType = webim.C2C_MSG_SUB_TYPE.COMMON;
            }
            var msg = new webim.Msg(selConfig.selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
            //解析文本和表情
            var expr = /\[[^[\]]{1,3}\]/mg;
            var emotions = msgtosend.match(expr);
            var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
            if (!emotions || emotions.length < 1) {
                text_obj = new webim.Msg.Elem.Text(msgtosend);
                msg.addText(text_obj);
            } else { //有表情

                for (var i = 0; i < emotions.length; i++) {
                    tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
                    if (tmsg) {
                        text_obj = new webim.Msg.Elem.Text(tmsg);
                        msg.addText(text_obj);
                    }
                    emotionIndex = webim.EmotionDataIndexs[emotions[i]];
                    emotion = webim.Emotions[emotionIndex];
                    if (emotion) {
                        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                        msg.addFace(face_obj);
                    } else {
                        text_obj = new webim.Msg.Elem.Text(emotions[i]);
                        msg.addText(text_obj);
                    }
                    restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
                    msgtosend = msgtosend.substring(restMsgIndex);
                }
                if (msgtosend) {
                    text_obj = new webim.Msg.Elem.Text(msgtosend);
                    msg.addText(text_obj);
                }
            }
            webim.sendMsg(msg, function(resp) {
                if (selConfig.selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
                    showMsg(msg);
                }
                webim.Log.info("发消息成功");
                cb && cb();

            }, function(err) {
                webim.Log.error("发消息失败:" + err.ErrorInfo);
                Util.toast("发消息失败:" + err.ErrorInfo);
            });

            // return selConfig.selSess;
        }

    }
    win.Base = base;
})(window)