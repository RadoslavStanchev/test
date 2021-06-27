const mongoose = require('mongoose');

const tripScheme = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
        minlength: 4,
    },
    endPoint: {
        type: String,
        required: true,
        minlength: 4, 
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    carImage: {
        type: String,
        required: true,
    },
    carBrand: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        min: 0,
        max: 4,
        required: true,
    },
    price: {
        type: Number,
        min: 1,
        max: 50,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    buddies: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

// courseScheme.pre('save', function(next) {
//     this.createdAt = new Date();

//     next();
// })

module.exports = mongoose.model('Trip', tripScheme);