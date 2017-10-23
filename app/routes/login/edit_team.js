var express = require('express');
var path = require('path');
var multer = require('multer');
const { Client } = require('pg')
const connectionString = 'postgresql://idid:rahulpalace@localhost:5432/idid';
var upload = multer({dest: './app/public/uploads/team'});

//router object
var router = express.Router();

router.get('/edit_team/:id', function(req, res){
	const client = new Client({
		connectionString: connectionString,
	});
	client.connect();
	const query = 'SELECT team_id, team_name, team_description, team_title FROM team WHERE team_id = $1';
	const values = [req.params.id];
	client.query(query, values, (err, result) => {
		if(err) {
			console.log(err.stack);
		} else {
			//console.log(result);
			res.render('login/team/edit_team', { edit: result.rows, title: 'IDID Lab | AdminArea', page_name: 'view_team' });
		}
  		client.end();
	});
});

router.post('/edit_team', upload.single('profileImage') ,function(req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var description = req.body.description;
  var id = req.body.id;

  if(req.file) {
  	console.log('Uploading File...');
  	var profileImage = req.file.filename;
    console.log(profileImage);
  } else {
  	console.log('No File Uploaded...');
  	var profileImage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('title','Title field is required').notEmpty();
  req.checkBody('description','Description is not valid').notEmpty();
  //req.checkBody('profileImage','Profile Image field is required').notEmpty();
  // Check Errors
  var errors = req.validationErrors();
  console.log(errors);

  	const client = new Client({
      connectionString: connectionString,
    });
    client.connect();
    const query = 'UPDATE team SET team_name = $1, team_title = $2, team_description = $3, team_image = $4 WHERE team_id = $5';
    const values = [name, title, description, profileImage, id];
    client.query(query, values, (err, result) => {
      if(err) { 
        console.log(err.stack)
      } else {
        req.flash('success', 'Record updated');
        console.log(result);
        res.location('/team/view_team');
        res.redirect('/team/view_team');
      }
      client.end();
  });
  
});

module.exports = router;
