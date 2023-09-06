const express = require("express");
const mongoose = require("mongoose");
const helper = require("./functions/Helper");
const rss = require("./routes/getrss");

const app = express();

// DB Config

async function main(app) {
  // Connect to MongoDB

  const db = require("./config/keys").mongoURI;
  await mongoose
    .connect(db + "?serverSelectionTimeoutMS=1000")
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(
        "Error:  Unable to connect to MongDB - make sure Mongo Docker is running"
      );
      process.exit();
    });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server Started: Running on port ${port}`);
  });

  console.log("Getting RSS Feed");
  let feed = await helper.rssGetFeed();
  console.log(`Items retreived: ${feed.length}`);

}

app.get("/", (req, res) =>
  res.send(
    "Welcome to the RSS Servier: use -> GET http://localhost:5000/css <- to get feed summary"
  )
);

// Use Routes
app.use("/rss", rss);
main(app);
