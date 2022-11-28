const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const baseUrl = "http://localhost:";
app.use(bodyParser.json());
app.use(cors());
const hasOrange = (text) => /orange/gi.test(text);

app.post("/events", (req, res) => {
  console.log("Events received", req.body.type);

  const {
    type,
    data: { id, postId, content },
  } = req.body;
  if (type === "commentCreated") {
    const testIfOrange = hasOrange(content);
    let response;

    if (!testIfOrange) {
      response = {
        type: "commentUpdated",
        data: { id, postId, content, status: "fulfilled" },
      };
    } else {
      response = {
        type: "commentUpdated",
        data: { id, postId, content, status: "rejected" },
      };
    }

    axios.post(`${baseUrl}4001/update`, response).catch((err) => {
      console.log(err);
    });
  }

  res.send({ status: "ok" });
});
app.listen(4003, () => {
  console.log("Listening to port 4003");
});
