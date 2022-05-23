const { Op } = require('sequelize');
const db = require('../configs/db.config');

const GPS = db.GPS;
const Node = db.node;

// Post a GPS Location
exports.create = (req, res) => {
    GPS.create(req.body).then((gps) => {
        // Send created GPS to client
        res.json(gps);
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

// FETCH All GPS Location Values
exports.getAll = (req, res) => {
    GPS.findAll().then((gps) => {
        // Send All GPS Location Values to Client
        res.json(gps.sort((c1, c2) => c1.id - c2.id));
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};

// FETCH All GPS Location Values That Has Node Id
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

    GPS.findAll(options).then((gps) => {
        // Send All GPS Location Values to Client
        res.json(gps.sort((c1, c2) => c1.id - c2.id));
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};

// FETCH All GPS Location Values That Has Node Id due to start and end dates
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

    GPS.findAll(options).then((gps) => {
        // Send All GPS Location Values to Client
        res.json(gps.sort((c1, c2) => c1.id - c2.id));
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};

// FETCH All GPS Location Values due to start and end dates
exports.getAllByTimeFilters = (req, res, dateFilters) => {
    // const nodeId = req.params.nodeId;
    const startDate = new Date(dateFilters.startDate);
    const endDate = new Date(dateFilters.endDate);

    GPS.findAll({
        where: {
            // updatedAt: { [Op.between]: [startDate, endDate] }
            updatedAt: {
                [Op.gt]: startDate,
                [Op.lt]: endDate
            }
        }
    }).then((gps) => {
        // Send All GPS Location Values to Client
        res.json(gps.sort((c1, c2) => c1.id - c2.id));
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};

// Update a GPS Location Value
exports.update = (req, res) => {
    const { id } = req.params;
    GPS.update(req.body, { where: { id } }).then(() => {
        res.status(200).json({ mgs: `Updated Successfully -> GPS Location Value Id = ${id}` });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};

// Delete a GPS Location Value by Id
exports.delete = (req, res) => {
    const { id } = req.params;
    GPS.destroy({ where: { id } }).then(() => {
        res.status(200).json({ msg: `Deleted Successfully -> GPS Location Value Id = ${id}` });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'error', details: err });
    });
};
