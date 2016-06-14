(function() {
    FastClick.attach(document.body);

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
            })
            .catch(function(error) {
                console.log(error);
            })
            .always(function() {
                // e.target.value = '';
            });
    });

    //删除按钮绑定
    $("#upload_sec").on("click", ".del", function(e) {
    	$(this).parent().remove();
    	$("#upload_input").val("");
    });

})();
