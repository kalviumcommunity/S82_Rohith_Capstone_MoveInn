const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingSchema');






router.post('/create', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
