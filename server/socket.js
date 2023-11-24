//let socket

var WebSocket = require('ws'); 
let connections=new Map()
let    server = new WebSocket.Server({ port: 8888 });
server.on('connection', (ws) => {
	ws.on('message',(message)=>{
		const message_parsed = JSON.parse(message);
	console.log("a connection from",message_parsed)
		if (message_parsed.type==="join"){
			connections.set(message_parsed.username,ws)}
		
	})

})
module.exports = {
	connections,
  init: (server) => {
//    socket = require("socket.io")(server);
const socket = io("ws://127.0.0.1:8888")
    return socket;
  },

  get: () => {
    if (!server) {
      throw new Error("socket is not initialized");
    }
    return server;
  },
};
