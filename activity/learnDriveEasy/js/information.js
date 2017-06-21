(function() {
    FastClick.attach(document.body);
    var phone,
        $input = $("input"),
        $nextBtn = $("#next-btn"),
        nameCheck = false, //名字验证
        identityCheck = false, //身份证验证
        addressCheck = false; //居住地址验证
    function checkInput(e) {
        var target = e.target ? $(e.target) : e;
        var targetName = target.attr('name');
        var value = target.val();
        switch(targetName) {
            case 'name': //姓名
                var reg = /^[\u4e00-\u9fa5]{2,}$/;
                if(reg.test(value)){
                    nameCheck = true;
                }else{
                    nameCheck = false;
                }
                break;
            case 'identity': //身份证
                var reg = /^\d{17}[\d|x]|\d{15}$/;
                if(reg.test(value)){
                    console.log('身份证号匹配成功');
                    identityCheck = true;
                }else{
                    console.log('身份证号格式不符');
                    identityCheck = false;
                }
                break;
            case 'address': //居住地址
                var reg = /^[A-Za-z0-9_()（）\#\-\u4e00-\u9fa5]{10,}$/;
                if(reg.test(value)){
                    addressCheck = true;
                }else{
                    addressCheck = false;
                }
                break;
        }
        if(nameCheck && identityCheck && addressCheck){
            $nextBtn.css('color','#52cc66');
        }else{
            $nextBtn.css('color','#ccc');
        }
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
                case 'name': //姓名
                    if(!nameCheck){
                        Util.toast('请输入完整的姓名');
                    }
                    break;
                case 'identity': //身份证
                    if(!identityCheck){
                        Util.toast('身份证号码格式有误');
                    }
                    break;
                case 'address': //地址
                    if(!addressCheck){
                        Util.toast('请填写完整的居住地址（包含省市区）');
                    }
                    break;
            }
        })
        // 下一步
        $nextBtn.on('click', function() {
            if(nameCheck && identityCheck && addressCheck){
                    window.location.href = 'authorize.html?phone=' + phone;
            }
        });
    }

    function init() {
        phone = Util.getQueryString('phone');
        var myphone=phone.substr(3,4);
        myphone = phone.replace(myphone,"****");
        $("#phone-number").html(myphone);
        for (var i = 0; i < $input.length; i++) {
            checkInput($input.eq(i));   
        }
        bindEvent();
    }
    init();
})();
