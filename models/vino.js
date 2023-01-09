const { Schema, model } = require('mongoose');

const WineSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    graduation: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});


module.exports = model( 'Wine', WineSchema );