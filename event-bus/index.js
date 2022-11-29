const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const baseUrl = "http://localhost:";
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`${baseUrl}4000/events`, event).catch((err) => {
    console.log(err);
  });
  axios.post(`${baseUrl}4001/events`, event).catch((err) => {
    console.log(err);
  });
  axios.post(`${baseUrl}4002/events`, event).catch((err) => {
    console.log(err);
  });
  axios.post(`${baseUrl}4003/events`, event).catch((err) => {
    console.log(err);
  });
  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log("Listening to port 4005");
});
