

$(document).ready(function () {
  $('#year-and-logo').append(`<p>© ${new Date().getFullYear()} 
  Всі права захищені</p>`)
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


