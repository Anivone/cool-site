const express = require('express');
const app = express();

const to = require('await-to-js').default;

const Training = require('../../../models/Training');

app.post('/', [], async (req, res) => {

    const {
        title,
        shortDescription,
        detailedDescription
    } = req.body;

    console.log('req.body: ', req.body);

    const [err, _] = await to(
        new Training({
            title,
            shortDescription,
            detailedDescription
        }).save()
    );
    if(err) throw err;

    res.send({
        success: true,
    });
});

module.exports = app;