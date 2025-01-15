const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the PostgreSQL database
const sequelize = new Sequelize('postgres://postgres:Dbrng25.@localhost:5432/clokyn', {
    dialect: 'postgres',  // Specify PostgreSQL dialect
    logging: false,       // Disable SQL query logging
});

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Force sync (drops existing tables and recreates them based on the model)
sequelize.sync({ force: false }) // This will drop and recreate tables
  .then(() => {
    console.log('DB Tables synced!');
  })
  .catch((err) => {
    console.error('Error syncing tables:', err.message);
  });

module.exports = sequelize;