global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
// Library for MongoDB
var mongoose = require("../../components/node_modules/mongoose");
// URL of MongoDB server
var db = process.env.MONGO_URI;
console.log("[DA] Mongo URI: ", db);

const topicManager = require("../../components/data/TopicManager");

beforeAll( async () => {
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


test('Test mongo connect', async () => {
    await topicManager.topics_clear();
    await topicManager.topics_getAll();
    await topicManager.topics_setup();
    await topicManager.topics_getAll();

})
