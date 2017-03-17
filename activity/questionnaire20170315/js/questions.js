(function() {
	FastClick.attach(document.body);
	var activeIndex = 0;
	var seriArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	function init() {
		var temp = '';
		list.forEach(function(item, index) {
			item.recomment = item.recomment || '';
			temp += '<div class="q-wrapper" data-name="' + index + '"><div class="q-main"><span class="q-txt">' + item.question + '<i class="q-rec">' + item.recomment + '</i></span><ul class="opt-list">';
			var inputType = item.limit > 1 ? 'checkbox' : 'radio';
			item.options.forEach(function(opt, i) {
				var _id = '' + index + i;
				if (opt.text) {
					//普通选项
					temp += '<li class="opt-row" data-name="' + index + '" data-limit="' + item.limit + '" data-id="' + _id + '"><div class="opt-check">' +
						'<input type="' + inputType + '" id="' + _id + '" value="' + i + '" name="' + index + '" data-sub="' + opt.showSub + '">' +
						'<label class="icon-radio" for="' + _id + '"></label></div>' +
						'<div class="opt-txt"><label for="' + _id + '">' + opt.text + '</label> </div></li>';
				} else {
					//其他
					temp += '<li class="opt-row" data-name="' + index + '" data-limit="' + item.limit + '" data-id="' + _id + '"><div class="opt-check">' +
						'<input type="' + inputType + '" id="' + _id + '" value="' + i + '" name="' + index + '" data-sub="' + opt.showSub + '">' +
						'<label class="icon-radio" for="' + _id + '"></label></div>' +
						'<div class="opt-txt"><label for="' + _id + '">其他</label>' +
						'<span class="opt-other"><input type="text" name="other"><span></div></li>';
				}
				// temp += '<label class="opt-row" for="' + _id + '">' +
				// 	'<input type="' + inputType + '"  id="' + _id + '" value="' + arr[i % 26] + '" name="' + index + '">' +
				// 	'<label class="icon-radio" for="' + _id + '"></label><label  for="' + _id + '">' + opt.text + '</label></label>';
			});
			if (item.subQuestion) {
				//分支
				temp += '</ul></div>';
				temp += '<div class="q-sub"><span class="q-txt">' + item.subQuestion + '</span><ul class="opt-list">';
				for (var k = 0; k < item.subLimit; k++) {
					temp += '<li class="input-row opt-row"><input type="text" class="sub-input" name="sub' + index + '"></li>';
				}
				temp += '</div></div>';
			} else {
				temp += '</ul></div></div>'
			}
		});

		$(".question-container").append(temp);
		// $(".q-wrapper").eq(0).show();
		// $(".icon-seri").html('Q1');
		initShow();

	}
	// Util.toast('你的答案不能为空', 2000);
	// $(".q-wrapper").eq(0).show();
	init();


	function initShow(index) {
		index = index ? index : activeIndex;
		$(".q-wrapper").hide();
		$(".q-wrapper").eq(index).show();
		$(".icon-seri").html('Q' + (index + 1));
		$(".q-btns").hide();
		//底部按钮显示
		if (index === 0) {
			$(".q-first")[0].style.cssText = 'display:flex;display:-webkit-flex;';
		} else if (index === list.length - 1) {
			$(".q-last")[0].style.cssText = 'display:flex;display:-webkit-flex;';
		} else {
			$(".q-common")[0].style.cssText = 'display:flex;display:-webkit-flex;';
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
		if (curQuestion.subQuestion && curArr.attr('data-sub') == 1) {
			//当前显示为分支
			if (curQuestion.showBrench) {
				var subArr = $('input[name="sub' + curQuestion.id + '"]');
				var subAnswers = [];
				for (var i = 0; i < subArr.length; i++) {
					var subOpt = subArr.eq(i);
					var subValue = subOpt.val().trim();
					if (subValue.length > 0) {
						subAnswers.push(subValue);
					}
				}
				// console.info('subAnswers--', subAnswers);

				if (subAnswers.length === 0) {
					Util.toast('你的答案不能为空')
					return;
				}
			} else {
				//当前显示主支，点击下一页显示分支
				triggerBrench(curQuestion.id, 'sub');
				return;
			}
		}
		activeIndex += 1;
		initShow();
	});
	//上一题
	$(".btn-prev").on('click', function() {
		var curQ = list[activeIndex];
		if (curQ.showBrench) {
			//显示主支
			triggerBrench(curQ.id, 'main');
			// curQ.showBrench = false;
			// var _obj = $('.q-wrapper[data-name="' + curQ.id + '"]');
			// _obj.find('.q-sub').hide();
			// _obj.find('.q-main').show();
			// $(".icon-seri").html('Q' + (activeIndex + 1));
		} else {
			activeIndex -= 1;
			initShow();

		}
	});
	//点击答案
	$("body").on('click', '.opt-row', function() {
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
	});
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

	function triggerBrench(name, type) {
		var obj = $('.q-wrapper[data-name="' + name + '"]');
		if (type === 'sub') {
			//显示分支
			obj.find('.q-main').hide();
			obj.find('.q-sub').show();
			list[activeIndex].showBrench = true;
			$(".icon-seri").html('Q' + (activeIndex + 1) + '-A');
		} else {
			//显示主支
			obj.find('.q-sub').hide();
			obj.find('.q-main').show();
			list[activeIndex].showBrench = false;
			$(".icon-seri").html('Q' + (activeIndex + 1));
		}
	}
})();