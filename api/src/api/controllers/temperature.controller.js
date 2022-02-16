const { Op } = require('sequelize');
const db = require('../configs/db.config');

const Temperature = db.temperature;

// Post a Temperature Value
exports.create = (req, res) => {
  // Save to PostgreSQL database
  Temperature.create(req.body).then((temperature) => {
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
    const { nodeId, startDate, endDate } = query;
    const dateFilters = {};

    dateFilters.startDate = new Date(startDate);
    dateFilters.endDate = (endDate === undefined) ? new Date(Date.now()) : new Date(endDate);

    let flag = true;

    if (nodeId !== undefined) {
      if (startDate !== undefined) {
        this.getAllByTimeFiltersWithId(req, res, nodeId, dateFilters);
        // console.log(dateFilters);
        flag = false;
      } else {
        this.getAllByNodeId(req, res, nodeId);
        flag = false;
      }
    } else if (startDate !== undefined) {
      this.getAllByTimeFilters(req, res, dateFilters);
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
exports.getAllByNodeId = (req, res, nodeId) => {
  // const nodeId = req.params.nodeId;
  Temperature.findAll({ where: { nodeId: nodeId} }).then((temperature) => {
    // Send All Temperature Values to Client
    res.json(temperature.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Temperature Values That Has Node Id due to start and end dates
exports.getAllByTimeFiltersWithId = (req, res, nodeId, dateFilters) => {
  // const nodeId = req.params.nodeId;
  const { startDate, endDate } = dateFilters;

  Temperature.findAll({
    where: {
      nodeId,
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
  const id = req.params.id;
  Temperature.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Temperature Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Temperature Value by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Temperature.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Temperature Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
