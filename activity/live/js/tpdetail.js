(function() {
    FastClick.attach(document.body);
    var curPage = 1,
        pageSize = 10;
    var list;

    //点击索引条件展开/收起查询条件
    $('.det-select').on('click', function() {
        var _target = $(this);
        if (_target.hasClass('show-opt')) {
            _target.removeClass('show-opt');
            $('.det-mask').hide();
        } else {
            _target.addClass('show-opt');
            $('.det-mask').show();
        }
    });
    //点击查询条件
    $('body').on('click', '.opt', function() {
        var _target = $(this);
        var value = _target.attr('data-value'); // 0-全部；1-1个月；2-3个月；3-12个月
        var text = _target.html();
        // console.info(value, text);
        $('.opt').removeClass('active');
        _target.addClass('active');
        $('.det-select').find('span').html(text);
        $('.det-select').removeClass('show-opt');
        $('.det-mask').hide();
        loadData(0);
    });

    function init() {
        //计算查询菜单mask高度
        var maskHeight = $(window).height() - $(".list-wrapper").offset().top;
        $('.det-mask').height(maskHeight);
        loadData(0);
    }
    init();

    //加载列表数据
    function loadData(status) {
        curPage = status ? curPage + 1 : 1;
        var start = (curPage - 1) * pageSize,
            end = curPage * 10;
        var temp = '';
        console.info('curPage------', curPage);

        //模拟数据请求
        //在ajax的beforeSend中修改显示loading
        list && list.isLoading(true);

        //数据请求结束，在ajax的complete中隐藏loading
        list && list.isLoading(false);

        for (var i = start; i < end; i++) {
            var type = Math.floor(Math.random() * 2); //明细类型 0-消费 1-充值
            temp += '<li class="det-row"><div class="dt-first dt-item"><span>团币充值团票</span>';
            if (type === 0) {
                temp += '<span>-30</span>'

            } else if (type === 1) {
                temp += '<span class="txt-orange">+30</span>'
            }
            temp += '</div><div class="dt-second dt-item"><span>2017.04.05  12:38</span>' +
                '<span>剩余团票：770</span> </div></li>';
        }
        if (curPage == 1) {
            $('#list').find('.det-list').html(temp);
        } else {
            $('#list').find('.det-list').append(temp);
        }
        if (!list) {
            list = new List('#list', {
                loadMore: function() {
                    console.info('loadMore-----');
                    // curPage += 1;
                    loadData(1);
                    // list.refresh();
                }
            });
        } else {
            var type = curPage > 1 ? '1' : '0';
            list.refresh(type);

        }
    }
    //跳转到团票充值
    $("#goRecharge").on('click', function() {
        location.href = './tuanpiao.html';
    });


})();