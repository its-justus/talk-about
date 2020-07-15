const pool = require("../modules/pool");

/**
 * OPTIMIZATION: Much like topic.socket this module has lots of room for improvement
 * due to many pg queries being done. Not a big deal right now, but something to
 * consider in the future.
 */

/**
 * start initializes the user's current session by sending rooms, histories,
 * and member lists to the user. it is only run on demand by the client, so any
 * disconnections don't necessarily force start to run again.
 *
 * @param {*} data the data in the session.start packet (currently unused)
 * @param {socketObj} socket socket to be used to send data back to the client
 * @param {ioObj} io io object used for emitting to any rooms the user is joining
 * @returns null
 */
async function start(data, socket, io) {
  try {
    // initialize our performance metric
    const startTime = Date.now();
    // pull our user id from our passport session
    const { user } = socket.request.session.passport;

    // OPTIMIZATION: combine these functions into a single pg query.
    // I'm really only splitting these functions apart for legibility
    // and simplicity at the moment. large potential for performance improvement, but
    // this is an infrequent call (once at login) so its not a big deal
    // query db for rooms user is a member of
    const rooms = await getUserRooms(user);

    // OPTIMIZATION: this section in particular is where the real gains are
    // loop through each room in rooms
    for (let room of rooms) {
      room.topic = await getTopic(room.topic_id);
      room.members = await getRoomMembers(room.id);
      room.history = await getRoomHistory(room.id);
      socket.emit("room.joined", room);
      socket.join(room.id);
    }

    // query db for popular topics
    const popularTopics = await getPopularTopics();
    socket.emit("topic.popularTopics", popularTopics);

    // let the client know we're all done
    socket.emit("session.ready");

    // log some performance data
    console.log(`session.start run time: ${Date.now() - startTime}`);
  } catch (error) {
    console.log("session.start error:", error);
  }
}

/**
 * getUserRooms queries the database for all the rooms that a user is a
 * member of.
 *
 * @param {number} userID the user's userID
 * @returns {array} an array of room objects
 */
async function getUserRooms(userID) {
  try {
    // define our query
    const query = {};
    query.text = `SELECT room.* FROM room
			JOIN room_member ON room.id = room_member.room_id
			WHERE room_member.account_id = $1;`;
    query.values = [userID];
    query.result = await pool.query(query.text, query.values);

    // return our result
    return query.result.rows;
  } catch (error) {
    console.log("getUserRooms error:", error);
    throw error;
  }
}

/**
 * getUserTopics queries the database for a topic
 *
 * @param {number} topicID the id of the topic
 * @returns {topicObj} a topic object
 */
async function getTopic(topicID) {
  try {
    // define our query
    const query = {};
    query.text = `SELECT topic.* FROM topic
			WHERE topic.id = $1;`;
    query.values = [topicID];
    query.result = await pool.query(query.text, query.values);

    // return our result
    return query.result.rows[0];
  } catch (error) {
    console.log("getTopic error:", error);
    throw error;
  }
}

/**
 * getRoomMembers queries the database for the room members of a specific room
 *
 * @param {number} roomID the id of the room to get the members for
 * @returns {array} an array of account objects
 */
async function getRoomMembers(roomID) {
  try {
    // define our query
    const query = {};
    query.text = `SELECT account.id, account.username FROM account
			JOIN room_member ON account.id = room_member.account_id
			WHERE room_member.room_id = $1;`;
    query.values = [roomID];
    query.result = await pool.query(query.text, query.values);

    // return our results
    return query.result.rows;
  } catch (error) {
    console.log("getRoomMembers error:", error);
    throw error;
  }
}

/**
 * getRoomHistory queries the database for the room's message history
 * only retrieves 20 messages by default unless envar is set up.
 *
 * @param {number} roomID the room to retrieve the history for
 * @returns {array} an array of message objects
 */
async function getRoomHistory(roomID) {
  try {
    const MAX_HISTORY_MESSAGES = process.env.MAX_HISTORY_MESSAGES || 20;
    // define our query
    const query = {};
    query.text = `SELECT message.* FROM message
		WHERE room_id = $1
		ORDER BY created_at DESC
		LIMIT $2;`;
    query.values = [roomID, MAX_HISTORY_MESSAGES];
    query.result = await pool.query(query.text, query.values);

    // return our result
    return query.result.rows;
  } catch (error) {
    console.log("getRoomHistory error:", error);
    throw error;
  }
}

/**
 * getPopularTopics queries the database for the topics with the most
 * rooms currently discussing it
 *
 * @returns {array} an array of topic objects
 */
async function getPopularTopics() {
  // OPTIMIZATION: have a table of topics by popularity that is
  // maintained by the database. this function would then just pick the top 10
  // of that table. this might be a bad idea though. perhaps have it calculated
  // every 10 minutes or so...
  try {
    const MAX_POPULAR_TOPICS = process.env.MAX_POPULAR_TOPICS || 10;
    // define our query
    const query = {};
    query.text = `SELECT topic.*, count(room) AS rooms FROM topic
			JOIN room ON topic.id = room.topic_id
			GROUP BY topic.id
			ORDER BY count(room) DESC, lower(topic.name) ASC
			LIMIT $1;`;
    query.values = [MAX_POPULAR_TOPICS];
    query.result = await pool.query(query.text, query.values);

    // return our result
    return query.result.rows;
  } catch (error) {
    console.log("getPopularTopics error:", error);
    throw error;
  }
}

module.exports = {
  start: start,
};
