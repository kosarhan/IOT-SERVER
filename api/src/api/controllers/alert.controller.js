const db = require('../configs/db.config');

const Alert = db.alert;

// Post a Alert
exports.create = (req, res) => {
  // Save to PostgreSQL database
  Alert.create(req.body).then((alert) => {
    // Send created alert to client
    res.json(alert);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Alerts
exports.getAll = (req, res) => {
  Alert.findAll().then((alert) => {
    // Send All Alerts to Client
    res.json(alert.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Alert
exports.update = (req, res) => {
  const { id } = req.params;
  Alert.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Alert Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Alert by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  Alert.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Alert Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
