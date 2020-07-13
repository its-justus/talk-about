const pool = require("../modules/pool");

async function joinTopic(payload, socket, io) {
  const { user } = socket.request.session.passport;
  console.log("joinTopic", payload);

  let rooms = await getRooms(payload, user);
  let userObj = await getUser(socket.request.session.passport.user);
  console.log("rooms found:", rooms);

  if (rooms.length > 0) {
    for (let room of rooms) {
      console.log(`Room: `, room);
      if (room.member_count < 7) {
        console.log("space in room:", room.id);
        const successful = await addUserToRoom(user, room.id);
        if (successful) {
          socket.emit("room.joined", room.id);
          socket.join(room.id, () => {
            console.log(`User ${user} joined room ${room.id}`);
            io.to(room.id).emit("member.new", userObj);
          });
          return;
        } else {
          // error adding the user to the room
          console.log("error adding user to room");
          socket.emit("room.error", "error joining room");
          return;
        }
      }
    }
    // if we've gotten to this point that means there are no rooms with space
    // for user, so we'll make a new one.
    console.log("no rooms have space, adding room");
		const roomID = await makeRoomForUser(payload, user);
		
		// then update our user via the socket
    socket.emit("room.joined", roomID);
    socket.join(roomID, () => {
      console.log(`User ${user} joined room ${roomID}`);
      io.to(roomID).emit("member.new", userObj);
    });

  } else {
    // otherwise if it's a new topic make a room for our user
    console.log("no rooms found, adding room");
    const roomID = await makeRoomForUser(payload, user);

    // then update our user via the socket
    socket.emit("room.joined", roomID);
    socket.join(roomID, () => {
      console.log(`User ${user} joined room ${roomID}`);
      io.to(roomID).emit("member.new", userObj);
    });
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

    return await pool.query(queryText, queryValues);
  } catch (error) {
    console.log("getRooms Error:", error);
    throw error;
  }
}

async function makeRoomForUser(topic, userID) {
  try {
    console.log("makeRoomForUser", { topic, userID });
    const query = {};

    // begin our transaction
    await pool.query("BEGIN");

    // first get the topic id if it exists for our topic
    query.text = `SELECT id FROM topic WHERE name = $1;`;
    query.values = [topic];
    query.result = await pool.query(query.text, query.values);

		console.log("select topics successfull", query.result.rows);

    // if we got a topic id back
    if (query.result.rowCount > 0) {
      // make a new room for that topic
      const topicID = query.result.rows[0].id;
      query.text = `INSERT INTO room (topic_id)
				VALUES ($1)
				RETURNING *;`;
      query.values = [topicID];
      query.result = await pool.query(query.text, query.values);

			console.log("insert room successfull", query.result.rows[0]);

      console.log("insert row: ", query.result.rows);
      pool.query("ROLLBACK");
      // then add the user to that room
      // await addUserToRoom(userID, topicID);
    } else {
      // otherwise first make a new topic
      query.text = `INSERT INTO topic (name)
				VALUES ($1)
				RETURNING *;`;
      query.values = [topic];
			query.result = await pool.query(query.text, query.values);
			
			console.log("insert topic successfull", query.result.rows[0]);

      // then make a room for that topic
      query.text = `INSERT INTO room (topic_id)
				VALUES ($1)
				RETURNING *;`;
      query.values = [query.result.rows[0].id];
			query.result = await pool.query(query.text, query.values);
			console.log("insert room successfull", query.result.rows[0]);

      // then add our user to the room
      await addUserToRoom(userID, query.result.rows[0].id);

      // commit our changes
      await pool.query("COMMIT");

      // finally return our new room id
      return query.result.rows[0].id;
    }
  } catch (error) {
    // if we get an error, rollback our transaction
    pool.query("ROLLBACK");
    throw error;
  }
}

module.exports = {
  joinTopic: joinTopic,
};
