(function() {
    FastClick.attach(document.body);
    var phone,
        $input = $("input"),
        $nextBtn = $("#next-btn"),
        downpaymentCheck = false, //是否上传首付款照片
        entryFormCheck = false; //是否上传报名表照片

    function checkInput(e) {
        
    }
    
    // 事件绑定
    function bindEvent() {
        Util.bindEvent();
        // 上传照片
        $(".upload-btn input").on('click', function(){

            // console.log($(this).parent().parent().find('.delete-btn'));
        })
        $(".delete-btn").on('click', function(e){
            var target = $(e.target);
            target.hide();
            target.siblings('.upload-btn').find('.pic-bg').hide();
        })
        $(".upload-btn input").on('change', function(){
            var that = this,
                name = $(this).attr('name');
            lrz(that.files[0], {
                width: 800
            })
                .then(function (rst) {
                    var img = new Image(),
                        div = document.createElement('div');

                    div.className = 'pic-bg';
                    div.appendChild(img);

                    img.onload = function () {
                        $(that).parent().append(div);
                        $(that).parent().parent().find('.delete-btn').show();
                    };
                    console.log(name);
                    switch(name) {
                        case 'downpayment': //首付款
                            downpaymentCheck = true;
                            break;
                        case 'entry-form': //报名表
                            entryFormCheck = true;
                            break;
                    }
                    img.src = rst.base64;
                    downpaymentCheck && entryFormCheck ? $nextBtn.css('color','#52cc66') : $nextBtn.css('color','#ccc');

                    /*            /!* ==================================================== *!/
                     // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
                     // 其他框架，例如ajax处理formData略有不同，请自行google，baidu。
                     var xhr = new XMLHttpRequest();
                     xhr.open('POST', '/upload');

                     xhr.onload = function () {
                     if (xhr.status === 200) {
                     // 上传成功
                     } else {
                     // 处理其他情况
                     }
                     };

                     xhr.onerror = function () {
                     // 处理错误
                     };

                     // issues #45 提到似乎有兼容性问题,关于progress
                     xhr.upload.onprogress = function (e) {
                     // 上传进度
                     var percentComplete = ((e.loaded / e.total) || 0) * 100;
                     };

                     // 添加参数和触发上传
                     rst.formData.append('a', '我是参数');
                     xhr.send(rst.formData);
                     /!* ==================================================== *!/*/
                    console.log(rst);
                    return rst;
                });
        });


        // 下一步
        $("#next-btn").on('click',function(){
            window.location.href = 'authorize.html?phone=' + phone;
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
