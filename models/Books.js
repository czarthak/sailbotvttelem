// models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  s1: {
    type: String,
    required: true
  },
  s2: {
    type: String,
    required: true
  }
});

module.exports = Book = mongoose.model('book', BookSchema);