export class GameObject {
    constructor(x, y, height, width, image) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
    }

    isCollision(other) {
        if (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y) {
            // collision detected!
            return true;
        }
        return false;
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
        if (this.y + this.height >= 720 && this.speed[1] > 0)
            this.speed[1] = 0;
        if ((this.x + this.speed[0] < 0) || (this.speed[0] + this.x + this.width) > 1200) {
            this.speed[0] = 0;
        }
        this.x += this.speed[0];
        this.y += this.speed[1];

        if (this.speed[1] < 0) {
            this.speed = this.speed.map(val => Math.abs(val * 0.3) < 1 ? 0 : val * 0.7);
            this.speed[1] = this.speed[1] === 0 ? 15 : this.speed[1];
            if (this.speed[0]) {
                this.speed[0] -= this.speed[1] * Math.cos(Math.PI / 4) * Math.abs(this.speed[0]) / this.speed[0]
            }
        } else {
            this.speed[0] = Math.abs(this.speed[0] * 0.7) < 1 ? 0 : this.speed[0] * 0.7;
            this.speed[1] = 15;
        }
        if (this.y + this.height >= 720 && this.speed[1] > 0)
            this.speed[1] = 0;
    }

    onCollision(other) {
        this.isCollision(other) ? this.y = other.y-this.height: null;
    }

}