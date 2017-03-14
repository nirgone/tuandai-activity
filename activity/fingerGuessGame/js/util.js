(function() {
    FastClick.attach(document.body);



    //兑换


    /* ==================弹出框==popup================= */
    /*
            options : {
                title: 弹窗框的title,
                icon: 弹窗的图标
                value: 值
                content: 内容
                btns: [{
                    name: 按钮名称
                    callback: function() {}
                }]
            }
        */
    function popup(options) {
        var that = this;
        var _options = {
            "title": "",
            "icon": "icon4",
            "value": "",
            "btns": [{
                "name": "txt2",
                "callback": null
            }],
            "closeCallback": null
        };
        _options = $.extend(_options, options || {});
        var popup = $("<div/>").addClass("popup").addClass("dialog"),
            masker = $("<div/>").addClass("masker"),
            dialog_wrapper = $("<div/>").addClass("popup-wrapper").addClass("dialog-wrapper").attr("data-title", _options.title),
            // popup_close = $("<div/>").addClass("dialog-close"),
            i = $("<i/>").addClass("icon-" + _options.icon).attr("data-value", _options.value),
            btn_group = $("<div/>").addClass("btn-group");

        if (_options.btns.length > 1) {
            var btn1 = $("<div/>").addClass("btn-small").html('<i class="icon-' + _options.btns[1].name + '"></i>');
            var _btn0_class = "sn";
        } else {
            var _btn0_class = "common";
        }

        var btn0 = $("<div/>").addClass("btn-" + _btn0_class).html('<i class="icon-' + _options.btns[0].name + '"></i>');
        btn_group.append(btn0).append(btn1);
        dialog_wrapper.append(i).append(_options.content).append(btn_group);
        popup.append(masker).append(dialog_wrapper);
        $("body").append(popup);
        dialog_wrapper.on("click", ".btn-group>div", function(e) {
            var $target = $(e.currentTarget),
                _index = $target.index(),
                _callback = _options.btns[_index].callback;
            if (_callback) {
                _callback();
            }
            hide(popup);
        });

        // popup_close.on("click", function(e) {
        //     var _closefun = _options.closeCallback;
        //     if(_closefun) {
        //         _closefun();
        //     }
        //     hide(popup);
        // });

        function hide(target) {
            target.remove();
            // enableScrolling();
        }
    }

    //获取更多机会弹窗
    function showPopChance() {
        var _pop_chance = $("#pop_chance");
        if (_pop_chance.length > 0) {
            _pop_chance.show();
            return;
        }

        _pop_chance = $("<div/>").addClass("popup").attr("id", "pop_chance");
        var _temp = '<div class="masker"></div>' +
            '<div class="popup-wrapper chance-wrapper">' +
            '<div class="popup-close popup-btn-close"></div>' +
            '<div class="popup-title">' +
            '<i class="icon-txt3"></i>' +
            '</div>' +
            '<ul class="chance-ul">' +
            '<li>' +
            '<p>通过分享朋友圈可多获得一次游戏机会（最多一次）</p>' +
            '<div class="btn-rect toshare" data-type="4">马上分享</div>' +
            '</li>' +
            '<li>' +
            '<p>邀请人可以任意选择出一手势PK好友，好友打开链接摇一摇，遥出随机手势PK赢者可获得1次游戏机会（最多10次）</p>' +
            '<div class="btn-rect topk" data-type="3">马上PK</div>' +
            '</li>' +
            '<li>' +
            '<p>消耗100团币可兑换1次游戏机会，每月最多兑换5次</p>' +
            '<div class="btn-rect" id="toexchange">兑换机会</div>' +
            '</li>' +
            '</ul>' +
            '</div></div>';
        _pop_chance.html(_temp);
        $("body").append(_pop_chance);

        //显示分享提示
        _pop_chance.on("click", ".toshare", function(e) {
            /* todo 先判断是否登录了 
            -- if（!登录） { 跳去登录}
            -- else 进行以下操作
            */

            _pop_chance.hide();
            var $target = $(e.currentTarget);
            showPopShare($target.attr("data-type"));
        });
        _pop_chance.on("click", ".topk", function(e) {
            /* todo 先判断是否登录了 
            -- if（!登录） { 跳去登录}
            -- else 进行以下操作
            */

            _pop_chance.hide();
            var $target = $(e.currentTarget);
            showPopPk();
        });
        _pop_chance.on("click", "#toexchange", function(e) {
            _pop_chance.hide();
            Util.exchangeDialog("本次兑换将会扣除您100团币", function() {
                //todo ajax 扣除团币，兑换机会
                console.log("todo 扣除团币");
                //结果
                Util.exchangAlert(1, "恭喜你，兑换成功");
            }, null);

        });

        _pop_chance.on("click", ".popup-btn-close", function(e) {
            _pop_chance.hide();
        });
    }
    // 去pk 弹窗
    function showPopPk(selected) {
        var _selected = selected || 1;
        var _pop_pk = $('<div/>').addClass('popup').addClass('popup-pk');
        _temp = '<div class="masker"></div>' +
            '<div class="popup-wrapper">' +
            '<div class="popup-close popup-btn-close"></div>' +
            '<div class="popup-title">' +
            '<i class="icon-txt17"></i>' +
            '</div>' +
            '<ul class="ul-gesture" data-selected="' + _selected + '">' +
            '<li><i class="icon-rock"></i></li>' +
            '<li><i class="icon-scissors"></i></li>' +
            '<li><i class="icon-paper"></i></li>' +
            '</ul>' +
            '<div class="btn-common">' +
            '<i class="icon-txt18"></i>' +
            '</div>' +
            '</div>';
        _pop_pk.html(_temp);
        $("body").append(_pop_pk);
        _pop_pk.on("click", ".ul-gesture li", function (e) {
            _selected = $(this).index() + 1
            $(".ul-gesture").attr("data-selected", _selected);
        });
        _pop_pk.on("click", ".btn-common", function (e) {
            // todo ajax 上传做过的选择 1-- 石头 2-- 剪刀 3-- 布
            // ajax 成功后回调以下代码
            // todo 配置分享的icon和文案
            hide(_pop_pk);
            showPopShare(3);
        });
        _pop_pk.on("click", ".popup-btn-close", function(e) {

            hide(_pop_pk);
        });
        function hide(target) {
            target.remove();
        }
    }
    // 分享弹窗
    function showPopShare(type) {
        var _pop_share = $("<div/>").addClass("popup").attr("id", "pop_share");
        _temp = '<div class="popup popup-share" id="pop_share">' +
            '<div class="masker"></div>' +
            '<i class="icon-share' + type + '" id="icon_share">' +
            '<div class="popup-btn-close"></div>' +
            '</i>' +
            '</div>';
        _pop_share.html(_temp);
        $("body").append(_pop_share);
        _pop_share.on("click", ".popup-btn-close", function(e) {

            hide(_pop_share);
        });

        function hide(target) {
            target.remove();
            // enableScrolling();
        }
    }
    //显示时间到，loader弹窗
    function showLoader() {
        var _pop_loader = $("#pop_chance");
        if (_pop_loader.length > 0) {
            _pop_loader.show();
            return;
        }
        _pop_loader = $("<div/>").addClass("popup").addClass("popup-timeout").attr("id", "pop_timeout");
        _temp = '<div class="masker"></div>' +
            '<i class="icon-timeout"></i>' +
            '<i class="icon-loader"></i>';
        _pop_loader.html(_temp);
        $("body").append(_pop_loader);
    }

    //hide loader 弹窗
    function hideLoader() {
        $("#pop_timeout").hide();
    }

    var util = {
        //兑换更多机会弹窗提示  
        // 类型 0--失败 1--成功
        exchangAlert: function(type, msg, closeFun) {
            var _icon = "icon4",
                _msg = "<p>不好意思</p><p>" + msg + "</p>",
                _btn_name = "txt10";
            if (type === 1) {
                _icon = "icon2",
                    _msg = "<p>" + msg + "</p>",
                    _btn_name = "txt2"
            }
            popup({
                "icon": _icon,
                "content": _msg,
                "btns": [{
                    "name": _btn_name
                }],
                "closeCallback": closeFun
            })
        },

        //兑换更多机会dialog
        // msg: dialog内容， posFun：确定按钮事件，navFun：取消按钮事件
        exchangeDialog: function(msg, posFun, navFun, closeFun) {
            popup({
                "icon": "icon3",
                "content": "<p>" + msg + "</p>",
                "btns": [{
                    "name": "txt9",
                    "callback": navFun
                }, {
                    "name": "txt2",
                    "callback": posFun
                }],
                "closeCallback": closeFun
            })
        },

        //游戏结束结果提示
        // score--分数 type：0--再玩一局（没获奖，有机会），1--获取游戏机会（没获奖，没机会） 2--领取奖品（获奖了）， callback--回调函数
        gameOverTip: function(score, type, callback, closeFun) {
            var _title = "",
                _msg = "",
                _btn_name = "";
            switch (type) {
                case 0:
                    _title = "很遗憾";
                    _msg = "<p>好可惜，本局只得<font class='font-red'>" + score + "分</font></p><p>努力就会有收获，加油</p>";
                    _btn_name = "txt8";
                    break;
                case 1:
                    _title = "很遗憾";
                    _msg = "<p>本局只得<font class='font-red'>" + score + "分</font>，奖品于你擦肩而过</p><p>赢机会再玩起</p>";
                    _btn_name = "txt11";
                    break;
                case 2:
                    _title = "获奖了";
                    _msg = "<p>恭喜您，本局获得了<font class='font-red'>" + score + "分</font></p>";
                    _btn_name = "txt12";
                    break;
            }
            popup({
                "title": _title,
                "icon": "icon1",
                "content": _msg,
                "btns": [{
                    "name": _btn_name,
                    "callback": callback
                }],
                "closeCallback": closeFun
            })
        },

        //显示登录注册
        showLoginDialog: function() {
            popup({
                "title": "领取奖品",
                "icon": "icon7",
                "content": "<p>登录后才能愉快地领取奖品哦</p>",
                "btns": [{
                    "name": "txt16",
                    "callback": function() {
                        console.log("0000");
                    }
                }, {
                    "name": "txt15",
                    "callback": function() {
                        console.log("11111");
                    }
                }]
            })
        },

        //获奖提示
        //type:0--团币 1--红包 value--数值 hasChance--是否还有游戏机会 0:没有 1:有    callback0--第一个按钮回调，callback1--第二个按钮回调
        rewardTip: function(type, value, hasChance, callback0, callback1, closeFun) {
            $("#gift")[0].play();
            var _icon = "icon",
                _msg = "",
                _btn_name = hasChance === 0 ? "txt14" : "txt8";
            switch (type) {
                case 0:
                    _icon += 6;
                    _msg = "<p>恭喜您，获得<font class='font-red'>" + value + "团币</font></p><p class='tips'>（团币可用于平台商品兑换、抽奖等）</p>";
                    break;
                case 1:
                    _icon += 5;
                    _msg = "<p>恭喜您，获得<font class='font-red'>" + value + "元投资红包</font></p>";
                    break;
            }
            popup({
                "title": "获奖了",
                "icon": _icon,
                "value": value,
                "content": _msg,
                "btns": [{
                    "name": "txt13",
                    "callback": callback0
                }, {
                    "name": _btn_name,
                    "callback": callback1
                }],
                "closeCallback": closeFun
            })
        },
        //获取更多机会弹窗
        showPopChance: showPopChance,
        //显示时间到，loader弹窗
        showLoader: showLoader,
        //hide loader弹窗
        hideLoader: hideLoader
    }

    window.Util = util;
})();
