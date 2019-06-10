import { MovableObject } from "./MovableObject";
import { Player } from "./Player";

export class Bullet extends MovableObject {
  constructor(id, coordinates, size, speed, images = Bullet.img) {
    super(id, coordinates, size, speed, images);
    this.direction = this.speed.x / Math.abs(this.speed.x);
  }
  move() {
    this.coordinates.x += this.speed.x;
  }

  onCollision(other) {
    if (this.isCollision(other)) {
      if (other instanceof Player) {
        other.hitPoints--;
      }
      return true;
    }
  }
}
