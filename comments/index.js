const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.status(200).send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];
  comments.push({ commentId, content });

  commentsByPostId[id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "commentCreated",
      data: { id: commentId, content, postId: id },
    })
    .catch(console.log);

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Events received", req.body.type);
  res.send({ status: "ok" });
});

app.listen(4001, () => {
  console.log("Listening to 4001");
});
