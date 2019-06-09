import { Bullet } from "./Bullet";

export const keyHandler = (keyStatus, player, bullets) => {
  if (keyStatus.left) {
    player.speed.x += 1.5;
    player.direction = -1;
  }
  if (keyStatus.right) {
    player.speed.x += 1.5;
    player.direction = 1;
  }
  if (keyStatus.up) {
    if (player.onGround) {
      player.speed.y = -18;
      player.onGround = false;
    }
  }
  if (keyStatus.hit) {
  }
  if (keyStatus.shoot && player.allowedShooting) {
    player.allowedShooting = false;
    setTimeout(() => (player.allowedShooting = true), 500);
    let x =
      player.coordinates.x + (player.direction === -1 ? -5 : player.size.width);
    bullets.push(
      new Bullet(
        0,
        { x: x, y: player.coordinates.y + player.size.height / 2.5 },
        { height: 18, width: 5 },
        { x: player.direction * 40, y: 0 }
      )
    );
  }
};

export const wasdKeyController = (keyHelper, bool, e) => {
  switch (e.code) {
    case "KeyA":
      e.preventDefault();
      keyHelper.left = bool;
      break;
    case "KeyD":
      e.preventDefault();
      keyHelper.right = bool;
      break;
    case "KeyW":
      e.preventDefault();
      keyHelper.up = bool;
      break;
    case "KeyK":
      e.preventDefault();
      keyHelper.hit = bool;
      break;
    case "Space":
      e.preventDefault();
      keyHelper.shoot = bool;
      break;
    default:
      break;
  }
};

export const arrowKeyController = (keyHelper, bool, e) => {
  switch (e.code) {
    case "ArrowLeft":
      e.preventDefault();
      keyHelper.left = bool;
      break;
    case "ArrowRight":
      e.preventDefault();
      keyHelper.right = bool;
      break;
    case "ArrowUp":
      e.preventDefault();
      keyHelper.up = bool;
      break;
    case "KeyK":
      e.preventDefault();
      keyHelper.hit = bool;
      break;
    case "KeyJ":
      e.preventDefault();
      keyHelper.shoot = bool;
      break;
    default:
      break;
  }
};

export const activateKeyboardInput = (socket, keyStatus, keyController, id) => {
  document.addEventListener(
    "keydown",
    keyController.bind(null, keyStatus, true)
  );
  document.addEventListener(
    "keyup",
    keyController.bind(null, keyStatus, false)
  );

  window.addEventListener("pressed", () => {
    socket.send(JSON.stringify({ player_id: id, keyStatus: keyStatus }));
    keyStatus.shoot = false;
  });
};
