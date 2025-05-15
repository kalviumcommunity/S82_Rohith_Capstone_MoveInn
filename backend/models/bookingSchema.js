const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
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

  
  isConfirmed: {
    type: Boolean,
    default: false, 
  }

}, { timestamps: true }); 

module.exports = mongoose.model('Booking', bookingSchema);
