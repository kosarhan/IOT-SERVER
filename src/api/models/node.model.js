module.exports = (sequelize, Sequelize) => {
  const Node = sequelize.define('Node', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return Node;
};
