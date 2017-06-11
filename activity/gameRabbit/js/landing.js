(function() {
    FastClick.attach(document.body);
    window.onload = function(e) {
        $("#title").show();
    };
    //兑奖结果信息
    var _dialog_info = [{
            "icon": "icon-rabbit-pop2",
            "content": "多谢！油已加满！"
        }, {
            "icon": "icon-rabbit-pop3",
            "content": "油加一次就够啦！"
        }]
        //兑奖按钮
    $("#to_add").bind("click", function(e) {
        showResult(1);
    });
    
   
    // 兑奖结果弹窗 0－－加油成功 1-－已加满
    function showResult(type) {
        var _option = _dialog_info[type];
        popup.dialog({
            "icon": _option.icon,
            "content": _option.content,
            "txt": ["亲手弹一弹", "你也可以赢取哈根达斯哦！"],
            "btns": [{
                "color": "red",
                "txt": "马上去弹",
                "callback": function() {
                    window.location.href = "./index.html";
                }
            }]
        });
    }
    
})();
