const pool = require("../modules/pool");

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
  // pull our user id from our passport session
  const { user } = socket.request.session.passport;
  console.log("session.start user:", user);
  const startTime = Date.now();

  // OPTIMIZATION: combine these functions into a single pg query.
  // I'm really only splitting these functions apart for legibility
  // and simplicity at the moment. large potential for performance improvement, but
  // this is an infrequent call (once at login) so its not a big deal
  // query db for rooms user is a member of
  const rooms = await getUserRooms(user);
  // query db for topics of user's rooms
  const topics = await getUserTopics(user);

  // OPTIMIZATION: this section in particular is where the real gains are
  // loop through each room in rooms
  for (let room of rooms) {
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

  console.log("run time (ms):", Date.now() - startTime);
}

/**
 * getUserRooms is a helper function that queries the database for the rooms the
 * user is a member of
 *
 * @param {integer} userID the user's userID
 * @returns {array} an array of room objects
 */
async function getUserRooms(userID) {
  //console.log("getUserRooms:", userID);

  // define our query
  const query = {
    text: `SELECT room.* FROM room
			JOIN room_member ON room.id = room_member.room_id
			WHERE room_member.account_id = $1;`,
    values: [userID],
  };
  // submit query to pool
  query.result = await pool.query(query.text, query.values);
  //console.log("query result:",query.result.rows);
  return query.result.rows;
}

/**
 * getUserTopics queries the database for the topics of the rooms the user
 * is a member of
 *
 * @param {integer} userID the user's userID
 * @returns {array} an array of topic objects
 */
async function getUserTopics(userID) {
  //console.log("getUserTopics:", userID);

  // define our query
  const query = {
    text: `SELECT topic.* FROM topic
			JOIN room ON topic.id = room.topic_id
			JOIN room_member ON room.id = room_member.room_id
			WHERE room_member.account_id = $1;`,
    values: [userID],
  };
  // submit query to pool
  query.result = await pool.query(query.text, query.values);
  //console.log("query result:",query.result.rows);
  return query.result.rows;
}

/**
 * getRoomMembers queries the database for the room members of a specific room
 *
 * @param {integer} roomID the id of the room to get the members for
 * @returns {array} an array of account objects
 */
async function getRoomMembers(roomID) {
  //console.log("getRoomMembers:", roomID);

  // define our query
  const query = {
    text: `SELECT account.id, account.username FROM account
			JOIN room_member ON account.id = room_member.account_id
			WHERE room_member.room_id = $1;`,
    values: [roomID],
  };
  // submit query to pool
  query.result = await pool.query(query.text, query.values);
  //console.log("query result:",query.result.rows);
  return query.result.rows;
}

/**
 * getRoomHistory queries the database for the room's message history
 * only retrieves 20 messages
 *
 * @param {integer} roomID the room to retrieve the history for
 * @returns {array} an array of message objects
 */
async function getRoomHistory(roomID) {
  //console.log("getRoomMembers:", roomID);

  // define our query
  const query = {
    text: `SELECT message.* FROM message
			WHERE room_id = $1
			ORDER BY created_at DESC
			LIMIT 20;`,
    values: [roomID],
  };
  // submit query to pool
  query.result = await pool.query(query.text, query.values);
  //console.log("query result:",query.result.rows);
  return query.result.rows;
}

/**
 * getPopularTopics queries the database for the topics with the most
 * rooms currently discussing it
 *
 * @param none
 * @returns {array} an array of topic objects
 */
async function getPopularTopics() {
  //console.log("getPopularTopics:");
  // OPTIMIZATION: have a table of topics by popularity that is
  // maintained by the database. this function would then just pick the top 10
  // of that table. this might be a bad idea though.

  // define our query
  const query = {
    text: `SELECT topic.*, count(room) AS rooms FROM topic
			JOIN room ON topic.id = room.topic_id
			GROUP BY topic.id
			ORDER BY count(room) DESC, lower(topic.name) ASC
			LIMIT 10;`,
    values: [],
  };
  // submit query to pool
  query.result = await pool.query(query.text);
  //console.log("query result:",query.result.rows);
  return query.result.rows;
}

module.exports = {
  start: start,
};
