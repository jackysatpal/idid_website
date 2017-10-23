var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	expressValidator = require('express-validator'),
	flash = require('connect-flash'),
	/*passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	const readChunk = require('read-chunk');
	cookieParser = require('cookie-parser'),
	const fileType = require('file-type');*/
	multer = require('multer'),
	upload = multer({dest: './app/public/uploads/uploads'}),
	app = express();

//database connection
const { Client } = require('pg');
const connectionString = 'postgres://idid:rahulpalace@localhost/idid';

// set an enviornment variable for the port number. Default set to 3000
app.set('port', process.env.PORT || 3000);

//set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', 'app/views');

//set public folder
app.use(express.static('app/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express Session Middleware
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

/*app.use(expressValidator({
	customValidators: {
		isImage: function(value, imageFile) {
			const buffer = readChunk.sync(imageFile, 0, 4100);
    		console.log(fileType(buffer).ext);
    		const ext = fileType(buffer).ext;
    		if( (ext != 'jpg') || (ext != 'png') || (ext !=  'gif') || (ext != 'jpeg') ) {
       			return false;
    		}
		}
	}
})) */

//function to hide very long text. Show only starting 10 length text
app.locals.truncateText = function(text, length){
	var truncateText = text.substring(0, length);
	truncateText += ' ...';
	return truncateText;
}

//passport for authentication system
/*app.use(passport.initialize());
app.use(passport.session());*/

//app.use(cookieParser());

 /* creating routes */
//index.html
app.use(require('./routes/index'));
//team.html
app.use(require('./routes/team'));
//contact.html
app.use(require('./routes/contact'));
//publication.html
app.use(require('./routes/publication'));
//admin panel
app.use(require('./routes/login/login'));
//dashboard
app.use(require('./routes/login/dashboard'));
//view publication
app.use(require('./routes/login/view_publication'));
app.use(require('./routes/login/add_publication'));
app.use(require('./routes/login/edit_publication'));
app.use(require('./routes/login/delete_publication'));

app.use(require('./routes/login/add_team'));
app.use(require('./routes/login/view_team'));
app.use(require('./routes/login/edit_team'));
app.use(require('./routes/login/delete_team'));

/*
	logout
	//app.use(require('./routes/logout'));

	404 error
	app.get('/*', function(req, res, next){
		var err = new Error();
		err.status = 400;
		next(err);
	});
	app.use(function(err, req, res, next){
		res.status(404);
		res.send('404: File not found. Click here for <a href="/">home</a> page.');
	});
/* end of creating routes */

//listen to requests from client
var server = app.listen(app.get('port'), function(){
	console.log('server started on '+ app.get('port'));
});
