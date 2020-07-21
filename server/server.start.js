const getApp = require("./server");
const connectSocket = require("./socket");

const app = getApp();
const server = app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port: ${process.env.PORT || 5000}`);
})
connectSocket(server);