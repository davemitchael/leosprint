
//Start Slick Slider
$('.slider').slick({
  slidesToShow: 1,
  slidesToScroll: 3,
  centerPadding: '390px',
  arrows: true,
  dots: false,
  focusOnSelect: true,
  cssEase: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)', //defaust 'ease'
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
      breakpoint: 1360, //1360->1920px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        // settings: "unslick",

      }
    },
    {
      breakpoint: 1024,//1024-1360px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        // settings: "unslick",
        centerPadding: '300px',
      }
    },
    {
      breakpoint: 768,//768->1024px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '240px',
        settings: "unslick",
      }
    },
    {
      breakpoint: 320,//320->0 px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        centerPadding: '0px',
        settings: "unslick",

      }
    }
  ]
});

// Script slick slider responsive resize slick slider
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

// Початок галареї
let $galleryMain = $('.gallery_main');
let $galleryItem = $('.gallery-item');
let $two = $('.two');

$galleryItem.click(changePhoto);

function changePhoto() {
  let $this = $(this);
  let newImage = $this.css('backgroundImage');

  $galleryMain.css('backgroundImage', newImage);
  console.log(newImage)

  /* Change active image */
  $galleryItem.removeClass('active');

  $this.addClass('active');
}

let $galleryMainTwo = $('.gallery_main_two');
$two.click(changePhototwo);

function changePhototwo() {
  let $this = $(this);
  let newImage = $this.css('backgroundImage');

  $galleryMainTwo.css('backgroundImage', newImage);
  console.log(newImage)

  /* Change active image */
  $two.removeClass('active');

  $this.addClass('active');
}

$(function () {
  $(".model").change(function () { //При изменении модели
    var img_id = $(".model").children("option:selected").attr("data"); // Получаем значение атрибута блока с изображением модели автомобиля который нужно показать на изображении
    $(".modelImg").fadeOut(1); // прячем все блоки с изображением автомобилей
    $(img_id).fadeIn(10); // показываем нужный блок с изображением автомобиля
  });
});

$(document).ready(function () {
  $('#year-and-logo').append(`<p >© ${new Date().getFullYear()} Leosprint</p>`)
});
