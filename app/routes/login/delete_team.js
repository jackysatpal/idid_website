var express = require('express');
var path = require('path');
const { Client } = require('pg')
const connectionString = 'postgresql://idid:rahulpalace@localhost:5432/idid';

//router object
var router = express.Router();

router.delete('/delete_team/:id', function(req, res){
	const client = new Client({
		connectionString: connectionString,
	});
	client.connect();
	const query = 'UPDATE team SET "isActive" = false WHERE team_id = $1'
    const values = [req.params.id];
	client.query(query, values, (err, result) => {
		if(err) {
			console.log(err.stack);
		} else {
			req.flash('success', 'Record deleted');
		}
  		//console.log(result)
  		res.send(200);
  		client.end();
	});
});

module.exports = router;