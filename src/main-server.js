import { Player } from "./Player";
import { keyHandler } from "./Controller";
import { generateMap, CELL_SIZE } from "./field";
import {
  handleCollisions,
  moveObjects,
  removeDeadPlayers,
  serializeObjects
} from "./gameObjectsProcessing";

import http from "http";
import path from "path";
import express from "express";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);

const hostname = "127.0.0.1";
const port = 3000;

const wsServer = new WebSocket.Server({ server });

let players = [];
let field = generateMap(null);
let bullets = [];
let playerId = 0;

wsServer.broadcast = data => {
  wsServer.clients.forEach(client => {
    client.send(data);
  });
};

setInterval(() => {
  handleCollisions(players, bullets, field);
  moveObjects([...players, ...bullets]);
  removeDeadPlayers(players, wsServer);

  wsServer.broadcast(serializeObjects([...players, ...bullets]));
}, 1000 / 60);

wsServer.on("connection", (ws, req) => {
  ws.on("message", message => {
    const decodedMessage = JSON.parse(message);
    let player = players[decodedMessage.player_id]
      ? players[decodedMessage.player_id]
      : new Player(
          decodedMessage.player_id,
          { x: 120, y: 180 },
          { height: CELL_SIZE, width: CELL_SIZE },
          { x: 0, y: 0 },
          1
        );
    keyHandler(decodedMessage.keyStatus, player, bullets);
  });

  ws.on("close", (reasonCode, desc) => {
    players.length = 0;
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
