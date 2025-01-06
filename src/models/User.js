const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  userId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  emailAddress: DataTypes.STRING,
  role: DataTypes.CHAR,
  eligibleShifts: DataTypes.ARRAY(DataTypes.UUID),
  password: { type: DataTypes.STRING },
  createdDate: DataTypes.DATE,
  updatedDate: DataTypes.DATE
});

module.exports = User;
