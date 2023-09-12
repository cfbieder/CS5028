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
console.log("[DA] mode: %s",mode);


// Library for RabbitMQ
var amqplib = require('amqplib');
// Library for RabbitMQ
var amqplib = require('amqplib');
// Sources for RSS data feeds
const queue = require("../config/config").messageQueue;
// URL of RabbitMQ server
if (mode == "docker")
    rabbitMQ = require("../config/config").rabbitURI_docker;
else
    rabbitMQ = require("../config/config").rabbitURI;

const DataFilter = require('./components/data/DataFilter');
const filter = new DataFilter();


async function main() {

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
        var feed = msg.content.toString();
        feed_json = JSON.parse(feed);
        console.log(`[DA] Items received from queue: ${feed_json.length}`);
        feed_clean= await filter.clean(feed_json);
        for (var item of feed_clean) {
            console.log('[DA] Title of feed received:',item.title);
        }
        console.log("[DA] Done");
        channel.ack(msg);

    }, {
        noAck: false
    });



    console.log("[DA] Setup completed");

}


main()