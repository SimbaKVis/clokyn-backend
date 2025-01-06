const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  console.log('POST /register accessed');
  const { firstName, lastName, emailAddress, password, role } = req.body;

  try {
    // Validate inputs
    if (!firstName || !lastName || !emailAddress || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      role,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  console.log('POST /login accessed');
  const { emailAddress, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!emailAddress || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { emailAddress } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { userId: user.userId, firstName: user.firstName, emailAddress: user.emailAddress },
      process.env.JWT_SECRET,  // Secret key from environment variables
      { expiresIn: '1h' }     // Token expiration time
    );

    // Respond with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

module.exports = router;
