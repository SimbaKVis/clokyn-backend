const express = require('express');
const Department = require('../models/Department'); 
const Team = require('../models/Team')
const router = express.Router();

router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.findAll(); 
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});


router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll(); 
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
