import { GameObject } from "./GameObjects";
const UP = 1,
  DOWN = 2,
  RIGHT = 3,
  LEFT = 4;

export class MovableObject extends GameObject {
  constructor(id, coordinates, size, image, speed) {
    super(coordinates, size, image);
    this.id = id;
    this.speed = speed;
    this.onGround = false;
  }

  move() {
    if (this.onGround && this.speed.x > 0) this.speed.y = 0;
    this.coordinates.x += this.speed.x;
    this.coordinates.y += this.speed.y;

    if (this.speed.y < 0) {
      this.speed = this.speed.map(val =>
        Math.abs(val * 0.7) < 1 ? 0 : val * 0.7
      );
      if (!this.onGround) this.speed.y = this.speed.y === 0 ? 15 : this.speed.y;
    } else {
      this.speed.x = Math.abs(this.speed.x * 0.7) < 1 ? 0 : this.speed.x * 0.7;
      if (!this.onGround) this.speed.y = 15;
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
  isCollision(other) {
    let isVerticalCollision = 0,
      isHorizontalCollision = 0;
    if (
      this.coordinates.y + this.size.height > other.coordinates.y &&
      this.coordinates.y < other.coordinates.y + other.size.height
    ) {
      if (
        this.coordinates.x < other.coordinates.x &&
        this.coordinates.x + this.size.width > other.coordinates.x
      ) {
        isHorizontalCollision = RIGHT;
      }
      if (
        this.coordinates.x > other.coordinates.x &&
        this.coordinates.x < other.coordinates.x + other.size.width
      ) {
        isHorizontalCollision = LEFT;
      }
    }
    if (
      this.coordinates.x + this.size.width > other.coordinates.x &&
      this.coordinates.x < other.coordinates.x + other.size.width
    ) {
      if (
        this.coordinates.y < other.coordinates.y &&
        this.coordinates.y + this.size.height > other.coordinates.y
      ) {
        isVerticalCollision = UP;
      }
      if (
        this.coordinates.y < other.coordinates.y + other.size.height &&
        this.coordinates.y > other.coordinates.y
      ) {
        isVerticalCollision = DOWN;
      }
    }
    if (!isVerticalCollision) return isHorizontalCollision;
    if (!isHorizontalCollision) return isVerticalCollision;
    let new_this = {
      [UP]: {
        [RIGHT]: {
          x: this.coordinates.x + this.size.width,
          y: this.coordinates.y + this.size.height
        },
        [LEFT]: {
          x: this.coordinates.x,
          y: this.coordinates.y + this.size.height
        }
      },
      [DOWN]: {
        [RIGHT]: {
          x: this.coordinates.x + this.size.width,
          y: this.coordinates.y
        },
        [LEFT]: { x: this.coordinates.x, y: this.coordinates.y }
      }
    };
    let new_other = {
      [UP]: {
        [RIGHT]: { x: other.coordinates.x, y: other.coordinates.y },
        [LEFT]: {
          x: other.coordinates.x + other.size.width,
          y: other.coordinates.y
        }
      },
      [DOWN]: {
        [RIGHT]: {
          x: other.coordinates.x,
          y: other.coordinates.y + other.size.height
        },
        [LEFT]: {
          x: other.coordinates.x + other.size.width,
          y: other.coordinates.y + other.size.height
        }
      }
    };
    if (isVerticalCollision === DOWN && this.speed.y < 0) {
      return isVerticalCollision;
    }
    return Math.pow(
      new_other[isVerticalCollision][isHorizontalCollision].x -
        new_this[isVerticalCollision][isHorizontalCollision].x,
      2
    ) >=
      Math.pow(
        new_other[isVerticalCollision][isHorizontalCollision].y -
          new_this[isVerticalCollision][isHorizontalCollision].y,
        2
      )
      ? isVerticalCollision
      : isHorizontalCollision;
  }
}
