import {Bullet, Player} from "./Entity";
import {GameObject} from "./GameObjects";
import {keyHandler} from "./Controller";
import {generate_map} from "./field";

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

let movableObjects = [];
let PlayerCounter = 0;

wsServer.on("connection", (ws, req) => {
    console.log("New player joined the game");
    ws.id = PlayerCounter++;
    movableObjects.push(new Player(ws.id, 120, 180, 50, 50, {"ol.png": null}, [0, 0], 1));
    let field = [];
    generate_map(field,null);
    ws.on('message', message => {
        if (message.type === 'utf8')
            console.log(message.utf8Data);
        else if (message.type === "binary") {
            console.log(message.binaryData);
        } else {
            let player = movableObjects[ws.id];
            if (keyHandler(JSON.parse(message), player)) {
                let x = player.x + (player.direction === -1 ? 0 : player.width);
                movableObjects.push(new Bullet(x, player.y + player.height / 2.5, 18, 5, blocksImg["lava.png"], [player.direction * 40, 0]));
            }
            movableObjects.forEach(obj => obj.move());
            let new_status = movableObjects.map(val => {
                return {"id": val.id, "x":val.x,"y":val.y,"direction":val.direction}
            });
            console.log(new_status);
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