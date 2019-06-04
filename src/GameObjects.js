export class GameObject {
    constructor(x, y, height, width, image) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
    }

    onCollision(other) {

    }

    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.height, this.width)
    }

}

export class MovableObject extends GameObject {
    constructor(x, y, height, width, image, speed) {
        super(x, y, height, width, image);
        this.speed = speed;
    }

    move() {
        this.x += this.speed[0];
        this.y += this.speed[1];
        this.speed = this.speed.map(val => val *= 0.7);
    }

    onCollision(other) {
        // super.onCollision(other);
    }

}