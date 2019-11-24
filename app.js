const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//middlewares & api request/response body parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //use localhost to fetch / unblock cors

//routes from another page
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//home page route
app.get("/", (req, res) => {
  res.send("we are home");
});

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION, //connection with mongo with user name & password
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("coonect to nishan db");
  }
);

app.listen(3000);
