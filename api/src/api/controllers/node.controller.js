const db = require('../configs/db.config');

const Node = db.node;

// Post a Node
exports.create = (req, res) => {
  Node.create(req.body).then((node) => {
    // Send created Node to client
    res.json(node);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Fetch Node By Id
exports.getById = (req, res) => {
  const { id } = req.params;
  Node.findByPk(id).then((node) => {
    res.json(node);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err});
  });
};

// FETCH All Node
exports.getAll = (req, res) => {
  Node.findAll().then((node) => {
    // Send All Node to Client
    res.json(node.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Node
exports.update = (req, res) => {
  const id = req.params.id;
  Node.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Node Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Node by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Node.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Node Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
