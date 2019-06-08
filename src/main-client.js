import {
  getSong,
  loadImgsAsKeyValue,
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { startGame } from "./Game";

const socket = new WebSocket("ws://127.0.0.1:3000");
const canvas = document.getElementsByClassName("game-field__canvas")[0];
const ctx = canvas.getContext("2d");

const PlayerImg = loadImgsAsKeyValue(playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImages(backgroundImagesSrc);

socket.addEventListener("open", event => {
  Promise.all([PlayerImg, BlocksImg, BackgroundImg])
    .then(values => startGame(ctx, socket, values))
    .catch(error => console.log(error));
});
