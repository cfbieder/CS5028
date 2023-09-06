const express = require("express");
const router = express.Router();

const RSSParser = require("rss-parser");

const rssURI = require("../config/keys").rssURI;

// Load RSS feed model
const RSSFeed = require('../../models/Rss');

// @route
// @desc
// @access  Public
router.get("/", (req, res) => {
  let parser = new RSSParser();
  parser.parseURL(rssURI, function (err, feed) {
    if (err) {
      console.log("Error:", err);
      res.json({ error: err });
    } else {
      console.log(feed.title);
      feed.items.forEach(function (entry) {
        console.log(entry.guid);
      });
      res.json({ items: feed.items });
    }
  });
});

module.exports = router;
