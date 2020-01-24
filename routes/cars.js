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

module.exports = router;
