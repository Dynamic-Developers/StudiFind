var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// img path
var imgPath = '/public/images/p01.png';

require('./util');
//mongoose.Promise = global.Promise;
var contactSchema = new Schema({
    category: {type: String},
	title: {type: String},
    description: {type: String},
    price: {type: String},
    contactEmail: {type: String},
    county: {type: String},
    image: { data: Buffer, contentType: String }
    
  
 
    
});

          
module.exports = mongoose.model("contact", contactSchema);