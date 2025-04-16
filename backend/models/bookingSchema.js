const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  busId: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'confirmed',
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
