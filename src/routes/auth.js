const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure the path to User model is correct

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('POST /register accessed');
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;