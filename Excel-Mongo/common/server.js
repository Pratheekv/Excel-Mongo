var express = require('express');
var mongoXlsx = require('mongo-xlsx');
var mongoose = require('mongoose');
var User = require('../user_model.js');


var model = null;
var newUser ={};
var result ="";

mongoose.connect('mongodb://127.0.0.1/test');


var file = module.exports = {

	read: function(response){
		var log = require('simple-node-logger').createSimpleLogger('project.log');
	

	   	/* Read Excel */
		mongoXlsx.xlsx2MongoData('./test.xlsx', model, function(err, mongoData) {
				var db = mongoose.createConnection('mongodb://127.0.0.1/test');
				db.on('error', console.error);
				db.once('open', function() {
					var result=""
					for(var i = 0; i< mongoData.length;i++){

						var username  = mongoData[i]['username'];
						var firstname = mongoData[i]['firstname'];
						var lastname  = mongoData[i]['lastname'];
						var email     = mongoData[i]['email'];
						var password  = mongoData[i]['password'];

						newUser[i] = new User();
						
						newUser[i].firstname = firstname;
						newUser[i].lastname  = lastname;
						newUser[i].email     = email;
						newUser[i].password  = password;
						newUser[i].username  = username;

						if(allLetter(newUser[i].firstname)){

								if(allLetter(newUser[i].lastname)){

									if(email_val(newUser[i].email)){

										if(password_val(newUser[i].password)){

												newUser[i].save(function(err, user) {
													
										
													if (err){
														//console.error(err);

														console.log("failed to save");

	 													return 
													}
													else{
														console.log("successfully saved : "+user.username);
														
															//console.log(resp); 
													}
												});	

										}
										else{
												// password validation error
												log.info('Invalid password at:('+(i+2)+') Username:' + mongoData[i]['username'] + ' --> Password: '+mongoData[i]['password']);
												result +='\n'  + "Invalid password at:("+(i+2)+") Username:" + mongoData[i]['username'] + " --> Password:" + mongoData[i]['password'];
												//response.send(result);
											
										}
									}
									else{
											// email validation error
											log.info('Invalid email at:('+(i+2)+') Username:' + mongoData[i]['username'] +' --> Email: '+ mongoData[i]['email']);
											result += '\n'  + "Invalid email at:("+(i+2)+") Username:" + mongoData[i]['username'] + " --> Email:" + mongoData[i]['email'];
											//response.send(result);
												
									}
								}
								else{
										// lastname validation error
										log.info('Invalid lastname  at:('+(i+2)+') Username:' + mongoData[i]['username'] +' --> lastname: '+ mongoData[i]['lastname']);
											result += '\n'  + "Invalid lastname at:("+(i+2)+") Username:" + mongoData[i]['username'] + " --> lastname:" + mongoData[i]['lastname'];
											//response.send(result);
										
								}

						}
						else{
								// Firstname validation error
									log.info('Invalid firstname  at:('+(i+2)+') Username:' + mongoData[i]['username'] +' --> firstname: '+ mongoData[i]['firstname']);
									result += '\n'  + "Invalid firstname at:("+(i+2)+") Username:" + mongoData[i]['username'] + " --> firstname:" + mongoData[i]['firstname'];
									
						}



					}
						response.write(result);
						response.end();

				});
											
		});

	}

};

function allLetter(fname){
	  var letters = /^[A-Za-z]+$/;
	  if(fname.match(letters))
	  {
	   // console.log("if");
	    return true;
	  }
	  else
	  {
	   // console.log("else");
	    //alert('Firstname must have alphabet characters only');
	    //fname.focus();
	    return false;
	  }
}

function password_val(pass){
	  var minLength = 8; // Minimum length

	  if (pass.toString().length > minLength){
	    return true;  
	  }
	  else{
	  	return false;
	  }
}

function email_val(uemail){
	  var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
	  if (reg.test(uemail)){
	    return true;
	  }
	  else{
	    return false;
	  }
}