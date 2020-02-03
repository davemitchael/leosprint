
    $(document).on('scroll', function () {
        if ($(document).scrollTop()) {
            $('.header').addClass('black');

        } else {
            $('.header').removeClass('black');
        }
    });

