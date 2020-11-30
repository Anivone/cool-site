const express = require('express');
const app = express();

const mongoose = require('mongoose');

const to = require('await-to-js').default;

const Request = require('../../../models/Request');

app.post('/',[], async (req, res) => {

    const {
        requestId
    } = req.body;

    const [err, _] = await to(
        Request.findByIdAndDelete(
            {_id: new mongoose.Types.ObjectId(requestId)}
        )
    );
    if(err) throw err;

    res.send({
        success: true,
    })
});

module.exports = app;