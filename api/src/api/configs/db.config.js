const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
// db.user = require('../models/user.model')(sequelize, Sequelize);
db.node = require('../models/node.model')(sequelize, Sequelize);
db.temperature = require('../models/temperature.model')(sequelize, Sequelize);

const Temperature = db.temperature;
const Node = db.node;

Node.hasMany(Temperature, { foreignKey: 'nodeId' });

module.exports = db;
