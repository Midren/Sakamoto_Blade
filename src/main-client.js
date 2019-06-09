import { Game } from "./Game";
import { wasdKeyController, arrowKeyController } from "./Controller";
import { playTrack, getSong } from "./media";

const audioCtx = new AudioContext();
getSong(audioCtx, "music/MOON_Dust.ogg").then(song =>
  playTrack(audioCtx, song)
);

const host = "127.0.0.1";
const port = "3000";
let playerActions = new WebSocket(`ws://${host}:${port}`);

playerActions.addEventListener("open", () => {
  let game1 = new Game(
    document.querySelector(".game-field"),
    wasdKeyController);
  let game2 = new Game(
    document.querySelector(".game-field"),
    arrowKeyController
  );

  game1.start(playerActions);
  game2.start(playerActions);
});
