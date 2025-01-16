const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
console.log(User );

//Adds user to db via createuserform
router.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password, location, 
      language, role, departmentId, teamId,} = req.body;
    console.log("Received data:", req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword, 
      location,
      language,
      role,
      departmentId,
      teamId,
      status: true, 
      eligibleShifts: null
    });

    res.status(201).json(newUser); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

//get all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log('Fetched users:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get user by ID
router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user by ID
router.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, emailAddress, location, language, role, departmentId, teamId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.emailAddress = emailAddress || user.emailAddress;
      user.location = location || user.location;
      user.language = language || user.language;
      user.role = role || user.role;
      user.departmentId = departmentId || user.departmentId;
      user.teamId = teamId || user.teamId;

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
