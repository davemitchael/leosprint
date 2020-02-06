//Start Slick Slider
$('.slider').slick({
  slidesToShow: 1,
  slidesToScroll: 3,
  centerPadding: '390px',
  lazyload:'progressive',//lazy load image
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
  // variableWidth:true,
  responsive: [
    {
      breakpoint: 1360, //1360->1920px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 1024,//1024-1360px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        centerPadding: '300px',
      }
    },
    {
      breakpoint: 768,//768->1024px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '240px',
        cssEase: 'linear', //defaust 'ease' 
      }
    },
    {
      breakpoint: 320,//320->0 px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        centerPadding: '0px',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1', //defaust 'ease' 
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

// Script responsive resize slick slider
$(window).resize(function () {
  $('.slider').not('.slick-initialized').slick('resize');
});
$(window).on('orientationchange', function () {
  $('.slider').not('.slick-initialized').slick('resize');
});
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


$(document).ready(function () {
  $('#year-and-logo').append(`<p>© ${new Date().getFullYear()} Leosprint</p>`)
});
var imgs = $('.lSSlideWrapper img');
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


//Restar animations ToolTip for humburger and price btn
$(function() {
  $(".menu_text,.price_text").hover(function() {
      var el = $(this);
el.before( el.clone(true) ).remove();
  });
});

