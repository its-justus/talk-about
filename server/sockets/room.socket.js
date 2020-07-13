const pool = require("../modules/pool");

function getRooms(payload, socket, io) {
	const {user} = socket.request.session.passport;
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

function listen(payload, socket, io) {
	const {user} = socket.request.session.passport;
	console.log("setRooms");
	
}

module.exports = {
	getRooms: getRooms,
	listen: listen,
};
