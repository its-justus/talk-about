const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const pool = require("./modules/pool");

// app setup
const app = express()
  // body-parser
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // session middleware
  .use(sessionMiddleware)
  // passport stuff
  .use(passport.initialize())
  .use(passport.session())
  /* Routes */
	.use("/api/user", userRouter)
	//.use("/api/topic", topicRouter)
  // Serve static files
  .use(express.static("build"))
  .listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port: ${process.env.PORT || 5000}`);
  });

/*
We use the express app as our server for our socket, allowing us to reuse the 
passport session for our socket.io stuff.
*/
const socketHandler = require('./sockets/');
const io = require("socket.io")(app)
  .use((socket, next) => {
    // wrap session middleware
    sessionMiddleware(socket.request, {}, next);
  })
  .on("connection", (socket) => socketHandler(socket, io));
