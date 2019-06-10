import { MovableObject } from "./MovableObject";

export class Player extends MovableObject {
  constructor(id, coordinates, size, speed, direction, images = Player.img) {
    super(id, coordinates, size, speed, images ? images[0] : null);
    this.images = images;
    this.direction = direction;
    this.hitPoints = 3;
    this.allowedShooting = true;
  }

  move() {
    this.speed.x *= this.direction;
    super.move();
    this.speed.x *= this.direction;
  }

  render(ctx) {
    ctx.font = "14px Bold Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Player " + this.id.toString(),
      this.coordinates.x,
      this.coordinates.y
    );
    if (this.direction === -1) {
      this.image = this.images[1];
    } else if (this.direction === 1) {
      this.image = this.images[2];
    }
    super.render(ctx);
  }
}
