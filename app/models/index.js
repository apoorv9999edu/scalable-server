const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;

db.beneficiary = require("./beneficiary.model").beneficiary;

db.hvmcdose = require("./beneficiary.model").hvmcdose;
db.physician = require("./physician.model");
db.handler = require("./handler.model");
db.manufacturer = require("./manufacturer.model");
db.hvmcgenerateinbatch = require("./hvmcbatch.model");

module.exports = db;