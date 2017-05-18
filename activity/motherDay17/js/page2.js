(function() {
    FastClick.attach(document.body);

    var jsonData = {};

    function init() {
        // initOptions('mine');
        // initOptions('mother');
        // initOptions('leave');
        // initOptions('back');
        resetData();

    }

    function resetData() {
        $('.stxt').html(0);
        jsonData = {
            'mine': {
                'min': 0,
                'max': 70
            },
            'mother': {
                'min': 10,
                'max': 80
            },
            'leave': {
                'min': 0,
                'max': 70
            },
            'back': {
                'min': 0,
                'max': 365
            }
        }
    }
    init();

    /*function initOptions(name) {
        var data = jsonData[name];
        var start = data.min,
            end = data.max;
        var temp = '';
        if (start > 0) {
            // $(".stxt[data-name='" + name + "']").html(0);
            temp += '<option value="0" selected>0</option>'
        }

        // $(".stxt[data-name='" + name + "']").html(start);
        for (var i = start; i <= end; i++) {
            // if (i == start && type) {
            //     temp += '<option value="' + i + '" selected>' + i + '</option>';
            // } else {
            //     temp += '<option value="' + i + '">' + i + '</option>'
            // }
            temp += '<option value="' + i + '">' + i + '</option>'
        }
        $("select[name='" + name + "']").html(temp);
    }*/
    /*$("select").on('change', function(e) {
        console.info($(this).parent(), $(this).val());
        var _obj = $(this).parent().find('.stxt');
        // var name = $(this).attr('data-name');
        var name = _obj.attr('data-name');
        var value = $(this).val();
        _obj.html(value);
        if (name === 'mine') {
            jsonData['mother'].min = +value + 10;
            jsonData['leave'].max = +value;
            initOptions('mother');
            initOptions('leave');
        } else if (name === 'mother') {
            jsonData['mine'].max = +value - 10;
            initOptions('mine');
        } else if (name === 'leave') {
            jsonData['mine'].min = +value;
            initOptions('mine');
        }
    });*/
    $('.btn-reset').on('click', function() {
        resetData();
        hideActionSheet();
    });

    $(".btn-start").on('click', function() {
        var data = {};
        data.myAge = $("#myAge").html();
        data.mother = $("#mother").html();
        data.leave = $("#leave").html();
        data.back = $("#back").html();
        console.info(data);
        var bAge = +data.mother - (+data.myAge) - 1;
        var day = (+data.myAge - (+data.leave)) * 365;
        // var comDay = (80 - (+data.mother)) * (+data.back);
        if (bAge > 0 && day >= 0) {

            if (window.sessionStorage) {
                window.sessionStorage['data'] = JSON.stringify(data);
            } else {
                window.mySessionStorage['data'] = JSON.stringify(data);
            }
            window.location.href = './page3.html';
        } else {
            Util.toast('请输入正确数值');
        }
    });

    // $('.opt-list').on('touchend', function() {
    //  var _scrollTop = $(this).scrollTop;

    // });
    $('.stxt').on('click', function() {
        // $('.picker-mask').show();
        var value = $(this).html();
        var name = $(this).attr('data-name');
        showActionSheet(name, value);
    });
    $('.p-masker').on('click', function() {
        // $('.picker-mask').hide();
        hideActionSheet();
    });
    //点击选项
    $('body').on('click', '.opt', function() {
        var name = $(this).attr('data-name');
        var value = $(this).html();
        $('.opt').removeClass('active');
        $(this).addClass('active');
        hideActionSheet();
        $('.stxt[data-name="' + name + '"]').html(value);
        if (name === 'mine') {
            jsonData['mother'].min = +value + 10;
            jsonData['leave'].max = +value;
        } else if (name === 'mother') {
            jsonData['mine'].max = +value - 10;
        } else if (name === 'leave') {
            jsonData['mine'].min = +value;
        }
    });

    function showActionSheet(name, value) {
        var data = jsonData[name];
        var start = data.min,
            end = data.max;
        var temp = '';
        var _scrollTop = 0;
        var optHeight = $('.h-opt').height();
        for (var i = start; i <= end; i++) {
            var classStr = 'opt';
            if (i == value ) {
                classStr += ' active';
                var dis = i - start - 1 < 0 ? 0 : i - start - 1;
                _scrollTop = optHeight * dis;
            }
            temp += '<li class="' + classStr + '" data-name="' + name + '">' + i + '</li>';
        }
        $('.opt-list').html(temp);
        $('.picker-mask').show();
        setTimeout(function() {
            $('.picker-wrapper').addClass('show');
            $('.opt-list')[0].scrollTop = _scrollTop;
        }, 0)
    }

    function hideActionSheet() {
        $('.picker-wrapper').removeClass('show');
        setTimeout(function() {
            $('.picker-mask').hide();
        }, 500);
    }
})();