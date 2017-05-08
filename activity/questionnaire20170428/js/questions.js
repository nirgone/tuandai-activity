(function() {
	FastClick.attach(document.body);
	var curQueIndex = 0;
	// 答案编号
	var seriArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	// 调查问卷问题初始化
	function questionInit(){
		var questions_scroll = '';
		questionList.forEach(function(item,index){
			var options_li = '';
			item.options.forEach(function(opt, i) {
				var _id = '' + index + i;
				var txt_input = '';
				// 如果选项有输入框
				if (opt.hasInput) {
					txt_input = '<input type="text" class="option-input" data-id="'+ _id +'"/>'
				}
				// 选项节点
				options_li += '<li>'+
                                '<div class="option-radio">'+
                                    '<input id="'+ _id +'" type="radio" name="'+ index +'" value="'+ seriArr[i % 26] +'">'+
                                    '<label class="icon-radio" for="'+ _id +'"></label>'+
                                '</div>'+
                                '<label class="option-txt" for="'+ _id +'">'+ opt.text + txt_input +'</label>'+
                            '</li>';
			})
			questions_scroll += '<div class="questions-scroll">'+
                        '<p class="question"><span class="questions-num">0'+ (index+1) +'.</span> '+ item.question +'</p>'+
                        '<ul class="option-list">'+ options_li +'</ul>'+
                    '</div>';
		})
		$("#questions-sec").append(questions_scroll);
		questionShow(0);
	}
	// 显示第n题
	function questionShow(index) {
		var _questions = $('.questions-scroll');
		index = index ? index : curQueIndex;
		_questions.hide();
		_questions.eq(index).show();
		switch(index) {
			// 第一题
			case 0:
				$("#btn-pre").hide();
				break;
			// 最后一题
			case _questions.length - 1:
				$("#btn-next").hide();
				$("#btn-submit").show();
				break;
			// 默认
			default:
				$("#btn-submit").hide();
				$("#btn-next").show();
				$("#btn-pre").show();
				break;
		}
	}

	// 事件绑定
	function bindEvent() {
		$("#btn-next").on('click',function() {
			var curQue = questionList[curQueIndex]; //当前第几个问题
			var curArr = $("input[name='" + curQue.id + "']:checked"); //当前问题第几个答案被选中
			var curId = '' + curQueIndex + curQue.id;
			var optionInputVal = ''; //当前选项的输入框值
			if(curArr.length === 0){
				Util.toast('你的答案不能为空');
				return;
			}
			// 获取选项输入框的值
			if(curQue.hasInput){
				optionInputVal = $(".option-input[data-id='"+ curId +"']").val();
				optionInputVal = optionInputVal ? optionInputVal.trim() : '';
			}
			curQueIndex += 1;
			questionShow();
		})
		$("#btn-pre").on('click',function() {
			curQueIndex -= 1;
			questionShow();
		})
		$("#btn-submit").on('click',function() {
			$("#get-con").removeClass('hide');
			$("#questions-con").hide();
		})
	}
	// 初始化
	function init(){
		$("#btn-submit").hide();
		$("#btn-pre").hide();
		questionInit();
		bindEvent();
	}
	init();

})();