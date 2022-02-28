module.exports = (sequelize, Sequelize) => {
  const TemperatureAlert = sequelize.define('TemperatureAlert', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    minValue: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    maxValue: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return TemperatureAlert;
};
