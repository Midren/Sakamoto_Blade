import { MovableObject } from "./MovableObject";
import { Player } from "./Player";

export class Bullet extends MovableObject {
  move() {
    this.coordinates.x += this.speed[0];
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
