var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	firstname: {type:String,required:true},
	lastname : {type:String,required:true},
	email    : {type:String,unique:true,required:true},
	username : {type:String,unique:true,required:true},
	password : {type:String,required:true,min:8},
	isActivated: {type:Boolean,default:false}

});
module.exports = mongoose.model('excel', UserSchema);
			