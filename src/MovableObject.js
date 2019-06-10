import { GameObject } from "./GameObjects";

const UP = 1,
  DOWN = 2,
  RIGHT = 3,
  LEFT = 4;

export class MovableObject extends GameObject {
  constructor(id, coordinates, size, speed, image) {
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
        Math.abs(val * 0.8) < 1 ? 0 : val * 0.8
      );
      this.speed.y = this.speed.y === 0 ? 8 : this.speed.y;
    } else {
      this.speed.x = Math.abs(this.speed.x * 0.8) < 1 ? 0 : this.speed.x * 0.8;
      this.speed.y = 8;
    }
  }
  onCollision(other) {
    let sideOfCollision = this.isCollision(other);
    switch (sideOfCollision) {
      case UP:
        this.onGround = true;
        this.coordinates.y = other.coordinates.y - this.size.height + 1;
        return true;
      case DOWN:
        this.onGround = false;
        this.speed.x = 0;
        this.coordinates.y = other.coordinates.y + other.size.height + 1;
        return true;
      case RIGHT:
        this.speed.x = 0;
        this.coordinates.x = other.coordinates.x - this.size.width - 10;
        return true;
      case LEFT:
        this.speed.x = 0;
        this.coordinates.x = other.coordinates.x + other.size.width + 10;
        return true;
      default:
        break;
    }
    return false;
  }

  intersect(line1, line2) {
    if (
      (line1.x1 === line1.x2 && line1.y1 === line1.y2) ||
      (line2.x1 === line2.x2 && line2.y1 === line2.y2)
    )
      return false;

    let denominator =
      (line2.y2 - line2.y1) * (line1.x2 - line1.x1) -
      (line2.x2 - line2.x1) * (line1.y2 - line1.y1);

    if (denominator === 0) return false;

    let ua =
      ((line2.x2 - line2.x1) * (line1.y1 - line2.y1) -
        (line2.y2 - line2.y1) * (line1.x1 - line2.x1)) /
      denominator;
    let ub =
      ((line1.x2 - line1.x1) * (line1.y1 - line2.y1) -
        (line1.y2 - line1.y1) * (line1.x1 - line2.x1)) /
      denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    let x = line1.x1 + ua * (line1.x2 - line1.x1);
    let y = line1.y1 + ua * (line1.y2 - line1.y1);

    return { x, y };
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  isCollision(other) {
    const otherObjectBoarders = other.getBoarderCoordinates();
    let down_line = {
      x1: otherObjectBoarders[DOWN][LEFT].x,
      y1: otherObjectBoarders[DOWN][LEFT].y,
      x2: otherObjectBoarders[DOWN][RIGHT].x,
      y2: otherObjectBoarders[DOWN][RIGHT].y
    };
    let up_line = {
      x1: otherObjectBoarders[UP][LEFT].x,
      y1: otherObjectBoarders[UP][LEFT].y,
      x2: otherObjectBoarders[UP][RIGHT].x,
      y2: otherObjectBoarders[UP][RIGHT].y
    };
    let right_line = {
      x1: otherObjectBoarders[UP][RIGHT].x,
      y1: otherObjectBoarders[UP][RIGHT].y,
      x2: otherObjectBoarders[DOWN][RIGHT].x,
      y2: otherObjectBoarders[DOWN][RIGHT].y
    };
    let left_line = {
      x1: otherObjectBoarders[UP][LEFT].x,
      y1: otherObjectBoarders[UP][LEFT].y,
      x2: otherObjectBoarders[DOWN][LEFT].x,
      y2: otherObjectBoarders[DOWN][LEFT].y
    };

    let player_line = {
      x1: this.coordinates.x + this.size.width / 2,
      y1: this.coordinates.y + this.size.width / 2,
      x2:
        this.coordinates.x +
        this.size.width / 2 +
        this.speed.x * 2 * this.direction,
      y2: this.coordinates.y + +this.size.height / 2 + this.speed.y * 3
    };

    let distances = [up_line, down_line, right_line, left_line]
      .map(line => this.intersect(line, player_line))
      .map(point =>
        this.distance(point.x, point.y, player_line.x1, player_line.y1)
      );
    return distances.indexOf(Math.min(...distances.filter(val => val))) + 1;
  }
}
