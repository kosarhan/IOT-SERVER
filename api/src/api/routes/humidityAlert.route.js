module.exports = function (app) {
  const humidityAlert = require('../controllers/humidityAlert.controller');

  // Create a new humidity alert
  app.post('/humidity_alert', humidityAlert.create);

  // Retrieve humidity by id
  // app.get('/humidity_alert/:id', humidityAlert.getById);

  // Retrieve all humidity
  app.get('/humidity_alert', humidityAlert.getAll);

  // Update a humidity with Id
  app.put('/humidity_alert/update/:id', humidityAlert.update);

  // Delete a humidity with Id
  app.delete('/humidity_alert/delete/:id', humidityAlert.delete);
};
