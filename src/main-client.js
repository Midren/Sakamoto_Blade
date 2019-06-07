import {getSong, loadImgs, playerImagesSrc, blocksImagesSrc, backgroundImagesSrc} from "./media";
import {startGame} from "./Game";

const audioCtx = new AudioContext();
const socket = new WebSocket("ws://127.0.0.1:3000");
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const PlayerImg = loadImgs("img/player/", playerImagesSrc);
const BlocksImg = loadImgs("img/blocks/", blocksImagesSrc);
const BackgroundImg = loadImgs("img/background/", backgroundImagesSrc);
const Soundtrack = getSong(audioCtx, "music/MOON_Hydrogen.ogg");


socket.addEventListener('open', event => {
    console.log("Connected");
    Promise.all([PlayerImg, BlocksImg, BackgroundImg, Soundtrack])
        .then(values =>
            startGame.bind(null, ctx, audioCtx, socket, ...values)());
});