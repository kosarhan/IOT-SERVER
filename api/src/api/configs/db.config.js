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
db.humidity = require('../models/humidity.model')(sequelize, Sequelize);
db.alert = require('../models/alert.model')(sequelize, Sequelize);
db.temperatureAlert = require('../models/temperatureAlert.model')(sequelize, Sequelize);
db.humidityAlert = require('../models/temperatureAlert.model')(sequelize, Sequelize);

const Temperature = db.temperature;
const Node = db.node;
const Humidity = db.humidity;
const Alert = db.alert;
const TemperatureAlert = db.temperatureAlert;
const HumidityAlert = db.humidityAlert;

Node.hasMany(Temperature, { foreignKey: 'nodeId' });
Node.hasMany(Humidity, { foreignKey: 'nodeId' });
Node.hasOne(Alert, { foreignKey: 'nodeId' });
TemperatureAlert.hasOne(Alert, { foreignKey: 'nodeId' });
HumidityAlert.hasOne(Alert, { foreignKey: 'nodeId' });

module.exports = db;
