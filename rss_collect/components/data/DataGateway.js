const RSS = require('../models/Rss');

class DateGateway {



  async readAll() {
    console.log("Reading all Records from DB")
    var items = await RSS.find()
    console.log("Records Read");
    return items;
  }


  async create(feeds) {
    console.log("Adding Records to Database");


    let toInsert = []
    for (let i = 0; i < feeds.length; i++) {
      var item = await RSS.find({ guid: feeds[i].guid })
      if (item.length == 0) {
        toInsert.push(feeds[i])
        console.log("DB: Inserted New Item: ", feeds[i].title);
      }
      else {
        console.log("DB: Item exists already not inserted: ", feeds[i].title);
      }
    }

    await RSS.insertMany(toInsert);
    console.log("Completed adding items to DB")
  }
}
module.exports = DateGateway