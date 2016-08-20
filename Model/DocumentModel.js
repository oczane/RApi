"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DocMart', new Schema({
    JsonDocument: Schema.Types.Mixed,
},{strict: true}));
