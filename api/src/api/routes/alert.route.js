module.exports = function (app) {
  const alert = require('../controllers/alert.controller');

  // Create a new alert
  app.post('/alert', alert.create);

  // Retrieve an alert by id
  // app.get('/alert/:id', temperatureAlert.getById);

  // Retrieve all alerts
  app.get('/alert', alert.getAll);

  // Update an alert with Id
  app.put('/alert/update/:id', alert.update);

  // Delete an alert with Id
  app.delete('/alert/delete/:id', alert.delete);
};
