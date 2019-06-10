import { Game } from "./Game";
import { wasdKeyController, arrowKeyController } from "./Controller";

const host = "127.0.0.1";
const port = "3000";
let playerActions = new WebSocket(`ws://${host}:${port}`);

playerActions.addEventListener("open", () => {
  const [gameOneElement, gameTwoElement] = document.querySelectorAll(
    ".game-field__canvas"
  );
  let game1 = new Game(gameOneElement, [wasdKeyController, arrowKeyController]);
  // let game2 = new Game(gameTwoElement, [arrowKeyController]);

  game1.start(playerActions);
  // game2.start(playerActions);
});
