const db = require('../configs/db.config');

const AlertLog = db.alertLog;

// Post a Alert Log
exports.create = (req, res) => {
  // Save to PostgreSQL database
  AlertLog.create(req.body).then((alertLog) => {
    // Send created alert log to client
    res.json(alertLog);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Fetch all alert logs by node id
exports.getByNodeId = (req, res) => {
  const { nodeId } = req.params;

  AlertLog.findAll({ where: { nodeId: nodeId } }).then((alertLog) => {
    res.json(alertLog);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Alert Logs
exports.getAll = (req, res) => {
  AlertLog.findAll().then((alertLog) => {
    // Send All Alert Logs to Client
    res.json(alertLog.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Alert Log
exports.update = (req, res) => {
  const { id } = req.params;

  AlertLog.update(req.body, { where: { id: id } }).then((test) => {
    res.status(200).json({ mgs: `Updated Successfully -> Alert Log Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Alert Log by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  AlertLog.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Alert Log Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
