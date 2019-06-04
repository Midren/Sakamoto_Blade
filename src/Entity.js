import {MovableObject} from "./GameObjects";

export class Player extends MovableObject {
    constructor(x, y, height, width, image, speed, direction) {
        super(x, y, height, width, image, speed);
        this.direction = direction;
    }

    move(direction) {

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
    constructor(x, y, height, width, image, speed) {
        super(x, y, height, width, image, speed);
    }

    move() {

    }

    onCollision(other) {
        // super.onCollision(other);
    }
}