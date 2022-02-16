module.exports = function (app) {
  const humidity = require('../controllers/humidity.controller');

  // Create a new humidity value
  app.post('/humidity', humidity.create);

  // Retrieve humidity values
  app.get('/humidity', humidity.controlFetchCommands);

  // Update a humidity value with Id
  app.put('/humidity/update/:id', humidity.update);

  // Delete a humidity value with Id
  app.delete('/humidity/delete/:id', humidity.delete);
};
