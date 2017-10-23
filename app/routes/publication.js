var express = require('express');
var path = require('path');

//router object
var router = express.Router();

router.get('/publication', function(req, res){
	res.render('publication', { title: 'IDID Lab | Publication' });
});

module.exports = router;