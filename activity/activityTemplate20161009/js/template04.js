(function() {
	FastClick.attach(document.body);
	//do your thing.

	var pageEl = $(".page");
	pageEl.on("click", ".item-wrapper", function(e) {
		var currentTarget = $(e.currentTarget);
		var arrowEl =  currentTarget.find(".arrow-icon")
		if(arrowEl.hasClass("down")) {
			arrowEl.removeClass("down")
			currentTarget.find(".label02").removeClass("expand");
		} else {
			arrowEl.addClass("down");
			currentTarget.find(".label02").addClass("expand");
		}



	})
})();