global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
// Library for MongoDB
var mongoose = require("../../components/node_modules/mongoose");
// URL of MongoDB server
var db = process.env.MONGO_URI;
console.log("[DA] Mongo URI: ", db);

const topicManager = require("../../components/data/TopicManager");

beforeAll(async () => {
    await mongoose
        .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 1000 })  //add timeout
        .then(() => {
            console.log("[DA] Connected to MongoDB");

        })
        .catch((err) => {
            console.log(
                "[DA] Error:  Unable to connect to MongDB - make sure Mongo Docker is running"
            );
            process.exit();
        })
});


test('Test Topics clear', async () => {
    await topicManager.topics_clear();
    expect(await topicManager.topics_getAll()).toEqual([]);
})

test('Test Topics add', async () => {
    const topics_to_use = require("../../components/config/config").topicsToUse
    await topicManager.topics_clear();
    await topicManager.topics_setup();
    expect(await topicManager.topics_getAll_Names()).toEqual(topics_to_use);

})

test('Test Topics match', async (done) => {
    var feed = require("./mock_record.js");
    feed.mock[0]._id = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');
    await topicManager.topics_clear();
    await topicManager.topics_setup();
    await topicManager.map_To_Topics(feed.mock);
    await topicManager.topics_getOne('vitamin B').then((item) => {
        expect(JSON.parse(item).feeds).toEqual(["56cb91bdc3464f14678934ca"]);
        done()
    });


})

