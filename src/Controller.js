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
  console.log(keyStatus);
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

const keyController = (keyBindings, keyHelper, bool, e) => {
  if (e.code in keyBindings) {
    keyHelper[keyBindings[e.code]] = bool;
    e.preventDefault();
  }
};

export const wasdKeyController = (keyHelper, bool, e) => {
  const wasdBinding = {
    KeyA: "left",
    KeyD: "right",
    KeyW: "up",
    KeyK: "hit",
    Space: "shoot"
  };
  keyController(wasdBinding, keyHelper, bool, e);
};

export const arrowKeyController = (keyHelper, bool, e) => {
  const arrowBinding = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    KeyK: "hit",
    KeyJ: "shoot"
  };
  keyController(arrowBinding, keyHelper, bool, e);
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
  });
};
