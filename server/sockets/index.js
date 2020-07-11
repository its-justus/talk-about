const pool = require("../modules/pool");
const messageHandler = require("./message.socket");

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

	// request for member list from user
	socket.on('member.getAll', (data) => {
		console.log("member.getAll");
		const queryText = `SELECT account.* FROM room
			JOIN room_member ON room_member.room_id = room.id
			JOIN account ON account.id = room_member.account_id
			WHERE room.id = $1;`;
		// TODO ADD ROOM SPECIFIER TO queryValues
		const queryValues = [1];
		pool
      .query(queryText, queryValues)
      .then((result) => {
				console.log("got room members", result.rowCount);
				const userInRoom = result.rows.some((cur) => cur.id === user);
				console.log("userInRoom:", userInRoom);
				// if the user is a member of the room
				if(userInRoom === true){
					// send them the member list
					socket.emit("member.refresh", result.rows);
				} else {
					// otherwise they are not authorized to view the list, send an error
					socket.emit("member.error.notAuthorized")
				}
      })
      .catch((error) => {
        socket.emit("message.error", "error saving message");
      });
	})
}

module.exports = rootSocketHandler;
