import { MovableObject } from "./MovableObject";

export class Player extends MovableObject {
  constructor(id, coordinates, size, images, speed, direction) {
    super(id, coordinates, size, images["0l.png"], speed);
    this.images = images;
    this.direction = direction;
    this.hitPoints = 3;
  }

  move() {
    this.speed[0] *= this.direction;
    super.move();
    this.speed[0] *= this.direction;
  }

  render(ctx) {
    ctx.font = "14px Bold Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Player " + this.id.toString(),
      this.coordinates.x,
      this.coordinates.y
    );
    if (this.direction === -1 && this.speed[0]) {
      this.image = this.images["img/player/l1.png"];
    } else if (this.direction === 1 && this.speed[0]) {
      this.image = this.images["img/player/r1.png"];
    }
    super.render(ctx);
  }
}
