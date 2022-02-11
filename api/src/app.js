const express = require('express');

const app = express();
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

require('dotenv').config();

const middlewares = require('./middlewares');

app.get('/', (req, res) => {
  res.json({
    message: 'Data Visualization NodeJS For DIY Waziup Gateway',
  });
});

const db = require('./api/configs/db.config');

require('./api/routes/node.route')(app);
require('./api/routes/temperature.route')(app);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Create a Server
var server = app.listen(8080, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
})
