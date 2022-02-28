const db = require('../configs/db.config');

const HumidityAlert = db.humidityAlert;

// Post a Humidity Alert
exports.create = (req, res) => {
  // Save to PostgreSQL database
  HumidityAlert.create(req.body).then((humidityAlert) => {
    // Send created humidity alert to client
    res.json(humidityAlert);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Humidity Alerts
exports.getAll = (req, res) => {
  HumidityAlert.findAll().then((humidityAlert) => {
    // Send All Humidity Alerts to Client
    res.json(humidityAlert.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Humidity Alert
exports.update = (req, res) => {
  const { id } = req.params;
  HumidityAlert.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Humidity Alert Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Humidity Alert by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  HumidityAlert.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Humidity Alert Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
