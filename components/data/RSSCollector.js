const RSSParser = require("rss-parser");
const rssURI = require("../config/config").rssURI;
const DataSource = require("../config/dataSource")

const dataSource = new DataSource

// Add index for feed to get
var index = 0

async function rssGetFeed() {

  if (dataSource.getSource() == DataSource.Types.Live) {
    let parser = new RSSParser();
    let res = await parser.parseURL(rssURI[index])
    console.log("[DE] RSS index ${index} Feed Retreived: ${res.title}");
    index ++;
    if (index >= rssURI.length)
      index = 0;
    return res.items;
  }
  else {
    const mockdata = require("../../data_extractor/testing/mockRSS.json");
    console.log("[DE] Mock Feed Retreived");
    return mockdata
  }
}


module.exports = { rssGetFeed };
