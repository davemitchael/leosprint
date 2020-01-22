let cars = [];
$(document).ready(function () {
    $('#phone').mask('+380-0000-000-00');

    axios.get('/cars/getAll')
        .then(res => res.data)
        .then(data => {
            cars = data.cars;

            initDropDown(cars);
        })
        .catch(err => {
            console.log(err);
        })
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

$('#cars-list').change(function () {
    setCar(cars.find(car => car.id === +this.value).imgUrl);
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

    setCar(dataOfCars[0].imgUrl);
}

function setCar(imageUrl) {
    $('#gallery_main').css('background-image', 'url(' + imageUrl + ')');
}

$("form#contact-us-form :input, form#contact-us-form textarea").each(function () {
    $(this).on('input', translateInput);
    $(this).on('click', translateInput);
});

function translateInput() {
    let parent = $(this).parent();
    let span = parent.find('span.input-name');
    if(this.value && this.value !== '') {
        span.css( 'transform', 'translateY(-22px) scale(0.8)');
    } else {
        span.css( 'transform', 'scaleX(1)');
    }
}
