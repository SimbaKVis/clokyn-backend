module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Shift', {
      shiftId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      shiftName: DataTypes.STRING,
      shiftStartTime: DataTypes.DATE,
      shiftEndTime: DataTypes.DATE,
      shiftDuration: DataTypes.INTEGER,
      shiftLocation: DataTypes.STRING,
      shiftTypeId: DataTypes.UUID,
      userId: DataTypes.UUID
    });
  };
  