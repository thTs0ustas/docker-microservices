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
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "commentCreated",
      data: { id: commentId, content, postId: id, status: "pending" },
    })
    .catch(console.log);

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Events received", req.body.type);

  const { type, data } = req.body;

  if (type === "commentModerated") {
    const { postId, id, status } = data;

    const findComment = commentsByPostId[postId].find(
      ({ id: commentId }) => commentId === id
    );
    findComment.status = status;
    await axios
      .post("http://localhost:4005/events", {
        type: "commentUpdated",
        data: { ...findComment, postId },
      })
      .catch(console.log);
  }
  res.send({ status: "ok" });
});

app.listen(4001, () => {
  console.log("Listening to 4001");
});
