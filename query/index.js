const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "postCreated":
      posts[data.id] = {
        id: data.id,
        title: data.title,
        comments: [],
      };
      return res.status(201);
    case "commentCreated":
      posts[data.postId].comments.push({
        id: data.id,
        content: data.content,
      });
      return res.status(201);
    default:
      return res.send({ status: "error" });
  }
});

app.listen(4002, () => {
  console.log("Listening to port 4002");
});
