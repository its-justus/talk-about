const pool = require("../modules/pool");

function getMembers(payload, socket, io) {
	console.log("getMembers");
	const queryText = `SELECT account.id, account.username FROM room_member
		JOIN account ON account.id = room_member.account_id
		WHERE room_id = $1
		ORDER BY account.username ASC;`;
  const queryValues = [payload];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      socket.emit("member.refresh", result.rows);
    })
    .catch((error) => {
      console.log("query error", error);
    });
}

module.exports = {
  getMembers: getMembers,
};
