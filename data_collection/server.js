const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const rss = require("./routes/api/getrss");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db + "?serverSelectionTimeoutMS=1000")
  .then(() => {
    console.log("MongoDB Connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server Started: Running on port ${port}`));
  })
  .catch((err) => {
    console.log(
      "Error:  Unable to connect to MongDB - make sure Mongo Docker is running"
    );
    process.exit();
  });

app.get("/", (req, res) => res.send("Hello World"));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/rss", rss);
