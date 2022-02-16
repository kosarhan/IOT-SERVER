module.exports = function (app) {
  const temperature = require('../controllers/temperature.controller');

  // Create a new temperature value
  app.post('/temperature', temperature.create);

  // Retrieve temperature values
  app.get('/temperature', temperature.controlFetchCommands);

  // Update a temperature value with Id
  app.put('/temperature/update/:id', temperature.update);

  // Delete a temperature value with Id
  app.delete('/temperature/delete/:id', temperature.delete);
};
