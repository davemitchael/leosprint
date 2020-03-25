//Start Slick Slider

$('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 3,
    centerPadding: '390px',
    arrows: true,
    dots: false,
    focusOnSelect: true,
    // cssEase: 'ease', //defaust 'ease' //disabled, but used animation will css
    touchMove: true,
    centerMode: true,
    infinite: true,
    prevArrow: '<button class="slick-prev prev-arrow"></button>',
    nextArrow: '<button class="slick-next next-arrow"></button>',
    speed: 1000,
    useCSS: true,
    mobileFirst:true,
    responsive: [
      {
        breakpoint: 1360, //1361->1920px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          centerMode: true,
          mobileFirst:true,
          lazyload:'ondemand',
          centerPadding: '380px',
        }
      },
      {
        breakpoint: 1023,//1023-1360px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          centerMode: true,
          lazyload:'ondemand',
          centerPadding: '200px',
          draggable: false,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 768,//768->1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          lazyload:'ondemand',
          centerPadding: '200px',
          draggable: false,
          mobileFirst: true,
  
        }
      },
      {
        breakpoint: 500,//tablet
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          cssEase: 'ease',
          lazyload:'ondemand',
          centerPadding: '0px',
          draggable: false,
          mobileFirst: true,
        }
      },
      {
        breakpoint: 319,//mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          cssEase: 'ease',
          lazyload:'ondemand',
          centerPadding: '0px',
          draggable: false,
          mobileFirst: true,
        }
      }
    ]
  // bug fixed last jump slider
  }).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    if (currentSlide !== nextSlide) {
        document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
            // timeout required or Slick will overwrite the classes
            setTimeout(() => next.classList.add('slick-current', 'slick-center'));
        });
    }
  });
  // $(window).resize(function () {
  //   $('.home-slider').not('.slick-initialized').slick('resize');
  // });
  // $(window).on('orientationchange', function () {
  //   $('.home-slider').not('.slick-initialized').slick('resize');
  // });
  
  $(".slider").on('click', function(e) {
    e.preventDefault();
    $slider.slick('refresh');
  
  });
  
  $slider.on('reInit', function(event, slick) {
      console.log('reinitalized');
  });
  // Script responsive resize slick slider
  // var element=(".slider")
  // $(element).on('setPosition', function() {
  //   var slidesShown = $(element).slick('slickGetOption', 'slidesToShow');
  //   var numberOfSlides = $(element).find('.slick-slide').length;
  
  //   if (slidesShown === numberOfSlides) {
  //     $(element).find('.slick-track').css('transform', 'translate3d(0px, 0px, 0px)');
  //   }
  // });
  
  // Script slick slider create img center
  var imgs = $('.slider img');
  imgs.each(function () {
    var item = $(this).closest('.item');
    item.css({
      'background-image': 'url(' + $(this).attr('src') + ')',
      'background-position': 'center',
      '-webkit-background-size': 'cover',
      'background-size': 'cover',
    });
    $(this).hide();
  });
  
  //End Slick Slider
  