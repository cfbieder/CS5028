const RSSParser = require("rss-parser");
const rssURI = require("../config/keys").rssURI;

async function rssGetFeed() {
  let parser = new RSSParser();
  let res = await parser.parseURL(rssURI)
  console.log("RSS Feed Retreived")
  return res.items; 
}


module.exports = { rssGetFeed };
