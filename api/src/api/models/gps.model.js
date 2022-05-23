module.exports = (sequelize, Sequelize) => {
    const GPS = sequelize.define('GPS', {
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true
    });
  
    return GPS;
  };
  