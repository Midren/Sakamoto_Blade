import {
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { startGame } from "./Game";
import { wasdKeyController, arrowKeyController } from "./Controller";
const host = "127.0.0.1";
const port = "3000";

const ctxs = Object.values(
  document.querySelectorAll(".game-field__canvas")
).map(val => val.getContext("2d"));

const sockets = ctxs.map(() => new WebSocket(`ws://${host}:${port}`));

const keyControllers = ctxs.map((val, ind) =>
  ind % 2 ? wasdKeyController : arrowKeyController
);

const PlayerImg = loadImages(playerImagesSrc);
const BlocksImg = loadImages(blocksImagesSrc);
const BackgroundImg = loadImages(backgroundImagesSrc);

Promise.all([PlayerImg, BlocksImg, BackgroundImg]).then(values => {
  sockets.forEach((socket, ind) => {
    socket.addEventListener("open", () => {
      try {
        startGame(ctxs[ind], socket, keyControllers[ind], values);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
