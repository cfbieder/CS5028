const Feeds = require('../models/feeds');
const Topics = require('../models/topics');

class DateGateway {


  //Helpers for feeds (RSS Feeds) database
  async feeds_ReadAll() {
    var items = await Feeds.find()
    return items;
  }

  async feeds_ReadMany(ids) {
    var items = await Feeds.find({'_id': { $in: ids}})
    return items;
  }

  async feeds_ClearAll() {
    var res = await Feeds.deleteMany({});
    return res;
  }

  async feeds_Create(feeds) {

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
    return ret;
  }

  //Helpers for topics database
  async topics_readAll() {
    var items = await Topics.find()
    return items;
  }

  async topics_readOne(name) {
    var items = await Topics.find({name : name})
    return items[0];
  }

  async topics_Save(items) {
    for (let i=0; i< items.length; i++) {
      await items[i].save()
    }
  }

  async topics_Insert(topic) {
    var item = await Topics.find({ name: topic.name })
    if (item.length == 0) {
      
      return (await Topics.create(topic))
    }
    else {
      return ({"stats" : "exists"})
    }
  }

  async topics_Delete(topic) {
    var res = await Topics.deleteOne({ name: topic.name });
    return res;
  }

  async topics_ClearAll() {
    var res = await Topics.deleteMany({});
    return res;
  }

  async topics_Clean() {
    var items = await Topics.find();

  }




}
module.exports = DateGateway