var db = require('./db');
var _ = require('lodash');
var uuid = require('uuid').v1;

function Rooms() {
  this.getRoom = getRoom;
  this.addMessage = addMessage;
  this.createRoom = createRoom;
  this.getAllRooms = getAllRooms;
  this.getRoomMessages = getRoomMessages;
  this.state = {};

  function createRoom(room) {
    _.defaults(room, {
      id: uuid(),
      messages: []
    });

    db.set(room.id, room);

    return room;
  }

  function getRoom(roomId) {
    var room = db.get(roomId);

    if (room) {
      return room;
    }
  }

  function getRoomMessages(roomId) {
    var room = db.get(roomId);

    if (room) {
      return room.messages;
    }

    return [];
  }

  function getAllRooms() {
    return _.values(db.get());
  }

  function addMessage(roomId, message) {
    var room = db.get(roomId);

    if (room) {
      _.defaults(message, {
        id: uuid()
      });

      room.messages.push(message);

      db.set(roomId, room);

      return message;
    }
  }
}

module.exports = Rooms;