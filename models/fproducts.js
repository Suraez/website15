const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    faculty:{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Fproduct', bookSchema);