module.exports = function (app) {
  const temperature = require('../controllers/temperature.controller');

  // Create a new temperature value
  app.post('/temperature', temperature.create);

  // Retrieve all temperature values
  app.get('/temperature', temperature.getAll);

  // Retrieve all temperature values that has node id
  app.get('/temperature/?node=:nodeId', temperature.getAllByNodeId);

  // Update a temperature value with Id
  app.put('/temperature/update/:id', temperature.update);

  // Delete a temperature value with Id
  app.delete('/temperature/delete/:id', temperature.delete);
};
