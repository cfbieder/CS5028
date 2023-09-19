var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create Schema
var Topics = new Schema({
    name: String,
    comment : String,
    feeds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feeds"
        }
    ]

});

module.exports = mongoose.model('Topics', Topics);