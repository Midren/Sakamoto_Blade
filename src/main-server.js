import {Player} from "./Entity";

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
const WebSocket = require("ws");
const server = http.createServer(app);

const hostname = "127.0.0.1";
const port = 3000;

const wsServer = new WebSocket.Server({
    server
});

let players = [];
let PlayerCounter = 0;

wsServer.on("connection", (ws, req) => {
    // let connection = req.accept("", req.origin);
    console.log("New player joined the game");
    ws.id = PlayerCounter++;
    players.push(new Player(ws.id, 120, 180, 50, 50, {"ol.png": null}, [0, 0], 1));
    ws.on('message', message => {
        if (message.type === 'utf8')
            console.log(message.utf8Data);
        else if (message.type === "binary") {
            console.log(message.binaryData);
        } else {
            console.log(JSON.parse(message));
            ws.send(JSON.stringify({"id": 1, "x": 123, "y": 103}))
        }
    });

    ws.on('close', (reasonCode, desc) => {
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