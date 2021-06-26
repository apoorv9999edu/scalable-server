var mongoose = require('mongoose');
var Schema = mongoose.Schema;

manufacturerSchema = new Schema( {
	name: String,
	uid: String,
	email: String,
	password: String,
	med:String,
	hvmctypes :[{hvmc:String}]
});

manufacturer = mongoose.model('manufacturer', manufacturerSchema);

module.exports = manufacturer;