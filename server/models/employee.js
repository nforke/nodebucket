/*
=============================================================
; Title:  employee.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   25 September 2020
; Description: Schema for the employee database model.
;============================================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * employee schema, Mongoose Model, sprint 1
 */
// define employee schema
 let employeeSchema = new Schema({
     empId: { type: String, unique: true, dropDups: true },
     firstName: { type: String },
     lastName: { type: String }
 }, { collection: 'employees'})

 // export the model
 module.exports = mongoose.model('Employee', employeeSchema);