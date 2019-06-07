export class GameObject {
  constructor(coordinates, size, image) {
    this.coordinates = coordinates;
    this.size = size;
    this.image = image;
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
