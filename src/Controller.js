export const keyHandler = (keyStatus, player) => {
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
    keyStatus.shoot = false;
    return true;
  }
  return false;
};

let shooting = { is_allowed: true };
const allowShoot = can_shoot => (shooting.is_allowed = true);

export const keyController = (keyHelper, bool, e) => {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      e.preventDefault();
      keyHelper.left = bool;
      break;
    case "KeyD":
    case "ArrowRight":
      e.preventDefault();
      keyHelper.right = bool;
      break;
    case "KeyW":
    case "ArrowUp":
      e.preventDefault();
      keyHelper.up = bool;
      break;
    case "KeyK":
      e.preventDefault();
      keyHelper.hit = bool;
      break;
    case "Space":
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
