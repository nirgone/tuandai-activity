(function() {
    FastClick.attach(document.body);
    var _img_data = null;

    $("#upload_input").on("change", function(e) {
        var that = this;

        lrz(that.files[0], {

            })
            .then(function(rst) {
                // console.log(rst);
                var _img = '<div class="img-container" style="background-image:url('+rst.base64+')">' +
                    '<i class="del"></i>' +
                    '</div>';
                $("#upload_sec").append(_img);
                _img_data = rst;
                console.log(_img_data);
            })
            .catch(function(error) {
                console.log(error);
            })
            .always(function() {
                // e.target.value = '';
            });
    });

    $("#text_area").on("input",function(e) {
    	var _text = $(this).val().replace(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g, ""); //不允许输入emoji)
    	$(this).val(_text);
    });

    //删除按钮绑定
    $("#upload_sec").on("click", ".del", function(e) {
    	$(this).parent().remove();
    	$("#upload_input").val("");
    });

    //提交按钮
    $("#submit").click(function() {
    	var _text = $("#text_area").val().trim();
    	if(!_text) {
    		// toast("请输入文字！");
            Util.popup('抱歉', '您心里的话爸爸其实很想知道</br>所以，千万不要忘记填写哦！', true, '用心“说”话', function() {
                window.location.href = "./photoList.html?t=" + t + "&s=" + s;
            });
    		return;
    	}
    	if(!_img_data) {
			// toast("请选择图片");
            Util.popup('抱歉', '想为老爸赢礼物，</br>怎能忘记上传他的帅气照！', true, '上传帅照', function() {
                window.location.href = "./photoList.html?t=" + t + "&s=" + s;
            });
			return;
    	} 

    	//todo
    	console.log("上传图片和文字");
    });

    
})();
