(function() {
    FastClick.attach(document.body);
    var phone,
        $input = $("input"),
        $submitBtn = $("#submit-btn"),
        $contactInfoCon = $('#contact-info-form .contact-info-con'),
        // $inputCode = $('input[name="verification-code"]'),
        nameCheck = false, //姓名验证
        phoneCheck = false,//手机号验证
        contactIndex = 1, //当前填写第几个手机联系人
        rollingIndex = 0, //滚动索引
        isAuthorizeSuccess = true; //是否审核成功

    function checkInput(e) {
        var target = e.target ? $(e.target) : e;
        var targetName = target.attr('name');
        var value = target.val();
        switch(targetName) {
            case 'contact-name': //姓名
                var reg = /^[\u4e00-\u9fa5]{2,}$/;
                nameCheck = reg.test(value) ? true : false;
                break;
            case 'contact-phone': //手机号
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                phoneCheck = reg.test(value) ?　true : false;
                console.log(phoneCheck);
                break;
        }

        (nameCheck && phoneCheck) ? $submitBtn.css('color','#52cc66') : $submitBtn.css('color','#ccc');
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
                case 'contact-name': //姓名
                    if(!nameCheck){
                        Util.toast('请输入完整的姓名');
                    }
                    break;
                case 'contact-phone': //手机号
                    if(!phoneCheck){
                        Util.toast('手机号码格式有误');
                    }
                    break;
            }
        })

        // 提交认证
        $submitBtn.on('click', function() {
            if(nameCheck && phoneCheck){
                $contactInfoCon.hide().eq(contactIndex).show();
                contactIndex++;
                if(contactIndex <= 2){
                    $submitBtn.html('下一步（'+ contactIndex +'/3）').addClass('snd');
                }
                switch(contactIndex) {
                    case 3:
                        $submitBtn.html('提交初审（'+ contactIndex +'/3）').addClass('thd');
                        break;
                    case  4:
                        $('#contact-info-form').hide();
                        $("#authorizing-con").show();
                        rolling($("#rolling-con li"));
                        //请求接口
                        if(isAuthorizeSuccess){
                            $("#authorizing-con").hide();
                            $("#authorizing-success-con").show();
                        }else{
                            $("#authorizing-con").hide();
                            $("#authorizing-fail-con").show();
                        }
                        
                        break;
                }
                $submitBtn.css('color','#ccc');
                nameCheck = phoneCheck = false;
                
            }
        });

        // 下一步
        $("#next-btn").on('click',function(){
            window.location.href = 'uploadForm.html?phone=' + phone;
        })
    }

    function init() {
        phone = Util.getQueryString('phone');
        for (var i = 0; i < 2; i++) {
            checkInput($input.eq(i));   
        }
        bindEvent();
    }
    init();
})();
