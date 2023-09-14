const RSSParser = require("rss-parser");
const rssURI = require("../config/config").rssURI;
const DataSource = require("../config/dataSource")

const dataSource = new DataSource

async function rssGetFeed() {

  if (dataSource.getSource() == DataSource.Types.Live) {
    let parser = new RSSParser();
    let res = await parser.parseURL(rssURI)
    console.log("RSS Feed Retreived");
    return res.items;
  }
  else {
    const mockdata = require("../../data_extractor/testing/mockRSS.json");
    return mockdata
  }
}


module.exports = { rssGetFeed };
