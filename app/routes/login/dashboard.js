var express = require('express');
var path = require('path');

//router object
var router = express.Router();

router.get('/dashboard', function(req, res){
	res.render('login/dashboard', {title: 'IDID Lab | AdminArea', page_name:'dashboard'});
});

module.exports = router;