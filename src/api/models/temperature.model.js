module.exports = (sequelize, Sequelize) => {
  const Temperature = sequelize.define('Temperature', {
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

  return Temperature;
};
