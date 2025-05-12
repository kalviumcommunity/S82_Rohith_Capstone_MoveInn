const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup for both local and deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // local frontend
    'https://your-frontend-domain.com' // 🔁 replace this with your real deployed frontend URL
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to MoveInn backend API 🚍');
});

// ✅ MongoDB connection using ENV variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
