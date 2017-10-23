var express = require('express');
var path = require('path');

//router object
var router = express.Router();

router.get('/add_publication', function(req, res){
	res.render('login/add_publication');
})

router.post('/add_publication', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	var file = req.body.file;
	var image = req.body.image;

	
});

module.exports = router;