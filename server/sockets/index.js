const pool = require("../modules/pool");

function rootSocketHandler(socket, io) {
  if (!socket.request.session.passport) {
    return;
  } // exit if passport session doesn't exist

  // grab our user id from the session
  const userId = socket.request.session.passport.user;
  console.log(`If this ->${userId} is not undefined, HOLY SHIT IT WORKED`);
  setInterval(() => {
    socket.emit("chat.count", 1);
  }, 2000);

  // socket handlers

  socket.on("test", () => console.log("HOLY SHIT IT REALLY WORKS"));
  socket.on("message.send", (data) => {
    console.log("Message:", data);
    const queryText = `INSERT INTO message (author_id, room_id, text)
			VALUES ($1, $2, $3);`;
    const queryValues = [userId, 1, data];
    pool
      .query(queryText, queryValues)
      .then((result) => {
        console.log("message saved");
      })
      .catch((error) => {
        socket.emit("message.error", "error saving message");
      });
    io.emit("message.receive", data);
  });

  // refresh the user's message stream
  setTimeout(() => {
    const queryText = `SELECT * FROM message 
		WHERE room_id = $1
		ORDER BY created_at DESC
		LIMIT 2;`;
    const queryValues = [1];
    pool
      .query(queryText, queryValues)
      .then((result) => {
        socket.emit("message.refresh", result.rows.reverse());
      })
      .catch((error) => {
        console.log("query error", error);
      });
  }, 2000);
}

module.exports = rootSocketHandler;
