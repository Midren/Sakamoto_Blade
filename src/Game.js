import { activateKeyboardInput } from "./Controller";
import { Bullet } from "./Bullet";
import { Player } from "./Player";
import { playTrack, backGroundAnimation, getSong } from "./media";
import { generateMap } from "./field";

const activateGameField = () => {
  Object.values(document.querySelectorAll(".game-field__game-status")).map(
    val => val.classList.add("game-field__game-status_disabled")
  );
  Object.values(document.querySelectorAll(".game-field__canvas")).map(val => {
    val.classList.remove("game-field__canvas_disabled");
    val.setAttribute("height", "525");
    val.setAttribute("width", "900");
  });
};

const showGameOver = () => {
  document
    .getElementsByClassName("game-field__canvas")[0]
    .classList.add("game-field__canvas_disabled");
  document.getElementsByClassName("game-field__game-status")[0].src =
    "img/game_over.jpg";
  document
    .getElementsByClassName("game-field__game-status")[0]
    .classList.remove("game-field__game-status_disabled");
};

const startListenFromServer = (socket, movableObjects) =>
  socket.addEventListener("message", event => {
    movableObjects.length = 0;
    if (event.data === "game_over") {
      showGameOver();
      return;
    }
    JSON.parse(event.data).forEach(entity =>
      entity && entity.id
        ? movableObjects.push(
            new Player(
              entity.id,
              entity.coordinates,
              { height: 37.5, width: 37.5 },
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
      window.dispatchEvent(new Event("pressed"));

    [...field, ...movableObjects].forEach(obj => obj.render(ctx));
    requestAnimationFrame(render);
  };

  render();
};

export const startGame = (
  ctx,
  socket,
  keyController,
  [playerImgs, blocksImg, backgroundImg]
) => {
  const audioCtx = new AudioContext();
  getSong(audioCtx, "music/MOON_Dust.ogg").then(song =>
    playTrack(audioCtx, song)
  );
  const [platformSprite, lavaSprite] = blocksImg;
  Bullet.img = lavaSprite;
  Player.img = playerImgs;

  activateGameField();

  let keyStatus = {
    left: false,
    right: false,
    up: false,
    hit: false,
    shoot: false
  };

  let movableObjects = [];
  let field = generateMap(ctx.canvas.width, 37.5, platformSprite);

  activateKeyboardInput(socket, keyStatus, keyController);
  startListenFromServer(socket, movableObjects);

  let background = backGroundAnimation(ctx, backgroundImg);
  render(ctx, movableObjects, field, background, keyStatus);
};
