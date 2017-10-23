var express = require('express');
var path = require('path');

//router object
var router = express.Router();
//index.html
router.get('/', function (req, res) {
	res.render('index', {title: 'IDID Lab | Home'});
});

module.exports = router;