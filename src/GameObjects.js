const UP = 1,
  DOWN = 2,
  RIGHT = 3,
  LEFT = 4;

export class GameObject {
  constructor(coordinates, size, image) {
    this.coordinates = coordinates;
    this.size = size;
    this.image = image;
  }
  getBoarderCoordinates() {
    return {
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
