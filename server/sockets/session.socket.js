const pool = require("../modules/pool");

/**
 * start initializes the user's current session by sending rooms, histories, 
 * and member lists to the user. it is only run on demand by the client, so any
 * disconnections don't necessarily force start to run again.
 * 
 * @param data the data in the session.start packet (currently unused)
 * @param socket socket to be used to send data back to the client
 * @param io io object used for emitting to any rooms the user is joining
 * @returns null
 */
async function start(data, socket, io) {
	const { user } = socket.request.session.passport;
	console.log('session.start user:', user);
}

module.exports = {
	start: start,
};
