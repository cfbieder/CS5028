var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create Schema
var Feeds = new Schema({
  title : String,
  author  : String,
  datePub  : Date,
  content : String,
  guid : String,
  source : String,
  link : String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feeds', Feeds);