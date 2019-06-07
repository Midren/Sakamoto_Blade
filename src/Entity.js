import { MovableObject } from "./GameObjects";

export class Player extends MovableObject {
  constructor(id, x, y, height, width, images, speed, direction) {
    super(id, x, y, height, width, images["0l.png"], speed);
    this.images = images;
    this.direction = direction;
    this.tmp = 10;
    this.hp = 3;
  }

  move() {
    this.speed[0] *= this.direction;
    super.move();
    this.speed[0] *= this.direction;
  }

  render(ctx) {
    ctx.font = "14px Bold Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Player " + this.id.toString(), this.x, this.y);
    if (this.direction === -1 && this.speed[0]) {
      this.image = this.images[
        "img/player/l" + Math.floor(this.tmp / 10).toString() + ".png"
      ];
    } else if (this.direction === 1 && this.speed[0]) {
      this.image = this.images[
        "img/player/r" + Math.floor(this.tmp / 10).toString() + ".png"
      ];
    }
    super.render(ctx);
  }
}

export class Bullet extends MovableObject {
  move() {
    this.x += this.speed[0];
  }

  onCollision(other) {
    if (this.isCollision(other)) {
      if (other instanceof Player) {
        other.hp--;
      }
      return true;
    }
  }
}
