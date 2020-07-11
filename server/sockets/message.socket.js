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

function edit(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("Edit message:", payload);

  // first we are going to query the database for the message
  let queryText = `SELECT * FROM message
		WHERE id=$1;`;
  let queryValues = [payload.id];

  pool.query(queryText, queryValues).then((result) => {
    // if the message author matches our current user, they can delete it
    if (result.rows[0] && result.rows[0].author_id === user) {
			queryText = `UPDATE message
			SET text = $1 
			WHERE id= $2
			RETURNING *;`;
			queryValues = [payload.text, payload.id];
      // TODO ADD ROOM SPECIFIER TO queryValues
      pool
        .query(queryText, queryValues)
        .then((result) => {
          console.log("message updated");
          // TODO add room specifier to remove this message only from this room
          io.emit("message.update", result.rows[0]);
        })
        .catch((error) => {
          socket.emit("message.error", "error deleting message");
        });
    } else {
			socket.emit("message.error")
		}
	})
	.catch((error) => {
		// this should never fire unless the database is having issues
		socket.emit("message.error", "error selecting message to delete")
	});
}

function deleteMessage(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("Delete message:", payload);

  // first we are going to query the database for the message
  let queryText = `SELECT * FROM message
		WHERE id=$1;`;
  const queryValues = [payload];

  pool.query(queryText, queryValues).then((result) => {
    // if the message author matches our current user, they can delete it
    if (result.rows[0] && result.rows[0].author_id === user) {
      queryText = `DELETE FROM message 
			WHERE id= $1;`;
      // TODO ADD ROOM SPECIFIER TO queryValues
      pool
        .query(queryText, queryValues)
        .then((result) => {
          console.log("message deleted");
          // TODO add room specifier to remove this message only from this room
          io.emit("message.remove", payload);
        })
        .catch((error) => {
          socket.emit("message.error", "error deleting message");
        });
    }
	})
	.catch((error) => {
		// this should never fire unless the database is having issues
		socket.emit("message.error", "error selecting message to delete")
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
	edit: edit,
	deleteMessage: deleteMessage,
  getMessages: getMessages,
};
