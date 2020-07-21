const socketHandler = require('./sockets/');
const sessionMiddleware = require("./modules/session-middleware");

function connectSocket(app){
	const io = require("socket.io")(app)
  .use((socket, next) => {
    // wrap session middleware
    sessionMiddleware(socket.request, {}, next);
  })
	.on("connection", (socket) => socketHandler(socket, io));
}

module.exports = connectSocket;