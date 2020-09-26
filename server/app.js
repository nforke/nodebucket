/*
=============================================================
; Title:  app.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   25 September 2020
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
const port = 3000; // server port

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

// FindEmployeeById API
app.get('/api/employees/:empId', async(req, res) =>{

  try {
// look in employees collection using this value
    Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
      
      // database level error message
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!'
        })
      } else { // no error return data
        console.log(employee);
        res.json(employee);
      }
    })


  } catch (e) { // catch any potential errors
    console.log(e);

    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
})
// end FindEmployeeById API

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function