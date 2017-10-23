var express = require('express');
var path = require('path');
//router object
var router = express.Router();

router.get('/contact', function(req, res){
	res.render('contact', { title: 'IDID Lab | Contact' });
});

module.exports = router;