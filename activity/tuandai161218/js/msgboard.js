(function() {
    FastClick.attach(document.body);
	    //do your thing.
	    $("#descri").on("click", ".icon-open-arrow", function(e) {
	    	console.log(1324234);
	    	$("#descri").html("团贷网的每一个网贷爱心日，感恩团粉的陪伴，支持和信任。在这个特别的日子，我们一同为小微企业助力，一同为彼此加油鼓励，朝着爱心和梦想前行。请在这里留下您宝贵的祝福，让我们共同见证每一个12.18网贷爱心日。");
	    });

	    //拉起输入碳层
    $("#to_input").click(function(e) {
        $("#input_popup").removeClass("slideOutDown").addClass("slideInUp");
        $("#input_popup").show();
    });
    $("#input_popup").on("click", ".icon-board-close", function(e) {
        $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
    });
    $("#input_popup").on("click", "#submit", function(e) {
    	var content = $.trim($("#text_input").val());
    	console.log(content);
    	//settimeout模拟ajax请求掩饰，在成功回调里调用settimeout第一个参数——函数体中的关闭弹窗按钮代码
        setTimeout(function(e) {
		$("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
        }, 3000);
    });
})();