export const handleCollisions = (players, bullets, field) => {
  players.forEach(
    player =>
      (player.onGround = !field.some(val => player.onCollision(val))
        ? false
        : player.onGround)
  );

  bullets.forEach((bullet, ind, arr) =>
    [...players, ...field].forEach(block =>
      (bullet && block
      ? bullet.onCollision(block)
      : null)
        ? delete arr[ind]
        : null
    )
  );
};

export const moveObjects = objects =>
  objects.forEach(obj => (obj ? obj.move() : null));

export const removeDeadPlayers = (players, wsServer) =>
  players.forEach((val, ind, arr) => {
    if (val && val.hitPoints <= 0) {
      wsServer.clients.forEach(client =>
        client.id === val.id ? client.send("game_over") : null
      );
      delete arr[ind];
    }
  });

export const serializeObjects = objects =>
  JSON.stringify(
    objects.map(obj =>
      obj
        ? {
            id: obj.id,
            coordinates: obj.coordinates,
            direction: obj.direction,
            speed: obj.speed
          }
        : null
    )
  );
