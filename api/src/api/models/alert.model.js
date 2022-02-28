module.exports = (sequelize, Sequelize) => {
  const Alert = sequelize.define('Alert', {
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return Alert;
};
