const express = require('express');
const app = express();

app.get('/', (req, res) => {

    // const lang = req.session.lang || 'eng';
    if(!req.session.lang) req.session.lang = 'eng';
    const lang = req.session.lang;

    res.send({
        lang
    })
})

app.post('/', (req, res) => {
    const { lang } = req.body;
    req.session.lang = lang;

    res.send({
        success: true,
        lang: req.session.lang
    })
})

module.exports = app;