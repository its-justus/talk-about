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
	console.log('session.start user:', user);
	const startTime = Date.now()

	// OPTIMIZATION: combine these functions into a single pg query.
	// I'm really only splitting these functions apart for legibility 
	// and simplicity at the moment.
	// query db for rooms user is a member of
	const rooms = await getUserRooms(user);
	// query db for topics of user's rooms
	const topics = await getUserTopics(user);

	// loop through each room in rooms
	for(let room of rooms){
		room.members = await getRoomMembers(room.id);
	}
	console.log('run time (ms):', Date.now() - startTime);
}

/**
 * getUserRooms is a helper function that queries the database for the rooms the 
 * user is a member of
 * 
 * @param {integer} userID the user's userID
 * @returns {array} an array of room objects
 */
async function getUserRooms(userID){
	console.log("getUserRooms:", userID);

	// define our query
	const query = {
		text: `SELECT room.* FROM room
			JOIN room_member ON room.id = room_member.room_id
			WHERE room_member.account_id = $1;`,
		values: [userID],
	};
	// submit query to pool
	query.result = await pool.query(query.text, query.values);
	console.log("query result:",query.result.rows);
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
	console.log("getUserTopics:", userID);

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
	console.log("query result:",query.result.rows);
	return query.result.rows;
}

/**
 * getRoomMembers queries the database for the room members of a specific room
 * 
 * @param {integer} roomID the id of the room to get the members for
 * @returns {array} an array of account objects
 */
async function getRoomMembers(roomID) {
	console.log("getRoomMembers:", roomID);

	// define our query
	const query = {
		text: `SELECT account.id, account.username FROM account
			JOIN room_member ON account.id = room_member.account_id
			WHERE room_member.room_id = $1;`,
		values: [roomID],
	};
	// submit query to pool
	query.result = await pool.query(query.text, query.values);
	console.log("query result:",query.result.rows);
	return query.result.rows;
}

module.exports = {
	start: start,
};
