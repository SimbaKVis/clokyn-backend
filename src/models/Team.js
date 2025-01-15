const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define('Team', {
  teamId: { 
    type: DataTypes.UUID, 
    primaryKey: true, 
    defaultValue: DataTypes.UUIDV4 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true     
  }
});

module.exports = Team;
