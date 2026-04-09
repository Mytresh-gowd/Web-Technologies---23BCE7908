const mongoose = require('mongoose');

// Define Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

// Create Model
const User = mongoose.model('User', userSchema);

module.exports = User;