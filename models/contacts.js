/* Name: Maria Macias
StudentId: 301290835
Date: June 18th 2023
File name: models/contacts.js */
const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('contacts', ContactsSchema, 'contacts')