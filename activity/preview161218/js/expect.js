(function() {
    FastClick.attach(document.body);

    function getTimeDiff(diff) {
        var ONE_DAY = 1000 * 60 * 60 * 24; //1天的毫秒数
        var ONE_HOUR = 1000 * 60 * 60; // 1小時的毫秒數  
        var ONE_MIN = 1000 * 60; // 1分鐘的毫秒數  
        var ONE_SEC = 1000; // 1秒的毫秒數   


        var leftDays = Math.floor(diff / ONE_DAY);
        if (leftDays > 0) diff = diff - (leftDays * ONE_DAY);

        var leftHours = Math.floor(diff / ONE_HOUR);
        if (leftHours > 0) diff = diff - (leftHours * ONE_HOUR);

        var leftMins = Math.floor(diff / ONE_MIN);
        if (leftMins > 0) diff = diff - (leftMins * ONE_MIN);

        var leftSecs = Math.floor(diff / ONE_SEC);

        var obj = {
            "days": leftDays,
            "hours": leftHours,
            "minutes": leftMins,
            "seconds": leftSecs
        };
        // console.log("兩個時間差距為%d天,%d小時,%d分,%d秒",leftDays,leftHours,leftMins,leftSecs); 
        return obj;

    }

    function getTensAndUnit(value) {
        return [value.toString().charAt(0), value.toString().charAt(1)];
    }
    // 倒计时---------------------
    // Create Countdown
    var Countdown = {

        // Backbone-like structure
        $el: $('.countdown'),

        // Params
        countdown_interval: null,
        total_seconds: 0,

        // Initialize the countdown  
        init: function(date) {

            // DOM
            this.$ = {
                days: this.$el.find('.figure.days'),
                hours: this.$el.find('.figure.hours'),
                minutes: this.$el.find('.figure.min'),
                seconds: this.$el.find('.figure.sec')
            };

            // Init countdown values
            this.values = {
                hours: 10,
                minutes: 0,
                seconds: 0,
            };

            // Initialize total seconds
            this.total_seconds = date - new Date();
            this.values = getTimeDiff(this.total_seconds);
            this.total_seconds = this.values.days * 24 * 60 * 60 + this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds - 1;
            this.initData(this.values);
            // Animate countdown to the end 
            this.count();
        },
        initData: function(values) {
            setData(values.days, this.$.days);
            setData(values.hours, this.$.hours);
            setData(values.minutes, this.$.minutes);
            setData(values.seconds, this.$.seconds);

            function setData(value, $el) {
                var _type = $el.attr("data-type");
                var _values = value < 10 ? [0, value] : getTensAndUnit(value);
                var _nexts = [];

                switch (_type) {
                    case "day":
                        var _next_ten = Math.floor(value / 10) - 1;
                        _nexts = [_next_ten < 0 ? 9 : _next_ten, (value - 1) % 10];
                        break;
                    case "hour":
                        if (value == 0) {
                            _nexts = [2, 3];
                        } else {
                            var _next_ten = Math.floor(value / 10) - 1;
                            _nexts = [_next_ten < 0 ? 2 : _next_ten, (value - 1) % 10];
                        }
                        break;
                    case "min":
                    case "sec":
                        if (value == 0) {
                            _nexts = [5, 9];
                        } else {
                            var _next_ten = Math.floor(value / 10) - 1;
                            _nexts = [_next_ten < 0 ? 5 : _next_ten, (value - 1) % 10];
                        }

                        break;
                }


                $el.find(".tens .current").html(_values[0]);
                $el.find(".tens .next").html(_nexts[0]);
                $el.find(".unit .current").html(_values[1]);
                $el.find(".unit .next").html(_nexts[1]);
            }

        },
        count: function() {

            var that = this,
                $day_0 = this.$.days.find(".day0"),
                $day_1 = this.$.days.find(".day1"),
                $hour_0 = this.$.hours.find(".hour0"),
                $hour_1 = this.$.hours.find(".hour1"),
                $min_0 = this.$.minutes.find(".min0"),
                $min_1 = this.$.minutes.find(".min1"),
                $sec_0 = this.$.seconds.find(".sec0"),
                $sec_1 = this.$.seconds.find(".sec1");

            this.countdown_interval = setInterval(function() {
                // console.log(that.total_seconds);
                if (that.total_seconds > -1) {

                    --that.values.seconds;

                    if (that.values.minutes >= 0 && that.values.seconds < 0) {

                        that.values.seconds = 59;
                        --that.values.minutes;
                    }

                    if (that.values.hours >= 0 && that.values.minutes < 0) {

                        that.values.minutes = 59;
                        --that.values.hours;
                    }

                    if (that.values.days >= 0 && that.values.hours < 0) {
                        that.values.hours = 23;
                        --that.values.days;
                    }
                    // Update DOM values
                    // Days
                    that.checkHour(that.values.days, $day_0, $day_1);

                    // Hours
                    that.checkHour(that.values.hours, $hour_0, $hour_1);

                    // Minutes
                    that.checkHour(that.values.minutes, $min_0, $min_1);

                    // Seconds
                    that.checkHour(that.values.seconds, $sec_0, $sec_1)

                    --that.total_seconds;
                } else {
                    clearInterval(that.countdown_interval);
                }
            }, 1000);
        },
        animateFigure: function($el, value) {
            var that = this,
                $next = $el.find('.next'),
                $current = $el.find('.current');
            var _type = $el.parent().attr("data-type");
            var system = $el.attr("data-system");
            var _next;

            // console.log(_type, this.values);

            if (_type === "hour") {
                if(system) {
                    if(this.values.hour < 9) {
                        system = 3;
                    } else {
                        system = 9;
                    }
                    _next = value - 1 < 0 ? system: value -1;
                    
                } else {
                    _next = value - 1 < 0 ? 2 : value -1;
                }
            } else {
                system = system ? system - 1 : 9;
                _next = value - 1 < 0 ? system : value - 1;
            }

            $next[0].className = "current";
            $current[0].className = "prev";
            $current.html(_next);



            // animated
            setTimeout(function() {
                $current[0].className = "next";
            }, 200);

        },

        checkHour: function(value, $el_0, $el_1) {
            var val_0 = value.toString().charAt(0),
                val_1 = value.toString().charAt(1),
                fig_0_value = $el_0.find('.current').html(),
                fig_1_value = $el_1.find('.current').html();


            if (value >= 10) {
                // if($el_0.hasClass("min0")) {
                //     console.log(val_0,fig_0_value,val_1,fig_1_value);
                // }   
                // Animate only if the figure has changed
                if (fig_0_value !== val_0) this.animateFigure($el_0, val_0);
                if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            } else {
                // if($el_0.hasClass("min0")) {
                //     console.log(val_0,fig_0_value,val_1,fig_1_value);
                // } 
                // If we are under 10, replace first figure with 0
                if (fig_0_value !== '0') this.animateFigure($el_0, 0);
                if (fig_1_value !== val_0) this.animateFigure($el_1, val_0);
            }
        }
    };

    // Let's go !
    Countdown.init(new Date(2016, 11, 18, 0, 00, 0));

    // 倒计时   end---------------
})();
