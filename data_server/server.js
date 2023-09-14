/******************************************************************************************************
 * Data Server
 * Chris Biedermann
 * V1.0
 * September 2023
 * 
 * 
 *******************************************************************************************************/
// Docker or Development mode
var mode = process.env.NODE_MODE;
console.log("[DA] mode: %s", mode);


// Use Express for routing of REST calls
const express = require("express");
const app = express()

// Library for MongoDB
var mongoose = require("../components/node_modules/mongoose");


// URL of MongoDB server
if (mode == "docker")
    db = require("../components/config/config").mongoURI_docker;
else
    db = require("../components/config/config").mongoURI;


//Routes
const data = require("./routes/data");

//Helper for database transactions with MongoDB    
const DataGateway = require('../components/data/DataGateway');
const gateway = new DataGateway();

console.log(gateway.feed_readAll());



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
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[DA] Server Started: Running on port ${port}`);
});

//Define routes
app.use("/data", data);