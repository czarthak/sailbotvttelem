// models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  s1: {
    type: String,
    required: false
  },
  s2: {
    type: String,
    required: false
  }
});

module.exports = Book = mongoose.model('book', BookSchema);