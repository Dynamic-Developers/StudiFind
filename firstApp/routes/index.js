var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');


var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET feed page. */
router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
         		 res.render('feed');

        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});
router.get('/book', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('book', {contact : contacts});    
            });

        
    
        
});

router.get('/shoe', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('shoe', {contact : contacts});    
            });

        
    
        
});

router.get('/clothes', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('clothes', {contact : contacts});    
            });

        
    
        
});

router.get('/electronic', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('electronic', {contact : contacts});    
            });

        
    
        
});

router.get('/notes', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('notes', {contact : contacts});    
            });

        
    
        
});

router.get('/grinds', function(req, res, next) {

   	 
      Contact.find({}, function(err, contacts)
            {
            res.render('grinds', {contact : contacts});    
            });

        
    
        
});

router.get('/contact', function(req, res, next) {

    req.param.id;
    
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            Contact.find({category:req.param.id}, function(err, contacts)
            {
            res.render('contact', {contact : contacts});    
            });
            
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Express' });
});

app.post('/contactus', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: GMAIL_USER,
    subject: 'New message from contact form at tylerkrys.ca',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {
      res.render('contact-success');
    }
  });
});
router.post('/addComment',function(req,res,next){
    
	comment = new Comment(req.body);
	comment.save(function (err, savedComment) {
		if (err)
			throw err;
        
        res.json({
			"id" : savedComment._id
		});
	});

});

router.get('/getComments', function(req,res,next) {
    Comment.find({},function(err,comments)
                 {
        if(err)
            res.send(err);
        
        res.json(comments);
        
    })
});

/**
  Updates a comment already in the database
 */
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Deletes a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});




router.post('/addContact',function(req,res,next){
    
	contact = new Contact(req.body);
	contact.save(function (err, savedContact) {
		if (err)
			throw err;
        
        res.json(
		// res.status(301).redirect("http://danu7.it.nuigalway.ie:8625")
		);
	});

});
router.get('/getContact', function(req,res,next) {
    Contact.find({},function(err,contacts)
                 {
        if(err)
            res.send(err);
        
        res.json(contacts);
        
    })
});

var hbs = require('hbs');
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
    

function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

module.exports = router;
