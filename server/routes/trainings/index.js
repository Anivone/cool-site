const express = require('express');
const app = express();

app.use('/all', require('./modules/All'));
app.use('/create', require('./modules/Create'));
app.use('/remove', require('./modules/Remove'));

module.exports = app;