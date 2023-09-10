var amqplib = require('amqplib');

async function main() {


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


    // Listener
    ch1.consume(queue, (msg) => {
        if (msg !== null) {
            console.log('Recieved:', msg.content.toString());
            ch1.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });


    console.log("Setup completed");

}


main()