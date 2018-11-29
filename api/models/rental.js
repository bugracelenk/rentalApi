const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}));

module.exports = Rental;