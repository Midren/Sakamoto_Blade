import { Bullet } from "./Bullet";

export const keyHandler = (keyStatus, player, bullets) => {
  if (keyStatus.left) {
    player.speed.x += 2.5;
    player.direction = -1;
  }
  if (keyStatus.right) {
    player.speed.x += 2.5;
    player.direction = 1;
  }
  if (keyStatus.up) {
    if (player.onGround) {
      player.speed.y = -30;
      player.onGround = false;
    }
  }
  if (keyStatus.hit) {
  }
  if (keyStatus.shoot) {
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

let shooting = { is_allowed: true };
const allowShoot = shooting => (shooting.is_allowed = true);

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
      if (shooting.is_allowed && bool === true) {
        keyHelper.shoot = bool;
        shooting.is_allowed = false;
        setTimeout(allowShoot.bind(null, shooting), 500);
      } else {
        keyHelper.shoot = false;
      }
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
      if (shooting.is_allowed && bool === true) {
        keyHelper.shoot = bool;
        shooting.is_allowed = false;
        setTimeout(allowShoot.bind(null, shooting), 500);
      } else {
        keyHelper.shoot = false;
      }
      break;
    default:
      break;
  }
};

export const activateKeyboardInput = (socket, keyStatus, keyController) => {
  document.onkeydown = keyController.bind(null, keyStatus, true);
  document.onkeyup = keyController.bind(null, keyStatus, false);

  window.addEventListener("pressed", () => {
    socket.send(JSON.stringify(keyStatus));
    keyStatus.shoot = false;
  });
};
