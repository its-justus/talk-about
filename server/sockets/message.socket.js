const pool = require("../modules/pool");

/**
 * send queries the database to insert a new message
 *
 * @param {messageObj} payload object containing the message and which room it is for
 * @param {socketObj} socket socket object used for emitting to user or the rest of the room
 * @param {*} io io object used for emitting to room (including user) or all rooms
 */
function send(payload, socket, io) {
  const { user } = socket.request.session.passport;
  const queryText = `INSERT INTO message (author_id, room_id, text)
			VALUES ($1, $2, $3)
			RETURNING *;`;
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

/**
 * edit queries the database to edit a message
 *
 * @param {messageObj} payload object containing the message id
 * @param {socketObj} socket socket object used for emitting to user or the rest of the room
 * @param {*} io io object used for emitting to room (including user) or all rooms
 */
function edit(payload, socket, io) {
  const { user } = socket.request.session.passport;

  // first we are going to query the database for the message
  let queryText = `SELECT * FROM message
		WHERE id=$1;`;
  let queryValues = [payload.id];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      // if the message author matches our current user, they can edit it
      if (result.rows[0] && result.rows[0].author_id === user) {
        queryText = `UPDATE message
					SET text = $1 
					WHERE id = $2
					RETURNING *;`;
        queryValues = [payload.text, payload.id];
        pool
          .query(queryText, queryValues)
          .then((res) => {
            let message = res.rows[0];
            // no errors, let all members of room know to update the message
            io.to(message.room_id).emit("message.update", message);
          })
          .catch((error) => {
            socket.emit(
              "message.error",
              "message.edit error: error updating message"
            );
          });
      } else {
        socket.emit(
          "message.error",
          "message.edit error: message does not exist"
        );
      }
    })
    .catch((error) => {
      // this should never fire unless the database is having issues
      socket.emit("message.error", "error selecting message to delete");
    });
}

/**
 * delete deletes a given message from the database
 *
 * @param {messageObj} payload object containing the message id
 * @param {socketObj} socket socket object used for emitting to user or the rest of the room
 * @param {*} io io object used for emitting to room (including user) or all rooms
 */
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
  del: deleteMessage,
};
