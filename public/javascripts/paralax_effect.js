

// $(document).ready(function() {
//   //parallax scroll
//   $(window).on("load scroll", function() {
//     var parallaxElement = $(".parallax_scroll"),
//       parallaxQuantity = parallaxElement.length;
//     window.requestAnimationFrame(function() {
//       for (var i = 0; i < parallaxQuantity; i++) {
//         var currentElement = parallaxElement.eq(i),
//           windowTop = $(window).scrollTop(),
//           elementTop = currentElement.offset().top,
//           elementHeight = currentElement.height(),
//           viewPortHeight = window.innerHeight * 0.9 - elementHeight * 0.9,
//           scrolled = windowTop - elementTop + viewPortHeight;
//         currentElement.css({
//           transform: "translate3d(0," + scrolled * -0.15 + "px, 0)"
//         });
//       }
//     });
//   });
// });