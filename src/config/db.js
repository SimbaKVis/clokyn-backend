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

module.exports = sequelize;