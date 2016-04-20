(function() {
    FastClick.attach(document.body);
    //do your thing.

    // -------------------------
    /*
    left:
    top:
    a:长
    b:高
    */

    // var carousel = Carousel(114, 50, 150, 60);
    var carousel = Carousel("#carousel_wrapper", {
        a: 150,
        b: 60,
        slideClick: function(i, slide) {
            
        },
        onTouchStart: function(activeIndex,carousel) {
            // console.log(activeIndex);
            // console.log(carousel);
        },
        onTouchMove:function(activeIndex,carousel) {
            // console.log(activeIndex);
        },
        onTransitionEnd:function(activeIndex,currentSlide,carousel) {
            console.log(activeIndex);
            console.log(currentSlide);
        }
    });
 
})();
