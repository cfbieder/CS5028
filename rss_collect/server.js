const express = require("express");
const app = express()


const mongoose = require("mongoose");
const helper = require("./components/data/RSSCollector");
const rss = require("./routes/getrss");

const DataGateway = require('./components/data/DataGateway');
const gateway = new DataGateway();


const DataFilter = require('./components/data/DataFilter');
const filter = new DataFilter();



const RSS = require('./components/models/Rss');



//Main Function
async function main(app) {

  // DB Config
  const db = require("./config/keys").mongoURI;
  await mongoose
    .connect(db, { useNewUrlParser: true,useUnifiedTopology: true,serverSelectionTimeoutMS: 1000   })  //add timeout
    .then(() => {
      console.log("MongoDB Connected");

    })
    .catch((err) => {
      console.log(
        "Error:  Unable to connect to MongDB - make sure Mongo Docker is running"
      );
      process.exit();
    })


  // Connect to MongoDB
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server Started: Running on port ${port}`);
  });

  console.log("Getting RSS Feed");
  let feed = await helper.rssGetFeed();
  console.log(`Items retreived: ${feed.length}`);

  feed = await filter.clean(feed);
  await gateway.create(feed);
  console.log("System Ready for request: GET http://localhost:5000/rss")

}

app.get("/", (req, res) =>
  res.send(
    "Welcome to the RSS Servier: use -> GET http://localhost:5000/rss <- to get feed summary"
  )
);

// Use Routes
app.use("/rss", rss);

main(app);



