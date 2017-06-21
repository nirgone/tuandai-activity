(function() {
    FastClick.attach(document.body);
    // Util.toast('嘘！主播休息中...');

    $('body').on('click', '.r-row', function() {
        if ($(this).hasClass('r-live')) {
            location.href = './broadcastRoom.html';
        } else {
            Util.toast('嘘！主播休息中...');
        }
    });
    Jsbridge.appLifeHook(null, function() {
        Jsbridge.setTitleComponent({
            titleContent: '直播',
            rightbuttonVisible: false,
            rightbuttonContent: '分享',
            rightbuttonTyppe: 1
        });
    }, null, null, null);


    Util.setSessionStorage('USER_INFO', {
        "id": "100033",
        "name": "test1"
    });

    // // 获取im参数
    // Util.Ajax({
    //     "url": "http://10.103.8.188:1021/live/get-im-params",
    //     "data": {
    //         "id": "100033",
    //         "name": "test1"
    //     },
    //     "type": "get",
    //     "dataType": "json",
    //     success: function(data, textStatus, jqXHR) {
    //         console.log(data);
    //         window.sessionStorage['LOGIN_INFO'] = JSON.stringify(data);
    //     },
    //     error: function(e, xhr, type) {

    //     }
    // })

    $("#test").click(function(e) {
        // 获取im参数
        Util.Ajax({
            "url": "http://10.103.8.188:1021/live/get-im-params",
            "data": {
                "id": "100033",
                "name": "test1"
            },
            "type": "get",
            "dataType": "json",
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                window.sessionStorage['LOGIN_INFO'] = JSON.stringify(data);
            },
            error: function(e, xhr, type) {

            }
        })
    })

})();