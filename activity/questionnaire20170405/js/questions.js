(function() {
	FastClick.attach(document.body);
	var activeIndex = 0;
	var subAcitve = {};
	var seriArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	function init() {
		var temp = '';
		list.forEach(function(item, index) {
			item.recomment = item.recomment || '';
			temp += '<div class="q-wrapper" data-name="' + index + '"><div class="q-main"><span class="q-txt">' + item.question + '<i class="q-rec">' + item.recomment + '</i></span><ul class="opt-list">';
			var inputType = item.limit > 1 ? 'checkbox' : 'radio';
			if (item.options && item.options.length > 1) {
				item.options.forEach(function(opt, i) {
					var _id = '' + index + i;
					temp += '<li class="opt-row" data-name="' + index + '" data-limit="' + item.limit + '" data-id="' + _id + '"><div class="opt-check">' +
						'<input type="' + inputType + '" id="' + _id + '" value="' + i + '" name="' + index + '" data-sub="' + opt.showSub + '">' +
						'<label class="icon-radio" for="' + _id + '"></label></div>' +
						'<div class="opt-txt"><label for="' + _id + '">' + opt.text + '</label> </div></li>';
				});
			} else {
				temp += '<textarea class="opt-input"></textarea>';
			}
			if (item.hasBrench) {
				//分支
				temp += '</ul></div>';
				subData = item.subQuestion;
				subData.forEach(function(subItem, j) {
					temp += '<div class="q-sub"><span class="q-txt">' + subItem.question + '</span><ul class="opt-list">';
					var subInputType = subItem.limit > 1 ? 'checkbox' : 'radio';
					var subId = '' + index + j;
					subItem.subOptions.forEach(function(subOpt, k) {
						var subOptId = '' + index + j + k;
						temp += '<li class="opt-row" data-name="' + subId + '" data-limit="' + subItem.limit + '" data-id="' + subOptId + '">' +
							'<div class="opt-check"><input type="' + subInputType + '" id="' + subOptId + '" value="' + k + '" name="' + subId + '">' +
							'<label class="icon-radio" for="' + subOptId + '"></label></div>' +
							'<div class="opt-txt"><label for="' + subOptId + '">' + subOpt.text + '</label> </div></li>';
					});
					temp += '</ul></div>'
				});
				
				temp += '</div></div>';
			} else {
				temp += '</ul></div></div>'
			}
		});

		$(".ques-container").append(temp);
		// $(".q-wrapper").eq(0).show();
		// $(".ques-seri").html('Q1');
		initShow();

	}
	// Util.toast('你的答案不能为空', 2000);
	// $(".q-wrapper").eq(0).show();
	init();


	function initShow(index) {
		index = index ? index : activeIndex;
		var _wrapper = $(".q-wrapper");
		_wrapper.hide();
		_wrapper.eq(index).show();
		if (list[index].showBrench) {
			var subIndex = subAcitve[index];
			$(".ques-seri").html('Q' + (index + 1) + '-' + seriArr[subIndex % 26]);
		} else {
			$(".ques-seri").html('Q' + (index + 1));
		}
		if (index == 0) {
			$(".go-prev").hide();
		} else {
			$(".go-prev").show();
		}
		if (index == _wrapper.length - 1) {
			$(".btn-next").hide();
			$(".btn-submit").show();
		} else {
			$(".btn-submit").hide();
			$(".btn-next").show();
		}

	}
	//下一题
	$(".btn-next").on('click', function() {
		var curQuestion = list[activeIndex];
		var curArr = $("input[name='" + curQuestion.id + "']:checked");
		if (curArr.length === 0) {
			Util.toast('你的答案不能为空')
			return;
		}
		//如果有分支并且主支选为是
		if (curQuestion.hasBrench && curArr.attr('data-sub') == 1) {
			var curObj = $(".q-wrapper[data-name='" + curQuestion.id + "']");
			var subIndex = curQuestion.showBrench ? subAcitve[activeIndex] + 1 : 0;
			var subLenght = curQuestion.subQuestion.length;
			if (curQuestion.showBrench) {
				var subId = '' + activeIndex + subAcitve[activeIndex];
				subArr = $("input[name='" + subId + "']:checked");
				if (subArr.length === 0) {
					Util.toast('你的答案不能为空')
					return;
				}
			}
			if (subIndex < subLenght) {
				triggerBrench(curQuestion.id, 'subAdd');
				return;
			}

		}

		activeIndex += 1;
		initShow();
	});
	//上一题
	$(".go-prev").on('click', function() {
		var curQ = list[activeIndex];
		var subIndex = subAcitve[activeIndex];
		if (curQ.showBrench) {
			//显示主支
			if (subIndex == 0) {
				triggerBrench(curQ.id, 'mian');
				list[activeIndex].showBrench = false;
			} else {
				//显示上一分支
				triggerBrench(curQ.id, 'subReduce');
			}
		} else {
			activeIndex -= 1;
			initShow();

		}
	});
	//点击答案
	/*$("body").on('click', '.opt-row', function() {
		var name = $(this).attr('data-name');
		var limit = $(this).attr('data-limit');
		var id = $(this).attr('data-id');
		//选中的答案
		var arrSelected = $("input[name='" + name + "']:checked");
		if (arrSelected.length > +limit) {
			Util.toast('该题目最多只能选择' + limit + '项答案');
			$("#" + id)[0].checked = false;
		}
		//是否显示分支
		// if (arrSelected.attr('data-sub') == 1) {
		// 	triggerBrench(name, 'sub');
		// }
	});*/
	//提交答卷
	$(".btn-submit").on('click', function() {
		var questionArr = $(".q-wrapper");
		/*
			answerList数据结构
			[{
				"question": "Q4", //问题编号
				"content": "一般您从哪里获得关于理财的信息？", //问题内容
				"answers": [{
					"serial": "B", //答案编号
					"text": "新媒体（微信、微博、今日头条、知乎等）" //答案内容
				}]
			}, {
				"question": "Q6",
				"content": "各方询问后，你更会相信谁的建议？",
				"answers": [{
					"serial": "A",
					"text": "网上搜索（百度、知道、媒体报道、社区讨论等）"
				}, {
					"serial": "H",
					"text": "",
					"describe": "eeee" //其他选项
				}]
			}, {
				"question": "Q8",
				"content": "您是否有关注投资理财微博大V或微信公众号？",
				"answers": [{
					"serial": "A",
					"text": "是"
				}],
				"subQA": {
					"subQuestion": "Q8-A", //分支问题编号
					"subContent": "请列举1-3个您最为认可的投资理财微博大V或微信公众号", //分支问题内容
					"subAnswers": [{
						"subSeri": "A", //分支答案编号
						"describe": "wwwww" //分支答案输入内容
					}]
				}
			}]
		*/
		var answerList = [];
		var isCompleted = true; //是否完成所有问题
		for (var i = 0; i < questionArr.length; i++) {
			var questionObj = list[i]; //问题对象
			var questionAnswers = {
				question: 'Q' + (i + 1),
				// content: questionObj.question,
				answers: []
			}
			answArr = $("input[name='" + i + "']:checked"); //选中的答案
			if (answArr.length > 0) {
				for (var k = 0; k < answArr.length; k++) {
					var index = answArr.eq(k).val();
					var answer = {
							serial: seriArr[index % 26],
							text: questionObj.options[+index].text
						}
						//如果选中其他选项
					if (!answer.text) {
						answer.describe = questionArr.eq(i).find("input[name='other']").val();
					}
					questionAnswers.answers.push(answer);
				}
			} else {
				isCompleted = false;
			}
			//如果有分支
			if (questionObj.subQuestion) {
				// console.info('sub---', answArr, answArr.attr('data-sub'));
				if (answArr.attr('data-sub') == 1) {
					questionAnswers.subQA = {
						subQuestion: 'Q' + (i + 1) + '-A',
						// subContent: questionObj.subQuestion,
						subAnswers: []
					};
					var subAnswArr = $("input[name='sub" + i + "']");
					for (var m = 0; m < subAnswArr.length; m++) {
						var subValue = subAnswArr.eq(m).val().trim();
						if (subValue.length > 0) {
							var subAnswer = {
								subSeri: seriArr[m % 26],
								// text: '',
								describe: subValue
							};
							questionAnswers.subQA.subAnswers.push(subAnswer);
						}
					}
					if (questionAnswers.subQA.subAnswers.length === 0) {
						isCompleted = false;
					}
				}
			}
			answerList.push(questionAnswers);
		}
		console.info(answerList);
		if (isCompleted) {
			window.location.href = './lottery.html';
		} else {
			Util.toast('请完成答卷再提交');
		}

	})

	function triggerBrench(id, type) {
		var curObj = $('.q-wrapper[data-name="' + id + '"]');
		// var questionData = list[id];
		if (type === 'subAdd') {
			//显示分支
			var subIndex = list[activeIndex].showBrench ? subAcitve[id] + 1 : 0;
			curObj.find('.q-sub').hide();
			curObj.find('.q-main').hide();
			curObj.find('.q-sub').eq(subIndex).show();
			$(".ques-seri").html('Q' + (id + 1) + '-' + seriArr[subIndex % 26]);
			// subIndex += 1;
			subAcitve[id] = subIndex;
			list[activeIndex].showBrench = true;
		} else if (type === 'subReduce') {
			var subIndex = subAcitve[id] - 1;
			curObj.find('.q-sub').hide();
			curObj.find('.q-main').hide();
			curObj.find('.q-sub').eq(subIndex).show();
			$(".ques-seri").html('Q' + (id + 1) + '-' + seriArr[subIndex % 26]);
			subAcitve[id] = subIndex;
			list[activeIndex].showBrench = true;
		} else {
			//显示主支
			curObj.find('.q-sub').hide();
			curObj.find('.q-main').show();
			$(".ques-seri").html('Q' + (activeIndex + 1));
			list[activeIndex].showBrench = false;
			// subAcitve[id] = null;
		}



	}

})();