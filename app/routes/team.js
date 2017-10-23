var express = require('express'),
	path = require('path');

	const { Client } = require('pg')

const connectionString = 'postgresql://idid:rahulpalace@localhost:5432/idid';
//router object
var router = express.Router();

router.get('/team', function(req, res){
	//res.render('team');

	const client = new Client({
		connectionString: connectionString,
	});
	client.connect();

	client.query('SELECT team_name, team_description, team_image, team_title FROM team WHERE "isActive" = true;', (err, result) => {
  		//console.log(err, res)
  		res.render('team', { title: 'IDID Lab | Team', team: result.rows });
  		client.end();
	});
});


module.exports = router;