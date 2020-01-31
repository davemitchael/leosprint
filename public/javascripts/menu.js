$('document').ready(function() {
	$('#toggle').click(function(){
	 $(this).toggleClass('active');
	 $('.overlay').toggleClass('open');
	 });
  });
//Animate scroll to ->div and close menu
  $(document).ready(function(){
	$("#overlay").on("click","a", function (event) {
	  var trigger1 = $('.button_container'),
	  wrapper = $('#overlay');
	  trigger1.removeClass('active');
	   wrapper.removeClass('open');
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
  });