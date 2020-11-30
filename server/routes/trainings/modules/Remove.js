const express = require('express');
const app = express();

const mongoose = require('mongoose');
const to = require('await-to-js').default;

const Training = require('../../../models/Training');

app.post('/', [], async (req, res) => {

    const {
        trainingId
    } = req.body;

    const [err, _] = await to(
        Training.findByIdAndDelete(
            {_id: new mongoose.Types.ObjectId(trainingId)}
        )
    );
    if(err) throw err;

    res.send({
        success: true,
    });
});

module.exports = app;