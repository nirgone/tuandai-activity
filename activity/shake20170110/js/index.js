(function() {
    FastClick.attach(document.body);
	  var pageContentEl = $(".content");
	   	// 查看规则
	    pageContentEl.on("click", ".btn-rule", function() {
	    	console.log("查看规则")
	        $(".dialog-rule").show();
	        $(".scroll").removeClass("scroll-active");
	    });
})();