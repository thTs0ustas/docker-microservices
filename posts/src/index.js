const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
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

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios
    .post("http://localhost:4005/events", {
      type: "postCreated",
      data: {
        id,
        title,
      },
    })
    .catch(console.log);

  res.status(201).send(posts[id]);
});

app.get("/events", (req, res) => {
  res.status(200).send(posts);
});
app.post("/events", (req, res) => {
  console.log("Events received", req.body.type);
  res.send({ status: "ok" });
});
app.listen(4000, () => {
  console.log("Listening at post 4000");
});
