(function() {
    FastClick.attach(document.body);
    var phone,
        $input = $("input"),
        $nextBtn = $("#next-btn"),
        phoneNumCheck = false,  //手机号验证
        verificationCodeCheck = false, //验证码验证
        isInstalment = false, //申请分期成功
        isFillInformation = false; //是否填写过资料

    function checkInput(e) {
        var target = e.target ? $(e.target) : e;
        var targetName = target.attr('name');
        var value = target.val();
        switch(targetName) {
            case 'phone-number': //手机号
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if(reg.test(value)){
                    console.log('手机号匹配成功');
                    phoneNumCheck = true;
                }else{
                    console.log('手机号格式不符');
                    phoneNumCheck = false;
                }
                break;
            case 'verification-code': //验证码
                var code = target.attr('data-code');
                verificationCodeCheck = value == code ? true : false;
                break;
        }
        if(phoneNumCheck && verificationCodeCheck){
            $nextBtn.css('color','#52cc66');
        }else{
            $nextBtn.css('color','#ccc');
        }
    }
    // 倒计时
    function countDown(time, target) {
        var time = (time-1000)/1000;
        var t = setInterval(function () {
            if(time >= 0){
                target.html(time + 's')
                time--;
            }else{
                clearInterval(t);
                target.html('获取验证码')
            }
        }, 1000)
    }

    // 事件绑定
    function bindEvent() {
        Util.bindEvent();

    	$input.on('input', function(e) {
            checkInput(e);
        })

        $input.on('blur', function(e) {
            checkInput(e);
            var target = $(e.target);
            var targetName = target.attr('name');
            switch(targetName) {
                case 'phone-number': //手机号
                    if(!phoneNumCheck){
                        Util.toast('手机号码格式有误');
                    }
                    break;
                case 'verification-code': //验证码
                    if(!verificationCodeCheck){
                        Util.toast('验证码错误，请重新输入');
                    }
                    break;
            }
        })
        // 获取验证码
        $("#verification-code-get").on('click',function (e) {
            $('input[name="verification-code"]').attr('data-code','1111');
            if(!phoneNumCheck){
                Util.toast('手机号码格式有误');
                return;
            }
            // 手机号码格式正确
            if($(this).html() === '获取验证码'){
                phone = $("input[name='phone-number']").val();
                Util.toast('验证码已发送到' + phone);
                $(this).html('60s');
                countDown(60000, $(this));
            }else{
            }
        })

        // 下一步
        $nextBtn.on('click', function() {
            if(phoneNumCheck && verificationCodeCheck){
                if(isInstalment){ //分期成功过跳转还款页面
                    // window.location.href = '';
                }else{
                    if(isFillInformation){ //填写过资料
                        // 跳到用户上次离开的步骤
                        // window.location.href = '';
                    }else{ //未填写过资料
                        // 跳到申请分期页面
                        // var myphone=phone.substr(3,4);
                        // myphone = phone.replace(myphone,"****");
                        window.location.href = 'information.html?phone=' + phone;
                    }
                }
            }
        });
    }

    function init() {
        for (var i = 0; i < $input.length; i++) {
            checkInput($input.eq(i));   
        }
        bindEvent();
    }
    init();
})();
