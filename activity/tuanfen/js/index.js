(function() {
    FastClick.attach(document.body);
    //do your thing.


    //地图调用
    var map = new AMap.Map('map', {
        zoom: 17,
        center: [113.757792, 23.015528]
    });

    var content = document.createElement('div');
    content.innerHTML = '团粉会启动仪式';
    content.className = 'addr-txt';

    var content1 = document.createElement('div');
    content1.innerHTML = '巴洛克咖啡';
    content1.className = 'addr-txt1';

    var marker1 = new AMap.Marker({
        position: [113.757792, 23.015528],
        animation: 'AMAP_ANIMATION_DROP',
        title: '团粉会启动仪式地址：巴洛克咖啡(东莞市第一国际汇一城1号裙楼首层1-C114号)',
        map: map
    });

    var marker2 = new AMap.Marker({
        position: [113.757792, 23.015528],
        title: '团粉会启动仪式地址：巴洛克咖啡(东莞市第一国际汇一城1号裙楼首层1-C114号)',
        offset: new AMap.Pixel(-40, 8),
        content: content,
        map: map
    });

    var marker3 = new AMap.Marker({
        position: [113.757792, 23.015528],
        offset: new AMap.Pixel(10, -12),
        content: content1,
        map: map
    });

    $(".f-item").on('click', function() {
        var type = $(this).attr('data-type');
        if (type != "signup") {
            window.location.href = "#" + type;
        } else {
            window.location.href = "./join.html";
        }
    });

    /*//只在app端显示分享按钮
    if (Jsbridge.isNewVersion()) {
        $(".btn-share").show();
    }
    //分享
    $("body").on('click', '.btn-share', function() {
        if (Jsbridge.isCorrectVersion('4.5.0', 1)) {
            Jsbridge.ToAppActivity(1);
        } else {
            Jsbridge.toActivityAppInviteFriend();
        }
    });*/
    


})();