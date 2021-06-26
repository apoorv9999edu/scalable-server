var mongoose = require('mongoose');
var Schema = mongoose.Schema;

hvmcbatchSchema = new Schema( {
	buid_startid: Number, //{yimestamp,mid,vid}
	buid_endid:Number,
    hvmc_name: String,
    hvmc_quantity:Number,
    info: String,
	dose:Number,
    bestbefore:Date,
    company:String,
    manufacturer:String,
    qr:String,
    creationTimestamp:String,
    history:[{Timestamp:String,Handler:Number}]
});

hvmcbatch= mongoose.model(' hvmcbatch', hvmcbatchSchema);

module.exports =hvmcbatch;