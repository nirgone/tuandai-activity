(function() {
    FastClick.attach(document.body);
    // Util.toast('嘘！主播休息中...');

    $('body').on('click', '.r-row', function() {
        if ($(this).hasClass('r-live')) {
            location.href = './broadcastRoom.html';
        } else {
            util.toast('嘘！主播休息中...');
        }
    })

    Util.setSessionStorage('USER_INFO', { "id": "100033", "name": "test1" });

    // 获取im参数
    Util.Ajax({
        "url": "http://10.103.8.188:1021/live/get-im-params.html",
        "data": {
            "id": "100033",
            "name": "test1"
        },
        "type": "get",
        "dataType": "json",
        cbOk: function(data, textStatus, jqXHR) {
            console.log(data);
            window.sessionStorage['LOGIN_INFO'] = JSON.stringify(data);
        },
        cbErr: function(e, xhr, type) {

        }
    })

})();
