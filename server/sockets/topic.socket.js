const pool = require("../modules/pool");
const { getSourceMapRange } = require("typescript");

async function joinTopic(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("joinTopic", payload);

  let rooms = await getRooms(payload, user);
  let userObj = await getUser(socket.request.session.passport.user);
  console.log(rooms);

  if (rooms.length > 0) {
    for (let room of rooms) {
      if (room.member_count < 7) {
        console.log("space in room:", room.id);
        const successful = await addUserToRoom(user, room.id);
        if (successful) {
					socket.emit("room.joined", room.id);
          socket.join(room.id, () => {
            console.log(`User ${user} joined room ${room.id}`);
            io.to(room.id).emit("member.new", userObj);
          });
        }
      } else {
        // no rooms with space, make a new room
      }
    }
  }
}

// helper function to get a list of rooms with the specified topic as a their current topic
// EXCLUDING rooms that the user is already a member of
async function getRooms(topic, uid) {
  try {
    // select rooms with our topic as their current topic, and a count of the members
    // in that room cast as an integer
    const queryText = `SELECT room.*, count(room_member)::INTEGER AS member_count FROM room
		JOIN topic ON topic.id = room.topic_id
		JOIN room_member ON room_member.room_id = room.id
		WHERE topic.name = $1 AND
		room.id NOT IN
			(SELECT room_id FROM room_member
				WHERE account_id = $2)
		GROUP BY room.id;`;
    const queryValues = [topic, uid];

    const result = await pool.query(queryText, queryValues);
    console.log(queryText, queryValues);
    return result.rows;
  } catch (error) {
    console.log("getRooms Error:", error);
  }
}

// helper function to get user info
async function getUser(userID) {
  try {
    const queryText = `SELECT id, username FROM account WHERE id = $1;`;
    const queryValues = [userID];

    const result = await pool.query(queryText, queryValues);
    return result.rows;
  } catch (error) {
    console.log("getRooms Error:", error);
  }
}

async function addUserToRoom(userID, roomID) {
  try {
    const queryText = `INSERT INTO room_member (account_id, room_id)
			VALUES ($1, $2)
			RETURNING *;`;
    const queryValues = [userID, roomID];

    await pool.query(queryText, queryValues);
    return true;
  } catch (error) {
    console.log("getRooms Error:", error);
    return false;
  }
}

module.exports = {
  joinTopic: joinTopic,
};
