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

const ctxs = Object.values(
  document.querySelectorAll(".game-field__canvas")
).map(val => val.getContext("2d"));

const sockets = ctxs.map(() => new WebSocket(`ws://${host}:${port}`));

const keyControllers = ctxs.map((val, ind) =>
  ind % 2 ? wasdKeyController : arrowKeyController
);

const PlayerImg = loadImgsAsKeyValue(playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImages(backgroundImagesSrc);

sockets.forEach((socket, ind) => {
  Promise.all([PlayerImg, BlocksImg, BackgroundImg]).then(values => {
    socket.addEventListener("open", () => {
      try {
        startGame(ctxs[ind], socket, keyControllers[ind], values);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
