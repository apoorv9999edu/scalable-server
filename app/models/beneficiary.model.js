var mongoose = require('mongoose');
var Schema = mongoose.Schema;

beneficiarySchema = new Schema( {
	uid: String, //adhar
	name: String,
	email: String,
	password: String,
	age:Number,
	hvmcdose:[],
});

hvmcdosechema=new Schema( 
	{hvmc:Number,hvmctype:String,Physician:String,Retailer:String,Timestamp:String}
	);
beneficiary = mongoose.model('beneficiary', beneficiarySchema);
hvmcdose = mongoose.model('hvmcdose', hvmcdosechema);
module.exports = {beneficiary,hvmcdose};