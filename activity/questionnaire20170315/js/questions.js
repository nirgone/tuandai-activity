(function() {
	FastClick.attach(document.body);
	var activeIndex = 0;

	function init() {
		var temp = '';
		var arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		list.forEach(function(item, index) {
			temp += '<div class="q-wrapper" data-name="' + index + '"><div class="q-main"><span class="q-txt">' + item.question + '</span><ul class="opt-list">';
			var inputType = item.limit > 1 ? 'checkbox' : 'radio';
			item.options.forEach(function(opt, i) {
				var _id = '' + index + i;
				if (opt.text) {
					temp += '<li class="opt-row" data-name="' + index + '" data-limit="' + item.limit + '" data-id="' + _id + '"><div class="opt-check">' +
						'<input type="' + inputType + '" id="' + _id + '" value="' + arr[i % 26] + '" name="' + index + '" data-sub="' + opt.showSub + '">' +
						'<label class="icon-radio" for="' + _id + '"></label></div>' +
						'<div class="opt-txt"><label for="' + _id + '">' + opt.text + '</label> </div></li>';
				} else {
					//其他
					temp += '<li class="opt-row" data-name="' + index + '" data-limit="' + item.limit + '" data-id="' + _id + '"><div class="opt-check">' +
						'<input type="' + inputType + '" id="' + _id + '" value="' + arr[i % 26] + '" name="' + index + '" data-sub="' + opt.showSub + '">' +
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
		activeIndex += 1;
		initShow();
	});
	//上一题
	$(".btn-prev").on('click', function() {
		var curQ = list[activeIndex];
		debugger;
		if (curQ.showBrench) {
			curQ.showBrench = false;
			var _obj = $('.q-wrapper[data-name="' + curQ.id + '"]');
			_obj.find('.q-main').hide();
			_obj.find('.q-sub').show();
			$(".icon-seri").html('Q' + (activeIndex + 1));
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
		if (arrSelected.attr('data-sub') == 1) {
			var _obj = $('.q-wrapper[data-name="' + name + '"]');
			_obj.find('.q-main').hide();
			_obj.find('.q-sub').show();
			$(".icon-seri").html('Q' + (activeIndex + 1) + '-A');
			list[activeIndex].showBrench = true;
		}
	});
})();