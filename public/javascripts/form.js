let cars = [];
let imageGallery = '';

$(document).ready(function () {
    $('#phone').mask('+380-0000-000-00');

    axios.get('/cars/getAll')
        .then(res => res.data)
        .then(data => {
            cars = data.cars;

            initDropDown(cars);
            setImagesIntoGallery(cars[0].images, cars[0].name);

            return cars[0].images.length;
        })
        .then(countOfImages =>  initImageGallery(countOfImages))
        .catch(err => {
            console.log(err);
        });

    $('#cars-list').change(function () {
        let car = cars.find(car => car.id === +this.value);

        setImagesIntoGallery(car.images, car.name);
    });
});

$("#contact-us-form").validate({
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 16,
            maxlength: 16
        }
    },
    messages: {
        name: {
            required: "Поле для введення імені є обов'язковим",
            minlength: "Мінімальна довжина в два символи"
        },
        email: {
            required: "Поле для введення email є обов'язковим",
            email: "Ваш email-адрес має бути в форматі name@domain.com"
        },
        phone: {
            required: "Номер телефону є обов'язковим для заповнення",
            minlength: "Номер телефону введено в не коректному форматі",
            maxlength: "Номер телефону введено в не коректному форматі"
        }
    },
    submitHandler: function(form) {
        let data = $(form).serializeArray().reduce((ac, cur) => {
                ac[cur.name] = cur.value;
                return ac;
        }, {});

        axios.post("/sendEmail", data).then((response) => {
            $(form).trigger('reset');
        });
    },
    invalidHandler: function(event, validator) {
        // 'this' refers to the form
        const errors = validator.numberOfInvalids();
        console.log(errors);
        if (errors) {
            const message = errors == 1
                ? 'You missed 1 field. It has been highlighted'
                : 'You missed ' + errors + ' fields. They have been highlighted';
            $("div.error span").html(message);
            $("div.error").show();
        } else {
            $("div.error").hide();
        }
    }
});

$("form#contact-us-form :input, form#contact-us-form textarea").each(function () {
    $(this).on('input', transformInput);
    //$(this).on('click', transformInput);
});

function initDropDown(dataOfCars) {
    $('#cars-list').append(
        [
            "<optgroup label=\"До 22-х місць\">",
            ...dataOfCars.map((car, i) => {
                if(i === 0) {
                    return `<option value='${car.id}' selected>${car.name}</option>`
                }

                return `<option value='${car.id}'>${car.name}</option>`
            }),
            "</optgroup>"
        ]
    );
}

function initImageGallery(countOfImages) {
    let gallery = $('#image-gallery');

   imageGallery = gallery.lightSlider({
        gallery: true,
        autoWidth: false,
        item: 1,
        thumbItem: countOfImages,
        slideMargin: 0,
        speed:500,
        auto: false,
        loop: true,
        responsive : [
            {
                breakpoint:1920,
                settings: {
                    gallery: true,
                    autoWidth: false,
                    item: 1,
                    thumbItem: countOfImages,
                    slideMargin: 0,
                    speed:500,
                    auto: false,
                    loop: true,
                  }
            },
            {
                breakpoint:1024,
                settings: {
                    gallery: true,
                    autoWidth: false,
                    item: 1,
                    thumbItem: countOfImages,
                    slideMargin: 0,
                    speed:500,
                    auto: false,
                    loop: true,
                  }
            },
            {
                breakpoint:768,
                settings: {
                    gallery: true,
                    autoWidth: false,
                    item: 1,
                    thumbItem: countOfImages,
                    slideMargin: 0,
                    speed:500,
                    auto: false,
                    loop: true,
                  }
            },
            {
                breakpoint:320,
                settings: {
                    gallery: true,
                    autoWidth: false,
                    item: 1,
                    thumbItem: countOfImages,
                    slideMargin: 0,
                    speed:500,
                    auto: false,
                    loop: true,
                  }
            }
        ],
        onSliderLoad: function() {
           // $(`#${id}`).remove();
            gallery.removeClass('cS-hidden');
        }
    });
}

function transformInput() {
    let parent = $(this).parent();
    let span = parent.find('span.input-name');
    if(this.value && this.value !== '') {
        span.css( 'transform', 'translateY(-22px) scale(0.8)');
    } else {
        span.css( 'transform', 'scaleX(1)');
    }
}

function setImagesIntoGallery(images, carName) {
    let gallery = $('#image-gallery');

    let imageGalleryItems = images.map(imageUrl => {
        return `<li data-thumb="${imageUrl}"> 
                    <img src="${imageUrl}" alt="${carName}"/>
                 </li>`;
    });

    if( gallery.children().length > 0) {
        imageGallery && imageGallery.destroy();
        gallery.empty();
        gallery.append(imageGalleryItems);
        initImageGallery(images.length);
    } else {
        gallery.append(imageGalleryItems);
    }
}
