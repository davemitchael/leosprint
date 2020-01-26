  $('.home-slider').slick({
    draggable: true,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    dots: false,
    fade: true,
    speed: 700,
    infinite: true,
    mobileFirst:true,
    cssEase: 'ease',
    touchThreshold: 100,
    useCSS: true,
    pauseOnHover:false,
    pauseOnFocus:false,
    //variableWidth: true,
    responsive: [
        {
          breakpoint: 1360, //1360->1920px
          settings: {
            slidesToShow: 1,
                    }
        }, 
        {
          breakpoint: 1024,//1024-1360px
          settings: {
            slidesToShow: 1,
        }
        }, 
        {
          breakpoint: 768,//768->1024px
          settings: {
            slidesToShow: 1,
            mobileFirst: true,
            centerMode: true,
            autoplay: false,
            draggable: false,
          }
        },
        {
          breakpoint: 320,//320->0 px
          settings: {
            slidesToShow: 1,
            mobileFirst: true,
            centerMode: true,
            autoplay: false,
            draggable: false,
          }
        }
      ]
  })
//   .on('setPosition', function (event, slick) {
//     slick.$slides.css('height', slick.$slideTrack.height() + 'px');
// });
// height adapive home-slider
.on('setPosition', function(event, slick) {
  slick.$slider.find(".home-slider .tile:not(.position-set)").addClass('position-set').css('height', slick.$slideTrack.height() + 'px');
});
  // Script slick slider responsive resize slick slider
$(window).resize(function () {
    $('.home-slider').not('.slick-initialized').slick('resize');
  });
  $(window).on('orientationchange', function () {
    $('.home-slider').not('.slick-initialized').slick('resize');
  });
