import {
  loadImgsAsKeyValue,
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { startGame } from "./Game";

const socket = new WebSocket("ws://127.0.0.1:3000");
const ctx = document.querySelector(".game-field__canvas").getContext("2d");

const PlayerImg = loadImgsAsKeyValue(playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImages(backgroundImagesSrc);

socket.addEventListener("open", async event => {
  try {
    const values = await Promise.all([PlayerImg, BlocksImg, BackgroundImg]);
    startGame(ctx, socket, values);
  } catch (error) {
    console.log(error);
  }
});
