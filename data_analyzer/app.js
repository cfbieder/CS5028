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
const queue = require("../components/config/config").messageQueue;
// URL of RabbitMQ server
if (mode == "docker")
    rabbitMQ = require("../components/config/config").rabbitURI_docker;
else
    rabbitMQ = require("../components/config/config").rabbitURI;
// URL of MongoDB server
if (mode == "docker")
    db = require("../components/config/config").mongoURI_docker;
else
    db = require("../components/config/config").mongoURI;


//Helper for database transactions with MongoDB    
const DataGateway = require('../components/data/DataGateway');
const gateway = new DataGateway();


const DataFilter = require('../components/data/DataFilter');
const filter = new DataFilter();



delay = (time) => {
    return new Promise(res => {
        setTimeout(res, time)
    })
};



async function process_incoming(msg) {
    var feed = msg.content.toString();
    feed_json = JSON.parse(feed);
    console.log(`[DA] Items received from queue: ${feed_json.length}`);
    feed_clean = await filter.clean(feed_json);
    await gateway.feeds_Create(feed_clean);
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

}


main()