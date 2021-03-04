const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const postsRoutes = require("./routes/posts");

// Middleware run everytime we hit the route
// app.use('/posts', () => {
//     console.log('middleware running');
// })

app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Page d'accueil");
});

app.use("/posts", postsRoutes);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

app.listen(5000);
