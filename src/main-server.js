const http = require('http');
const path = require('path');
const socketIO = require("socket.io");
const express = require('express');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const hostname = "127.0.0.1";
const port = 3000;

io.on("connection", (socket) => {
    socket.on("game-start", (config) => {
        console.log("New player joined the game");
    });
    socket.on("disconnect", () => {
        console.log("Player leaved the game");
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