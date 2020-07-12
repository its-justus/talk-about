const pool = require("../modules/pool");
const messageHandler = require("./message.socket");
const memberHandler = require("./member.socket");
const topicHandler = require("./topic.socket");

function rootSocketHandler(socket, io) {
  if (!socket.request.session.passport) {
		console.log("socket connected with no passport session");
    return;
  } // exit if passport session doesn't exist

  // grab our user id from the session
  const {user} = socket.request.session.passport;
	console.log(`User connected, id: ${user}`);

  // socket handlers
	
	// Message Handlers
	// message from user handler
	socket.on("message.send", (data) => messageHandler.send(data, socket, io));
	// edit message handler
	socket.on("message.edit", (data) => messageHandler.edit(data, socket, io));
	// user requesting message history
	socket.on("message.getMessages", (data) => messageHandler.getMessages(data, socket, io));
	// delete message
	socket.on('message.delete', (data) => messageHandler.deleteMessage(data, socket, io));

	// Room Member Handlers
	// get room members
	socket.on("member.getMembers", (data) => memberHandler.getMembers(data, socket, io));

	// Topic Handlers
	socket.on("topic.join", (data) => topicHandler.joinTopic(data, socket, io));
}

module.exports = rootSocketHandler;
