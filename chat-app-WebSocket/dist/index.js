"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//A Chat app which broadcasts a message to all the users in the same websocket server.
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket); //this tells that parallelly more than one socket got connected to one ws server in the form of an array named sockets.
    console.log("connection established");
    socket.on("message", (message) => {
        console.log(message.toString());
        for (let i = 0; i < sockets.length; i++) {
            const s = sockets[i];
            s.send(message.toString());
        }
    });
});
//when the client from the specific socket sends the message,
//the event handler of that socket gets triggered & then it broadcasts that specific messsage to every other socket including itself.
/*NOTE:- the "message" is not recieved by the socket in order to trigger the event handler
but is recieved by the websocket server from that particular senders socket. */ 
