module.exports = (sequelize, Sequelize) => {
  const HumidityAlert = sequelize.define('HumidityAlert', {
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

  return HumidityAlert;
};
