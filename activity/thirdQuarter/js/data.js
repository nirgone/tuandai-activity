(function() {
	var tempArr = [{
		"module": 0,
		"index": 0,
		"temp": '<div class="p1-content page-content"><i class="icon-title"></i><i class="icon-logo-white"></i></div>'
	},{
		'module': 1,
		"index": 1,
		"temp": '<div class="page-bg page-content"><div class="page"><i class="icon-arc-lt"></i><i class="icon-arc-rt"></i><i class="icon-arc-lb"></i><i class="icon-arc-rb"></i><div class="page-title">01 数据总览</div><div class="circle-cont"><i class="icon-clock"><i class="icon-minutes"></i><i class="icon-hours"></i></i></div><div class="data-cont"><span><p id="num1"><i class="icon-rect c-num">4</i></p>年<p id="num2"><i class="icon-rect c-num rect-left" >7</i><i class="icon-rect c-num" >8</i></p>天<p id="num3"><i class="icon-rect c-num rect-left">1</i><i class="icon-rect c-num">4</i></p>小时</span><span class="data-sub-title">安全运营时间</span></div></div></div>'
	},{
		'module': 1,
		'index': 2,
		"temp": '<div class="page-bg page-content"><div class="page"><i class="icon-arc-lt"></i><i class="icon-arc-rt"></i><i class="icon-arc-lb"></i><i class="icon-arc-rb"></i><div class="page-title">01 数据总览</div><div class="circle-cont"><i class="icon-back"></i><i class="icon-back1"></i></div><div class="data-cont s-space"><span><p id="num4"><i class="icon-rect c-num" >1</i><i class="icon-rect c-num" >0</i><i class="icon-rect c-num" >6</i></p>亿<p id="num5"><i class="icon-rect c-num rect-left" >9</i><i class="icon-rect c-num" >0</i><i class="icon-rect c-num" >3</i><i class="icon-rect c-num" >2</i></p>万元</span><span class="data-sub-title">累计交易额</span></div><div class="jy-remark">注：以上数据截至2016年9月30日</div></div></div>'
	},{
		'module': 1,
		"index": 3, 
		"temp": '<div class="page-bg page-content"><div class="page"><i class="icon-arc-lt"></i><i class="icon-arc-rt"></i><i class="icon-arc-lb"></i><i class="icon-arc-rb"></i><div class="page-title">01 数据总览</div><div class="circle-cont"><i class="icon-coin"></i><i class="icon-coin1"></i></div><div class="data-cont s-space"><span><p id="num6"><i class="icon-rect c-num" >1</i><i class="icon-rect c-num" >8</i></p>亿<p id="num7"><i class="icon-rect c-num rect-left" >6</i><i class="icon-rect c-num" >9</i><i class="icon-rect c-num" >0</i><i class="icon-rect c-num" >8</i></p>万元</span><span class="data-sub-title">累计为投资者赚取预期收益</span></div><div class="jy-remark">注：以上数据截至2016年9月30日</div></div></div>'
	},{
		'module': 1,
		"index": 4, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">01 数据总览</div><ul class="zj-cont"><li class="zj-row"><div><i class="icon-item"><i class="icon-peo"></i></i><span class="zj-count"><p id="num-zj1">3650153</p>人</span><span class="zj-comment">累计注册人数</span></div><div><i class="icon-item"><i class="icon-comp"></i></i><span class="zj-count"><p id="num-zj2">6553168</p>笔</span><span class="zj-comment">累计成交笔数</span></div></li><li class="zj-row"><div><i class="icon-item"><i class="icon-safe"></i></i><span class="zj-count"><p id="num-zj3">93650258元</span><span class="zj-comment">风险备付金总额</span></div><div><i class="icon-item"><i class="icon-welffare"></i></i><span class="zj-count"><p id="num-zj4">11.54</p>%</span><span class="zj-comment">平均年化收益率</span></div></li></ul><div class="jy-remark">注：以上数据截至2016年9月30日</div></div></div>'
	},{
		'module': 2,
		"index": 5, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="jye-cont"><span class="white-title-36">第三季度交易额</span><span class="yellow-txt-64 jye-num"><p id="jyeNum1">97</p>亿<p  id="jyeNum2">7686</p>万元</span><div class="jye-incr"><span class="white-txt-24">同比2015年第三季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="jyeNum3">379.55</p>%</span></div><div class="jye-incr"><span class="white-txt-24">环比2016年第二季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="jyeNum4">56.49</p>%</span></div></div><i class="icon-p6-0"></i> </div></div>'
	},{
		'module': 2,
		"index": 6, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="jye-cont"><span class="white-title-36">第三季度为用户赚取预期收益</span><span class="yellow-txt-64 jye-num"><p id="syNum1">5</p>亿<p  id="syNum2">4307</p>万元</span><div class="jye-incr"><span class="white-txt-24">同比2015年第三季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="syNum3">255.60</p>%</span></div><div class="jye-incr"><span class="white-txt-24">环比2016年第二季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="syNum4">61.46</p>%</span></div></div><i class="icon-p6-1"></i></div></div>'
	},{
		'module': 2,
		"index": 7, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="jye-cont"><span class="white-title-36">第三季度新增注册用户人数</span><span class="yellow-txt-64 jye-num"><p>827,<i id="peoNum1">596</i></p>人</span><div class="jye-incr"><span class="white-txt-24">同比2015年第三季度增长</span><span class="yellow-txt-48 jye-incr-num" ><p id="peoNum3">50.58</p>%</span></div><div class="jye-incr"><span class="white-txt-24">环比2016年第二季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="peoNum4">139.78</p>%</span></div></div><i class="icon-p7-0"></i></div></div>'
	},{
		'module': 2,
		"index": 8, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="jye-cont"><span class="white-title-36">第三季度帮助融资的企业和个人</span><span class="yellow-txt-64 jye-num"><p id="rzNum1">27,703</p>个</span><div class="jye-incr"><span class="white-txt-24">同比2015年第三季度增长</span><span class="yellow-txt-48 jye-incr-num"><p id="rzNum3">563.23</p>%</span></div><div class="jye-incr"><span class="white-txt-24">环比2016年第二季度增长</span><span class="yellow-txt-48 jye-incr-num" ><p id="rzNum4">36.99</p>%</span></div></div><i class="icon-p8-0"></i></div></div>'
	},{
		'module': 2,
		"index": 9, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="jye-cont"><span class="white-title-36">第三季度逾期率变动趋势</span><span class="white-txt-24 jye-incr">截至第三季度末逾期率为</span><span class="yellow-txt-100 jye-incr-num"><p id="yqNum">1.20</p>%</span></div><i class="icon-p9-0"></i></div></div>'
	},{
		'module': 2,
		"index": 10, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><span class="white-title-36 fb-title slide-left">第三季度各标的交易额分布</span><i class="icon-p11-0 slide-left"></i><span class="white-title-36 fb-title slide-right">第三季度不同期标的交易额分布</span><i class="icon-p11-1 slide-right"></i> </div></div>'
	},{
		'module': 2,
		"index": 11, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><div class="swiper-container" id="regionSwiper"><div class="swiper-wrapper"><div class="swiper-slide"><i class="icon-region-rs"></i></div><div class="swiper-slide"><i class="icon-regin-tz"></i></div></div></div><div class="r-title-cont"><span class="white-title-36">第三季度投资人数据地域分布</span><div class="region-tabs"><span class="active" data-type="0">投资人数</span><span data-type="1">投资金额</span></div></div></div><span class="txt-page11">（2016年第三季度投资人数地区TOP10）</span></div>'
	},{
		'module': 2,
		"index": 12, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><span class="white-title-36 fb-title slide-left">第三季度投资人性别分布</span><i class="icon-p13-0 slide-left"></i><span class="white-title-36 fb-title slide-right">第三季度投资人年龄分布</span><i class="icon-p13-1 slide-right"></i><div class="jy-remark" id="xbRemoak">注：以上数据为投资金额分布</div></div></div>'
	},{
		'module': 2,
		"index": 13, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">02 数读团贷</div><span class="white-title-36 fb-title slide-left">第三季度用户投资咨询处理情况</span><i class="icon-p14-0 slide-left"></i><span class="white-title-36 fb-title slide-right">第三季度用户日常处理问题构成</span><i class="icon-p14-1 slide-right"></i> </div></div>'
	},{
		'module': 3,
		"index": 14, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">03 运营实录</div><span class="white-title-36 fb-title ">第三季度运营实录</span><i class="icon-p15-0"></i></div></div>'
	},{
		'module': 3,
		"index": 15, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">03 运营实录</div><span class="white-title-36 fb-title ">第三季度运营实录</span><i class="icon-p15-1"></i></div></div>'
	},{
		'module': 4,
		"index": 16, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">04 精彩活动</div><span class="white-title-36 fb-title ">第三季度精彩活动</span><div class="act-cont"><div class="swiper-container" id="actSwiper"><div class="swiper-wrapper"><div class="swiper-slide"><ul class="slide-p16"><li class="act-row"><div><i class="icon-act1"></i><span>4周年庆典</span></div><div><i class="icon-act2"></i><span>APP投资加息0.1%活动</span></div></li><li class="act-row"><div><i class="icon-act3"></i><span>团贷网杯-万人登山大赛</span></div><div><i class="icon-act4"></i><span>新手注册专享好礼全新升级</span></div></li></ul></div><div class="swiper-slide"><ul class="slide-p16"><li class="act-row"><div><i class="icon-act5"></i><span>迎奥活动</span></div><div><i class="icon-act6"></i><span>城市行走计划-亲子月饼DIY活动</span></div></li><li class="act-row"><div><i class="icon-act7"></i><span>邀请有礼重大升级</span></div><div><i class="icon-act8"></i><span>中秋节返现活动</span></div></li></ul></div></div><div class="swiper-pagination" id="actPagination"></div></div></div></div></div>'
	},{
		'module': 5,
		"index": 17, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">05 要事盘点</div><span class="white-title-36 fb-title ">要事盘点-团贷大事记</span><div class="n-cont"><div class="swiper-container" id="tdNewsSwiper"> <div class="swiper-wrapper"><div class="swiper-slide"><div class="n-slide"><div class="n-no">01</div><i class="td-news1"></i><span class="n-title">数十所高校的专家学者到访团贷网</span><span class="n-time">2016.07.03</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">02</div><i class="td-news2"></i><span class="n-title">正好分期成功试运营 团贷网消费金融正式启航</span><span class="n-time">2016.07.21</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">03</div><i class="td-news3"></i><span class="n-title">P2P观察SVIP投资人走访团贷网</span><span class="n-time">2016.07.24</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">04</div><i class="td-news4"></i><span class="n-title">团贷网杯•2016东莞第八届观音山万人登山大赛圆满举行</span><span class="n-time">2016.08.07</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">05</div><i class="td-news5"></i><span class="n-title">团贷网特约第四届东莞金牌理财师大赛十佳理财师新鲜出炉</span><span class="n-time">2016.08.27</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">06</div><i class="td-news6"></i><span class="n-title">广东狮子会一行来访团贷网：感谢大爱付出、扶贫帮困、支持公益</span><span class="n-time">2016.09.07</span></div></div></div><div class="swiper-pagination" id="tdNewsPagination"></div></div></div></div></div>'
	},{
		'module': 5,
		"index": 18, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">05 要事盘点</div><span class="white-title-36 fb-title ">要事盘点-团贷公益</span><div class="n-cont"><div class="swiper-container" id="gyNewsSwiper"><div class="swiper-wrapper"><div class="swiper-slide"><div class="n-slide"><div class="n-no">01</div><i class="gy-news1"></i><span class="n-title">风雨兼程 团贷网爱心助学四川大凉山之行</span><span class="n-time">2016.07.01</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">02</div><i class="gy-news2"></i><span class="n-title">广东互联网金融协会公益助学系列活动之走进乐昌</span><span class="n-time">2016.07.10</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">03</div><i class="gy-news3"></i><span class="n-title">抗战胜利71周年 团贷网赴广西慰问百余名近100岁老兵</span><span class="n-time">2016.08.14</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">04</div><i class="gy-news4"></i><span class="n-title">团贷网爱心服务队走近环卫工人 关爱“城市美容师”</span><span class="n-time">2016.08.28</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">05</div><i class="gy-news5"></i><span class="n-title">昔日留守儿童外出创业 如今回乡给大凉山孩子建学校</span><span class="n-time">2016.09.01</span></div></div> </div><div class="swiper-pagination" id="gyNewsPagination"></div></div></div></div></div>'
	},{
		'module': 5,
		"index": 19, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">05 要事盘点</div><span class="white-title-36 fb-title ">要事盘点-媒体报道</span><div class="n-cont"><div class="swiper-container" id="newsSwiper"><div class="swiper-wrapper"><div class="swiper-slide"><div class="n-slide"><div class="n-no">01</div><i class="icon-news1"></i><span class="n-title">团贷网创始人兼CEO唐军受邀出席LendIt中国峰会并发表主题演讲</span><span class="n-time">2016.07.18</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">02</div><i class="icon-news2"></i><span class="n-title">团贷网参加中国互联网金融协会第二、三期从业机构高管培训</span><span class="n-time">2016.08.04</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">03</div><i class="icon-news3"></i><span class="n-title">团贷网成2016年新三板市场首家宣布盈利网贷平台</span><span class="n-time">2016.08.18</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">04</div><i class="icon-news4"></i><span class="n-title">团贷网交易额突破300亿：不忘初心 感恩有你！</span><span class="n-time">2016.09.04</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">05</div><i class="icon-news5"></i><span class="n-title">团贷网C轮融资公告 宏商光影领投1亿元</span><span class="n-time">2016.09.08</span></div></div><div class="swiper-slide"><div class="n-slide"><div class="n-no">06</div><i class="icon-news6"></i><span class="n-title">团贷网参加2016第三届互联网金融企业社会责任峰会</span><span class="n-time">2016.09.19</span></div></div></div><div class="swiper-pagination" id="newsPagination"></div></div></div></div></div>'
	},{
		'module': 6,
		"index": 20, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">06 荣誉认证</div><span class="white-title-36 fb-title">荣誉认证</span><i class="icon-honor"></i></div></div>'
	},{
		'module': 7,
		"index": 21, 
		"temp": '<div class="page-bg page-content"><div class="page"><div class="page-title">07 团粉寄语</div><span class="white-title-36 fb-title">团粉寄语</span><i class="icon-msg1"></i><i class="icon-msg2"></i><i class="icon-msg3"></i></div></div>'
	},{
		'module': 8,
		'index': 22,
		'temp': '<div class="page-bg page-content"><div class="page l-page"><i class="icon-logo"></i><span class="white-txt-24 l-txt">如果您还想了解团贷网更多的动态信息，请关注我们的<br>微信订阅号、服务号或新浪微博。</span><ul class="ew-cont"><li><i class="icon-wx icon-qrcode" data-type="dyh"></i><span class="ew-txt">微信订阅号</span><span>tuandaiwang</span></li><li><i class="icon-service icon-qrcode" data-type="fwh"></i><span class="ew-txt">微信服务号</span><span>tuandaiservice</span></li><li><i class="icon-weibo icon-qrcode" data-type="wb"></i><span class="ew-txt">新浪微博</span><span>@团贷网</span></li></ul></div></div>'
	}];
	window.tempArr = tempArr;
})();