$('.home-slider').slick({
  draggable: true,
  autoplay: true,
  autoplaySpeed: 10000,
  lazyload:'progressive',//lazy load image
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
});

// reslick only if it's not slick()
$(window).on('resize', function() {
  if (window.innerWidth <= 768) {
    $('.home-slider').slick('unslick');
    sliderIsLive = false,
    removeClass(".image_screen img");
  }
  else {
    if (sliderIsLive) {
      $('.home-slider').slick();
      sliderIsLive = true;
    }
  }
})

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
window.addEventListener("load", () => {
  setTimeout(function(){$('.home-slider').slick("refresh");}, 100);
});