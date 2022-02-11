module.exports = function (app) {
  const temperature = require('../controllers/temperature.controller');

  // Create a new temperature value
  app.post('/temperature', temperature.create);

  // Retrieve all temperature values
  // app.get('/temperature', temperature.getAll);
  app.get('/temperature', (req, res) => {
    const query = req.query;
    
    if (Object.keys(query).length === 0) {
      temperature.getAll(req, res);
    } else {
      let nodeId = query.nodeId;
      let startDate = query.startDate;
      let startTime = query.startTime;
      let endDate = query.endDate;
      let endTime = query.endTime;

      let current = new Date();
      let day = current.getDate().toString().padStart(2, '0');
      let month = (current.getMonth() + 1).toString().padStart(2, '0');
      let year = current.getFullYear().toString();
      let hours = current.getHours().toString().padStart(2, '0');
      let minutes = current.getMinutes().toString().padStart(2, '0');
      let seconds = current.getSeconds().toString().padStart(2, '0');
      let milliseconds = current.getMilliseconds().toString().padStart(3, '0');
      // let timezone = (current.getTimezoneOffset() * (-1)) / 60;
      // timezone = (timezone > 0) ? ('+' + timezone.toString().padStart(2, '0')) : ('-' + (timezone * -1).toString().padStart(2, '0'));

      let dateFilters = new Object();
      dateFilters.startDate = startDate;
      dateFilters.startDate += ' ' + ((startTime !== undefined) ? startTime : '00:00:00.00');
      // dateFilters.startDate += timezone;
      // dateFilters.startTime = (startTime !== undefined) ? startTime : '00:00:00.00';

      if (endDate !== undefined) {
        dateFilters.endDate = endDate;
        dateFilters.endDate += ' ' + ((endTime !== undefined) ? endTime : '23:59:59.999');
      } else {
        dateFilters.endDate = year + '-' + month + '-' + day;
        dateFilters.endDate += ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
      }
      // dateFilters.endDate += timezone;
      // dateFilters.endTime = (endDate !== undefined) ? endDate : hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

      let flag = true;

      if (nodeId !== undefined) {
        if (startDate !== undefined) {
          temperature.getAllByTimeFilters(req, res, nodeId, dateFilters);
          // console.log(dateFilters);
          flag = false;
        } else {
          temperature.getAllByNodeId(req, res, nodeId);
          flag = false;
        }
      }

      if (flag) {
        res.status(404).json();
      }
    }
  });

  // Retrieve all temperature values that has node id
  // app.get('/temperature/?node_id=:nodeId', temperature.getAllByNodeId);

  // Update a temperature value with Id
  app.put('/temperature/update/:id', temperature.update);

  // Delete a temperature value with Id
  app.delete('/temperature/delete/:id', temperature.delete);
};
