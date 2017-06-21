(function() {
    FastClick.attach(document.body);
    var phone,
        $input = $("input"),
        $submitBtn = $("#submit-btn"),
        $inputCode = $('input[name="verification-code"]'),
        passwordCheck = false, //密码验证
        verificationCodeCheck = false,//验证码验证
        verificationCodeType = 'img', //验证码类型为img(图片)或者ms(短信)
        sndverificationCodeCheck = false,//二次验证
        rollingIndex = 0; //滚动索引

    function checkInput(e) {
        var target = e.target ? $(e.target) : e;
        var targetName = target.attr('name');
        var value = target.val();
        switch(targetName) {
            case 'password': //密码
                var reg = /^[A-Za-z0-9_-]+$/;
                passwordCheck = reg.test(value) ? true : false;
                break;
            case 'verification-code': //验证码
                var reg = /^[A-Za-z0-9_-]+$/;
                var code = target.attr('data-code').toUpperCase();
                if(verificationCodeType == 'img'){ //图片验证码
                    verificationCodeCheck = value.toUpperCase() == code ? true : false;
                }else{ //短信验证码
                   verificationCodeCheck = value == code ? true : false;
                }
                break;
        }
        // if(passwordCheck && verificationCodeCheck){
        //     $submitBtn.css('color','#52cc66');
        // }else{
        //     $submitBtn.css('color','#ccc');
        // }
        passwordCheck && verificationCodeCheck ? $submitBtn.css('color','#52cc66') : $submitBtn.css('color','#ccc');
        if($("#authorize-second-form").css("display") == 'block' && verificationCodeCheck){
            $("#start-btn").css('color','#52cc66');
        }else{
            $("#start-btn").css('color','#ccc');
        }
    }
    //认证文字滚动
    function rolling(target){
        setInterval(function(){
            if (rollingIndex < target.length) {
                rollingIndex++;
            }else{
                rollingIndex = 0;
            }

            target.eq(rollingIndex).removeClass('hide').siblings().addClass('hide');
        }, 5000)
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
                case 'password': //密码
                    if(!passwordCheck){
                        Util.toast('请输入服务密码');
                    }
                    break;
                case 'verification-code': //验证码
                    if(!verificationCodeCheck){
                        $inputCode.val() ? Util.toast('验证码错误，请重新输入') : Util.toast('请输入验证码'); 
                    }
                    break;
            }
        })

        // 获取验证码
        $("#verification-code-get").on('click',function (e) {
            $inputCode.attr('data-code','1111');
            if($(this).html() === '获取验证码'){
                Util.toast('验证码已发送到' + phone);
                $(this).html('60s');
                countDown(60000, $(this));
            }else{
            }
        })
        // 提交认证
        $submitBtn.on('click', function() {
            if(passwordCheck && verificationCodeCheck){
                $("#authorize-info-form").hide();
                $("#authorize-second-form").show();
                // 如果是图片验证码
                if(verificationCodeType == 'img'){
                    $("#authorize-second-form .verification-code-img").css('display','inline-block').attr('src','../images/code.png');
                    $inputCode.attr('data-code','a2tf');
                    // $("#verification-code-img img").attr('src','../images/code.png');
                }else{ // 如果是短信验证码
                    $("#authorize-second-form .verification-code-get").css('display','inline-block');
                }
            }
        });
        //开始认证
        $("#start-btn").on('click',function() {
            if(verificationCodeCheck){
                $("#authorize-second-form").hide();
                $("#authorizing-con").show();
                rolling($("#rolling-con li"));
                setTimeout(function(){
                    $("#authorizing-con").hide();
                    $("#authorizing-success-con").show();
                }, 1000)
            }else if(!sndverificationCodeCheck){
                $("#authorize-second-form").hide();
                $("#authorizing-fail-con").show();
            }
        })

        // 下一步
        $("#next-btn").on('click',function(){
            window.location.href = 'contacts.html?phone=' + phone;
        });

        // 运营商授权认证说明
        $("#info-btn").on('click', function(){
            Util.message('');
        })
        
        // 忘记服务密码
        $("#forget-btn").on('click', function(){
            Util.message('');
        })
    }

    function init() {
        phone = Util.getQueryString('phone');
        // 如果是图片验证码
        if(verificationCodeType == 'img'){
            $("#verification-code-img").css('display','inline-block').attr('src','../images/code.png');
            $inputCode.attr('data-code','a2tf');
            // $("#verification-code-img img").attr('src','../images/code.png');
        }else{ // 如果是短信验证码
            $("#verification-code-get").css('display','inline-block');
        }
        for (var i = 0; i < $input.length; i++) {
            checkInput($input.eq(i));   
        }
        bindEvent();
    }
    init();
})();
