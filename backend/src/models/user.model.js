const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
})

const User = mongoose.model('User', userSchema)

module.exports = User