var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var nodemailer = require('nodemailer');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler





app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



app.post('/contactus', function (req, res) {
	     smtpTrans = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            type: 'OAuth2',
            user: 'brogan9@gmail.com',

		}
	  });
	  //Mail options
	  mailOpts = {
		from: req.body.name + req.body.email,
		to: 'yyyyyyyyyy@gmail.com',
		subject: req.body.email + '  --Msg from contactus-form',
		text: "Name: " + req.body.name + "Email: "  + req.body.email + 
		      "Contact No:  " + req.body.contactNo + "QUERY: " + req.body.message
	  };
	  smtpTrans.sendMail(mailOpts, function (error, response) {
		//Alert on event of message sent succeeds or fail.
		if (error) {
		  res.render('contactus',{msg : 'Error occured, message not sent.', err : true});
		}
		else {
		  res.render('contactus',{msg : 'Message sent! Thank you.', err : false});
		}
		smtpTrans.close();
	  });
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = app;
