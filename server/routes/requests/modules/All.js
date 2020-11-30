const express = require('express');
const app = express();

const to = require('await-to-js').default;

const Request = require('../../../models/Request');

app.get('/', async (req, res) => {
    const [err, requests] = await to(
        Request.find()
    );
    if(err) throw err;

    res.send({
        success: true,
        requests
    });
});

module.exports = app;