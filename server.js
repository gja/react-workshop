var express = require('express');
var app = express();

var jsApp = require("./public/app.js");

app.use(express.static(__dirname + '/public'));
var jsonParser = require("body-parser").json();

app.get('/', function(req, res){
  res.render('index.ejs');
});

var chats = chats || [];

app.get("/ping", function(req, res) {
  res.end("pong");
});

app.get("/chat", function(req, res) {
  var since = req.query.since;
  var chatsToSend = chats;

  if (since && since != "") {
    chatsToSend = chatsToSend.filter(function(chat) {
      return chat["added-at"] > since;
    });
  }

  return res.end(JSON.stringify({
    "time": (new Date).getTime(),
    "chats": chatsToSend
  }));
});

app.post("/chat", jsonParser, function(req, res) {
  var chat = req.body["chat"];
  if(!chat)
    return res.status(422).send(JSON.stringify({"error": "Expected Chat"}));

  chat["added-at"] = (new Date()).getTime();
  chats.push(chat);
  res.status(201).send(JSON.stringify({"chat": chat}));
});

app.listen(3000);
console.log('Listening on port 3000');
