const express = require('express');
const app = express();

const to = require('await-to-js').default;

const Training = require('../../../models/Training');

app.get('/', async (req, res) => {
    const [err, trainings] = await to(
        Training.find()
    )
    if(err) throw err;

    res.send({
        success: true,
        trainings
    });
});

module.exports = app;