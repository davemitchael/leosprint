let cars = [];
let imageGallery = '';

const mainAppIds = {
    formId: 'contact-us-form',
    dropDownId: 'cars-list',
    imageGalleryId: 'image-gallery',
    phoneInputId: 'phone'
};

const modalWindowIds = {
    formId: 'modal-contact-us-form',
    dropDownId: 'modal-cars-list',
    imageGalleryId: 'modal-image-gallery',
    phoneInputId: 'modal-phone'
};

$(document).ready(function () {
    axios.get('/cars/getAll')
        .then(res => res.data)
        .then(data => {
            cars = data.cars;

            initApp(mainAppIds);
        })
        .catch(err => {
            console.log(err);
        });


    $('#price').on('click', () => {
        toggleModalMenu();

        if($('#modal-menu').hasClass('active')) {
            toggleModalContent(true);
            initApp(modalWindowIds);
            toggleMainForm(false);
        } else {
            toggleModalContent(false);
            toggleMainForm(true);
            initApp({ ...mainAppIds, reInitGallery: true});
        }
    })
});

function initApp({ formId, dropDownId, imageGalleryId, phoneInputId, reInitGallery = false}) {
    if(reInitGallery) {
        let imageGallery =  $(`#${imageGalleryId}`);
        imageGallery.empty();
        initImageGallery(imageGalleryId,cars[0].images.length);
    }

    initFormValidation(formId);
    initFormTextTransform(formId);
    initPhoneMask(phoneInputId);
    initDropDown(dropDownId,cars);
    setImagesIntoGallery(imageGalleryId, cars[0].images, cars[0].name);
    initImageGallery(imageGalleryId,cars[0].images.length);
    initDropDownChange(dropDownId, imageGalleryId);
}

function toggleModalMenu() {
    $('#modal-menu').toggleClass('active');
    $('#price').toggleClass('active');
}

function toggleModalContent(show) {
    let modalGallery = $('div.modal-gallery');
    let modalForm = $(`#modal-contact-us-form`);

    if(show) {
        modalGallery.slideDown();
        modalForm.slideDown();
    }
    else {
        modalGallery.slideUp();
        modalForm.slideUp();
    }
}

function toggleMainForm(show) {
    let mainForm = $(`#contact-us-form`);
    let mainGallery = $(`#gallery_main`);

    if(show) {
        mainForm.slideDown();
        mainGallery.slideDown();
    } else {
        mainForm.slideUp();
        mainGallery.slideUp();
    }
}

function initPhoneMask(phoneInputId) {
    $(`#${phoneInputId}`).mask('+380-0000-000-00');
}

function initFormTextTransform(formId) {
    $(`form#${formId} :input, form#${formId} textarea`).each(function () {
        $(this).on('input', transformInput);
        //$(this).on('click', transformInput);
    });
}

function initFormValidation(formId) {
    $(`#${formId}`).validate({
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

                if($('#modal-menu').hasClass('active')) {
                    toggleModalMenu();
                }
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
}

function initDropDown(elementId,dataOfCars) {
    let dropDown = $(`#${elementId}`);

    if(dropDown.children().length > 0) {
        dropDown.empty();
    }

    dropDown.append(
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

function initImageGallery(galleryId, countOfImages) {
    let gallery = $(`#${galleryId}`);

    imageGallery && imageGallery.destroy();
    imageGallery = '';

   imageGallery = gallery.lightSlider({
        gallery: true,
        autoWidth: false,
        item: 1,
        thumbItem: countOfImages,
        slideMargin: 0,
        speed:500,
        auto: false,
        loop: true,
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

function setImagesIntoGallery(galleryId, images, carName) {
    let gallery = $(`#${galleryId}`);

    let imageGalleryItems = images.map(imageUrl => {
        return `<li data-thumb="${imageUrl}"> 
                    <img src="${imageUrl}" alt="${carName}"/>
                 </li>`;
    });

    if( gallery.children().length > 0) {
        imageGallery && imageGallery.destroy();
        gallery.empty();
        gallery.append(imageGalleryItems);
        initImageGallery(galleryId, images.length);
    } else {
        gallery.append(imageGalleryItems);
    }
}

function initDropDownChange(dropDownId, galleryId) {
    $(`#${dropDownId}`).change(function () {
        let car = cars.find(car => car.id === +this.value);

        setImagesIntoGallery(galleryId, [...car.images], car.name);
    });
}
