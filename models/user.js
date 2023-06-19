/* Name: Maria Macias
StudentId: 301290835
Date: June 18th 2023
File name: models/users.js */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', UserSchema, 'user')