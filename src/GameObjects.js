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

    render() {

    }

}

export class MovableObject extends GameObject {
    constructor(x, y, height, width, image, speed) {
        super(x, y, height, width, image);
        this.speed = speed;
    }

    move() {

    }

    onCollision(other) {
        // super.onCollision(other);
    }

}