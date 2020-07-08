const pool = require("../modules/pool");

function rootSocketHandler(socket, io) {
  if (!socket.request.session.passport) {
    return;
  } // exit if passport session doesn't exist

  // grab our user id from the session
  const {user} = socket.request.session.passport;
	console.log(`If this ->${user} is not undefined, HOLY SHIT IT WORKED`);
	
	// set up a heartbeat for testing (TODO: DELETE THIS)
  setInterval(() => {
    socket.emit("chat.count", 1);
  }, 2000);

  // socket handlers

	// test handler (TODO: DELETE THIS)
	socket.on("test", () => console.log("HOLY SHIT IT REALLY WORKS"));
	
	// message from user handler
  socket.on("message.send", (data) => {
    console.log("Message:", data);
    const queryText = `INSERT INTO message (author_id, room_id, text)
			VALUES ($1, $2, $3)
			RETURNING *;`;
		// TODO ADD ROOM SPECIFIER TO queryValues
    const queryValues = [user, 1, data];
    pool
      .query(queryText, queryValues)
      .then((result) => {
				console.log("message saved");
				io.emit("message.receive", result.rows[0]);
      })
      .catch((error) => {
        socket.emit("message.error", "error saving message");
      });
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
	

  // refresh the user's message stream
  setTimeout(() => {
    const queryText = `SELECT * FROM message 
		WHERE room_id = $1
		ORDER BY created_at DESC
		LIMIT 5;`;
    const queryValues = [1];
    pool
      .query(queryText, queryValues)
      .then((result) => {
        socket.emit("message.refresh", result.rows);
      })
      .catch((error) => {
        console.log("query error", error);
      });
  }, 2000);
}

module.exports = rootSocketHandler;
