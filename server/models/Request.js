const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        surname: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        email: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        phoneNumber: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        text: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        confirmed: {
            type: mongoose.SchemaTypes.Boolean,
            default: false,
            required: true
        }
    }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;