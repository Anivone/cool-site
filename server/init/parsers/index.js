const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = app => {
    app.use(cors());
    app.use(bodyParser());
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(session({
        secret: 'secret code',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000}
    }));
};
