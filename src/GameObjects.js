let UP = 1,
  DOWN = 2,
  RIGHT = 3,
  LEFT = 4;

export class GameObject {
  constructor(coordinates, size, image) {
    this.coordinates = coordinates;
    this.size = size;
    this.image = image;
  }

  isCollision(other) {
    let isVerticalCollision = 0,
      isHorizontalCollision = 0;
    if (
      this.coordinates.x + this.size.height > other.coordintates.y &&
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
      UP: {
        RIGHT: {
          x: this.coordinates.x + this.size.width,
          y: this.coordinates.y + this.size.height
        },
        LEFT: {
          x: this.coordinates.x,
          y: this.coordinates.y + this.size.height
        }
      },
      DOWN: {
        RIGHT: {
          x: this.coordinates.x + this.size.width,
          y: this.coordinates.y
        },
        LEFT: { x: this.coordinates.x, y: this.coordinates.y }
      }
    };
    let new_other = {
      UP: {
        RIGHT: { x: other.coordinates.x, y: other.coordinates.y },
        LEFT: {
          x: other.coordinates.x + other.size.width,
          y: other.coordinates.y
        }
      },
      DOWN: {
        RIGHT: {
          x: other.coordinates.x,
          y: other.coordinates.y + other.size.height
        },
        LEFT: {
          x: other.coordinates.x + other.size.width,
          y: other.coordinates.y + other.size.height
        }
      }
    };
    if (isVerticalCollision === DOWN && this.speed[UP] < 0) {
      return isVerticalCollision;
    }
    return Math.pow(
      new_other[isVerticalCollision][isHorizontalCollision].coordinates.x -
        new_this[isVerticalCollision][isHorizontalCollision].coordinates.x,
      DOWN
    ) >=
      Math.pow(
        new_other[isVerticalCollision][isHorizontalCollision].coordinates.y -
          new_this[isVerticalCollision][isHorizontalCollision].coordinates.y,
        DOWN
      )
      ? isVerticalCollision
      : isHorizontalCollision;
  }

  render(ctx) {
    ctx.drawImage(
      this.image,
      this.coordinates.x,
      this.coordinates.y,
      this.size.height,
      this.size.width
    );
  }
}
