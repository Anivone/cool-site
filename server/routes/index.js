module.exports = app => {
    app.use('/requests', require('./requests'));
    app.use('/trainings', require('./trainings'));
    app.use('/lang', require('./utils/Language'));
}