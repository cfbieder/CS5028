
/******************************************************************************************************
 * Data Collector
 * Chris Biedermann
 * V1.0
 * September 2023
 * 
 * Retreive RSS messages from locations included in config file at fixed interval as defined in setup
 * Messages received are then sent via RabbitMQ to Data Analyzers utiling Fair Dispatching
 *******************************************************************************************************/

// Docker or Development mode
var mode = process.env.NODE_MODE;
console.log("[DE] mode: %s", mode);

var dt = process.env.DATA_TYPE;
console.log("[DE] mode: %s", dt);


// Library for RabbitMQ
var amqplib = require('amqplib');
// Sources for RSS data feeds
const rssCollector = require("../components/data/RSSCollector");
// Name of queue to dispatch mesages

// Name of message que to use
const queue = process.env.MESSAGE_QUEUE;
console.log("[DA] Message Queue: ", queue);

// URL of RabbitMQ server
var rabbitMQ = process.env.RABBIT_MQ
console.log("[DA] Rabbit URI: ", rabbitMQ);


delay = (time) => {
    return new Promise(res => {
        setTimeout(res, time)
    })
};


// Main function
async function main() {


    if (mode == "docker")
        await delay(9000);



    // Start up messaging system
    console.log("[DE] Starting connection to RabbitMQ");
    const conn = await amqplib.connect(rabbitMQ, {
        timeout: 10000,
        servername: 'localhost',
    })
        .catch((err) => {
            console.log(
                "[DE] Error:  Unable to connect to RabbitMQ - make sure Mongo Docker is running", err
            );
            process.exit();
        })

    console.log("[DE] Connected to RabbitMQ.  Starting channel create");
    const channel = await conn.createChannel()
        .catch((err) => {
            console.log(
                "[DE] Error:  Unable to connect to create a channel", err
            );
            process.exit();
        })

    console.log("[DE] Connected to RabbitMQ.  Asserting channel with queue: ", queue);

    await channel.assertQueue(queue, {
        durable: true
    });
    console.log("[DE] Message Queue Setup Complete");


    for (var i = 0; i < 3; i++) {
        console.log("[DE] Getting RSS Feed");
        let feed = await rssCollector.rssGetFeed();
        console.log(`[DE] Items retreived: ${feed.length}`);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(feed)), {
            persistent: true
        })
    }


    //periodic call to get RSS feeds and dispatch to message queue
    setInterval(async () => {
        //ch1.sendToQueue(queue, Buffer.from('something to do'));

        console.log("[DE] Getting RSS Feed");
        let feed = await rssCollector.rssGetFeed();
        console.log(`[DE] Items retreived: ${feed.length}`);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(feed)), {
            persistent: true
        });
    }, 1000000);

    console.log("[DE] Setup completed");

}


main()



