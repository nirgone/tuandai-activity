(function() {
    FastClick.attach(document.body);
    window.onload = function() {
        $(".people-sec").show();
    }

    // alert($(window).height());
    var touches = {
        startY: 0,
        currentY: 0,
    }

    //  如果是android，那么屏蔽免责声明
    if (!isIosPlatform()) {
        $(".exonerate").hide();
    }
    //  资源下载完之后，开始
    var audio = $("#media");
    if (audio.length > 0) {
        audio[0].load();
    }

    // 绑定点击参赛按钮，玻璃了碎裂图片和声音出现
    $(".content").on("click", "#enter_btn", function(e) {
        // picture
        $("#glass_broke_sec").show();
        // sound
        audio[0].play();

        setTimeout(function(e) {
            window.location.href = "../html/page2.html";
        }, 2000);
    });

    // 绑定向上滑动查看更多大赛简介内容
    $("#brief_content").on("touchstart", function(e) {
        if (e.originalEvent) e = e.originalEvent;
        touches.startY = touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    });

    // 绑定向上滑动查看更多大赛简介内容
    $("#brief_content").on("touchmove", function(e) {
        // console.log(e);
        if (e.originalEvent) e = e.originalEvent;
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        var _diff = touches.startY - touches.currentY;
        // console.log(_diff);
        if (_diff > 0) {
            $(this).removeClass("ellipsis");
        }
    });

    $(".content").on("click", ".rule", function(e) {
        $("#masker").show();
        $(".rule-sec").show();
    });

    // ------------兑换页面逻辑-----------------------
    var _can_check_number = true;

    function stringToHex(s) {
        var r = '';
        var hexes = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
        for (var i = 0; i < (s.length); i++) {
            r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf]
        }
        return r
    }

    function HexTostring(s) {
        var r = '';
        for (var i = 0; i < s.length; i += 2) {
            var sxx = parseInt(s.substring(i, i + 2), 16);
            r += String.fromCharCode(sxx);
        }
        return r;
    }
    var tdObj = new Object();
    tdObj.key = '#@zstuandaijjmzfc!#';

    function fnStringJM(s) {
        return stringToHex(des(tdObj.key, s, 1, 0));
    }

    function CheckPhoneExist() {
        $("#getPrizeBtn").unbind();

        $("#passwordContentArea").hide();
        $("#codeContentArea").hide();

        var phoneNumber = $("#phone").val();
        if (_can_check_number) {
            $.ajax({
                type: 'POST',
                url: "ajax/ajax.ashx?Action=CheckPhoneExist",
                data: {
                    telno: phoneNumber
                },
                dataType: 'json',
                beforeSend: function() {
                    // console.log(12345);
                    _can_check_number = false;
                },
                success: function(resultdata) {
                    _can_check_number = true;
                    if (resultdata.Status == "1") {
                        $("#passwordContentArea").show();
                        //绑定登录
                        $("#getPrizeBtn").bind("click", function() {
                            LoginGetPrize();
                        });
                    } else {
                        $("#passwordContentArea").show();
                        $("#codeContentArea").show();
                        //绑定注册
                        $("#getPrizeBtn").bind("click", function() {
                            RegisterGetPrize();
                        });
                    }
                },
                error: function(a, b, c) {
                    _can_check_number = true;
                }
            });
        }

    }

    function LoginGetPrize(parameters) {
        $("#getPrizeBtn").unbind();
        var phoneNumber = fnStringJM($("#phone").val().trim());
        var txtPassword = fnStringJM($("#password").val().trim());
        var selfOpenId = "<%=SelfOpenId %>";
        var inviteUserOpenId = "<%=InviteUserOpenId %>";
        var boxCount = 30;
        $.ajax({
            type: 'POST',
            url: "ajax/ajax.ashx?Action=LoginGetPrize",
            data: {
                sUserName: phoneNumber,
                sPassword: txtPassword,
                SelfOpenId: selfOpenId,
                InviteUserOpenId: inviteUserOpenId,
                boxCount: boxCount
            },
            dataType: 'json',
            success: function(resultdata) {

                switch (resultdata.Status.toString()) {
                    case "-1":
                        toast(resultdata.Desc, 3000);
                        break;
                    case "-100":
                        toast("活动未开始", 3000);
                        break;
                    case "-101":
                        toast("活动已结束", 3000);
                        break;
                    case "-102":
                        toast("参数错误", 3000);
                        // alert("参数错误");
                        break;
                    case "-10":
                        toast("账号冻结", 3000);
                        // alert("账号冻结");
                        break;
                    case "-11":
                        toast("因连续输错5次密码，您的账户已被冻结。", 3000);
                        // alert("因连续输错5次密码，您的账户已被冻结。");
                        break;
                    case "0":
                        toast("未达到兑奖拳数", 3000);
                        // alert("未达到兑奖拳数");
                        break;
                    case "1":
                        // alert("兑换成功");
                        // window.location.href = "/weixin/kunlunjue20160320/game.aspx?SelfOpenId=" + selfOpenId + "&inviteUserOpenId=" + inviteUserOpenId;
                        $(".result-tip").show();
                        $(".masker").show();
                        break;
                    case "-88":
                        toast("兑奖失败" + resultdata.Status1 + resultdata.Status2, 3000);
                        // alert("兑奖失败" + resultdata.Status1 + resultdata.Status2);
                        break;
                    default:
                        toast("兑换失败，请稍后重试", 3000);
                        // alert("兑换失败，请稍后重试");
                        break;
                }
                $("#getPrizeBtn").unbind().bind("click", function() {
                    LoginGetPrize();
                });
            },
            error: function(a, b, c) {
                $("#getPrizeBtn").unbind().bind("click", function() {
                    LoginGetPrize();
                });
            }
        });
    }

    function RegisterGetPrize(parameters) {
        $("#getPrizeBtn").unbind();
        var phoneNumber = $("#txtMobileNumber").val().trim();
        var txtPasswor = $("#txtMobileNumber").val().trim();
        var txtValidNumber = $("#txtValidNumber").val().trim();
        var txtCode = $("#txtCode").val().trim();

        $.ajax({
            type: 'POST',
            url: "ajax/ajax.ashx?Action=RegisterGetPrize",
            data: {
                telno: phoneNumber
            },
            dataType: 'json',
            success: function(resultdata) {
                if (resultdata.status == 1) {
                    $("#showPasswordDiv").show();
                    //绑定登录
                    $("#getPrizeBtn").bind("click", function() {
                        LoginGetPrize();
                    });
                } else {
                    $("#showPasswordDiv").show();
                    $("#showRegisterDiv").show();
                    //绑定注册
                    $("#getPrizeBtn").bind("click", function() {
                        RegisterGetPrize();
                    });
                }
            },
            error: function(a, b, c) {}
        });
    }

    function reloadCode(urlString) {
        $("#imgVcode").attr("src", urlString + "?id=" + Math.random());
    }

    function checkPhoneLength(parameters) {

        var phoneNumber = $("#phone").val().trim();
        // alert(phoneNumber.length);
        if (phoneNumber && phoneNumber.length == 11) {
            var patTel = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
            if (patTel.test(phoneNumber)) {
                CheckPhoneExist();
            }
        }
    }

    $("#phone").keyup(function() {
        checkPhoneLength();
    });
    //$("#txtMobileNumber").blur(function () {
    //    checkPhoneLength();
    //});

    // -------------兑换页面逻辑结束--------------------------
    //点击masker和close，所有popup关闭
    $("body").on("click", ".masker,.close,.icon-close", function(e) {
        // $(".rule-sec").hide();
        $(".popup").hide();
        $("#masker").hide();
    });
    $(".bottom-part").on("click", ".bottom-close", function(e) {
        $(".bottom-part").hide();
    });

    // 马上兑奖按钮绑定
    // $(".content").on("click", "#exchange_btn", function(e) {
    //     // 如果未领满50块，那么弹出普通提示
    //     // $(".result-tip").show();
    //     // 如果领满50块，那么弹出爆灯提示
    //     $(".baodeng-tip").show();
    //     $(".masker").show();
    // });

    //弹出邀请好友提示
    $("body").on("click", ".invite-btn", function(e) {
        //隐藏弹窗
        $(".masker,.popup").hide();
        var $inviteDiv = $(".invite");
        if ($inviteDiv.length <= 0) {
            var $inviteDiv = document.createElement("div");
            $inviteDiv.className = 'invite popup';
            $inviteDiv.innerHTML = '<i class="icon-close"></i><p>出拳完毕</p><p>发送给朋友或者分享到朋友圈</p><p>向朋友约战吧！</p>';
            $("body")[0].appendChild($inviteDiv);
        }

        $(".masker").show();
        $(".invite").show();
    });
    // 初始化swiper
    var _swiper_container = $('.swiper-container');
    if (_swiper_container.length > 0) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });

    }

    //点击排行榜胜利的记录打开团宝箱
    $(".chart-sec").on("click",".win>span:nth-child(5)",function(e) {
        window.location.href = "http://m.tuandai.com/Member/UserPrize/Index.aspx";
    });
    //冒泡提示
    function toast(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        $(m).addClass("toast-content");
        m.innerHTML = msg;
        m.style.cssText = "width:70%; min-width:150px; background:#000; opacity:0.5;  color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:18%; left:15%; margin-left:-10px; z-index:999999; font-weight:bold;font-size:16px;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() {
                if ($(".toast-content").size() > 0) {
                    document.body.removeChild(m);
                }
            }, d * 1000);
        }, duration);
    };

    //判断是否是ios平台
    function isIosPlatform() {
        if (navigator.userAgent.match(/(iPad|iPhone)/)) {
            return true;
        } else {
            return false;
        }
    }


})();
