var mongoose = require('mongoose');
var Schema = mongoose.Schema;

hvmcrequirement = new Schema( {
	state_uid: String, //adhar
	state_name: String,
	location:[],
});
//{{latand long},{}}

hvmcdosechema=new Schema( 
	{hvmc:Number,hvmctype:String,Physician:String,Retailer:String,Timestamp:String}
	);
    hvmcreq = mongoose.model('beneficiary', hvmcrequirement);
hvmcdose = mongoose.model('hvmcdose', hvmcdosechema);
module.exports = {hvmcreq,hvmcdose};