const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SECRET, SALT_ROUNDS} = require('../config/index');

const userScheme = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: /^[A-Za-z0-9+_.-]+@(.+)$/,
    },

    password: {
        type: String,
        required: true,
        minlength: 4,
    },

    genderType: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },

    tripsHistory: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip'
    }
});

userScheme.pre('save', function(next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
})

module.exports = mongoose.model('User', userScheme)