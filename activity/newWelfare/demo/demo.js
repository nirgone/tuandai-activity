(function() {
    Jsbridge.appLifeHook(); 

    var btn = document.querySelector("#btn");
    // 启用原生选择图片控件，获取缩略图
    btn.addEventListener("click", function(e) {
        // var img_container = document.querySelector("#img_container");
        //         img_container.innerHTML += '<li data-pid="abcdefg-000001" data-pname="avator.jpg" data-porder="0"><img src="./avatar-test.jpg"><i class="icon-close"></i></li>';
        //         return;       
        Jsbridge.exec('getThumbnail', 5, function(data) {
            // alert("获取缩略图成功！");
            console.log(data);
            data = JSON.parse(data);
            if (data.code == 200) {
                var _html = '';
                var _data = data.data;
                for (var i = 0; i < _data.length; i++) {
                    _html += '<li data-pid="' + _data[i].photoID + '" data-pname="' + _data[i].photoName + '" data-porder="' + _data[i].photoOrder + '"><img src="data:img/jpg;base64,' + _data[i].photoContent + '" ><i class="icon-close"></i></li>';
                }
                var img_container = document.querySelector("#img_container");
                img_container.innerHTML += _html;
            } else {
                alert("选择图片出错了！");
            }

        });
    });

    //通知原生上传图片到服务器
    var uploadBtn = document.querySelector("#upload");
    uploadBtn.addEventListener("click", function(e) {
        var imgs = document.querySelectorAll("#img_container li");
        var _array = [];
        for (var i = 0; i < imgs.length; i++) {
            var _obj = {
                "photoID": imgs[i].attributes['data-pid'].nodeValue,
                "photoOrder": imgs[i].attributes['data-porder'].nodeValue,
            };
            _array.push(_obj);
        }
        Jsbridge.exec('uploadPhoto', _array, function(data) {
            data = JSON.parse(data);
            if (data.code == 200) {

                alert('上传成功！');
                alert(data);
            } else {
                alert("上传失败！");
            }
        });
    });
    //保存键值对
    var setValueBtn = document.querySelector("#set_value");
    setValueBtn.addEventListener("click", function(e) {

        Jsbridge.exec('setSharePreference', {
            "key":"test",
            "value":"tuandai"
        }, function(data) {
            data = JSON.parse(data);
            if (data.code == 200) {

                alert('保存成功！');
                console.log(data);
            } else {
                alert('保存失败！');
            }
        });
    });
    //获取键值对
    var getValueBtn = document.querySelector("#get_value");
    getValueBtn.addEventListener("click", function(e) {

        Jsbridge.exec('getSharePreference', {"key": "test"}, function(data) {
            data = JSON.parse(data);
            if (data.code == 200) {

                alert('获取成功！--'+data.data);
            } else {
                alert('获取失败！');
            }
        });
    });
})();