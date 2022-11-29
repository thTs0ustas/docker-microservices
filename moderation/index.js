const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const baseUrl = "http://localhost:";
app.use(bodyParser.json());
app.use(cors());
const hasOrange = (text) => /orange/gi.test(text);

app.post("/events", async (req, res) => {
  console.log("Events received", req.body.type);

  const { type, data } = req.body;

  if (type === "commentCreated") {
    const { id, postId, content } = data;
    const status = hasOrange(content) ? "rejected" : "fulfilled";
    const response = {
      type: "commentModerated",
      data: { id, postId, content, status },
    };

    await axios.post(`${baseUrl}4005/events`, response).catch((err) => {
      console.log(err);
    });
  }

  res.send({ status: "ok" });
});
app.listen(4003, () => {
  console.log("Listening to port 4003");
});
