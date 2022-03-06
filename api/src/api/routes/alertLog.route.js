module.exports = function (app) {
  const alertLog = require('../controllers/alertLog.controller');

  // Create a new alert log
  app.post('/alert_log', alertLog.create);

  // Retrieve alert logs by node id
  app.get('/alert_log/:nodeId', alertLog.getByNodeId);

  // Retrieve all alerts
  app.get('/alert_log', alertLog.getAll);

  // Update an alert with Id
  app.put('/alert_log/update/:id', alertLog.update);

  // Delete an alert with Id
  app.delete('/alert_log/delete/:id', alertLog.delete);
};
