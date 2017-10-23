var express = require('express');
var path = require('path');

//router object
var router = express.Router();

router.get('/view_publication', function(req, res){
	res.render('login/view_publication');
});

module.exports = router;