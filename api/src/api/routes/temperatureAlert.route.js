module.exports = function (app) {
  const temperatureAlert = require('../controllers/temperatureAlert.controller');

  // Create a new temperature alert
  app.post('/temperature_alert', temperatureAlert.create);

  // Retrieve temperature by id
  app.get('/temperature_alert/:id', temperatureAlert.getById);

  // Retrieve all temperature
  app.get('/temperature_alert', temperatureAlert.getAll);

  // Update a temperature with Id
  app.put('/temperature_alert/update/:id', temperatureAlert.update);

  // Delete a temperature with Id
  app.delete('/temperature_alert/delete/:id', temperatureAlert.delete);
};
