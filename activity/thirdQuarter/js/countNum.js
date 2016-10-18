(function($) {
    function CountNum(el, options) {
        // this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
        this.wrapper = typeof el == 'string' ? $(el) : el;
        this.options = {
            el: el,
            decimals: 0, //小数位数
            mode: 0, //数字变化模式 0表示拆分模式，1表示完整模式
            duration: 500, //数字变化速度（ms）
            divised: false, //是否使用逗号分隔数字
        };
        for (var i in options) {
            this.options[i] = options[i];
        }


        // this.count();
    }

    function fmoney(s, n) {
        n = n > 0 && n <= 20 ? n : 0;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (n > 0) {
            return t.split("").reverse().join("") + "." + r;
        } else {
            return t.split("").reverse().join("");
        }
    }
    CountNum.prototype = {
        count: function() {
            var intervalTime = this.options.speed && !isNaN(this.options.speed) ? this.options.speed : this.options.duration / (this.options.endValue - this.options.startValue);
            var curNum = this.options.startValue;
            var me = this;
            var times = 1;
            // console.info("speed--", this.options.speed, intervalTime);
            $("#jyeNum1").html('c');
            if (this.options.mode === 1) {
                if (this.options.decimals > 0) {
                    for (var i = 0; i < this.options.decimals; i++) {
                        times = times * 10;
                    }
                }
                // console.info("times------", times);
                var showStart = ((this.options.startValue) / times).toFixed(me.options.decimals);
                if(this.options.divised) {
                    showStart = fmoney(showStart, 0);
                }
                this.wrapper.html(showStart);
                var inteId = setInterval(function() {
                    if (curNum <= me.options.endValue) {
                        var showNum = (curNum / times).toFixed(me.options.decimals);
                        if(me.options.divised) {
                            showNum = fmoney(showNum, 0)
                        }
                        me.wrapper.html(showNum);
                        // me.wrapper.html(curNum);
                        curNum++
                    } else {
                        clearInterval(inteId);
                    }
                }, intervalTime);
            } else {
                this.startArr = this.options.startValue.toString();
                this.endArr = this.options.endValue.toString();
                this.bitArr = this.wrapper.find('.c-num');
                var endLen = this.endArr.length;
                var startLen = this.startArr.length;
                var bitLen = this.bitArr.length;
                var sIndex = startLen - 1;
                for (var i = bitLen - 1; i >= 0; i--) {
                    if (this.startArr[sIndex]) {
                        $(this.bitArr[i]).html(this.startArr[sIndex]);
                    } else {
                        $(this.bitArr[i]).html(0);
                    }
                    sIndex--;
                }
                // var curNum = this.options.startValue;
                // var intervalTime = this.options.speed && !isNaN(this.options.speed) ? this.options.speed : this.options.duration / (this.options.endValue - this.options.startValue);
                var interval = setInterval(function() {
                    if (curNum <= me.options.endValue) {
                        var countArr = curNum.toString();
                        var kIndex = countArr.length - 1;
                        for (var j = bitLen - 1; j >= 0; j--) {
                            if (countArr[kIndex]) {
                                $(me.bitArr[j]).html(countArr[kIndex]);

                            }
                            kIndex--;
                        }
                        curNum++;
                    } else {
                        clearInterval(interval);
                    }
                }, intervalTime);
            }



        },

    };
    if (typeof module != 'undefined' && module.exports) {
        module.exports = CountNum;
    } else if (typeof define == 'function' && define.amd) {
        define(function() {
            return CountNum;
        });
    } else {
        window.CountNum = CountNum;
    }

})(window.Zepto || window.jQuery);