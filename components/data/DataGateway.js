const Feeds = require('../models/feeds');
const Topics = require('../models/topics');

class DateGateway {


  //Helpers for feeds (RSS Feeds) database
  async feeds_ReadAll() {
    console.log("[DG] Reading all Records from DB RSS Feeds")
    var items = await Feeds.find()
    console.log("[DG] Records Read");
    return items;
  }

  async feeds_ClearAll() {
    console.log("[DG] Deleting all Records from DB RSS Feeds")
    var res = await Feeds.deleteMany({});
    return res;
  }

  async feeds_Create(feeds) {
    console.log("[DG] Adding Records to DB Feeds");


    let toInsert = []
    for (let i = 0; i < feeds.length; i++) {
      var item = await Feeds.find({ guid: feeds[i].guid })
      if (item.length == 0) {
        await toInsert.push(feeds[i])
        console.log("[DG]: Inserted New Item: ", feeds[i].title);
      }
      else {
        console.log("[DG]: Item exists already not inserted: ", feeds[i].title);
      }
    }
    var ret = await Feeds.insertMany(toInsert);
    console.log("[DG] Completed adding items to DB");
    return ret;
  }

  //Helpers for topics database
  async topics_readAll() {
    console.log("[DG] Reading all Records from DB topics")
    var items = await Topics.find()
    console.log("[DG] Records Read");
    return items;
  }

  async topics_Save(items) {
    for (let i=0; i< items.length; i++) {
      await items[i].save()
    }
  }

  async topics_Insert(topic) {
    console.log("[DG] Adding Record to DB Topics");
    var item = await Topics.find({ name: topic.name })
    if (item.length == 0) {
      
      return (await Topics.create(topic))
    }
    else {
      return ({"stats" : "exists"})
    }
  }

  async topics_Delete(topic) {
    console.log("[DG] Deleting a Record from DB Topics");
    var res = await Topics.deleteOne({ name: topic.name });
    return res;
  }

  async topics_Clean() {
    var items = await Topics.find();

  }



}
module.exports = DateGateway