(function() {
    FastClick.attach(document.body);
    // Util.toast('嘘！主播休息中...');
    //主播信息
    $('.video-info').on('click', function() {
        $('.anchor-info-wrapper').show();
    });
    $('.ai-close, .ai-masker').on('click', function() {
        $('.anchor-info-wrapper').hide();
    });
    // 绑定footer事
    $('#video_discuss_pane').on('click', '.item', function(e) {
        var $target = $(e.currentTarget);
        var _value = $target.attr('data-value');
        if (_value == 5) {
            showTips(1);
        } else {
            var options = {
                "content": "想和主播多点互动？<br>马上下载团贷网APP吧！",
                "btns": [{
                    "name": "确定",
                    "cb": function() {}
                }, {
                    "name": "使用APP",
                    "cb": function() {
                        showTips(0);
                    }
                }]
            }
            Util.popup(options);
        }
    });

    // 直播结束返回首页按钮时间绑定
    $('.live-end').on('click', '.btn', function(e) {
        window.history.back();
    });

    function isWeiXin() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }
    /*
    蒙层提示
    type: 0-提示打开浏览器下载app 1-提示分享  
    */
    function showTips(type) {
        var temp = type ? '<i class="icon-share-txt1"></i>' : '<i class="icon-share-txt2"></i>';
        $('.icon-share').html(temp);
        $('.share-masker').show();
    }
    $('.share-masker').on('click', function() {
        $(this).hide();
    });

    _tpPlayer = new TcPlayer('video-play', {
        // "rtmp": liveUrl.view_url_rmtp,
        // "flv": liveUrl.view_url_flv, //flv的播放地址，腾讯云Web播放器如果发现目前的浏览器是PC浏览器，会主动选择flv链路，因为可以实现更低的延迟
        "m3u8": 'http://8895.liveplay.myqcloud.com/live/8895_100008_5935e4e3.m3u8', //请替换成实际可用的播放地址
        "autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        "coverpic": "",
        "width": "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
        "height": "100%", //视频的显示高度，请尽量使用视频分辨率高度
        "live": true, //必选，设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑
        "controls": "none", //default 显示默认控件，none 不显示控件，system 移动端显示系统控件
        "x5_type": "h5"
    });

    var video = $('#video-play').find('video').get(0);
    enableInlineVideo(video);
    $('body').on('click', '.video-pane-body', function() {
        _tpPlayer.play();
    });
    // var video = $('#video_play').get(0);
    // enableInlineVideo(video);

})();
