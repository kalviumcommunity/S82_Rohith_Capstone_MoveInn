const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const rateLimiter = require('./middleware/rateLimiter');



const app = express();
const PORT = 5000;
app.use(rateLimiter);


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); 


app.use('/api/auth', authRoutes);     
app.use('/api/bookings', bookingRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to MoveInn backend API 🚍');
});


mongoose.connect('mongodb://127.0.0.1:27017/moveinnDB')
  .then(() => {
    console.log('✅ MongoDB connected');


    const startCronJobs = require('./utils/cronjobs');
startCronJobs();


    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
