var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: './app/public/uploads/team'});

const { Client } = require('pg')
const connectionString = 'postgresql://idid:rahulpalace@localhost:5432/idid';

//router object
var router = express.Router();

router.get('/add_team', function(req, res) {
	res.render('login/team/add_team', {title: 'IDID Lab | AdminArea', classname: 'active', page_name: 'view_team'});
})

router.post('/add_team', upload.single('profileImage') ,function(req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var description = req.body.description;
  var created = new Date();
  var isActive = true;

  if(req.file) {
  	console.log('Uploading File...');
  	var profileImage = req.file.filename;
    console.log(profileImage);
  } 
  else {
  	console.log('No File Uploaded...');
  	var profileImage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('title','Title field is required').notEmpty();
  req.checkBody('description','Description is not valid').notEmpty();
  //req.checkBody('profileImage','Please upload an image Jpeg, Png or Gif').isImage(profileImage);

  // Check Errors
  var errors = req.validationErrors();
  console.log(errors);

  if(errors) {
  	res.render('login/team/add_team', { errors: errors });
  } else {
  	const client = new Client({
      connectionString: connectionString,
    });
    client.connect();
    const query = 'INSERT INTO team(team_name, team_title, team_description, team_image, createdby) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const values = [name, title, description, profileImage, created]
    client.query(query, values, (err, result) => {
      if(err) { 
        console.log(err.stack)
      } else {
        req.flash('success', 'Record Added');
        //console.log(message);
        res.location('/team/view_team');
        res.redirect('/team/view_team');
      }
      client.end();
  });
  }
});

module.exports = router;