import {keyController} from "./Controller";
import {Player} from "./Entity";

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const loadImgs = (path, imagesSrc) => new Promise((res, rej) => {
    let images = {};

    let loadedImages = 0;
    let imagesNumber = imagesSrc.length;
    imagesSrc.forEach((val) => {
        let img = new Image();
        img.addEventListener('load', () => {
            images[val] = img;
            if (++loadedImages === imagesNumber)
                res(images);
        });
        img.src = path + val;
    });
});

let playerImagesSrc = ["0l.png", "atkL2.png", "atkR3.png", "l1.png", "l5.png", "r2.png", "r6.png", "0.png",
    "atkL3.png", "jl.png", "l2.png", "l6.png", "r3.png", "0r.png", "atkR1.png", "j.png", "l3.png",
    "Pistol.png", "r4.png", "atkL1.png", "atkR2.png", "jr.png", "l4.png", "r1.png", "r5.png"];

let blocksImagesSrc = ["lava.png", "platform.png", "water.png"];

let backgroundImagesSrc = Array(171).fill(0).map((val, i) =>
    "frame_" + i.toString().padStart(3, "0") + ".png");

let playerImg = loadImgs("img/player/", playerImagesSrc);
let blocksImg = loadImgs("img/blocks/", blocksImagesSrc);
let backgroundImg = loadImgs("img/background/", backgroundImagesSrc);

let player;

const render = (playerImg, blocksImg, backgroundImg ) => {
    ctx.clearRect(0, 0, 1200, 720);
    // ctx.drawImage(backgroundImg["frame_000.png"], 0, 0);
    // ctx.drawImage(playerImg["0l.png"], 550, 240, 100, 80);
    // ctx.drawImage(blocksImg["platform.png"], 550, 320, 100, 100);
    player.move();
    player.render(ctx);

    requestAnimationFrame(render.bind(null, playerImg, blocksImg, backgroundImg));
};

const startGame = (playerImg, blocksImg, backgroundImg) => {
    document.getElementById("loading_screen").style.display = "none";
    document.getElementById("field").style.display = "flex";

    player = new Player(50, 50, 100, 100, playerImg, [0, 0], 1);

    document.onkeypress = keyController.bind(null, player);
    // ctx.drawImage(backgroundImg["frame_000.png"], 0, 0);
    // ctx.drawImage(playerImg["0l.png"], 550, 240, 100, 80);
    // ctx.drawImage(blocksImg["platform.png"], 550, 320, 100, 100);
    requestAnimationFrame(render.bind(null, playerImg, blocksImg, backgroundImg));
    // render();
};

let socket = new WebSocket("ws://127.0.0.1:3000");

socket.addEventListener('open', event => {
    console.log("Connected");

    Promise.all([playerImg, blocksImg, backgroundImg])
        .then(values =>
            startGame.bind(null, ...values)());
});

socket.addEventListener('message', (event) => {
    console.log("Get data ", event.data);
});

