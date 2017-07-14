(function() {
    FastClick.attach(document.body);
    var contentEl = $(".content");
    var nameEl = contentEl.find(".name");	//名字DOM
    var cityEl = contentEl.find(".city");	//城市DOM
    var phoneEl = contentEl.find(".phone");	//手机号码DOM
    contentEl.on("click", ".btn-submit", function() {
    	// TODO: 提交
		console.log("姓名：" + nameEl.val())
		console.log("城市：" + cityEl.val())
		console.log("手机号码：" + phoneEl.val())

    })	
})();