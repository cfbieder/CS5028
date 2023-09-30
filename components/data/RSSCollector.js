const RSSParser = require("rss-parser");
const rssURI = require("../config/config").rssURI;
const DataSource = require("../config/dataSource")

const dataSource = new DataSource

// Add index for feed to get
var index = 0

async function rssGetFeed() {

  //Allows for mocking of data for testing if testing mode set in .env file
  //Otherwise if not testing get feeds for live RSS
  if (dataSource.getSource() == DataSource.Types.Live) {
    let parser = new RSSParser();
    //RSS URIs is a array of RSS sites to get data from, index will step through each of the target sites and then 
    //start back at 0 when full length obtained
    let res = await parser.parseURL(rssURI[index])
    console.log("[DE] RSS index %i Feed Retreived: %s",index,res.title);
    index ++;
    if (index >= rssURI.length)
      index = 0;
    return res.items;
  }
  //Below obtain predefind mock RSS feed
  else {
    const mockdata = require("../../data_extractor/testing/mockRSS.json");
    console.log("[DE] Mock Feed Retreived");
    return mockdata
  }
}


module.exports = { rssGetFeed };
