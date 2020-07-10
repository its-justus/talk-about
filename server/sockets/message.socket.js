const pool = require("../modules/pool");

function send(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("Message:", payload);
  const queryText = `INSERT INTO message (author_id, room_id, text)
			VALUES ($1, $2, $3)
			RETURNING *;`;
  // TODO ADD ROOM SPECIFIER TO queryValues
  const queryValues = [user, 1, payload];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log("message saved");
      io.emit("message.receive", result.rows[0]);
    })
    .catch((error) => {
      socket.emit("message.error", "error saving message");
    });
}

function getMessages(payload, socket, io) {
	console.log("getMessages");
  const queryText = `SELECT * FROM message 
		WHERE room_id = $1
		ORDER BY created_at DESC
		LIMIT 10;`;
  const queryValues = [1];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      socket.emit("message.refresh", result.rows);
    })
    .catch((error) => {
      console.log("query error", error);
    });
}

module.exports = {
  send: send,
  getMessages: getMessages,
};
