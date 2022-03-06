const db = require('../configs/db.config');

const TemperatureAlert = db.temperatureAlert;

// Post a Temperature Alert
exports.create = (req, res) => {
  // Save to PostgreSQL database
  TemperatureAlert.create(req.body).then((temperatureAlert) => {
    // Send created temperature alert to client
    res.json(temperatureAlert);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Fetch A Temperature Alert
exports.getById = (req, res) => {
  const { id } = req.params;
  TemperatureAlert.findByPk(id).then((temperatureAlert) => {
    res.json(temperatureAlert);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Temperature Alerts
exports.getAll = (req, res) => {
  TemperatureAlert.findAll().then((temperatureAlert) => {
    // Send All Temperature Alerts to Client
    res.json(temperatureAlert.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Temperature Alert
exports.update = (req, res) => {
  const { id } = req.params;
  TemperatureAlert.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Temperature Alert Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Temperature Alert by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  TemperatureAlert.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Temperature Alert Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
