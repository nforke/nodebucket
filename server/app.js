/*
=============================================================
; Title:  app.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   30 September 2020
; Description: Server file for nodebucket
;============================================================
*/
/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee'); // get the employee model from the models collection
const EmployeeApi = require('./routes/employee-api');
const { env } = require('process');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
<<<<<<< HEAD
const port = process.env.PORT || 3000; // server port
=======
const port = env.process.PORT || 3000; // server port for application
>>>>>>> dev-branch

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket:ohBuckets@buwebdev-cluster-1.bznkj.mongodb.net/nodebucket';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */

 app.use('/api/employees', EmployeeApi);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
