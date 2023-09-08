var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var RSS = new Schema({
  title : String,
  author  : String,
  datePub  : Date,
  content : String,
  guid : String,
  //source : String,
  //date: {
  //  type: Date,
  //  default: Date.now
  //}
}, { collection: 'feeds' });

module.exports = mongoose.model('RSS', RSS);