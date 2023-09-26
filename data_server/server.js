/******************************************************************************************************
 * Data Server
 * Chris Biedermann
 * V1.0
 * September 2023
 * 
 * 
 * ROUTES SERVED
 * /feeds - feeds from RSS 
 * /topics - topics to monitor
 * 
 *******************************************************************************************************/
// Docker or Development mode
var mode = process.env.NODE_MODE;
console.log("[DA] mode: %s", mode);

// Use Express for routing of REST calls
const express = require("express");
const app = express()

var cors = require("cors");
app.use(cors());

var ip = require("ip");
console.log("[DS] IP address is",ip.address());

var bodyParser = require("body-parser");

//Default Topics if none extist
const topics_to_use = require("../components/config/config").topicsToUse;
console.log("[DS] default topics: ",topics_to_use)

// Ensure topics exist
async function topics_setup() {
    topics_existing = []
    topics_to_add = []
    var items = await gateway.topics_readAll();
    for (item of items) {
        topics_existing.push(item.name)
    }
    for (item of topics_to_use) {
        if (!topics_existing.includes(item)) {
            topics_to_add.push(item)
        }
    }
    console.log('[DS] Adding these topics do DB',topics_to_add);
    for (item of topics_to_add) {
        await gateway.topics_Insert({'name': item})
    }

}


// Library for MongoDB
var mongoose = require("../components/node_modules/mongoose");


// URL of MongoDB server
var db = process.env.MONGO_URI;
console.log("[DA] Mongo URI: ",db);


//Routes
const feeds = require("./routes/feeds");
const topics = require("./routes/topics");

//Helper for database transactions with MongoDB    
const DataGateway = require('../components/data/DataGateway');
const gateway = new DataGateway();



//Connect to Mongoose
mongoose
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

//Start REST Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`[DA] Server Started: Running on port ${port}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

topics_setup();

//Define routes
app.use("/feeds", feeds);
app.use("/topics", topics);

module.exports = app;