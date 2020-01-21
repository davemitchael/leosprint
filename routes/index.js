const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'LEOSPRINT' });
});


router.post('/sendEmail', function (req, res, next) {
    let mailOptions = {
        from: '',
        to: '',
        subject: 'Order',
        text: `${req.body.name} \n ${req.body.text} \n ${req.body.email}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.status(500).send("Cannot send email");
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});

module.exports = router;
