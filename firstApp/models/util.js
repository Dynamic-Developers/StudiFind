var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb3459ke:je2mex@danu7.it.nuigalway.ie:8717/mongodb3459');
const nodemailer = require('nodemailer');

exports.connection = connection;