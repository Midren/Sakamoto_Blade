import { GameObject } from "./GameObjects";

export class MovableObject extends GameObject {
  constructor(id, coordinates, size, image, speed) {
    super(coordinates, size, speed, image);
    this.id = id;
    this.speed = speed;
    this.onGround = false;
  }

  move() {
    if (this.onGround && this.speed[1] > 0) this.speed[1] = 0;
    this.coordinates.x += this.speed[0];
    this.coordinates.y += this.speed[1];

    if (this.speed[1] < 0) {
      this.speed = this.speed.map(val =>
        Math.abs(val * 0.7) < 1 ? 0 : val * 0.7
      );
      if (!this.speed[1].onGround)
        this.speed[1] = this.speed[1] === 0 ? 15 : this.speed[1];
    } else {
      this.speed[0] =
        Math.abs(this.speed[0] * 0.7) < 1 ? 0 : this.speed[0] * 0.7;
      if (!this.speed[1].onGround) this.speed[1] = 15;
    }
  }

  onCollision(other) {
    let sideOfCollision = this.isCollision(other);
    switch (sideOfCollision) {
      case 1:
        this.onGround = true;
        this.coordinates.y = other.coordinates.y - this.size.height + 1;
        return true;
      case 2:
        this.onGround = false;
        this.coordinates.y = other.coordinates.y + other.size.height + 1;
        return true;
      case 3:
        this.coordinates.x = other.coordinates.x - this.size.width - 10;
        return true;
      case 4:
        this.coordinates.x = other.coordinates.x + other.size.width + 10;
        return true;
      case 0:
        break;
    }
    return false;
  }
}
