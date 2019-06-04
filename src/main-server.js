const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
const WebSocketServer = require("websocket").server;
const server = http.Server(app);

const hostname = "127.0.0.1";
const port = 3000;

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

wsServer.on("request", req => {
    let connection = req.accept("", req.origin);
    console.log("New player joined the game");
    connection.on('message', message => {
        if(message.type === 'utf8')
            console.log(message.utf8Data);
        else if(message.type === "binary") {
            console.log(message.binaryData);
        }
    });

    connection.on('close', (reasonCode, desc) => {
        console.log("Player has leaved");
    });
});

app.use(express.static(__dirname + "/../static"));
app.use(express.static(__dirname + "/../dist"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});