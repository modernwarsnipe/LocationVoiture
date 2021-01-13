'use strict';

const PORT = 3080;
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'accounts';

const bodyParser = require('body-parser');
const express = require('express');
const chalk = require('chalk');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var apiRoutesAccounts = require('./routes/api');
var htmRoutes = require('./routes/pug');

var config = {
    dbUri: MONGO_URI,
    dbName: DB_NAME,
    apiRoot: `http://localhost:${PORT}`
}

// Static views
app.use(express.static('assets'));

// Routes for the apiS
apiRoutesAccounts.addRoutes(app, config);
htmRoutes.addRoutes(app, config);

app.listen(PORT, () => {
    console.log(chalk.green.bold('Listening'), `to port ${PORT}`);
});
