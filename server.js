require('dotenv').config()
const express = require("express");
const app = express();

const axios = require('axios');
const qs = require('qs');

const session = process.env.SESSION
const to = '+12063996576'
const body = 'My Text Message Body'

app.get("/", (request, response) => {
  response.send('Hello World!')
  console.log("GET /")
});

// Send a Message
app.get("/zip", (request, response) => {
  console.log("GET /zip")
  sendMessage(session, to, body);
  response.json({"session": session, "to": to, "body": body});
});

// Send a Message
app.post("/zip", (request, response) => {
  console.log("POST /zip")
  sendMessage(session, to, body);
  response.json({"session": session, "to": to, "body": body});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const sendMessage = (session, to, body) => {
  let data = qs.stringify({
      'session': session,
      'contacts': to,
      'body': body
  });
  let config = {
      method: 'post',
      url: 'https://api.zipwhip.com/message/send',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
  };
  axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });
}
