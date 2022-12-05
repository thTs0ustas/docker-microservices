const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
// const baseUrl = "http://localhost:";
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`http://posts-clusterid:4000/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://comments-clusterid:4001/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://query-clusterid:4002/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://moderation-clusterid:4003/events`, event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log("Listening to port 4005");
});
