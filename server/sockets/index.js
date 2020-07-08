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
	socket.on("test", () => console.log("HOLY SHIT IT REALLY WORKS"));
	socket.on("message.send", (data) => {
		console.log("Message:", data);
		io.emit("message.receive", data);
	});
}

module.exports = rootSocketHandler;