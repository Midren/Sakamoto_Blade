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
        if (this.speed[1] < 0) {
            this.speed = this.speed.map(val => Math.abs(val * 0.7) < 1 ? 0 : val * 0.7);
            this.speed[1] = this.speed[1] === 0 ? 20 : this.speed[1];
        } else {
            this.speed[0] = Math.abs(this.speed[0] * 0.7) < 1 ? 0 : this.speed[0] * 0.7;
            // this.speed[1] = 40;
        }
    }

    onCollision(other) {
        // super.onCollision(other);
    }

}