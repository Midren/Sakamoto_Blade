import {
  loadImgsAsKeyValue,
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { startGame } from "./Game";
import { arrowKeyController, wasdKeyController } from "./Controller";
const host = "127.0.0.1";
const port = "3000";
const socket1 = new WebSocket(`ws://${host}:${port}`);
const socket2 = new WebSocket(`ws://${host}:${port}`);

const [ctx1, ctx2] = Object.values(
  document.querySelectorAll(".game-field__canvas")
).map(val => val.getContext("2d"));

const PlayerImg = loadImgsAsKeyValue(playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImages(backgroundImagesSrc);

socket1.addEventListener("open", async event => {
  try {
    const values = await Promise.all([PlayerImg, BlocksImg, BackgroundImg]);
    startGame(ctx1, socket1, arrowKeyController, values);
  } catch (error) {
    console.log(error);
  }
});

socket2.addEventListener("open", async event => {
  try {
    const values = await Promise.all([PlayerImg, BlocksImg, BackgroundImg]);
    startGame(ctx2, socket2, wasdKeyController, values);
  } catch (error) {
    console.log(error);
  }
});
