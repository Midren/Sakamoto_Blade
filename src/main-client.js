import {keyController, keyHandler} from "./Controller";
import {GameObject} from "./GameObjects";
import {Bullet, Player} from "./Entity";
import {playTrack, getSong} from "./music";
import {fieldBlueprint} from "./field";

const canvas = document.getElementById("field");
const audioCtx = new AudioContext();
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
let soundtrack = getSong(audioCtx, "music/MOON_Hydrogen.ogg");

const render = (field, movableObjects, keyStatus, playerImg, blocksImg, background) => {
    ctx.clearRect(0, 0, 1200, 750);
    ctx.drawImage(background["image"], 0, 0, 1200, 750);

    socket.send(JSON.stringify(keyStatus));
    keyStatus.shoot = false;

    field.forEach(block => block.render(ctx));
    movableObjects.forEach(obj => obj.render(ctx));

    requestAnimationFrame(render.bind(null, field, movableObjects, keyStatus, playerImg, blocksImg, background));
};

const startGame = (playerImg, blocksImg, backgroundImg, soundtrack) => {
    let cell_size = 50;
    let width = canvas.width;
    document.getElementById("loading_screen").style.display = "none";
    document.getElementById("field").style.display = "flex";

    let player = new Player(0, 120, 180, 50, 50, playerImg, [0, 0], 1);
    let keyStatus = {"left": false, "right": false, "up": false, "hit": false, "shoot": false};

    let movableObjects = [player];
    let field = [];
    fieldBlueprint.split('').forEach((val, ind) => {
            val === "#" ?
                field.push(
                    new GameObject((ind % (width / cell_size)) * cell_size, Math.floor(ind / (width / cell_size)) * cell_size, 50, 50, blocksImg['platform.png']))
                : null;
        }
    );

    document.onkeydown = keyController.bind(null, keyStatus, true);
    document.onkeyup = keyController.bind(null, keyStatus, false);

    let background = {"image": backgroundImg["frame_000.png"]};
    let num = {"num": 0};

    setInterval(((ctx, backgroundImg, num) => {
        background["image"] = backgroundImg["frame_" + num["num"].toString().padStart(3, "0") + ".png"];
        num["num"] = (++num["num"]) % Object.keys(backgroundImg).length;
    }).bind(null, ctx, backgroundImg, num), 100);

    playTrack(audioCtx, soundtrack);

    socket.addEventListener('message', (event) => {
        let entity = JSON.parse(event.data);
        movableObjects.length = 0;
        entity.forEach(entity => {
            if (entity) {
                if (entity.id) {
                    movableObjects.push(new Player(0, entity.x, entity.y, 50, 50, playerImg, [1, 0], entity.direction));
                } else {
                    movableObjects.push(new Bullet(0, entity.x, entity.y, 18, 5, blocksImg["lava.png"], [entity.direction * 40, 0]));
                }
            }
        });
    });

    requestAnimationFrame(render.bind(null, field, movableObjects, keyStatus, playerImg, blocksImg, background));
};

let socket = new WebSocket("ws://127.0.0.1:3000");

socket.addEventListener('open', event => {
    console.log("Connected");

    Promise.all([playerImg, blocksImg, backgroundImg, soundtrack])
        .then(values =>
            startGame.bind(null, ...values)());
});


