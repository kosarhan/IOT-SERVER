const { Op } = require('sequelize');
const db = require('../configs/db.config');

const Humidity = db.humidity;

// Post a Humidity Value
exports.create = (req, res) => {
  // Save to PostgreSQL database
  Humidity.create(req.body).then((humidity) => {
    // Send created humidity value to client
    res.json(humidity);
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

// FETCH All Humidity Values
exports.getAll = (req, res) => {
  Humidity.findAll().then((humidity) => {
    // Send All Humidity Values to Client
    res.json(humidity.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Humidity Values That Has Node Id
exports.getAllByNodeId = (req, res, nodeId) => {
  // const nodeId = req.params.nodeId;
  Humidity.findAll({ where: { nodeId: nodeId} }).then((humidity) => {
    // Send All Humidity Values to Client
    res.json(humidity.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Humidity Values That Has Node Id due to start and end dates
exports.getAllByTimeFiltersWithId = (req, res, nodeId, dateFilters) => {
  // const nodeId = req.params.nodeId;
  const { startDate, endDate } = dateFilters;

  Humidity.findAll({
    where: {
      nodeId,
      // updatedAt: { [Op.between]: [startDate, endDate] }
      updatedAt: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  }).then((humidity) => {
    // Send All Humidity Values to Client
    res.json(humidity.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// FETCH All Humidity Values due to start and end dates
exports.getAllByTimeFilters = (req, res, dateFilters) => {
  // const nodeId = req.params.nodeId;
  const startDate = new Date(dateFilters.startDate);
  const endDate = new Date(dateFilters.endDate);

  Humidity.findAll({
    where: {
      // updatedAt: { [Op.between]: [startDate, endDate] }
      updatedAt: {
        [Op.gt]: startDate,
        [Op.lt]: endDate
      }
    }
  }).then((humidity) => {
    // Send All Humidity Values to Client
    res.json(humidity.sort((c1, c2) => c1.id - c2.id));
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Update a Humidity Value
exports.update = (req, res) => {
  const { id } = req.params;
  Humidity.update(req.body, { where: { id: id} }).then(() => {
    res.status(200).json({ mgs: `Updated Successfully -> Humidity Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a Humidity Value by Id
exports.delete = (req, res) => {
  const { id } = req.params;
  Humidity.destroy({ where: { id: id} }).then(() => {
    res.status(200).json({ msg: `Deleted Successfully -> Humidity Value Id = ${id}` });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
