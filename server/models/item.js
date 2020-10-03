/*
=============================================================
; Title:  item.js
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   28 September 2020
; Description: Schema for the item database model.
;============================================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * item schema, Mongoose Model, sprint 2
 */
// define item schema
let itemSchema = new Schema({
    text: { type: String }
});

// export the model
module.exports = itemSchema;