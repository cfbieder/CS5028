const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RSSSchema = new Schema({
  feed: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('feeds', RSSSchema);