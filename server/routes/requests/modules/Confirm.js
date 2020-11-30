const express = require('express');
const app = express();

const mongoose = require('mongoose');

const to = require('await-to-js').default;
const fs = require('fs');

const Request = require('../../../models/Request');

app.post('/switch',[], (req, res) => {

    const {
        title,
        domain,
        confirmationRequired
    } = req.body;

    fs.writeFile(
        'C:/Users/User/Desktop/frontback/coolsite/client/src/config/config.json',
        JSON.stringify({
            title,
            domain,
            confirmationRequired
        }, null, 2),
        (err) => {
            if(err) throw err;
        });

    res.send({
        success: true,
    })
});

app.post('/',[], async (req, res) => {

    const {
        requestId
    } = req.body;

    const [err, _] = await to(
        Request.findByIdAndUpdate(
            {_id: new mongoose.Types.ObjectId(requestId)},
            {confirmed: true}
        )
    );
    if(err) throw err;

    res.send({
        success: true,
    })
});

module.exports = app;