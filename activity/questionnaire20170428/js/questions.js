(function() {
	FastClick.attach(document.body);
	var curQueIndex = 0;

	// 调查问卷问题初始化
	function questionInit(){
		var dom = '';
		questionList.forEach(function(item,index){
			var optionsDom = '';
			item.options.forEach(function(opt, i) {
				var _id = '' + index + i;
				optionsDom += '<li>'+
                                '<div class="option-radio">'+
                                    '<input id="'+ _id +'" type="radio" name="'+ index +'">'+
                                    '<label class="icon-radio" for="'+ _id +'"></label>'+
                                '</div>'+
                                '<label class="option-txt" for="'+ _id +'">'+ opt.text +'</label>'+
                            '</li>';
			})
			dom += '<div class="questions-scroll">'+
                        '<p class="question"><span class="questions-num">0'+ (index+1) +'.</span> '+ item.question +'</p>'+
                        '<ul class="option-list">'+ optionsDom +'</ul>'+
                    '</div>';
		})
		$("#questions-sec").append(dom);
		questionShow(0);
	}
	// 显示第n题
	function questionShow(index) {
		var _questions = $('.questions-scroll');
		index = index ? index : curQueIndex;
		_questions.hide();
		_questions.eq(index).show();
		switch(index) {
			case 0:
				$("#btn-pre").hide();
				break;
			case _questions.length - 1:
				$("#btn-next").hide();
				$("#btn-submit").show();
				break;
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
			var curQue = questionList[curQueIndex];
			var curArr = $("input[name='" + curQue.id + "']:checked");
			if(curArr.length === 0){
				Util.toast('你的答案不能为空');
				return;
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