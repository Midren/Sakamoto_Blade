import { Player } from "./Player";
import { actionHandler } from "./Controller";
import {
  generateMap,
  CELL_WIDTH,
  CELL_HEIGHT,
  FIELD_HEIGHT,
  FIELD_WIDTH
} from "./field";
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
    if (!players[decodedMessage.playerId]) {
      let coordinates =
        decodedMessage.playerId % 2
          ? { x: 120, y: 100 }
          : { x: FIELD_WIDTH - 120, y: 100 };
      players[decodedMessage.playerId] = new Player(
        decodedMessage.playerId,
        coordinates,
        { height: CELL_HEIGHT, width: CELL_WIDTH },
        { x: 0, y: 0 },
        1
      );
    }
    let player = players[decodedMessage.playerId];
    actionHandler(decodedMessage.keyStatus, player, bullets);
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
