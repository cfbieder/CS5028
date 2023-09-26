/******************************************************************************************************
 * Data Analyzer
 * Chris Biedermann
 * V1.0
 * September 2023
 * 
 * 
 *******************************************************************************************************/
// Docker or Development mode
var mode = process.env.NODE_MODE;
console.log("[DA] mode: %s", mode);



// Library for RabbitMQ
var amqplib = require('amqplib');
// Library for MongoDB
var mongoose = require("../components/node_modules/mongoose");

// Name of message que to use
const queue = process.env.MESSAGE_QUEUE;
console.log("[DA] Message Queue: ", queue);

// URL of MongoDB server
var db = process.env.MONGO_URI;
console.log("[DA] Mongo URI: ", db);

// URL of RabbitMQ server
var rabbitMQ = process.env.RABBIT_MQ
console.log("[DA] Rabbit URI: ", rabbitMQ);


//Helper for database transactions with MongoDB    
const DataGateway = require('../components/data/DataGateway');
const gateway = new DataGateway();


const DataFilter = require('../components/data/DataFilter');
const filter = new DataFilter();

//Functions for Topic Management
const topicManager = require("../components/data/TopicManager");


delay = (time) => {
    return new Promise(res => {
        setTimeout(res, time)
    })
};



//Process new feeds received from message queue
async function process_incoming(msg) {
    var feed = msg.content.toString();
    feed_json = JSON.parse(feed);
    console.log(`[DA] Items received from queue: ${feed_json.length}`);
    feed_clean = await filter.clean(feed_json);
    var newItems = await gateway.feeds_Create(feed_clean);
    topicManager.map_To_Topics(newItems);
}

//Mock function used for testing
async function process_incoming_test() {
    var items = await gateway.feeds_ReadAll();
    console.log(`[DA] TESTING!!! Receive items: ${items.length}`);
    topicManager.map_To_Topics(items);

}

async function main() {

    if (mode == "docker")
        await delay(8000);


    //Connect to Mongoose
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


    // Start up messaging system
    console.log("[DA] Starting connection to RabbitMQ");
    const conn = await amqplib.connect(rabbitMQ)
        .catch((err) => {
            console.log(
                "[DA] Error:  Unable to connect to RabbitMQ - make sure Mongo Docker is running", err
            );
            process.exit();
        })

    console.log("[DA] Connected to RabbitMQ.  Starting channel create");
    const channel = await conn.createChannel()
        .catch((err) => {
            console.log(
                "[DA] Error:  Unable to connect to create a channel", err
            );
            process.exit();
        })

    console.log("[DA] Connected to RabbitMQ.  Asserting channel with queue: ", queue);

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.prefetch(1);
    console.log("[DA] Message Queue Setup Complete");

    //Ensure default topics exist
    await topicManager.topics_setup();

    console.log("[DA] Waiting for messages in %s.", queue);
    // Listener
    channel.consume(queue, async function (msg) {

        await process_incoming(msg);

        console.log("[DA] Done");
        channel.ack(msg);

    }, {
        noAck: false
    });



    console.log("[DA] Setup completed");
    //await process_incoming_test();

}


main()