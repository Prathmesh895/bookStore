const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
}, { timestamps: true });

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descp: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  addas: {
    type: String,
    enum: ['publish', 'draft'],
    required: true,
  },
  publishDate: {
    type: Date,
  },
  auther: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: [ReviewSchema], // Added field for reviews
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

module.exports = { Book };
