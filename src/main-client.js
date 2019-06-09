import { Game } from "./Game";
import { wasdKeyController, arrowKeyController } from "./Controller";

const host = "127.0.0.1";
const port = "3000";
let playerActions = new WebSocket(`ws://${host}:${port}`);

playerActions.addEventListener("open", () => {
  let game1 = new Game(document.querySelectorAll(".game-field__canvas")[0], [
    wasdKeyController
  ]);
  let game2 = new Game(document.querySelectorAll(".game-field__canvas")[1], [
    arrowKeyController
  ]);

  game1.start(playerActions);
  game2.start(playerActions);
});
