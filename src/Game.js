import { keyController } from "./Controller";
import { Bullet } from "./Bullet";
import { Player } from "./Player";
import { playTrack, backGroundAnimation, getSong } from "./media";
import { generateMap } from "./field";

const activateGameField = () => {
  document
    .getElementsByClassName("game-field__loading-screen")[0]
    .classList.add("game-field__loading-screen_disabled");
  document
    .getElementsByClassName("game-field__canvas")[0]
    .classList.remove("game-field__canvas_disabled");
};

const gameOver = () => {
  document
    .getElementsByClassName("game-field__canvas")[0]
    .classList.add("game-field__canvas_disabled");
  document.getElementsByClassName("game-field__loading-screen")[0].src =
    "img/game_over.jpg";
  document
    .getElementsByClassName("game-field__loading-screen")[0]
    .classList.remove("game-field__loading-screen_disabled");
};

const startListenFromServer = (
  movableObjects,
  socket,
  [playerImg, lavaSprite]
) =>
  socket.addEventListener("message", event => {
    movableObjects.length = 0;
    if (event.data === "game_over") {
      console.log("GAME OVER");
      gameOver();
      return;
    }
    JSON.parse(event.data).forEach(entity =>
      entity && entity.id
        ? movableObjects.push(
            new Player(
              entity.id,
              { x: entity.x, y: entity.y },
              { height: 50, width: 50 },
              playerImg,
              { x: 1, y: 0 },
              entity.direction
            )
          )
        : entity && !entity.id
        ? movableObjects.push(
            new Bullet(
              0,
              { x: entity.x, y: entity.y },
              { height: 18, width: 5 },
              lavaSprite,
              { x: entity.direction * 40, y: 0 }
            )
          )
        : null
    );
  });

const clear = ctx => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

const drawImage = (ctx, image, options = {}) => {
  const imgBbox = image;

  let {
    x = 0,
    y = 0,
    height = imgBbox.height,
    width = imgBbox.width
  } = options;

  ctx.drawImage(image, x, y, width, height);
};

const render = (ctx, movableObjects, field, background, keyStatus) => {
  const render = () => {
    clear(ctx);
    drawImage(ctx, background.image);

    if (Object.values(keyStatus).some(val => val))
      ctx.canvas.dispatchEvent(new Event("pressed"));

    [...field, ...movableObjects].forEach(obj => obj.render(ctx));
    requestAnimationFrame(render);
  };

  render();
};

export const startGame = (
  ctx,
  socket,
  [playerImg, blocksImg, backgroundImg]
) => {
  const audioCtx = new AudioContext();
  getSong(audioCtx, "music/MOON_Dust.ogg").then(song =>
    playTrack(audioCtx, song)
  );
  const [platformSprite, lavaSprite] = blocksImg;

  activateGameField();

  let keyStatus = {
    left: false,
    right: false,
    up: false,
    hit: false,
    shoot: false
  };

  let movableObjects = [];
  let field = generateMap(ctx.canvas.width, 50, platformSprite);

  document.onkeydown = keyController.bind(null, keyStatus, true);
  document.onkeyup = keyController.bind(null, keyStatus, false);

  ctx.canvas.addEventListener("pressed", () => {
    socket.send(JSON.stringify(keyStatus));
    keyStatus.shoot = false;
  });

  let background = backGroundAnimation(ctx, backgroundImg);
  startListenFromServer(movableObjects, socket, [playerImg, lavaSprite]);

  render(ctx, movableObjects, field, background, keyStatus);
};
