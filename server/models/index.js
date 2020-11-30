const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/coolsite';

const connectDb = () => {
    return mongoose.connect(DATABASE_URL);
};

module.exports = {connectDb}