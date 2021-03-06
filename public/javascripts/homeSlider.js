$('.home-slider').slick({
  draggable: true,
  autoplay: true,
  autoplaySpeed: 10000,
  lazyload:'ondemand',//lazy load image
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
  responsive: [
      {
        breakpoint: 1360, //1360->1920px
        settings: {
          slidesToShow: 1,
          centerMode: true,
          autoplay: true,
          draggable: false,
          mobileFirst: true,
       }
      }, 
      {
        breakpoint: 1024,//1024-1360px
        settings: {
          slidesToShow: 1,
          centerMode: true,
          lazyload:'ondemand',
          autoplay: true,
          draggable: false,
          // mobileFirst: true,
      }
      }, 
      {
        breakpoint: 768,//768->1024px
        settings: {
          slidesToShow: 1,
          centerMode: true,
          autoplay: true,
          autoplaySpeed: 10000,
          lazyload:'ondemand',
          draggable: false,
          // mobileFirst: true,
        }
      },
      {
        breakpoint: 320,//320->0 px
        settings: {
          slidesToShow: 1,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 10000,
          lazyload:'ondemand',
          draggable: false,
          mobileFirst: true,
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

// $("element")[0].slick.setPosition();

// //If that doesn't work try
// $("element").slick("refresh");

// fix bug first slider Timeout
//  window.addEventListener("load", () => {
//    setTimeout(function(){$('.home-slider').slick("refresh");}, 1000);
//    callback();
// });

