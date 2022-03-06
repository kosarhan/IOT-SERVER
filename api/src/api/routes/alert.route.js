module.exports = function (app) {
  const alert = require('../controllers/alert.controller');

  // Create a new alert
  app.post('/alert', alert.create);

  // Retrieve an alert by node id
  app.get('/alert/:nodeId', alert.getByNodeId);

  // Retrieve all alerts
  app.get('/alert', alert.getAll);

  // Update an alert with Id
  app.put('/alert/update/:id', alert.update);

  // Delete an alert with Id
  app.delete('/alert/delete/:id', alert.delete);
};
