const pool = require("../modules/pool");

async function joinTopic(payload, socket, io) {
  try {
    const { user } = socket.request.session.passport;
    const topic = payload;
    console.log("joinTopic", payload);
    // begin our transaction
    pool.query("BEGIN");

    // get room with topic that user can join (user not already in room)
    let room = await getRoom(topic, user);
		console.log("joinTopic room:", room);
    // end our transaction
    pool.query("ROLLBACK");
  } catch (error) {
    pool.query("ROLLBACK");
    console.log("join topic error:", error);
  }
}

/**
 * getRoom queries the database for a room that meets the following criteria
 * 1. the current topic matches topic
 * 2. has fewer members that the maximum member limit
 * 3. the user is not already a member of that room
 * if no room is found that matches these criteria, a new room is created
 *
 * @param {string} topic the topic the user requested
 * @param {integer} uid the user's id (must be retrieved from session)
 * @returns {roomObj} a room object the user will then join
 */
async function getRoom(topic, uid) {
  const MAX_MEMBER_COUNT = process.env.MAX_MEMBER_COUNT || 7;
  try {
    console.log("topic.getRoom");

    // define our query
    // Our query selects a single room that has a topic matching our topic
    // param, fewer members that MAX_MEMBER_COUNT, and the user is not
    // already a member of. If there are no such rooms our result.rows is an
    // empty array. It also selects the oldest room, so older rooms get priority
    // when filling empty spots.
    const query = {};
    query.text = `SELECT room.* FROM room
				JOIN topic ON topic.id = room.topic_id
				JOIN room_member ON room_member.room_id = room.id
				WHERE topic.name = $1 AND
				room.id NOT IN
					(SELECT room_id FROM room_member WHERE account_id = $2)
				GROUP BY room.id
				HAVING count(room_member) < $3
				ORDER BY room.created_at ASC
				LIMIT 1;`;
    query.values = [topic, uid, MAX_MEMBER_COUNT];

    // submit our query and assign the first row to room
    query.result = await pool.query(query.text, query.values);
    let room = query.result.rows[0];
    // if we didn't get a room back, make one
    if (!room) {
			console.log("getRoom no room");
			room = await makeRoom(topic);
			room.topic_id = room.topic.id;
    } else { // otherwise get the rest of our room data
			console.log("getRoom found room");
			// save topic info
			room.topic = {id: room.topic_id, name: topic};
			// get room members
			room.members = await getMembers(room.id);
			// get room history
			room.history = await getHistory(room.id);
		}
		
		// return our room
		return room;
  } catch (error) {
    console.log("topic.getRoom error", error);
  }
}

/**
 * getHistory queries the database for the message history of a given room
 * 
 * @param {integer} roomID the room id that we want the messages for
 * @returns {array} an array of message objects
 */
async function getHistory(roomID) {
	const MAX_HISTORY_MESSAGES = process.env.MAX_HISTORY_MESSAGES || 20;
	try {
		console.log("getHistory");
		// define our query
		const query = {};
		query.text = `SELECT * FROM message
			WHERE room_id = $1
			ORDER BY created_at DESC
			LIMIT $2;`;
		query.values = [roomID, MAX_HISTORY_MESSAGES];
		query.result = await pool.query(query.text, query.values);

		// return our result
		return query.result.rows;
	} catch (error) {
		console.log("getHistory error:", error);
	}
}

// helper function to get a list of rooms with the specified topic as a their current topic
// EXCLUDING rooms that the user is already a member of
async function getRooms(topic, uid) {
  try {
    // select rooms with our topic as their current topic, and a count of the members
    // in that room cast as an integer
    const queryText = `SELECT room.* FROM room
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

/**
 * getUser queries the database for the full user information
 * 
 * @param {integer} userID the user's id
 * @returns {userObj} a user object containing the user's information
 */
async function getUser(userID) {
  try {
		console.log("getUser", userID);
		const query = {};
		query.text = `SELECT id, username FROM account WHERE id = $1;`;
		query.values = [userID];
		query.result = await pool.query(query.text, query.values);
    return query.result.rows[0];
  } catch (error) {
    console.log("getRooms Error:", error);
  }
}

async function addUserToRoom(userID, roomID) {
  try {
    console.log("adding user to room", { userID, roomID });
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

/**
 * getMembers queries the database for the members of the room the user
 * is about to join
 * 
 * @param {integer} roomID the id of the room we are joining
 * @returns {array} an array of member objects
 */
async function getMembers(roomID) {
	try{
		console.log("getMembers");

		// define our query
		const query = {};
		query.text = `SELECT account.id, account.username FROM room_member
			JOIN account ON account.id = room_member.account_id
			WHERE room_id = $1
			ORDER BY lower(account.username) ASC;`;
		query.values = [roomID];
		query.result = await pool.query(query.text, query.values);
		
		// return our results
		return query.result.rows;
	} catch (error) {
		console.log("getMembers error:", error);
	}
}

/**
 * makeRoom adds a room to the database with the specified topic.
 *
 * @param {string} topic the topic the room will start with
 * @returns {roomObj} a room object containing data about the room
 */
async function makeRoom(topic) {
  try {
    console.log("makeRoom", topic);
    // define our room object
    const room = {};

    // first get the topic object for our topic
    room.topic = await getTopic(topic);

    // create our member and history
    room.members = [];
    room.history = [];

    // add our room to the database
    const query = {};
    query.text = `INSERT INTO room (topic_id)
			VALUES ($1)
			RETURNING *;`;
    query.values = [room.topic.id];
    query.result = await pool.query(query.text, query.values);
    // add our new room data to the room object
    room.id = query.result.rows[0].id;
    room.created_at = query.result.rows[0].created_at;

    // return our new room
    return room;
  } catch (error) {
    console.log("makeRoom error:", error);
  }

  // try {
  //   console.log("makeRoomForUser", { topic, userID });
  //   const query = {};

  //   // begin our transaction
  //   await pool.query("BEGIN");

  //   // first get the topic id if it exists for our topic
  //   query.text = `SELECT id FROM topic WHERE name = $1;`;
  //   query.values = [topic];
  //   query.result = await pool.query(query.text, query.values);

  //   console.log("select topics successfull", query.result.rows);

  //   // if we got a topic id back
  //   if (query.result.rowCount > 0) {
  //     // make a new room for that topic
  //     const topicID = query.result.rows[0].id;
  //     query.text = `INSERT INTO room (topic_id)
  // 			VALUES ($1)
  // 			RETURNING *;`;
  //     query.values = [topicID];
  //     query.result = await pool.query(query.text, query.values);

  //     console.log("insert room successfull", query.result.rows[0]);

  // 		console.log("insert row: ", query.result.rows);
  // 		await addUserToRoom(userID, query.result.rows[0].id)
  // 		pool.query("COMMIT");
  // 		return query.result.rows[0].id;
  //     // then add the user to that room
  //     // await addUserToRoom(userID, topicID);
  //   } else {
  //     // otherwise first make a new topic
  //     query.text = `INSERT INTO topic (name)
  // 			VALUES ($1)
  // 			RETURNING *;`;
  //     query.values = [topic];
  //     query.result = await pool.query(query.text, query.values);

  //     console.log("insert topic successfull", query.result.rows[0]);

  //     // then make a room for that topic
  //     query.text = `INSERT INTO room (topic_id)
  // 			VALUES ($1)
  // 			RETURNING *;`;
  //     query.values = [query.result.rows[0].id];
  //     query.result = await pool.query(query.text, query.values);
  //     console.log("insert room successfull", query.result.rows[0]);

  //     // then add our user to the room
  //     await addUserToRoom(userID, query.result.rows[0].id);

  //     // commit our changes
  //     await pool.query("COMMIT");

  //     // finally return our new room id
  //     return query.result.rows[0].id;
  //   }
  // } catch (error) {
  //   // if we get an error, rollback our transaction
  //   pool.query("ROLLBACK");
  //   throw error;
  // }
}

/**
 * getTopic queries the database for the topic matching a given topic name.
 * if the topic does not already exist it creates it.
 *
 * @param {string} topic the name of the topic we are searching for/creating
 * @returns {topicObj} a topic object containing data about the object
 */
async function getTopic(topic) {
  try {
    // first get the topic if it exists
    const query = {};
    query.text = `SELECT * FROM topic WHERE name = $1;`;
    query.values = [topic];
    query.result = await pool.query(query.text, query.values);
    let topicObj = query.result.rows[0];
    console.log("topic: ", topic);

    // if the topic doesn't exist, create it
    if (!topicObj) {
      query.text = `INSERT INTO topic (name)
			VALUES ($1)
			RETURNING *;`;
      query.values = [topic];
      query.result = await pool.query(query.text, query.values);
      topicObj = query.result.rows[0];
    }

    // return the topic
    console.log("topicObj:", topicObj);
    return topicObj;
  } catch (error) {
    console.log("getTopic error:", error);
  }
}

module.exports = {
  joinTopic: joinTopic,
};
