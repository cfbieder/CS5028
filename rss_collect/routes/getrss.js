const express = require("express");
const router = express.Router();

const DataGateway = require('../components/data/DataGateway');
const gateway = new DataGateway();

// @route
// @desc
// @access  Public
router.get("/", async (req, res) => {

  var items = await gateway.readAll()
  console.log("Fulfilling GET request, returning with %i items", items.length)
  return res.status(200).json(items);




  /*
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
  */




});


module.exports = router;
