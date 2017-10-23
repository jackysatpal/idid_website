var express = require('express');
var path = require('path');

//router object
var router = express.Router();

router.get('/login', function(req, res){
	res.render('login/login', {title: 'IDiD Lab | Account Login'});
});

router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();

	var loginerror = req.validationErrors();
	console.log(loginerror);

	if(loginerror){
  		res.render('login/login', { loginerror: loginerror });
  } else{
  	console.log('No Errors');
  }
});

module.exports = router;