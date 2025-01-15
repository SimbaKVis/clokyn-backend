const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Department = require('./Department');
const Team = require('./Team'); 

const User = sequelize.define('User', {
  userId: { 
    type: DataTypes.UUID, 
    primaryKey: true, 
    defaultValue: DataTypes.UUIDV4 
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  emailAddress: DataTypes.STRING,
  role: DataTypes.CHAR,
  eligibleShifts: DataTypes.ARRAY(DataTypes.UUID),
  password: { 
    type: DataTypes.STRING 
  },
  createdDate: DataTypes.DATE,
  updatedDate: DataTypes.DATE,

  department: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  team: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  language: { 
    type: DataTypes.ENUM('English', 'Spanish', 'French', 'German'), 
    allowNull: true 
  },
  location: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  status: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: true 
  }
});

User.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(User, { foreignKey: 'departmentId' });

User.belongsTo(Team, { foreignKey: 'teamId' }); 
Team.hasMany(User, { foreignKey: 'teamId' });  

module.exports = User;
