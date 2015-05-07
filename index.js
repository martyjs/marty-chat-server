var morgan = require('morgan');
var Rooms = require('./rooms');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var rooms = new Rooms();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/api/rooms', function(req, res) {
  res.json(rooms.getAllRooms()).end();
});

app.post('/api/rooms', function (req, res) {
  var room = rooms.createRoom(req.body);

  res.json(room).status(201).end();
});

app.post('/api/rooms/:roomId/messages', function(req, res) {
  var message = rooms.addMessage(roomId(req), req.body);

  res.json(message).status(201).end();
});

app.get('/api/rooms/:roomId/messages', function (req, res) {
  var messages = rooms.getRoomMessages(roomId(req));

  res.json(messages).end();
});

module.exports = app;

function roomId(req) {
  return req.params.roomId;
}