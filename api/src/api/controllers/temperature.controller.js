const { Op } = require('sequelize');
const db = require('../configs/db.config');

const Temperature = db.temperature;
const Node = db.node;
const AlertLog = db.alertLog;
const Alert = db.alert;
const TemperatureAlert = db.temperatureAlert;

// Post a Temperature Value
exports.create = (req, res) => {
  // Save to PostgreSQL database
  Temperature.create(req.body).then((temperature) => {
    Alert.findOne({ where: { nodeId: temperature.nodeId } }).then((alert) => {
      if (alert.temperatureAlertId !== 1) {
        Node.findByPk(temperature.nodeId).then((node) => {
          TemperatureAlert.findByPk(alert.temperatureAlertId).then((temperatureAlert) => {
            let logMessage;
            if (temperature.value > temperatureAlert.maxValue) {
              logMessage = 'The temperature value is too high for ';
              logMessage = logMessage.concat(node.name,
                '. The alert type is ', temperatureAlert.name,
                '. The temperature value is ', temperature.value, '.');
              const alertLog = {
                nodeId: temperature.nodeId,
                message: logMessage
              };

              AlertLog.create(alertLog).then()
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ msg: 'error', details: err });
                });
            } else if (temperature.value < temperatureAlert.minValue) {
              logMessage = 'The temperature value is too low for ';
              logMessage = logMessage.concat(node.name,
                '. The alert type is ', temperatureAlert.name,
                '. The temperature value is ', temperature.value, '.');

              const alertLog = {
                nodeId: temperature.nodeId,
                message: logMessage
              };

              AlertLog.create(alertLog).then()
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ msg: 'error', details: err });
                });
            }
          });
        });
      }
    });
    // Send created temperature value to client
    res.json(temperature);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

exports.controlFetchCommands = (req, res) => {
  const { query } = req;

  if (Object.keys(query).length === 0) {
    this.getAll(req, res);
  } else {
    const {
      nodeId, startDate, endDate, page, pageSize
    } = query;
    const dateFilters = {};

    dateFilters.startDate = new Date(startDate);
    dateFilters.endDate = (endDate === undefined) ? new Date(Date.now()) : new Date(endDate);

    let flag = true;

    if (nodeId !== undefined) {
      if (startDate !== undefined) {
        this.getAllByTimeFiltersWithId(req, res, nodeId, dateFilters, page, pageSize);
        // console.log(dateFilters);
        flag = false;
      } else {
        this.getAllByNodeId(req, res, nodeId, page, pageSize);
        flag = false;
      }
    } else if (startDate !== undefined) {
      this.getAllByTimeFilters(req, res, dateFilters);
      flag = false;
    } else {
      this.getAll(req, res);
      flag = false;
    }

    if (flag) {
      res.status(404).json();
    }
  }
};

// FETCH All Temperature Values
exports.getAll = (req, res) => {
  Temperature.findAll().then((temperature) => {
    // Send All Temperature Values to Client
    res.json(temperature.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Temperature Values That Has Node Id
exports.getAllByNodeId = (req, res, nodeId, page = undefined, pageSize = undefined) => {
  // const nodeId = req.params.nodeId;
  let options;

  if (pageSize === undefined) {
    options = { where: { nodeId } };
  } else {
    if (page === undefined) { page = 0; }

    options = {
      where: { nodeId },
      offset: page * pageSize,
      limit: pageSize
    };
  }

  Temperature.findAll(options).then((temperature) => {
    // Send All Temperature Values to Client
    res.json(temperature.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Temperature Values That Has Node Id due to start and end dates
exports.getAllByTimeFiltersWithId = (req, res, nodeId, dateFilters, page = undefined,
  pageSize = undefined) => {
  // const nodeId = req.params.nodeId;
  const { startDate, endDate } = dateFilters;

  let options;

  if (pageSize === undefined) {
    options = {
      where: {
        nodeId,
        // updatedAt: { [Op.between]: [startDate, endDate] }
        updatedAt: {
          [Op.gt]: startDate,
          [Op.lt]: endDate
        }
      }
    };
  } else {
    if (page === undefined) { page = 0; }

    options = {
      where: {
        nodeId,
        // updatedAt: { [Op.between]: [startDate, endDate] }
        updatedAt: {
          [Op.gt]: startDate,
          [Op.lt]: endDate
        }
      },
      offset: page * pageSize,
      limit: pageSize
    };
  }

  Temperature.findAll(options).then((temperature) => {
    // Send All Temperature Values to Client
    res.json(temperature.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Temperature Values due to start and end dates
exports.getAllByTimeFilters = (req, res, dateFilters) => {
  // const nodeId = req.params.nodeId;
  const startDate = new Date(dateFilters.startDate);
  const endDate = new Date(dateFilters.endDate);

  Temperature.findAll({
    where: {
      // updatedAt: { [Op.between]: [startDate, endDate] }
      updatedAt: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  }).then((temperature) => {
    // Send All Temperature Values to Client
    res.json(temperature.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Temperature Value
exports.update = (req, res) => {
  const { id } = req.params;
  Temperature.update(req.body, { where: { id } }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Temperature Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Temperature Value by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  Temperature.destroy({ where: { id } }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Temperature Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
