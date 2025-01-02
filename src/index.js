const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Clokyn API is running...');
});

// Sync Sequelize models to the database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.log('Error syncing database:', err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});