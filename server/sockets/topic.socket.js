const pool = require("../modules/pool");

/**
 * OPTIMIZATION: this whole module holds a lot of potential for optimization.
 * Typical runtimes are 15-30ms which is okay due to the infrequency of
 * users actually joining rooms. The fact that all calls are async helps as well
 * since we are not blocking other incoming calls or db calls. Only once there
 * is a considerable number of users will this module begin to be a limiting factor.
 * Though increased database sized might make this happen sooner rather than later.
 *
 * In any case, I'm marking it for optimization for future me. Hi future Ian!
 * I hope this code doesn't make you cringe too hard :p
 * - IJ 2020
 */

/**
 * joinTopic handles placing the user into a room with a specified topic.
 * the room may be an existing one that has spots open, or it may be a new
 * room if there are no rooms with open spots. it sends a room.joined emit
 * to the user upon completion, which contains all the data the user needs
 * to display the room. updates are also sent to all room members so they
 * have the new user's data
 *
 * @param {string} payload the topic sent with the request
 * @param {socketObj} socket the socket created on connection. used to communicate with the user
 * @param {ioObj} io the io object created on server startup. used to communicate with others in the room
 * @returns {Promise} an empty promise that doesn't resolve to anything
 */
async function joinTopic(payload, socket, io) {
  try {
		// initialize performance metric
		const startTime = Date.now();
		// pull our user id from our session
    const { user } = socket.request.session.passport;
		// define our topic for readability
		const topic = payload;
		
    // begin our transaction
    pool.query("BEGIN");

    // get room with topic that user can join (user not already in room)
    let room = await getRoom(topic, user);

    // get our user info
    const userObj = await getUser(user);
    // add our user to the member list
    room.members.push(userObj);

    // send our new room to the user
    socket.emit("room.joined", room);
    // add the user to the room in the database
    addUserToRoom(userObj.id, room.id);
    // add the user to the socket room
    socket.join(room.id, () => {
      // let others in the room know the user joined
      io.to(room.id).emit("member.joined", userObj);
    });

    // end our transaction successfully
		pool.query("ROLLBACK");

		// log some performance data
    console.log(`joinTopic runtime: ${Date.now() - startTime}ms`);
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
 * @param {number} uid the user's id (must be retrieved from session)
 * @returns {roomObj} a room object the user will then join
 */
async function getRoom(topic, uid) {
	// get our max member count from the environment, or default to 7
	const MAX_MEMBER_COUNT = process.env.MAX_MEMBER_COUNT || 7;
  try {
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
    query.result = await pool.query(query.text, query.values);
		
		// assign our result
		let room = query.result.rows[0];

    // if we didn't get a room back, make one
    if (!room) {
      room = await makeRoom(topic);
      room.topic_id = room.topic.id;
    } else {
      // otherwise get the rest of our room data
      // save topic info
      room.topic = { id: room.topic_id, name: topic };
      // get room members
      room.members = await getMembers(room.id);
      // get room history
      room.history = await getHistory(room.id);
    }

    // return our room
    return room;
  } catch (error) {
    console.log("topic.getRoom error", error);
    throw error;
  }
}

/**
 * getHistory queries the database for the message history of a given room
 *
 * @param {number} roomID the room id that we want the messages for
 * @returns {array} an array of message objects
 */
async function getHistory(roomID) {
  const MAX_HISTORY_MESSAGES = process.env.MAX_HISTORY_MESSAGES || 20;
  try {
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
    throw error;
  }
}

/**
 * getUser queries the database for the full user information
 *
 * @param {number} userID the user's id
 * @returns {userObj} a user object containing the user's information
 */
async function getUser(userID) {
  try {
		// define our query
    const query = {};
    query.text = `SELECT id, username FROM account WHERE id = $1;`;
    query.values = [userID];
    query.result = await pool.query(query.text, query.values);
		
		// return our result
		return query.result.rows[0];
  } catch (error) {
    console.log("getRooms Error:", error);
    throw error;
  }
}

/**
 * addUserToRoom adds the user to the room in the database
 *
 * @param {number} userID the user's id
 * @param {number} roomID the room id that we are adding the user to
 * @returns null
 */
function addUserToRoom(userID, roomID) {
  try {
    // define our query
    const query = {};
    query.text = `INSERT INTO room_member (account_id, room_id)
			VALUES ($1, $2);`;
    query.values = [userID, roomID];
    query.result = pool.query(query.text, query.values);
		
		// return null since we don't have any data
		return null;
  } catch (error) {
    console.log("getRooms Error:", error);
    throw error;
  }
}

/**
 * getMembers queries the database for the members of the room the user
 * is about to join
 *
 * @param {number} roomID the id of the room we are joining
 * @returns {array} an array of member objects
 */
async function getMembers(roomID) {
  try {
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
    throw error;
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
    throw error;
  }
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
    // OPTIMIZATION: combine this into one query. pretty sure this is doable
    // first get the topic if it exists
    const query = {};
    query.text = `SELECT * FROM topic WHERE name = $1;`;
    query.values = [topic];
    query.result = await pool.query(query.text, query.values);
    let topicObj = query.result.rows[0];

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
    return topicObj;
  } catch (error) {
    console.log("getTopic error:", error);
    throw error;
  }
}

module.exports = {
  joinTopic: joinTopic,
};
