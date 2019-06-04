import {MovableObject} from "./GameObjects";

export class Player extends MovableObject {
    constructor(x, y, height, width, images, speed, direction) {
        super(x, y, height, width, images["0l.png"], speed);
        this.images = images;
        this.direction = direction;
    }

    move() {
        this.speed[0] *= this.direction;
        super.move();
        this.speed[0] *= this.direction;
    }

    jump() {

    }

    onCollision(other) {
        // super.onCollision(other);
    }

    hit() {

    }

    shoot() {

    }

    render(ctx) {
        if(this.direction === -1) {
            this.image = this.images["0l.png"]
        } else {
            this.image = this.images["0r.png"]
        }
        super.render(ctx);
    }
}

export class Bullet extends MovableObject {
    onCollision(other) {
        // super.onCollision(other);
    }
}