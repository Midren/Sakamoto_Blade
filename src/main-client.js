import {
  getSong,
  loadImgsAsKeyValue,
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { startGame } from "./Game";

const audioCtx = new AudioContext();
const socket = new WebSocket("ws://127.0.0.1:3000");
const canvas = document.getElementsByClassName("game-field__canvas")[0];
const ctx = canvas.getContext("2d");

const PlayerImg = loadImgsAsKeyValue("img/player/", playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImgsAsKeyValue(
  "img/background/",
  backgroundImagesSrc
);
const Soundtrack = getSong(audioCtx, "music/MOON_Hydrogen.ogg");

socket.addEventListener("open", event => {
  Promise.all([PlayerImg, BlocksImg, BackgroundImg, Soundtrack]).then(values =>
    startGame.bind(null, ctx, audioCtx, socket, ...values)()
  );
});
