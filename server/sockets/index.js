const pool = require("../modules/pool");
const messageHandler = require("./message.socket");
const memberHandler = require("./member.socket")

function rootSocketHandler(socket, io) {
  if (!socket.request.session.passport) {
		console.log("socket connected with no passport session");
    return;
  } // exit if passport session doesn't exist

  // grab our user id from the session
  const {user} = socket.request.session.passport;
	console.log(`User connected, id: ${user}`);

  // socket handlers
	
	// message from user handler
	socket.on("message.send", (data) => messageHandler.send(data, socket, io));
	// user requesting message history
	socket.on("message.getMessages", (data) => {
		console.log("message.getMessages");
		messageHandler.getMessages(data, socket, io)
	});
	// delete message
	socket.on('message.delete', (data) => messageHandler.deleteMessage(data, socket, io));

	// get room members
	socket.on("member.getMembers", (data) => memberHandler.getMembers(data, socket, io));
}

module.exports = rootSocketHandler;
