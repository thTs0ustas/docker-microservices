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
  console.log("Events received", req.body.type);
  const { type, data } = req.body;
  switch (type) {
    case "postCreated": {
      const { id, title } = data;
      posts[id] = {
        id,
        title,
        comments: [],
      };
      res.status(201);
      break;
    }
    case "commentCreated": {
      const { id, postId, content, status } = data;
      posts[postId].comments.push({
        id,
        content,
        status,
      });
      res.status(201);
      break;
    }
    case "commentUpdated": {
      const { id, postId, status } = data;
      console.log(posts[postId]);
      const findComment = posts[postId]?.comments.find(
        ({ commentId }) => commentId === id
      );
      findComment.status = status;
      res.status(201);
      break;
    }
    default:
      res.send({ status: "error" });
  }
});
app.listen(4002, () => {
  console.log("Listening to port 4002");
});
