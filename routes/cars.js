const express = require('express');
const fs = require("fs");
const router = express.Router();

router.get('/getAll', function(req, res, next) {
    console.log("env", process.env.NODE_ENV);

    fs.readFile(`./Data/CarsData.json`, (err, data) => {
        if(err) {
            res.status(500).send(err.message);
        }
        res.status(200).send(JSON.parse(data));
    })
});

router.get('/getEnv', function (req, res, next) {
    res.status(200).send({env: process.env.NODE_ENV});
});

module.exports = router;
