(function() {
	var tempArr = [{
		"module": 0,
		"index": 0,
		"temp": '<div class="fmcont"><i class="icon-cover pic"></i><i class="icon-logo"></i></div>'
	}, {
		"module": 1,
		"index": 1,
		"temp": '<div class="page"> <i class="icon-menu"></i><span class="m-title">数据概览<i class="icon-mi">01</i></span><div class="m-subtitle"><span>交易及用户数据</span></div><i class="icon-page1 ip1-pic1 pic"></i><i class="icon-page1 ip1-pic2 pic"></i><i class="icon-page1 ip1-pic3 pic"></i><i class="icon-page1 ip1-pic4 pic"></i><i class="pno"><i class="pn-txt">01</i></i></div>'
	}, {
		"module": 1,
		"index": 2,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数据概览<i class="icon-mi">01</i></span><div class="m-subtitle"><span>发展概况</span></div><i class="icon-page2 ip2-pic1 pic"></i><i class="icon-page2 ip2-pic2 pic"></i><i class="icon-page2 ip2-pic3 pic"></i><i class="icon-page2 ip2-pic4 pic"></i><i class="pno"><i class="pn-txt">02</i></i></div>'
	}, {
		"module": 1,
		"index": 3,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数据概览<i class="icon-mi">01</i></span><div class="m-subtitle"><span>新增合作机构</span></div> <i class="icon-page3 ip3-pic1 pic"></i><i class="icon-page3 ip3-pic2 pic"></i><i class="pno"><i class="pn-txt">03</i></i></div>'
	}, {
		"module": 1,
		"index": 4,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数据概览<i class="icon-mi">01</i></span><div class="m-subtitle"><span>新增安全保障体系</span></div><i class="icon-page4 ip4-pic1 pic"></i><i class="icon-page4 ip4-pic2 pic"></i><i class="icon-page4 ip4-pic3 pic"></i><i class="pno"><i class="pn-txt">04</i></i></div>'
	}, {
		"module": 2,
		"index": 5,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>上半年交易额及走势情况</span></div><i class="icon-page5 ip5-pic1 pic"></i><i class="icon-page5 ip5-pic2 pic"></i> <div class="line"></div><i class="pno"><i class="pn-txt">05</i></i></div>'
	}, {
		"module": 2,
		"index": 6,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>平均单笔借款金额统计</span></div><i class="icon-page6 ip6-pic1 pic"></i><i class="icon-page6 ip6-pic2 pic"></i><i class="pno"><i class="pn-txt">06</i></i></div>'
	}, {
		"module": 2,
		"index": 7,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>交易数据统计-按期限</span></div><div class="slideInLeft"><div class="p7-txt">2016年上半年成交项目中，6个月以内的产品占比最多。</div><i class="ip7-pic1 pic"></i></div><i class="ip7-pic2 pic"></i><i class="pno"><i class="pn-txt">07</i></i> </div>'
	}, {
		"module": 2,
		"index": 8,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>交易数据统计-按产品类型</span></div><div class="lightSpeedIn"><div class="p7-txt">2016年上半年主要交易产品为资产标和小微企业项目。</div><i class="ip8-pic1 pic"></i></div><i class="ip8-pic2 pic"></i><i class="pno"><i class="pn-txt">08</i></i></div>'
	}, {
		"module": 2,
		"index": 9,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>交易数据统计-按地域</span></div><div ><div class="p7-txt">2016年上半年成交地域分布上，广东省交易金额最多，其次是江苏，北京。</div></div><i class="ip9-pic1 pic"></i><i class="pno"><i class="pn-txt">09</i></i></div>'
	}, {
		"module": 2,
		"index": 10,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>上半年不良贷款统计</span></div><i class="ip10-pic1 pic"></i><i class="ip10-pic2 pic"></i><i class="pno"><i class="pn-txt">10</i></i></div>'
	}, {
		"module": 2,
		"index": 11,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>用户实名统计情况</span></div><i class="ip11-pic1 pic"></i><i class="ip11-pic2 pic"></i><i class="pno"><i class="pn-txt">11</i></i> </div>'
	}, {
		"module": 2,
		"index": 12,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>网站流量情况</span></div> <i class="ip12-pic1 pic"></i><i class="pno"><i class="pn-txt">12</i></i></div>'
	}, {
		"module": 2,
		"index": 13,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>社区互动情况</span></div><i class="ip13-pic1 pic"></i><i class="ip13-pic2 pic"></i><i class="pno"><i class="pn-txt">13</i></i></div>'
	}, {
		"module": 2,
		"index": 14,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>用户分布情况</span></div><i class="ip14-pic1 pic"></i><i class="ip14-pic2 pic"></i><i class="pno"><i class="pn-txt">14</i></i></div>'
	}, {
		"module": 2,
		"index": 15,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>用户活跃时点</span></div><i class="ip15-pic1 pic"></i><i class="ip15-pic2 pic"></i><i class="pno"><i class="pn-txt">15</i></i></div>'
	}, {
		"module": 2,
		"index": 16,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>主动呼出服务情况</span></div><i class="ip16-pic1 pic"></i><i class="ip16-pic2 pic"></i><i class="pno"><i class="pn-txt">16</i></i></div>'
	}, {
		"module": 2,
		"index": 17,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>客户咨询处理情况</span></div><i class="ip17-pic1 pic"></i><i class="pno"><i class="pn-txt">17</i></i></div>'
	}, {
		"module": 2,
		"index": 18,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>客服日常问题处理构成</span></div><i class="ip18-pic1 pic"></i><i class="pno"><i class="pn-txt">18</i></div>'
	}, {
		"module": 2,
		"index": 19,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">数读团贷<i class="icon-mi">02</i></span><div class="m-subtitle"><span>投资用户统计情况</span></div><i class="ip19-pic1 pic"></i><i class="ip19-pic2 pic"></i><i class="pno"><i class="pn-txt">19</i></i></div>'
	}, {
		"module": 3,
		"index": 20,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">运营实录<i class="icon-mi">03</i></span><i class="ip20-pic1 pic"></i><i class="pno"><i class="pn-txt">20</i></i></div>'
	}, {
		"module": 3,
		"index": 21,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">运营实录<i class="icon-mi">03</i></span><i class="ip21-pic1 pic"></i><i class="pno"><i class="pn-txt">21</i></i></div>'
	}, {
		"module": 3,
		"index": 22,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">运营实录<i class="icon-mi">03</i></span><i class="ip22-pic1 pic"></i><i class="pno"><i class="pn-txt">22</i></i></div>'
	}, {
		"module": 4,
		"index": 23,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>官方活动</span></div><i class="ip23-pic1 pic"></i><i class="pno"><i class="pn-txt">23</i></i> </div>'
	}, {
		"module": 4,
		"index": 24,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>官方活动</span></div><i class="ip24-pic1 pic"></i><i class="pno"><i class="pn-txt">24</i></i></div>'
	}, {
		"module": 4,
		"index": 25,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>官方活动</span></div><i class="ip25-pic1 pic"></i><i class="pno"><i class="pn-txt">25</i></i></div>'
	}, {
		"module": 4,
		"index": 26,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>线下活动</span></div><i class="ip26-pic1 pic"></i><i class="ip26-pic2 pic"></i><i class="ip26-pic3 pic"></i><i class="pno"><i class="pn-txt">26</i></i></div>'
	}, {
		"module": 4,
		"index": 27,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>线下活动</span></div><i class="ip27-pic1 pic"></i><i class="ip27-pic2 pic"></i><i class="ip27-pic3 pic"></i><i class="pno"><i class="pn-txt">27</i></i></div>'
	}, {
		"module": 4,
		"index": 28,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">精彩活动<i class="icon-mi">04</i></span><div class="m-subtitle"><span>移动端活动</span></div><div class="am-l am-lt"><i class="ip28-pic1 pic"></i><span class="am-txt">小年送灶神活动</span></div><div class="am-r am-rm"><i class="ip28-pic2 pic"></i><span class="am-txt">元宵猜灯谜活动</span></div><div class="am-l am-lb"><i class="ip28-pic3 pic"></i><span class="am-txt">石头剪刀布 赢了有礼物</span></div><i class="pno"><i class="pn-txt">28</i> </i></div>'
	}, {
		"module": 5,
		"index": 29,
		"temp": ' <div class="page"><i class="icon-menu"></i><span class="m-title">要事盘点<i class="icon-mi">05</i></span><ul class="yp-list"><li class="yp-row"><div><div class="yt-l yt-btn">1月</div></div><div><div class="yt-r yt-btn">2月</div></div></li><li class="yp-row"><div class="yp-rl"><i class="ip29-pic1"></i></div><div><i class="ip29-pic2"></i></div></li></ul><i class="pno"><i class="pn-txt">29</i> </i></div>'
	}, {
		"module": 5,
		"index": 30,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">要事盘点<i class="icon-mi">05</i></span><ul class="yp-list"><li class="yp-row"><div><div class="yt-l yt-btn">3月</div></div><div><div class="yt-r yt-btn">4月</div></div></li><li class="yp-row"><div class="yp-rl"><i class="ip30-pic1"></i></div><div><i class="ip30-pic2"></i></div></li></ul><i class="pno"><i class="pn-txt">30</i></i> </div>',
	}, {
		"module": 5,
		"index": 31,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">要事盘点<i class="icon-mi">05</i></span><ul class="yp-list"><li class="yp-row"><div><div class="yt-l yt-btn">5月</div></div><div><div class="yt-r yt-btn">6月</div></div></li><li class="yp-row"><div class="yp-rl"><i class="ip31-pic1"></i></div><div><i class="ip31-pic2"></i></div></li></ul><i class="pno"><i class="pn-txt">31</i></i></div>',
	}, {
		"module": 6,
		"index": 32,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">荣誉认证<i class="icon-mi">06</i></span><i class="ip32-pic1 pic ip32-pic"></i><i class="pno"><i class="pn-txt">32</i></i></div>',
	}, {
		"module": 6,
		"index": 33,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">荣誉认证<i class="icon-mi">06</i></span><i class="ip33-pic1 pic ip33-pic"></i><i class="pno"><i class="pn-txt">33</i></div>',
	}, {
		"module": 6,
		"index": 34,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">荣誉认证<i class="icon-mi">06</i></span><i class="ip34-pic1 pic ip34-pic"></i><i class="pno"><i class="pn-txt">34</i></i></div>',
	}, {
		"module": 7,
		"index": 35,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">媒体报道<i class="icon-mi">07</i></span><i class="ip35-pic1 pic ip35-pic"></i><i class="ip35-pic2 pic ip35-pic"></i><i class="ip35-pic3 pic ip35-pic"></i><i class="pno"><i class="pn-txt">35</i></i></div>',
	}, {
		"module": 7,
		"index": 36,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">媒体报道<i class="icon-mi">07</i></span><i class="ip36-pic1 pic ip36-pic"></i><i class="ip36-pic2 pic ip36-pic"></i><i class="ip36-pic3 pic ip36-pic"></i><i class="pno"><i class="pn-txt">36</i></i></div>',
	}, {
		"module": 7,
		"index": 37,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">媒体报道<i class="icon-mi">07</i></span><i class="ip37-pic1 pic ip37-pic"></i><i class="ip37-pic2 pic ip37-pic"></i><i class="ip37-pic3 pic ip37-pic"></i><i class="pno"><i class="pn-txt">37</i></i></div>',
	}, {
		"module": 8,
		"index": 38,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">团粉寄语<i class="icon-mi">08</i></span><i class="ip38-pic1 pic ip38-pic"></i><i class="ip38-pic2 pic ip38-pic"></i><i class="pno"><i class="pn-txt">38</i></i></div>',
	}, {
		"module": 8,
		"index": 39,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">团粉寄语<i class="icon-mi">08</i></span><i class="ip39-pic1 pic ip39-pic"></i><i class="ip39-pic2 pic ip39-pic"></i><i class="pno"><i class="pn-txt">39</i></i> </div>',
	}, {
		"module": 8,
		"index": 40,
		"temp": '<div class="page"><i class="icon-menu"></i><span class="m-title">团粉寄语<i class="icon-mi">08</i></span><i class="ip40-pic1 pic ip40-pic"></i><i class="ip40-pic2 pic ip40-pic"></i><i class="pno"><i class="pn-txt">40</i></i></div>',
	}, {
		"module": 9,
		"index": 41,
		"temp": '<div class="lc"><i class="icon-lb pic"></i><span class="l-txt">如果您还想了解团贷网更多的动态信息，请关注我们的微信订阅号、服务号或新浪微博。</span><div class="ewcont"><div class="il pic"><img src="../images/wxdyh.png"><span>微信订阅号</span><span class="ltxt-s">tuandaiwang</span> </div><div class="is pic"><img src="../images/wxdyh.png"><span>微信服务号</span><span class="ltxt-s">tuandaiservice</span></div> <div class="il pic"><img src="../images/wxdyh.png"><span>新浪微博</span><span class="ltxt-s">@团贷网</span></div></div></div>',
	}];
	window.tempArr = tempArr;
})();