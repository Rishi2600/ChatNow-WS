import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

const sockets: WebSocket[] = [];

wss.on("connection", (socket) => {
    sockets.push(socket)

    // for (let i=0; i<sockets.length; i++) {
    //     const s = sockets[i]
    //     s.send("hello there this is the message from the server, now the connection is established.")
    // }
    //--this broadcastts the message from the server multiple times.

    socket.send("connection is established, this message is from the server to let you know that you made the connection with the ws")

    socket.on("message", (message)=> {
        console.log(message.toString())
        for (let i=0; i<sockets.length; i++) {
            const s = sockets[i]
            s.send(message.toString())
        }
    });
})
