(function() {
    FastClick.attach(document.body);
    //do your thing.
    $(".entries-sec").on("click", ".entry", function(e) {
        var $target = $(e.currentTarget),
            _type = $target.attr("data-type"); //0--518红包, 1--2888体验金, 2--新手标 ：15%， 3-- 新手标：13%
        switch (_type) {
            case "0":
                window.location.href = "./page518.html";
                break;
            case "1":
                window.location.href = "./page2888.html";
                break;
            case "2":
            	//todo 跳转到新手标 ：15%
                break;
            case "3":
                //todo 跳转到新手标 ：13%
                break;
        }
    });
})();
