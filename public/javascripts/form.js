$(document).ready(function () {
    $('input[type="tel"]').inputmask({ alias: "phone", "clearIncomplete": true });
});

$("#contact-us-form").validate({
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
