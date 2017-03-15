(function() {
    FastClick.attach(document.body);
    var that = this;
    var pageEl = $('.page');
    var awardListWrapperEl = pageEl.find('#awardListWrapper'); //scroll wrapper
    var myListWrapperEl = pageEl.find('#myListWrapper'); //scroll wrapper
    
    that.awardRecordScroller = null;
    that.myRecordScroller = null;

    that.awardHasMore = true; //开奖记录是否有加载更多
    that.myRecordHasMore = null; //我的记录是否有加载更多

    function initAwardScroller() { //初始化开奖记录列表
        that.isAwardLoadMore = that.isAwardRefresh = false; //是否在加载数据

        that.awardRecordScroller = new IScroll('#awardListWrapper', {
            probeType: 2,
            click: false,
            tap: true,
            disableMouse: true,
            disablePointer: true
        });

        that.awardRecordScroller.on('scroll', function() {
            if (that.isAwardLoadMore || that.isAwardRefresh) { //数据加载中状态，不修改任何状态
                return;
            }
            var distance = Util.pxToPx(80); //拉动距离
            var text = '';
            if (this.y >= -Util.pxToPx(99)) { //提前显示下拉刷新
                if (this.y > distance) {
                    that.awardRicon = true;
                    text = '松开立即刷新';
                } else {
                    that.awardRicon = false;
                    text = '下拉可以刷新';
                }
                that.awardMicon = false;
                awardListWrapperEl.find('.pull-refresh .arrow-wrapper label').text(text);
            } else if (Math.abs(this.y) >= (Math.abs(this.maxScrollY) - distance) && that.awardHasMore) { //加载更多
                that.awardMicon = true;
                that.awardRicon = false;

                // 当高度与iscroll的滑动距离不相等的时候，刷新iscroll
                if (this.scroller.offsetHeight != (this.wrapperHeight + Math.abs(this.maxScrollY))) {
                    this.refresh();
                }
            }

        });
    }

    function onAwardListTouchEnd() {
        pageEl.on('touchend', '#awardListWrapper', function() {
            if (that.awardRicon) { //在可以刷新状态
                // 修改界面上状态
                awardListWrapperEl.addClass('refreshing');
                awardListWrapperEl.find('.pull-refresh .pull-wrapper').removeClass('show');
                awardListWrapperEl.find('.pull-refresh .pull-wrapper.loading-wrapper').addClass('show');

                if (that.isAwardRefresh) { //数据加载中状态，不做任何操作
                    return;
                }
                that.isAwardRefresh = true; //数据加载中状态

                // 修改为刷新中状态
                that.awardRicon = false;
                // TODO: 数据下拉刷新中
                console.log('数据刷新中');
                // TODO:加载数据完成调用此方法
                onAwardListLoadDone();


            } else if (that.awardMicon) { //在可以加载更多数据状态
                // 修改界面上状态
                awardListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
                awardListWrapperEl.find('.pull-down .pull-wrapper.loading-wrapper').addClass('show');

                if (that.isAwardLoadMore) { //数据加载中状态，不继续加载数据
                    return;
                }
                that.isAwardLoadMore = true;
                that.awardMicon = false;
                // TODO: 数据上拉加载更多中
                console.log('数据加载更多中');
                // TODO:加载数据完成调用此方法
                onAwardListLoadDone();
            } else if (!that.awardHasMore) { //无更多数据
                awardListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
                awardListWrapperEl.find('.pull-down .show-all').addClass('show');
            }

            setTimeout(function() {
                that.awardRecordScroller && that.awardRecordScroller.refresh();
            }, 200)


        });

    }

    function onAwardListLoadDone() { //开奖记录加载完成
        // 回复状态
        awardListWrapperEl.removeClass('refreshing');
        setTimeout(function() {
            that.isAwardRefresh = false; //去除数据加载中状态
            that.isAwardLoadMore = false; //去除数据加载中状态
            awardListWrapperEl.find('.pull-refresh .pull-wrapper').removeClass('show');
            awardListWrapperEl.find('.pull-refresh .arrow-wrapper').addClass('show');
            that.awardRecordScroller && that.awardRecordScroller.refresh();
        }, 200)

        awardListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
        //数据是否还有加载更多
        var target = that.awardHasMore ? 'loading-wrapper' : 'show-all';
        awardListWrapperEl.find('.pull-down .' + target).addClass('show');
    }


    // 我的记录
    function initMyRecordScroller() { //初始化我的记录记录列表
        that.isMyRecordLoadMore = that.isMyRecordRefresh = false; //是否在加载数据

        that.myRecordScroller = new IScroll('#myListWrapper', {
            probeType: 2,
            click: false,
            tap: true,
            disableMouse: true,
            disablePointer: true
        });

        that.myRecordScroller.on('scroll', function() {
            if (that.isMyRecordLoadMore || that.isMyRecordRefresh) { //数据加载中状态，不修改任何状态
                return;
            }
            var distance = Util.pxToPx(80); //拉动距离
            var text = '';
            if (this.y >= -Util.pxToPx(99)) { //提前显示下拉刷新
                if (this.y > distance) {
                    that.myRecordRicon = true;
                    text = '松开立即刷新';
                } else {
                    that.myRecordRicon = false;
                    text = '下拉可以刷新';
                }
                that.myRecordMicon = false;
                myListWrapperEl.find('.pull-refresh .arrow-wrapper label').text(text);
            } else if (Math.abs(this.y) >= (Math.abs(this.maxScrollY) - distance) && that.myRecordHasMore) { //加载更多
                that.myRecordMicon = true;
                that.myRecordRicon = false;

                // 当高度与iscroll的滑动距离不相等的时候，刷新iscroll
                if (this.scroller.offsetHeight != (this.wrapperHeight + Math.abs(this.maxScrollY))) {
                    this.refresh();
                }
            }

        });
    }

    function onAwardListTouchEnd() {
        pageEl.on('touchend', '#myListWrapper', function() {
            if (that.awardRicon) { //在可以刷新状态
                // 修改界面上状态
                myListWrapperEl.addClass('refreshing');
                myListWrapperEl.find('.pull-refresh .pull-wrapper').removeClass('show');
                myListWrapperEl.find('.pull-refresh .pull-wrapper.loading-wrapper').addClass('show');

                if (that.isMyRecordRefresh) { //数据加载中状态，不做任何操作
                    return;
                }
                that.isMyRecordRefresh = true; //数据加载中状态

                // 修改为刷新中状态
                that.myRecordRicon = false;
                // TODO: 数据下拉刷新中
                console.log('数据刷新中');
                // TODO:加载数据完成调用此方法
                onMyRecordListLoadDone();


            } else if (that.myRecordMicon) { //在可以加载更多数据状态
                // 修改界面上状态
                awardListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
                awardListWrapperEl.find('.pull-down .pull-wrapper.loading-wrapper').addClass('show');

                if (that.isMyRecordLoadMore) { //数据加载中状态，不继续加载数据
                    return;
                }
                that.isMyRecordLoadMore = true;
                that.myRecordMicon = false;
                // TODO: 数据上拉加载更多中
                console.log('数据加载更多中');
                // TODO:加载数据完成调用此方法
                onMyRecordListLoadDone();
            } else if (!that.myRecordHasMore) { //无更多数据
                myListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
                myListWrapperEl.find('.pull-down .show-all').addClass('show');
            }

            setTimeout(function() {
                that.myRecordScroller && that.myRecordScroller.refresh();
            }, 200)


        });

    }

    function onMyRecordListLoadDone() { //开奖记录加载完成
        // 回复状态
        myListWrapperEl.removeClass('refreshing');
        setTimeout(function() {
            that.isMyRecordLoadMore = false; //去除数据加载中状态
            that.isMyRecordLoadMore = false; //去除数据加载中状态
            myListWrapperEl.find('.pull-refresh .pull-wrapper').removeClass('show');
            myListWrapperEl.find('.pull-refresh .arrow-wrapper').addClass('show');
            that.myRecordScroller && that.myRecordScroller.refresh();
        }, 200)

        myListWrapperEl.find('.pull-down .pull-wrapper').removeClass('show');
        //数据是否还有加载更多
        var target = that.myRecordHasMore ? 'loading-wrapper' : 'show-all';
        myListWrapperEl.find('.pull-down .' + target).addClass('show');
    }

    var currentTarget = null;
    pageEl.on('click', '.btn-record', function(e) {
        currentTarget = $(e.currentTarget);
        if (currentTarget.hasClass('active')) { //点击已经在该页面
            return;
        }
        pageEl.find('.btn-record').removeClass('active');
        currentTarget.addClass('active');
        
        // 切换列表
        var target = '';
        var target = currentTarget.hasClass('btn-award-record') ? 'award-record' : 'my-record';

        pageEl.find('.list').removeClass('show');
        pageEl.find('.' + target).addClass('show');
    })


    initAwardScroller();
    onAwardListTouchEnd();
})();