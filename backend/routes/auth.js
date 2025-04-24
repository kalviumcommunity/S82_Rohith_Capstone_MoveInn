const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({ status: 'error', msg: 'Please provide name, email, and password' });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ status: 'error', msg: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ status: 'error', msg: 'Password must be at least 6 characters long' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: 'error', msg: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      msg: 'Signup successful',
      user: { _id: newUser._id, name, email }
    });
  } catch (err) {
    console.error('Signup error:', err);  // Log the error
    res.status(500).json({ status: 'error', msg: 'Error signing up', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ status: 'error', msg: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: 'error', msg: 'User not found' });

    // Compare the password with the hashed one in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: 'error', msg: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      msg: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);  // Log the error
    res.status(500).json({ status: 'error', msg: 'Error logging in', error: err.message });
  }
});

module.exports = router;
