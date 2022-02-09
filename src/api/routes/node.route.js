module.exports = function (app) {
  const node = require('../controllers/node.controller');

  // Create a new node
  app.post('/node', node.create);

  // Retrieve all node
  app.get('/node', node.getAll);

  // Update a node with Id
  app.put('/node/update/:id', node.update);

  // Delete a node with Id
  app.delete('/node/delete/:id', node.delete);
};
