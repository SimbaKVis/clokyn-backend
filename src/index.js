const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth'); 
//const User = require('./models/User');
//const Shift = require('./models/shift');
//const ShiftType = require('./models/shifttype');
//const Department = require('./models/Department');
//const Team = require('./models/Team');
//const Language = require('./models/Language'); 
//const Location = require('./models/Location');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend server running...');
});

// Use Routes
app.use('/api', authRoutes); // Mount the auth.js routes at /api

// Sync Sequelize models to the database (drop and recreate tables)
sequelize.sync({ force: true }).then(() => {
    console.log('Dropped and recreated DB tables successfully!');
}).catch((err) => {
    console.log('Error syncing DB:', err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
