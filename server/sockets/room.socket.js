const pool = require("../modules/pool");

function getRooms(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("getRooms");
  const queryText = `SELECT room.*, topic.name AS topic, topic.id AS topic_id FROM room
		JOIN room_member ON room.id = room_member.room_id
		JOIN topic ON room.topic_id = topic.id
		WHERE room_member.account_id = $1;`;
  const queryValues = [user];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      socket.emit("room.refresh", result.rows);
    })
    .catch((error) => {
      console.log("query error", error);
    });
}

async function listen(payload, socket, io) {
	// TODO add authorization here to make sure user can listen
  const { user } = socket.request.session.passport;
  console.log("setRooms");
  const rooms = Object.keys(socket.rooms);
  for (let room of rooms) {
    socket.leave(room);
  }

	console.log(`User ${user} listening in room ${payload}`);

  socket.join(payload);

  const query = {};
  query.text = `SELECT * FROM message 
		WHERE room_id = $1
		ORDER BY created_at DESC
		LIMIT 10;`;
	query.values = [payload];
	query.result = await pool.query(query.text, query.values);
	socket.emit('message.refresh', query.result.rows);

	query.text = `SELECT account.id, account.username FROM room_member
		JOIN account ON account.id = room_member.account_id
		WHERE room_id = $1
		ORDER BY account.username ASC;`;
  query.values = [payload];
  query.result = await pool.query(query.text, query.values)
  socket.emit('member.refresh', query.result.rows);


  socket.emit("room.joined", payload);
}

module.exports = {
  getRooms: getRooms,
  listen: listen,
};
