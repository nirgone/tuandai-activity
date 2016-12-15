(function() {
    FastClick.attach(document.body);
    //do your thing.
    $("#descri, .icon-open-arrow").on("click", function(e) {
        var _unfold = $("#descri").attr("data-unfold");
        if(_unfold === "1" ) {
            return;
        }
        $("#descri").html("团贷网的每一个网贷爱心日，感恩团粉的陪伴，支持和信任。在这个特别的日子，我们一同为小微企业助力，一同为彼此加油鼓励，朝着爱心和梦想前行。请在这里留下您宝贵的祝福，让我们共同见证每一个12.18网贷爱心日。");
        $("#descri").attr("data-unfold", 1);
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
        //提交成功操作 -- 一下
        Util.alertCommon({
            content: '<p>提交成功!</p><p class="grey">您提交的留言小编正在急速审核，感谢你的参与！</p>',
            btn: {
                name: '我知道了',
                callback: function() {
                    $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
                }
            },
            closeCallback: function() {
                $("#input_popup").removeClass("slideInUp").addClass("slideOutDown");
            }
        });
    });
})();
