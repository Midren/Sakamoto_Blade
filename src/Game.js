import { keyController } from "./Controller";
import { Bullet, Player } from "./Entity";
import { playTrack } from "./media";
import { generate_map } from "./field";

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

const render = (
  ctx,
  field,
  movableObjects,
  keyStatus,
  background,
  socket
) => {
  const render = () => {
    clear(ctx);
    drawImage(ctx, background.image);

    socket.send(JSON.stringify(keyStatus));
    keyStatus.shoot = false;

    field.forEach(block => block.render(ctx));
    movableObjects.forEach(obj => obj.render(ctx));
    requestAnimationFrame(render);
  };

  render()
};

export const startGame = (
  ctx,
  audioCtx,
  socket,
  playerImg,
  blocksImg,
  backgroundImg,
  soundtrack
) => {
  const [platformSprite, lavaSprite] = blocksImg;

  document.getElementById("loading_screen").style.display = "none";
  document.getElementById("field").style.display = "flex";

  let keyStatus = {left: false, right: false, up: false, hit: false, shoot: false};

  let movableObjects = [];
  let field = generate_map(platformSprite);

  document.onkeydown = keyController.bind(null, keyStatus, true);
  document.onkeyup = keyController.bind(null, keyStatus, false);

  let background = { image: backgroundImg[0] };
  let counter = { n: 0 };

  setInterval(
    ((ctx, backgroundImg) => {
      background.image = backgroundImg[counter.n];
      counter.n = ++counter.n % Object.keys(backgroundImg).length;
    }).bind(null, ctx, backgroundImg, counter),
    100
  );

  playTrack(audioCtx, soundtrack);

  socket.addEventListener("message", event => {
    movableObjects.length = 0;
    JSON.parse(event.data).forEach(entity =>
      entity && entity.id
        ? movableObjects.push(
            new Player(
              entity.id,
              entity.x,
              entity.y,
              50,
              50,
              playerImg,
              [1, 0],
              entity.direction
            )
          )
        : entity && !entity.id
        ? movableObjects.push(
            new Bullet(0, entity.x, entity.y, 18, 5, lavaSprite, [
              entity.direction * 40,
              0
            ])
          )
        : null
    );
  });


  render(
      ctx,
      field,
      movableObjects,
      keyStatus,
      background,
      socket
  );
};
