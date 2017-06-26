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
    });
    var roomList;
    var curPage = 1,
        pageSize = 10;
    //加载列表数据
    function loadData(status) {
        curPage = status ? curPage + 1 : 1;
        var start = (curPage - 1) * pageSize,
            end = curPage * 10;
        var temp = '';

        //模拟数据请求
        //在ajax的beforeSend中修改显示loading
        roomList && roomList.isLoading(true);
        setTimeout(function() {
            //数据请求结束，在ajax的complete中隐藏loading
            roomList && roomList.isLoading(false);

            for (var i = start; i < end; i++) {
                var type = Math.floor(Math.random() * 2); //房间类型 0-直播未开始 1-正在直播
                var classStr = '',
                    imgStr = '';
                if (type) {
                    classStr = 'r-row r-live';
                    imgStr = '<div class="r-img"><img src="../images/pic.png"></div>';
                } else {
                    classStr = 'r-row r-rest';
                }
                temp += '<li class="' + classStr + '"><div class="r-det"><div class="avator-cont">' +
                    '<img src="../images/avator.png" class="icon-avator"></div>' +
                    '<div class="r-txt-cont"><span class="r-txt1">小小派</span>' +
                    '<span class="r-txt2">我是集美貌与才华于一身的小派</span></div>' +
                    '<div class="r-btn-cont"><i class="r-btn">直播中</i></div></div>';
                temp += imgStr + '</li>';
            }
            if (curPage == 1) {
                $('#roomList').find('.r-list').html(temp);
            } else {
                $('#roomList').find('.r-list').append(temp);
            }
            if (!roomList) {
                roomList = new List('#roomList', {
                    loadMore: function() {
                        console.info('loadMore-----');
                        // curPage += 1;
                        loadData(1);
                        // list.refresh();
                    },
                    reload: function() {
                        console.info('reload---------');
                        loadData(0);
                    }
                });
            } else {
                var type = curPage > 1 ? '1' : '0';
                roomList.refresh(type);
            }
        }, 1000);


    }
    loadData(0);

})();