const express = require('express');
const router = express.Router();
const fs = require("fs");
const fsPromises = fs.promises;
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'leosprint.server@gmail.com',
        pass: 'Leosprint2020'
    }
});

const mailTo = process.env.NODE_ENV === 'development' ? 'tarastykhyy@gmail.com' : 'ketskoryslan@ukr.net';

function createHtmlForMail({
                               carName,
                               clientName,
                               goOut,
                               email,
                               goTo,
                               phone,
                               details
                           }) {
    return fsPromises.readFile('./public/html-template/mail-template.html','utf8')
        .then(fileData => fileData.replace('{carName}', carName)
            .replace('{clientName}', clientName)
            .replace('{goOut}', goOut)
            .replace('{email}', email)
            .replace('{goTo}', goTo)
            .replace('{phone}', phone)
            .replace('{details}', details))
        .catch(err => err);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'LEOSPRINT' });
});


router.post('/sendEmail', function (req, res, next) {
    let carsData = JSON.parse(fs.readFileSync('./Data/CarsData.json')).cars;

    createHtmlForMail({
        carName: carsData.find(car => car.id === +req.body.carName).name,
        clientName: req.body.name,
        goOut: req.body.goOut || 'Не вказано',
        goTo: req.body.goTo || 'Не вказано',
        email: req.body.email,
        phone: `+${req.body.phone.replace(/\D/g, '')}`,
        details: req.body.details
    }).then(html => {
        let mailOptions = {
            from: 'leosprint.server@gmail.com',
            to: mailTo,
            subject: 'Нове замовлення',
            text: 'У вас нове замовлення',
            html: html
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.status(500).send("Cannot send email");
            } else {
                res.sendStatus(200);
            }
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;
