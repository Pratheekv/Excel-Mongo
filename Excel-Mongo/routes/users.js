var express = require('express');
var router = express.Router();
var callback = require('../common/server.js');

var fileupload = require('fileupload').createFileUpload('./upload').middleware();

/* GET users listing. */
router.get('/', function(req, res, next) {

	  	callback.read(res);

});
app.post('/upload', fileupload, function(req, res) {
   // files are now in the req.body object along with other form fields
   // files also get moved to the uploadDir specified
 })
module.exports = router;
