const db = require('../configs/db.config');

const Node = db.node;

// Post a Node
exports.create = (req, res) => {
  // Save to PostgreSQL database
  console.log(req.body);
  // Node.create(req.body).then((node) => {
  //   // Send created Node to client
  //   res.json(node);
  // }).catch((err) => {
  //   console.log(err);
  //   res.status(500).json({ msg: 'error', details: err });
  // });
};

// FETCH All Node
exports.getAll = (req, res) => {
  console.log(Node);
  Node.findAll().then((node) => {
    // Send All Node to Client
    res.json(node.sort((c1, c2) => c1.id - c2.id));
    console.log(node);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Node
exports.update = (req, res) => {
  const id = req.param;
  Node.update(req.body, { where: id }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Node Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Node by Id
exports.delete = (req, res) => {
  const id = req.param;
  Node.destroy({ where: id }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Node Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
