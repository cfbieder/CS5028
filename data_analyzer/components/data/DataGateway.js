const RSS = require('../models/FeedModel');

class DateGateway {



  async readAll() {
    console.log("[DA] Reading all Records from DB")
    var items = await RSS.find()
    console.log("[DA] Records Read");
    return items;
  }


  async create(feeds) {
    console.log("[DA] Adding Records to Database");


    let toInsert = []
    for (let i = 0; i < feeds.length; i++) {
      var item = await RSS.find({ guid: feeds[i].guid })
      if (item.length == 0) {
        toInsert.push(feeds[i])
        console.log("[DA]: Inserted New Item: ", feeds[i].title);
      }
      else {
        console.log("[DA]: Item exists already not inserted: ", feeds[i].title);
      }
    }

    await RSS.insertMany(toInsert);
    console.log("[DA] Completed adding items to DB")
  }
}
module.exports = DateGateway