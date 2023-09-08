const RSSParser = require("rss-parser");
const rssURI = require("../../config/keys").rssURI;
const TestCollector = require("../../config/testing")

const testCollector = new TestCollector

async function rssGetFeed() {

  if (testCollector.getSource() == TestCollector.Types.Live) {
    let parser = new RSSParser();
    let res = await parser.parseURL(rssURI)
    console.log("RSS Feed Retreived");
    return res.items;
  }
  else {
    const mockdata = require("../../testing/mockRSS.json");
    return mockdata
  }
}


module.exports = { rssGetFeed };
