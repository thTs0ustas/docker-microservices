const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

function processEvents(type, data) {
  switch (type) {
    case "postCreated": {
      const { id, title } = data;
      // eslint-disable-next-line no-param-reassign
      posts[id] = {
        id,
        title,
        comments: [],
      };
      break;
    }
    case "commentCreated": {
      const { id, postId, content, status } = data;
      posts[postId].comments.push({
        id,
        content,
        status,
      });
      break;
    }
    case "commentUpdated": {
      const { id, status, postId } = data;
      const findComment = posts[postId].comments.find(
        ({ id: commentId }) => commentId === id
      );
      findComment.status = status;
      break;
    }
    default:
      break;
  }
}

app.get("/posts", (req, res) => {
  res.status(200).send(posts || {});
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  processEvents(type, data);

  res.status(201).send({ status: "ok" });
});
app.listen(4002, async () => {
  console.log("Listening to port 4002");

  const { data = {} } = await axios
    .get(`http://event-bus:4005/events`)
    .catch(console.log);
  data.forEach(({ type, data: eventData }) => {
    processEvents(type, eventData);
  });
});

module.exports = posts;
