const pool = require("../modules/pool");

function send(payload, socket, io) {
  const { user } = socket.request.session.passport;
  const queryText = `INSERT INTO message (author_id, room_id, text)
			VALUES ($1, $2, $3)
			RETURNING *;`;
  // TODO ADD ROOM SPECIFIER TO queryValues
  const queryValues = [user, payload.room, payload.text];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      io.to(payload.room).emit("message.receive", result.rows[0]);
    })
    .catch((error) => {
      socket.emit("message.error", "error saving message");
    });
}

function edit(payload, socket, io) {
  const { user } = socket.request.session.passport;

  // first we are going to query the database for the message
  let queryText = `SELECT * FROM message
		WHERE id=$1;`;
  let queryValues = [payload.id];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      // if the message author matches our current user, they can delete it
      if (result.rows[0] && result.rows[0].author_id === user) {
        queryText = `UPDATE message
			SET text = $1 
			WHERE id = $2
			RETURNING *;`;
        queryValues = [payload.text, payload.id];
        // TODO ADD ROOM SPECIFIER TO queryValues
        pool
          .query(queryText, queryValues)
          .then((res) => {
            let message = res.rows[0];
            // let all members of room know to update the message
            io.to(message.room_id).emit("message.update", message);
          })
          .catch((error) => {
            socket.emit("message.error", "error deleting message");
          });
      } else {
        socket.emit("message.error");
      }
    })
    .catch((error) => {
      // this should never fire unless the database is having issues
      socket.emit("message.error", "error selecting message to delete");
    });
}

function deleteMessage(payload, socket, io) {
  const { user } = socket.request.session.passport;

  // first we are going to query the database for the message
  let queryText = `SELECT * FROM message
		WHERE id=$1;`;
  const queryValues = [payload];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      // if the message author matches our current user, they can delete it
      if (result.rows[0] && result.rows[0].author_id === user) {
        queryText = `DELETE FROM message 
			WHERE id= $1;`;

        pool
          .query(queryText, queryValues)
          .then((res) => {
            // tell all members of room to remove the message
            io.to(result.rows[0].room_id).emit(
              "message.remove",
              result.rows[0]
            );
          })
          .catch((error) => {
            socket.emit("message.error", "error deleting message");
          });
      }
    })
    .catch((error) => {
      // this should never fire unless the database is having issues
      socket.emit("message.error", "error selecting message to delete");
    });
}

module.exports = {
  send: send,
  edit: edit,
  deleteMessage: deleteMessage,
};
