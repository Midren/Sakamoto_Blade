const socket = io();

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const startGame = () => {
    socket.emit("game-start");
};

socket.on("connect", startGame);

