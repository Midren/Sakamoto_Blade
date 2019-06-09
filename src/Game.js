import { activateKeyboardInput } from "./Controller";
import { Bullet } from "./Bullet";
import { Player } from "./Player";
import {
  backGroundAnimation,
  getSong,
  loadImg,
  loadingImgSrc,
  playTrack
} from "./media";
import {
  generateMap,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  CELL_WIDTH,
  CELL_HEIGHT
} from "./field";
import {
  loadImages,
  playerImagesSrc,
  blocksImagesSrc,
  backgroundImagesSrc
} from "./media";
import { clear, drawImage } from "./canvasHelper";
let GAME_INSTANCES_NUMBER = 0;

export class Game {
  constructor(canvas, keyControllers) {
    this.ctx = canvas.getContext("2d");
    loadImg(loadingImgSrc).then(val =>
      drawImage(this.ctx, val, { height: FIELD_HEIGHT, width: FIELD_WIDTH })
    );

    const audioCtx = new AudioContext();
    getSong(audioCtx, "music/MOON_Dust.ogg").then(song =>
      playTrack(audioCtx, song)
    );
    canvas.setAttribute("height", FIELD_HEIGHT);
    canvas.setAttribute("width", FIELD_WIDTH);
    this.keyControllers = keyControllers;
    this.id = GAME_INSTANCES_NUMBER++;

    if (!Game.playerImg) {
      Game.playerImg = loadImages(playerImagesSrc);
      Game.blocksImg = loadImages(blocksImagesSrc);
      Game.backgroundImg = loadImages(backgroundImagesSrc);
    }
  }

  start(socket) {
    this.socket = socket;
    Promise.all([Game.playerImg, Game.blocksImg, Game.backgroundImg]).then(
      values => {
        try {
          const [playerImgs, blocksImg, backgroundImg] = values;
          const [platformSprite, lavaSprite] = blocksImg;
          Bullet.img = lavaSprite;
          Player.img = playerImgs;

          let movableObjects = [];
          let field = generateMap(platformSprite);
          this.startListenFromServer(movableObjects);
          let background = backGroundAnimation(this.ctx, backgroundImg);

          let playerStatueses = [];
          this.keyControllers.forEach(keyController => {
            let keyStatus = {
              left: false,
              right: false,
              up: false,
              hit: false,
              shoot: false
            };
            this.id++;

            activateKeyboardInput(socket, keyStatus, keyController, this.id);

            playerStatueses.push(keyStatus);
            socket.send(
              JSON.stringify({ player_id: this.id, keyStatus: keyStatus })
            );
          });
          this.render(movableObjects, field, background, playerStatueses);
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  render(movableObjects, field, background, players) {
    const render = () => {
      clear(this.ctx);
      drawImage(this.ctx, background.image);

      players.forEach(keyStatus =>
        Object.values(keyStatus).some(val => val)
          ? window.dispatchEvent(new Event("pressed"))
          : null
      );

      [...field, ...movableObjects].forEach(obj => obj.render(this.ctx));
      requestAnimationFrame(render);
    };

    render();
  }

  startListenFromServer(movableObjects) {
    this.socket.addEventListener("message", event => {
      movableObjects.length = 0;
      if (event.data === "game_over") {
        this.socket.close();
        return;
      }
      JSON.parse(event.data).forEach(entity =>
        entity && entity.id
          ? movableObjects.push(
              new Player(
                entity.id,
                entity.coordinates,
                { height: CELL_HEIGHT, width: CELL_WIDTH },
                { x: 1, y: 0 },
                entity.direction
              )
            )
          : entity && !entity.id
          ? movableObjects.push(
              new Bullet(
                entity.id,
                entity.coordinates,
                { height: 18, width: 5 },
                { x: entity.direction * 40, y: 0 }
              )
            )
          : null
      );
    });
  }
}
