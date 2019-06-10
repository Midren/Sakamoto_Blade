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
        this.speed.y = 15;
        this.speed.x = 0;
        this.coordinates.y = other.coordinates.y + other.size.height + 1;
        return true;
      case RIGHT:
        this.speed.x = 0;
        this.speed.y = 15;
        this.coordinates.x = other.coordinates.x - this.size.width - 10;
        return true;
      case LEFT:
        this.speed.x = 0;
        this.speed.y = 15;
        this.coordinates.x = other.coordinates.x + other.size.width + 10;
        return true;
      default:
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

  intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false;

    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return { x, y };
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  isCollision(other) {
    const isHorizontalCollision = this.getHorizontalCollision(other);
    const isVerticalCollision = this.getVerticalCollision(other);

    // if (isHorizontalCollision || isVerticalCollision)
    //   console.log(isVerticalCollision, isHorizontalCollision);
    if (!isVerticalCollision) return isHorizontalCollision;
    if (!isHorizontalCollision) return isVerticalCollision;

    const otherObjectBoarders = other.getBoarderCoordinates();
    let x1, x2, x3, x4, y1, y2, y3, y4;
    if (isVerticalCollision === DOWN) {
      x1 = otherObjectBoarders[UP][LEFT].x;
      y1 = otherObjectBoarders[UP][LEFT].y;
      x2 = otherObjectBoarders[UP][RIGHT].x;
      y2 = otherObjectBoarders[UP][RIGHT].y;
    } else {
      x1 = otherObjectBoarders[DOWN][LEFT].x;
      y1 = otherObjectBoarders[DOWN][LEFT].y;
      x2 = otherObjectBoarders[DOWN][RIGHT].x;
      y2 = otherObjectBoarders[DOWN][RIGHT].y;
    }
    if (isHorizontalCollision == RIGHT) {
      x3 = otherObjectBoarders[UP][LEFT].x;
      y3 = otherObjectBoarders[UP][LEFT].y;
      x4 = otherObjectBoarders[DOWN][LEFT].x;
      y4 = otherObjectBoarders[DOWN][LEFT].y;
    } else {
      x3 = otherObjectBoarders[UP][RIGHT].x;
      y3 = otherObjectBoarders[UP][RIGHT].y;
      x4 = otherObjectBoarders[DOWN][RIGHT].x;
      y4 = otherObjectBoarders[DOWN][RIGHT].y;
    }
    let [player_x1, player_y1] = [
      this.coordinates.x + this.size.width / 2,
      this.coordinates.y // + this.size.width / 2
    ];
    let [player_x2, player_y2] = [
      this.coordinates.x +
        this.size.width / 2 +
        this.speed.x * 5 * this.direction,
      this.coordinates.y + +this.size.height / 2 + this.speed.y * 2.5
    ];

    let vertical_point = this.intersect(
      x1,
      y1,
      x2,
      y2,
      player_x1,
      player_y1,
      player_x2,
      player_y2
    );
    let horizontal_point = this.intersect(
      x3,
      y3,
      x4,
      y4,
      player_x1,
      player_y1,
      player_x2,
      player_y2
    );
    if (!horizontal_point && vertical_point) {
      return isVerticalCollision;
    }
    if (!vertical_point && horizontal_point) {
      return isHorizontalCollision;
    }
    if (!horizontal_point && !vertical_point) {
      return isVerticalCollision;
    }

    // if (!horizontal_point && vertical_point) {
    //   return isVerticalCollision;
    // } else if (!vertical_point && horizontal_point) {
    //   return isHorizontalCollision;
    // } else if (!vertical_point && !horizontal_point) {
    //   return 0;
    // }
    let distToVertical = this.distance(
      player_x1,
      player_y1,
      vertical_point.x,
      vertical_point.y
    );
    let distToHoriz = this.distance(
      player_x1,
      player_y1,
      horizontal_point.x,
      horizontal_point.y
    );

    // console.log(
    //   this.distance(player_x1, player_y1, vertical_point.x, vertical_point.y),
    //   this.distance(
    //     player_x1,
    //     player_y1,
    //     horizontal_point.x,
    //     horizontal_point.y
    //   )
    // );
    console.log(distToVertical, distToHoriz);
    if (distToVertical >= distToHoriz) {
      return isHorizontalCollision;
    } else {
      return isVerticalCollision;
    }
    // if (isVerticalCollision === DOWN && this.speed.y < 0) {
    //   return isVerticalCollision;
    // }
    // return Math.pow(
    //   otherObjectBoarders[1 + (isVerticalCollision % 2)][
    //     3 + (isHorizontalCollision % 2)
    //   ].x - currentObjectBoarders[isVerticalCollision][isHorizontalCollision].x,
    //   2
    // ) >=
    //   Math.pow(
    //     otherObjectBoarders[1 + (isVerticalCollision % 2)][
    //       3 + (isHorizontalCollision % 2)
    //     ].y -
    //       currentObjectBoarders[isVerticalCollision][isHorizontalCollision].y,
    //     2
    //   )
    //   ? isVerticalCollision
    //   : isHorizontalCollision;
  }

  isCollisionTEMP(other, ctx) {
    const isHorizontalCollision = this.getHorizontalCollision(other);
    const isVerticalCollision = this.getVerticalCollision(other);

    if (!isVerticalCollision) return isHorizontalCollision;
    if (!isHorizontalCollision) return isVerticalCollision;

    const currentObjectBoarders = this.getBoarderCoordinates();
    const otherObjectBoarders = other.getBoarderCoordinates();
    let x1, x2, x3, x4, y1, y2, y3, y4;
    if (isVerticalCollision === DOWN) {
      x1 = otherObjectBoarders[UP][LEFT].x;
      y1 = otherObjectBoarders[UP][LEFT].y;
      x2 = otherObjectBoarders[UP][RIGHT].x;
      y2 = otherObjectBoarders[UP][RIGHT].y;
    } else {
      x1 = otherObjectBoarders[DOWN][LEFT].x;
      y1 = otherObjectBoarders[DOWN][LEFT].y;
      x2 = otherObjectBoarders[DOWN][RIGHT].x;
      y2 = otherObjectBoarders[DOWN][RIGHT].y;
    }
    if (isHorizontalCollision == RIGHT) {
      x3 = otherObjectBoarders[UP][LEFT].x;
      y3 = otherObjectBoarders[UP][LEFT].y;
      x4 = otherObjectBoarders[DOWN][LEFT].x;
      y4 = otherObjectBoarders[DOWN][LEFT].y;
    } else {
      x3 = otherObjectBoarders[UP][RIGHT].x;
      y3 = otherObjectBoarders[UP][RIGHT].y;
      x4 = otherObjectBoarders[DOWN][RIGHT].x;
      y4 = otherObjectBoarders[DOWN][RIGHT].y;
    }
    let [player_x1, player_y1] = [
      this.coordinates.x + this.size.width / 2,
      this.coordinates.y // + this.size.width / 2
    ];
    let [player_x2, player_y2] = [
      this.coordinates.x +
        this.size.width / 2 +
        this.speed.x * 10 * this.direction,
      this.coordinates.y + +this.size.height / 2 + this.speed.y * 3
    ];

    let vertical_point = this.intersect(
      x1,
      y1,
      x2,
      y2,
      player_x1,
      player_y1,
      player_x2,
      player_y2
    );
    let horizontal_point = this.intersect(
      x3,
      y3,
      x4,
      y4,
      player_x1,
      player_y1,
      player_x2,
      player_y2
    );
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
    ctx.strokeStyle = "green";
    if (vertical_point)
      ctx.fillRect(vertical_point.x, vertical_point.y, 10, 10);
    if (horizontal_point)
      ctx.fillRect(horizontal_point.x, horizontal_point.y, 10, 10);
    ctx.strokeStyle = "black";

    // if(vertical_point) {
    //   return isVerticalCollision;
    // } else {
    //   return isHorizontalCollision;
    // }
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
