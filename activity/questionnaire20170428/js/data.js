(function() {
	var questionList = [{
		question: '您在团贷网已经投资了多久？',
		options: [{
			id: 0,
			text: '1个月以内'
		}, {
			id: 1,
			text: '1-3个月'
		}, {
			id: 2,
			text: '3-6个月'
		}, {
			id: 3,
			text: '6-12个月'
		}, {
			id: 4,
			text: '12个月以上'
		}],
		id: 0,
		limit: 1,
		recomment: ''
	}, {
		question: '您投资在团贷网的资金占全部理财资金的多少？',
		options: [{
			id: 0,
			text: '10%以下'
		}, {
			id: 1,
			text: '10%至30%'
		}, {
			id: 2,
			text: '30%至50%'
		}, {
			id: 3,
			text: '50%至70%'
		}, {
			id: 4,
			text: '超过70%'
		}],
		id: 1,
		limit: 1,
		recomment: ''
	},  {
		question: '目前你在团贷网投资的资金范围：',
		options: [{
			id: 0,
			text: '5万元以下'
		}, {
			id: 1,
			text: '5万元至10万元'
		}, {
			id: 2,
			text: '10万元至20万元'
		}, {
			id: 3,
			text: '20万元至50万元'
		}, {
			id: 4,
			text: '50万元至100万元',
			
		},{
			id: 5,
			text: '100万元以上',
			
		}],
		id: 2,
		recomment: ''
	}, {
		question: '您是否了解或关注团贷网5月6日降息的消息？',
		options: [{
			id: 0,
			text: '了解，在降息前已经知道',
		}, {
			id: 1,
			text: '不了解，在降息后才发现'
		}, {
			id: 2,
			text: '不了解，现在做问卷才知道'
		}],
		id: 3,
		limit: 1,
		recomment: ''
	}, {
		question: '您对平台降息的看法？',
		options: [{
			id: 0,
			text: '理解，降息有利于平台稳健运营发展'
		}, {
			id: 1,
			text: '理解，行业发展趋势，大势所趋'
		},{
			id: 2,
			text: '无所谓，看重平台实力，小幅度降息没关系'
		}, {
			id: 3,
			text: '反对，收益少了'
		}],
		id: 4,
		limit: 1,
		recomment: ''
	}, {
		question: '此次降息会对您在团贷网的投资造成影响吗？',
		options: [{
			id: 0,
			text: '没有影响，降息后收益还是比其他平台高'
		}, {
			id: 1,
			text: '没有影响，感觉变化不大'
		}, {
			id: 2,
			text: '有影响，考虑别的平台，但没想好怎样调整'
		}, {
			id: 3,
			text: '有影响，已经调整了投资计划'
		}],
		id: 5,
		limit: 1,
		recomment: ''
	}, {
		question: '实现存管和降息后，你会向亲朋好友推荐团贷网吗？',
		options: [{
			id: 0,
			text: '之前有推荐，还会继续推荐'
		}, {
			id: 1,
			text: '之前有推荐，降息后利息变低，考虑推荐别的平台'
		}, {
			id: 2,
			text: '之前没推荐，存管、降息后信心大增，会尝试推荐'
		}, {
			id: 3,
			text: '之前没推荐，考虑到投资的敏感性，仍然不会推荐'
		}],
		id: 6,
		limit: 1,
		recomment: '',
	}, {
		question: '您的年龄范围：',
		options: [{
			id: 0,
			text: '25岁以下'
		}, {
			id: 1,
			text: '25岁至34岁'
		}, {
			id: 2,
			text: '35岁至44岁'
		},{
			id: 3,
			text: '45岁至54岁'
		}, {
			id: 4,
			text: '55岁至64岁'
		}, {
			id: 5,
			text: '65岁及以上'
		}],
		id: 7,
		limit: 1,
		recomment: '',
	}, {
		question: '您的职业是：',
		options: [{
			id: 0,
			text: '互联网（包括互联网金融）从业人员'
		}, {
			id: 1,
			text: '银行、保险、证券、信托等传统金融从业人员'
		}, {
			id: 2,
			text: '国有企业职员、机关事业单位职员、公务员等'
		},{
			id: 3,
			text: '老师、医生、律师等专业人士'
		}, {
			id: 4,
			text: '有限公司股份公司老板'
		}, {
			id: 5,
			text: '公司中高层管理等'
		},{
			id: 6,
			text: '私企、民营企业职员'
		}, {
			id: 7,
			text: '个体工商户'
		},{
			id: 8,
			text: '自由职业者'
		}, {
			id: 9,
			text: '学生'
		}, {
			id: 10,
			text: '其他',
			hasInput: true
		}],
		id: 8,
		limit: 1,
		recomment: '',
	}];
	window.questionList = questionList;
})();