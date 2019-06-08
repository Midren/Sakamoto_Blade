import { Game } from "./Game";
import { wasdKeyController, arrowKeyController } from "./Controller";

const host = "127.0.0.1";
const port = "3000";

let game1 = new Game(document.querySelector(".game-field"), wasdKeyController);
let game2 = new Game(document.querySelector(".game-field"), arrowKeyController);

game1.start(host, port);
game2.start(host, port);
