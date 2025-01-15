const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
  departmentId: { 
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

module.exports = Department;
