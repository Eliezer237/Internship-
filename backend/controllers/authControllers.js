// backend/controllers/authControllers.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Correct model import

// Test function
const test = (req, res) => {
  res.json("Test is working");
};

// Register user function
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({
        error: 'Password is required and should be at least 8 characters long',
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email is already in use',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // bcrypt salt rounds

    // Create a new user instance and save to the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Send success response
    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error, please try again later',
    });
  }
};

module.exports = { test, registerUser };