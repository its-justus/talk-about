require("dotenv").config(); // this needs to be first
const express = require("express");
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const topicRouter = require("./routes/topic.router");

// app setup
function getApp(){
	const app = express()
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }))
		.use(sessionMiddleware)
		.use(passport.initialize())
		.use(passport.session())
		/* Routes */
		.use("/api/user", userRouter)
		.use("/api/topic", topicRouter)
		// Serve static files
		.use(express.static("build"));
	return app;
}
/*
We use the express app as our server for our socket, allowing us to reuse the 
passport session for our socket.io stuff.
*/
// const socketHandler = require('./sockets/');
// const io = require("socket.io")(app)
//   .use((socket, next) => {
//     // wrap session middleware
//     sessionMiddleware(socket.request, {}, next);
//   })
//   .on("connection", (socket) => socketHandler(socket, io));

module.exports = getApp;