module.exports = (sequelize, Sequelize) => {
  const AlertLog = sequelize.define('AlertLog', {
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return AlertLog;
};
