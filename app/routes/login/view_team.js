var express = require('express');
var path = require('path');
const { Client } = require('pg')
const connectionString = 'postgresql://idid:rahulpalace@localhost:5432/idid';

//router object
var router = express.Router();

router.get('/view_team', function(req, res){
	const client = new Client({
		connectionString: connectionString,
	});
	client.connect();
	client.query('SELECT team_id, team_name, team_description, team_title, createdby FROM team WHERE "isActive" = true ORDER BY team_id;',
	 (err, result) => {
  		res.render('login/team/view_team', { team: result.rows, title: 'IDID Lab | AdminArea', page_name: 'view_team' });
  		//console.log(result);
  		client.end();
	});


});

module.exports = router;