var mongoose = require('mongoose');

var Schema = mongoose.Schema;
require('./util');
//mongoose.Promise = global.Promise;
var contactSchema = new Schema({
    category: {type: String},
	title: {type: String},
    description: {type: String},
    price: {type: Number},
    county: {type: String},
    image: { data: Buffer, contentType: String }
    
  
 
    
});

          
module.exports = mongoose.model("contact", contactSchema);