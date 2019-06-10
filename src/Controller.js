import { Bullet } from "./Bullet";
import * as R from "ramda";

export const actionHandler = (keyStatus, player, bullets) => {
  if (keyStatus.left) {
    player.speed.x += 1;
    player.direction = -1;
  }
  if (keyStatus.right) {
    player.speed.x += 1;
    player.direction = 1;
  }
  if (keyStatus.up) {
    if (player.onGround) {
      player.speed.y = -22;
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

const keyController = R.curry((keyBindings, keyHelper, bool, e) => {
  if (e.code in keyBindings) {
    keyHelper[keyBindings[e.code]] = bool;
    e.preventDefault();
  }
});

export const wasdKeyController = keyController({
  KeyA: "left",
  KeyD: "right",
  KeyW: "up",
  KeyK: "hit",
  Space: "shoot"
});

export const arrowKeyController = keyController({
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  KeyK: "hit",
  KeyJ: "shoot"
});

export const activateKeyboardInput = (socket, keyStatus, keyController, id) => {
  document.addEventListener(
    "keydown",
    keyController(keyStatus, true)
  );
  document.addEventListener(
    "keyup",
    keyController(keyStatus, false)
  );
};
