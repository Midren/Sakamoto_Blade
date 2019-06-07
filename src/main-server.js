import { Player } from "./Player";
import { Bullet } from "./Bullet";
import { keyHandler } from "./Controller";
import { generate_map } from "./field";

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
let movableObjects = [];
let PlayerCounter = 0;
let field = generate_map(null);

wsServer.on("connection", (ws, req) => {
  console.log("New player joined the game");
  ws.id = ++PlayerCounter;
  players.push(
    new Player(
      ws.id,
      { x: 120, y: 180 },
      { height: 50, width: 50 },
      { "ol.png": null },
      [0, 0],
      1
    )
  );
  console.log(players);
  ws.on("message", message => {
    let player = players[ws.id - 1];
    if (!player) return;
    if (keyHandler(JSON.parse(message), player)) {
      let x = player.coordinates.x + (player.direction === -1 ? -5 : player.size.width);
      movableObjects.push(
        new Bullet(
          0,
          { x: x, y: player.coordinates.y + player.size.height / 2.5 },
          { height: 18, width: 5 },
          null,
          [player.direction * 40, 0]
        )
      );
    }
    players.forEach(
      player =>
        (player.onGround = !field.some(val => player.onCollision(val))
          ? false
          : player.onGround)
    );

    movableObjects.forEach((bullet, ind, arr) =>
      [...players, ...field].forEach(block =>
        (bullet && block
        ? bullet.onCollision(block)
        : null)
          ? delete arr[ind]
          : null
      )
    );
    [...players, ...movableObjects].forEach(obj => (obj ? obj.move() : null));
    players.forEach((val, ind, arr) =>
      val && val.hitPoints <= 0 ? delete arr[ind] : null
    );

    let new_status = [...players, ...movableObjects].map(val =>
      val
        ? {
            id: val.id,
            x: val.coordinates.x,
            y: val.coordinates.y,
            direction: val.direction
          }
        : null
    );
    ws.send(JSON.stringify(new_status));
  });

  ws.on("close", (reasonCode, desc) => {
    console.log("Player has leaved");
    delete players[ws.id - 1];
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
