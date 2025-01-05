module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ShiftType', {
      shiftTypeId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      shiftName: DataTypes.STRING,
      shiftCategory: DataTypes.CHAR
    });
  };
  