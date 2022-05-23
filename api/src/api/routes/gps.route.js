module.exports = function (app) {
  const gps = require('../controllers/gps.controller');

  // Create a new GPS location value
  app.post('/gps', gps.create);

  // Retrieve GPS location values
  app.get('/gps', gps.controlFetchCommands);

  // Update a GPS location value with Id
  app.put('/gps/update/:id', gps.update);

  // Delete a GPS location value with Id
  app.delete('/gps/delete/:id', gps.delete);
};
