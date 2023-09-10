const helper = require("./components/data/RSSCollector");
var amqplib = require('amqplib');



async function main() {


    console.log("Getting RSS Feed");
    let feed = await helper.rssGetFeed();
    console.log(`Items retreived: ${feed.length}`);

    console.log("Starting connection to RabbitMQ");

    const conn = await amqplib.connect('amqp://localhost')
        .catch((err) => {
            console.log(
                "Error:  Unable to connect to RabbitMQ - make sure Mongo Docker is running", err
            );
            process.exit();
        })

    console.log("Connected to RabbitMQ.  Starting channel create");
    const ch1 = await conn.createChannel()
        .catch((err) => {
            console.log(
                "Error:  Unable to connect to create a channel", err
            );
            process.exit();
        })



    console.log("Created channel on RabbitMQ");
    const queue = 'tasks';
    await ch1.assertQueue(queue);



    // Sender

    setInterval(() => {
        ch1.sendToQueue(queue, Buffer.from('something to do'));
      }, 1000);

    console.log("Setup completed");

}


main()



