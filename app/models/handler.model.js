var mongoose = require('mongoose');
var Schema = mongoose.Schema;

handlerSchema = new Schema( {
	uid: String,//{string}
	name: String,
	email: String,
	password: String,
	role:String
});

handler = mongoose.model('handler', handlerSchema);

module.exports = handler;