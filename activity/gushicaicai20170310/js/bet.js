(function() {
    FastClick.attach(document.body);
    var pageEl = $('.page');
    var dialogEl = $('.dialog');

    var countDownEl = pageEl.find('.countdown'); //倒计时DOM元素
    var startTime = 0; //倒计时开始时间
    var endTime = 0; //倒计时结束时间 
    // var offset = 0; //倒计时修正数
    var count = 0; //倒计秒数
    var leftTime = 0; //倒计时剩余时间
    function initCountDonw(sTime, eTime) { //sTime为倒计时开始时间，eTime为倒计时结束时间
        var now = +new Date();
        startTime = +new Date(sTime);
        endTime = +new Date(eTime);

        if(startTime > now) {  //还没开始
            return;
        } else {
            startTime = now;
        }

        leftTime = Math.round((endTime - startTime) / 1000);
        leftTime > 0 && setTimeout(countDown, 0); //倒计时 大于0
    }

    function countDown() {
        // offset = +new Date() - (startTime + count * 1000);
        var newTime = 1000 /*- offset*/; //修正后的倒计时间隔
        newTime = newTime < 0 ? 0 : newTime
        if (leftTime >= 0) {
            countDownEl.text(timeFormate(leftTime))
            leftTime = leftTime - 1; //剩余倒计时减去1s
            setTimeout(countDown, newTime);
        }
        count++;
    }

    function timeFormate(time) {
        var hours = Math.floor(time / 3600);
        var leave1 = time % (3600); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave1 / 60);
        //计算相差秒数
        var seconds = Math.round(leave1 % 60);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    }

    // 如何获取团币
    pageEl.on('click', '.btn-tbTips', function() {
        dialogEl.find('.dialog-item').removeClass('show');
        dialogEl.find('.dialog-tb-tips').addClass('show');
        dialogEl.addClass('show');
        Util.disableScrolling();
    });

    // 显示规则
    pageEl.on('click', '.btn-rule', function() {
        dialogEl.find('.dialog-item').removeClass('show');
        dialogEl.find('.dialog-rule').addClass('show');
        dialogEl.addClass('show');
        Util.disableScrolling();
    });

    // 关闭弹窗
    dialogEl.on('click', '.btn-confirm, .btn-close, .mask', function() {
        dialogEl.removeClass('show');
        Util.enableScrolling();
    });

    // 跳转至我的记录
    pageEl.on('click', '.btn-record', function() {
        window.location.href = './list.html';
    });

    function initKLine() { //初始化K线图
        var dom = document.getElementById("k_line");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
        var data0 = splitData([
            //        ['1/24', 2320.26,2320.26,2287.3,2362.94],
            //        ['1/25', 2300,2291.3,2288.26,2308.38],
            //        ['1/28', 2295.35,2346.5,2295.35,2346.92],
            //        ['1/29', 2347.22,2358.98,2337.35,2363.8],
            //        ['1/30', 2360.75,2382.48,2347.89,2383.76],
            //        ['1/31', 2383.43,2385.42,2371.23,2391.82],
            //        ['2/1', 2377.41,2419.02,2369.57,2421.15],
            //        ['2/4', 2425.92,2428.15,2417.58,2440.38],
            //        ['2/5', 2411,2433.13,2403.3,2437.42],
            //        ['2/6', 2432.68,2434.48,2427.7,2441.73],
            //        ['2/7', 2430.69,2418.53,2394.22,2433.89],
            //        ['2/8', 2416.62,2432.4,2414.4,2443.03],
            //        ['2/18', 2441.91,2421.56,2415.43,2444.8],
            //        ['2/19', 2420.26,2382.91,2373.53,2427.07],
            //        ['2/20', 2383.49,2397.18,2370.61,2397.94],
            //        ['2/21', 2378.82,2325.95,2309.17,2378.82],
            //        ['2/22', 2322.94,2314.16,2308.76,2330.88],
            //        ['2/25', 2320.62,2325.82,2315.01,2338.78],
            //        ['2/26', 2313.74,2293.34,2289.89,2340.71],
            //        ['2/27', 2297.77,2313.22,2292.03,2324.63],
            //        ['2/28', 2322.32,2365.59,2308.92,2366.16],
            ['3/1', 2364.54, 2359.51, 2330.86, 2369.65],
            ['3/4', 2332.08, 2273.4, 2259.25, 2333.54],
            ['3/5', 2274.81, 2326.31, 2270.1, 2328.14],
            ['3/6', 2333.61, 2347.18, 2321.6, 2351.44],
            ['3/7', 2340.44, 2324.29, 2304.27, 2352.02],
            ['3/8', 2326.42, 2318.61, 2314.59, 2333.67],
            ['3/11', 2314.68, 2310.59, 2296.58, 2320.96],
            ['3/12', 2309.16, 2286.6, 2264.83, 2333.29],
            ['3/13', 2282.17, 2263.97, 2253.25, 2286.33],
            ['3/14', 2255.77, 2270.28, 2253.31, 2276.22],
            ['3/15', 2269.31, 2278.4, 2250, 2312.08],
            ['3/18', 2267.29, 2240.02, 2239.21, 2276.05],
            ['3/19', 2244.26, 2257.43, 2232.02, 2261.31],
            ['3/20', 2257.74, 2317.37, 2257.42, 2317.86],
            ['3/21', 2318.21, 2324.24, 2311.6, 2330.81],
            ['3/22', 2321.4, 2328.28, 2314.97, 2332],
            ['3/25', 2334.74, 2326.72, 2319.91, 2344.89],
            ['3/26', 2318.58, 2297.67, 2281.12, 2319.99],
            ['3/27', 2299.38, 2301.26, 2289, 2323.48],
            ['3/28', 2273.55, 2236.3, 2232.91, 2273.55],
            ['3/29', 2238.49, 2236.62, 2228.81, 2246.87],
            ['3/30', 2229.46, 2234.4, 2227.31, 2243.95],
            ['3/31', 2234.9, 2227.74, 2220.44, 2253.42],
            ['4/1', 2229.46, 2234.4, 2227.31, 2243.95],
            ['4/2', 2234.9, 2227.74, 2220.44, 2253.42],
            ['4/3', 2232.69, 2225.29, 2217.25, 2241.34],
            ['4/8', 2196.24, 2211.59, 2180.67, 2212.59],
            ['4/9', 2215.47, 2225.77, 2215.47, 2234.73],
            ['4/10', 2224.93, 2226.13, 2212.56, 2233.04],
            ['4/11', 2236.98, 2219.55, 2217.26, 2242.48],
            ['4/12', 2218.09, 2206.78, 2204.44, 2226.26],
            ['4/15', 2199.91, 2181.94, 2177.39, 2204.99],
            ['4/16', 2169.63, 2194.85, 2165.78, 2196.43],
            ['4/17', 2195.03, 2193.8, 2178.47, 2197.51],
            ['4/18', 2181.82, 2197.6, 2175.44, 2206.03],
            ['4/19', 2201.12, 2244.64, 2200.58, 2250.11],
            ['4/22', 2236.4, 2242.17, 2232.26, 2245.12],
            ['4/23', 2242.62, 2184.54, 2182.81, 2242.62],
            ['4/24', 2187.35, 2218.32, 2184.11, 2226.12],
            ['4/25', 2213.19, 2199.31, 2191.85, 2224.63],
            ['4/26', 2203.89, 2177.91, 2173.86, 2210.58],
            ['5/2', 2170.78, 2174.12, 2161.14, 2179.65],
            ['5/3', 2179.05, 2205.5, 2179.05, 2222.81],
            ['5/6', 2212.5, 2231.17, 2212.5, 2236.07],
            ['5/7', 2227.86, 2235.57, 2219.44, 2240.26],
            ['5/8', 2242.39, 2246.3, 2235.42, 2255.21],
            ['5/9', 2246.96, 2232.97, 2221.38, 2247.86],
            ['5/10', 2228.82, 2246.83, 2225.81, 2247.67],
            ['5/13', 2247.68, 2241.92, 2231.36, 2250.85],
            ['5/14', 2238.9, 2217.01, 2205.87, 2239.93],
            ['5/15', 2217.09, 2224.8, 2213.58, 2225.19],
            //        ['5/16', 2221.34,2251.81,2210.77,2252.87],
            //        ['5/17', 2249.81,2282.87,2248.41,2288.09],
            //        ['5/20', 2286.33,2299.99,2281.9,2309.39],
            //        ['5/21', 2297.11,2305.11,2290.12,2305.3],
            //        ['5/22', 2303.75,2302.4,2292.43,2314.18],
            //        ['5/23', 2293.81,2275.67,2274.1,2304.95],
            //        ['5/24', 2281.45,2288.53,2270.25,2292.59],
            //        ['5/27', 2286.66,2293.08,2283.94,2301.7],
            //        ['5/28', 2293.4,2321.32,2281.47,2322.1],
            //        ['5/29', 2323.54,2324.02,2321.17,2334.33],
            //        ['5/30', 2316.25,2317.75,2310.49,2325.72],
            //        ['5/31', 2320.74,2300.59,2299.37,2325.53],
            //        ['6/3', 2300.21,2299.25,2294.11,2313.43],
            //        ['6/4', 2297.1,2272.42,2264.76,2297.1],
            //        ['6/5', 2270.71,2270.93,2260.87,2276.86],
            //        ['6/6', 2264.43,2242.11,2240.07,2266.69],
            //        ['6/7', 2242.26,2210.9,2205.07,2250.63],
            //        ['6/13', 2190.1,2148.35,2126.22,2190.1]
        ]);


        function splitData(rawData) {
            var categoryData = [];
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        }

        function calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }

        option = {
            backgroundColor: '#fff',
            tooltip: {
                formatter: function(param) {
                    var param = param[0];
                    return [
                        '日期: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        '开盘: ' + param.data[0] + '<br/>',
                        '收盘: ' + param.data[1] + '<br/>',
                        '最低: ' + param.data[2] + '<br/>',
                        '最高: ' + param.data[3] + '<br/>'
                    ].join('');
                },
                trigger: 'axis',
                extraCssText: 'box-shadow:0px 0px 20px 0px rgb( 234, 234, 234 );',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#fd6040'
                    },
                    animation: false
                },
                padding: [4, 4, 4, 4],
                backgroundColor: 'rgba( 0, 0, 0, 0.7 )',
                textStyle: {
                    fontSize: 11,
                    color: '#fff'
                }
            },
            grid: {
                top: '12%',
                left: '13%',
                right: '5%',
                bottom: '12%'
            },
            xAxis: {
                axisTick: {
                    show: false
                },
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisLabel: { //坐标文字样式设置
                    textStyle: {
                        fontSize: 11,
                        color: '#b4b4b4'
                    }
                },
                axisLine: { //坐标刻度样式设置
                    onZero: false,
                    lineStyle: {
                        width: 1,
                        color: 'rgba(205,203,206,0.4)'
                    }
                }

            },
            yAxis: {
                splitNumber: 3,
                axisTick: {
                    show: false
                },
                scale: true,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: { //坐标文字样式设置
                    margin: 3,
                    textStyle: {
                        fontSize: 11,
                        color: '#b4b4b4'
                    }
                },
                axisLine: { //坐标刻度样式设置
                    lineStyle: {
                        width: 1,
                        color: 'rgba(205,203,206,0.4)'
                    }
                }
            },
            //        dataZoom: [
            //            {
            //                type: 'inside',
            //                start: 50,
            //                end: 100
            //            },
            //            {
            //                show: true,
            //                type: 'slider',
            //                y: '90%',
            //                start: 50,
            //                end: 100
            //            }
            //        ],
            series: [{
                    name: '日K',
                    type: 'candlestick',
                    data: data0.values,
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function(param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        tooltip: {
                            formatter: function(param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        data: [
                            [{
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 8,
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }
                            }, {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 8,
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                }
                            }],
                            //                        {
                            //                            name: 'min line on close',
                            //                            type: 'min',
                            //                            valueDim: 'close'
                            //                        },
                            //                        {
                            //                            name: 'max line on close',
                            //                            type: 'max',
                            //                            valueDim: 'close'
                            //                        }
                        ]
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff4b2a',
                            color0: '#34d097',
                            borderColor: '#ff4b2a',
                            borderColor0: '#34d097'
                        }
                    }
                }, {
                    name: 'MA30',
                    type: 'line',
                    data: calculateMA(30),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    }
                },

            ]
        };


        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }

    // 切换k线图
    /*pageEl.on('click', '.k-line-wrapper .btn', function(e) {
        var currentTarget = $(e.currentTarget);
        if (currentTarget.hasClass('active')) { //如果已经显示该k线图
            return;
        }

        pageEl.find('.k-line-wrapper .btn').removeClass('active');
        currentTarget.addClass('active');
        if (currentTarget.hasClass('btn-day')) { //日k图
            pageEl.find('.k-line-month').removeClass('show');
            pageEl.find('.k-line-day').addClass('show');

        } else if (currentTarget.hasClass('btn-month')) {
            pageEl.find('.k-line-day').removeClass('show');
            pageEl.find('.k-line-month').addClass('show');
        }
    });*/

    // 点击押注
    pageEl.on('click', '.btn-bet', function(e) {
        var currentTarget = $(e.currentTarget);
        var tbNums = 50; //已押团币数量
        var isBetTime = true; //是否为押注时间
        if (!isBetTime) { //未到押注时间
            //UI提示未到押注时间
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-tips').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            return;
        }

        if (tbNums >= 500) {
            Util.toast('您今天已投注500团币，剩余0团币可投（一天最高投注500团币）');
            return;
        } else if (tbNums < 50) {
            Util.toast('啊哦~您的团币不足啦，凑够50团币再来挑战吧！');
            return;
        }

        if (currentTarget.hasClass('bet-up')) { //押上涨
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-up').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            dialogEl.find('.up-range').rangeslider({ //注册滚动条，只会初始化一次
                polyfill: false,

                // Default CSS classes
                rangeClass: 'my-rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: '',
                fillClass: 'up-rangeslider__fill',
                handleClass: 'rangeslider__handle',

                onInit: function() {},

                // Callback function
                onSlide: function(position, value) {},

                // Callback function
                onSlideEnd: function(position, value) { //押的团币数
                    dialogEl.find('.up-range').parents('.dialog-item').find('.tb-num').text(value)
                }
            });
        } else if (currentTarget.hasClass('bet-down')) { //押下跌
            dialogEl.find('.dialog-item').removeClass('show');
            dialogEl.find('.dialog-bet-down').addClass('show');
            dialogEl.addClass('show');
            Util.disableScrolling();
            dialogEl.find('.down-range').rangeslider({ //注册滚动条，只会初始化一次
                polyfill: false,

                // Default CSS classes
                rangeClass: 'my-rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: '',
                fillClass: 'down-rangeslider__fill',
                handleClass: 'rangeslider__handle',

                onInit: function() {},

                // Callback function
                onSlide: function(position, value) {},

                // Callback function
                onSlideEnd: function(position, value) { //押的团币数
                    dialogEl.find('.down-range').parents('.dialog-item').find('.tb-num').text(value)
                }
            });
        }
    });

    // 点击提交押注
    dialogEl.on('click', '.btn-submit', function(e) {
        var currentTarget = $(e.currentTarget);
        var parentTarget = currentTarget.parents('.dialog-item');
        var tbNum = parentTarget.find('.tb-num').text();

        if (+tbNum < 50) { //最低押注50个团币
            Util.toast('亲，最低要押注50个团币哦~');
            return;
        }

        if (parentTarget.hasClass('dialog-bet-up')) { //押上涨
            console.log('您押涨' + tbNum + '团币')
        } else if (parentTarget.hasClass('dialog-bet-down')) { //押下跌
            console.log('您押跌' + tbNum + '团币')
        }

        var canSubmit = false; //是否能提交
        if (!canSubmit) {
            // TODO:xxx为变化值
            Util.toast('您今天已投注XXX团币，剩余XXX团币可投（一天最高投注500团币）');
            return;
        }

        // 关闭弹窗
        dialogEl.removeClass('show');
        Util.enableScrolling();
    });

        
    initCountDonw('2017/04/05 14:40:00','2017/04/05 15:00:00');
    initKLine();
})();