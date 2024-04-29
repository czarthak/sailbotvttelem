// models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  s1: {
    type: String,
    required: false
  },
}, {timestamps : true});

module.exports = Book = mongoose.model('book', BookSchema);