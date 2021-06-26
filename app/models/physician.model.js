var mongoose = require('mongoose');
var Schema = mongoose.Schema;

physicianSchema = new Schema( {
	uid: String,
	name: String,
	email: String,
	password: String,
	role:String,
	patient:[{beneficiary:String}]
});

physician = mongoose.model('physician', physicianSchema);

module.exports = physician;