import {getSong, loadImgs, playerImagesSrc, blocksImagesSrc, backgroundImagesSrc} from "./media";
import {startGame} from "./Game";

const audioCtx = new AudioContext();
const socket = new WebSocket("ws://127.0.0.1:3000");
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const playerImg = loadImgs("img/player/", playerImagesSrc);
const blocksImg = loadImgs("img/blocks/", blocksImagesSrc);
const backgroundImg = loadImgs("img/background/", backgroundImagesSrc);
const soundtrack = getSong(audioCtx, "music/MOON_Hydrogen.ogg");


socket.addEventListener('open', event => {
    console.log("Connected");

    Promise.all([playerImg, blocksImg, backgroundImg, soundtrack])
        .then(values =>
            startGame.bind(null, ctx, audioCtx, socket, ...values)());
});


