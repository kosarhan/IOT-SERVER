module.exports = (sequelize, Sequelize) => {
  const Humidity = sequelize.define('Humidity', {
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return Humidity;
};
