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




// Library for MongoDB
var mongoose = require("../components/node_modules/mongoose");


// URL of MongoDB server
if (mode == "docker")
    db = require("../components/config/config").mongoURI_docker;
else
    db = require("../components/config/config").mongoURI;


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


//Define routes
app.use("/feeds", feeds);
app.use("/topics", topics);

module.exports = app;