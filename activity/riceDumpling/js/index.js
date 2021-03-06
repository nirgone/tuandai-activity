(function() {
    FastClick.attach(document.body);
    var animationCurIndex = 0, //当前动画粽子索引
    	animationFaceCurIndex = [1, 1, 1], //当前脸部表情索引
    	animationFacePreIndex = [1, 1, 1], //上一个脸部表情索引
    	t;
    var isLogin = true; //是否登录
    var chanceNum = 2; //多少次拆棕子的机会
    var coinNum = 500; //拥有团币数量
    var exchangeCoinChance = true; //是否有团币兑换拆棕机会
    function isWeiXin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    function GetQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    // 登录
    function login() {
    	if (Jsbridge.isNewVersion()) {
    	    Jsbridge.toAppLogin();
    	} else {
    	    //web版登录
    	}
    }
    // 分享
    function share(value, e) {
	    e.preventDefault();
	    if (GetQueryString('type') == 'mobileapp') {
	        Jsbridge.toAppActivity(value);
            $(".mask").show();
	    } else {
	        if (isWeiXin()) {
	            $("#share").show();
	        } else {
                Util.toast('打开app即可分享');
	        }
	    }
    }
    // 动画
    function ani(index) {
        var curAni = $("#dumpling-sec .btn-dumpling").eq(index);
        var curFaceAni = $("#dumpling-sec .face").eq(index);
        // 手及对话框动画
        $('.hand').removeClass('rotate');
        $('.dialogue').removeClass('show');
        curAni.find('.hand').addClass('rotate');
        curAni.find('.dialogue').addClass('show');
        // 清除前一个粽子的脸部动画
        clearInterval(t);
        // 脸部表情动画
        t = setInterval(function() {
            curFaceAni.removeClass('face' + animationFacePreIndex[index]);
            curFaceAni.addClass('face' + animationFaceCurIndex[index]);
            animationFacePreIndex[index] = animationFaceCurIndex[index];
            if (animationFaceCurIndex[index] < 2) {
                animationFaceCurIndex[index]++;
            } else {
                animationFaceCurIndex[index] = 1;
            }
            // console.log(curFaceAni);
        }, 200)

        animationCurIndex = index < 2 ? index+1 : 0;

    }
    // 拆棕子抽奖
    function showPrize(index) {
        if (!isLogin) {
            Util.message({
                "message": '想要拆粽子？<br /> 先<span class="em">登录</span>吧！',
                "btn_text": '前往登录',
                callback: function() {
                    login();
                }
            })
            return;
        } else if (chanceNum <= 0) {
            Util.message({
                "message": '拆粽机会已用完<br />获取更多不用慌',
                "btn_text": '获取更多机会',
                callback: function() {
                    // 获取更多机会
                    $("#btn-bottom-sec").addClass("slideInDown");
                }
            })
            return;
        }
        Util.showPrize({
            "dumplingIndex": index, // 1 -- 左边的棕子，2 -- 中间的棕子 3 -- 右边的棕子
            "prizeIndex": 1 // 1 -- 团币 2-ipadair2 3 -- 现金红包 4 -- 超级会员 5 -- 相机
            // "num": '', //团币or现金红包数量
            // "btnOpenCb": null, //openbtn方法回调
            // "btnPrizeCb": null //prizebtn方法回调
        });
        chanceNum--;
        $("#more-chance-num").html(chanceNum);
    }

    function bindEvent() {
    	if(isLogin){
        	$("#more-chance-num").html(chanceNum);
        	$("#more-chance-btn").html('获取更多机会');
        }else{
        	$("#more-chance-num").html('?');
        	$("#more-chance-btn").html('马上查看');
        }

        // 粽子抽奖按钮
        $("#dumpling-sec .btn-dumpling").on('click', function() {
                var index = $(this).attr('data-index');
                showPrize(index);
            })
        // 活动规则
        $("#btn-rules").on('click', function() {
            if (isLogin) {
                $("#rule_sec").show();
            } else {
                login();
            }
        });
        $("#btn-rule-cls").on('click', function() {
            $("#rule_sec").hide();
        });
        $("#btn-rules-detail").on('click', function() {
            $(this).addClass('on').siblings().removeClass('on')
            $("#rule-scroll .award").hide();
            $("#rule-scroll .rules").show();

        })
        $("#btn-award").on('click', function() {
            $(this).addClass('on').siblings().removeClass('on')
            $("#rule-scroll .rules").hide();
            $("#rule-scroll .award").show();
        })
        // 更多机会
        $("#more-chance-btn").on('click', function(e) {
            if (isLogin) {
                $("#btn-bottom-sec").addClass("slideInDown");
            } else {
                login();
            }
        });

        //分享遮罩关闭按钮
        $('#share .share-btn-cls').on('click', function() {
            $("#share").hide();
        });
        // 底部弹出按钮
        $("#btn-bottom-sec").on('click', function() {
            $("#btn-bottom-sec").removeClass('slideInDown');
        })
        $("#btn-bottom-sec .btn-bottom").on('click', function(e) {
            e.stopPropagation();
            var className = $(this).attr('class').replace('btn-bottom ', '');
            switch (className) {
                case 'btn-coin-exchange': //团币兑换
                    if (coinNum < 200 || !exchangeCoinChance) {
                        if (!exchangeCoinChance) { //没有兑换机会
                            Util.message('您已用团币兑换过<span class="light">1</span>次拆粽机会<br />试试别的方法吧')

                        } else { //团币不够
                            Util.message({
                                "message": '花<span class="light">200</span>团币<br />即可兑换<span class="light">1</span>次拆粽机会赢iPad',
                                "btn_style": 'btn-message off',
                                "btn_text": '确认兑换',
                                "tips_text": '您当前共有团币 <span class="light">' + coinNum + '</span> 未达到兑换要求'
                            })

                        }
                        return;
                    }
                    // 有足够团币且有兑换机会
                    Util.message({
                        "message": '花<span class="light">200</span>团币<br />即可兑换<span class="light">1</span>次拆粽机会赢iPad',
                        "btn_text": '确认兑换',
                        "tips_text": '您当前共有团币：<span class="light">' + coinNum + '</span>',
                        callback: function() {
                            console.log('确认兑换');
                            Util.message({
                                "message": '<span class="em big">恭喜,兑换成功</span>',
                                callback: function() {
                                    console.log('确认兑换成功');
                                    chanceNum++;
                                    $("#more-chance-num").html(chanceNum);
                                }
                            })
                        }
                    })
                    exchangeCoinChance = false;
                    break;
                case 'btn-invest': //马上投资
                    Util.message({
                        "message": '活动期间，单笔加入we计划、<br /> 复投宝、安盈计划<br/> 满<span class="light">3000</span>元，即可兑换1次拆粽机会赢iPad（最多可兑<span class="light">3</span>次）',
                        "btn_text": '马上投资',
                        callback: function() {
                            console.log('马上投资按钮回调');
                        }
                    })
                    break;
                case 'btn-invite': //邀请好友
                    Util.message({
                        "message": '活动期间，<br/> 成功邀请<span class="light">1</span>名好友注册并投资（不含体验标），即可获得1次拆粽机会赢iPad（仅限<span class="light">1</span>次）',
                        "btn_text": '马上邀请',
                        callback: function() {
                            console.log('马上邀请按钮回调');
		                    share(21, e);
                        }
                    })
                    break;
            }
        });
    }

    function init() {
        // 动画
        setInterval(function() {
            ani(animationCurIndex);
        }, 2000)

        bindEvent();
    }
    init();
})();
