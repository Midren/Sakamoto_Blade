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
    if (this.onGround && this.speed.y > 0) this.speed.y = 0;
    this.coordinates.x += this.speed.x;
    this.coordinates.y += this.speed.y;

    if (this.speed.y < 0) {
      [this.speed.x, this.speed.y] = Object.values(this.speed).map(val =>
        Math.abs(val * 0.7) < 1 ? 0 : val * 0.7
      );
      this.speed.y = this.speed.y === 0 ? 15 : this.speed.y;
    } else {
      this.speed.x = Math.abs(this.speed.x * 0.7) < 1 ? 0 : this.speed.x * 0.7;
      this.speed.y = 15;
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
  getVerticalCollision(other) {
    let isVerticalCollision = 0;
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
    return isVerticalCollision;
  }
  getHorizontalCollision(other) {
    let isHorizontalCollision = 0;
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
    return isHorizontalCollision;
  }

  isCollision(other) {
    const isHorizontalCollision = this.getHorizontalCollision(other);
    const isVerticalCollision = this.getVerticalCollision(other);
    if (!isVerticalCollision) return isHorizontalCollision;
    if (!isHorizontalCollision) return isVerticalCollision;
    const currentObjectBoarders = this.getBoarderCoordinates();
    const otherObjectBoarders = other.getBoarderCoordinates();
    if (isVerticalCollision === DOWN && this.speed.y < 0) {
      return isVerticalCollision;
    }
    return Math.pow(
      otherObjectBoarders[1 + (isVerticalCollision % 2)][
        3 + (isHorizontalCollision % 2)
      ].x - currentObjectBoarders[isVerticalCollision][isHorizontalCollision].x,
      2
    ) >=
      Math.pow(
        otherObjectBoarders[1 + (isVerticalCollision % 2)][
          3 + (isHorizontalCollision % 2)
        ].y -
          currentObjectBoarders[isVerticalCollision][isHorizontalCollision].y,
        2
      )
      ? isVerticalCollision
      : isHorizontalCollision;
  }
}
