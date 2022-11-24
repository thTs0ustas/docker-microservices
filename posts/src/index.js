const bodyParser = require("body-parser");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const posts = {};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  // const { id } = req.body;
  // const postToServe = posts[id];
  res.status(200).send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening at post 4000");
});
