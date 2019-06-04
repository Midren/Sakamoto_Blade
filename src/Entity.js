import {MovableObject} from "./GameObjects";

export class Player extends MovableObject {
    static gravity = 3;

    constructor(x, y, height, width, image, speed, direction) {
        super(x, y, height, width, image, speed);
        this.direction = direction;
    }

    move(direction) {
        this.speed[0] *= direction;
        super.move();
        this.speed[0] *= direction;
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

}

export class Bullet extends MovableObject {
    onCollision(other) {
        // super.onCollision(other);
    }
}