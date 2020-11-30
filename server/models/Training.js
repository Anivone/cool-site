const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
    {
        title: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        shortDescription: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        detailedDescription: {
            type: mongoose.SchemaTypes.String,
            required: true
        }
    }
);

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;