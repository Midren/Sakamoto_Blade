export class GameObject {
    constructor(x, y, height, width, image) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
    }

    isCollision(other) {
        // 1 - up
        // 2 - down
        // 3 - right
        //4 - left
        let s = 0, t = 0;
        if (this.y + this.height > other.y && this.y < other.y + other.height) {
            if (this.x < other.x && this.x + this.width > other.x) {
                t = 3;
            }
            if (this.x > other.x && this.x < other.x + other.width) {
                t = 4;
            }
        }
        if (this.x + this.width > other.x && this.x < other.x + other.width) {
            if (this.y < other.y && this.y + this.height > other.y) {
                s = 1;
            }
            if (this.y < other.y + other.height && this.y > other.y) {
                s = 2;
            }
        }
        if (!s)
            return t;
        if (!t)
            return s;
        let new_this = {
            "1": {
                "3": {"x": this.x + this.width, "y": this.y + this.height},
                "4": {"x": this.x, "y": this.y + this.height}
            },
            "2": {
                "3": {"x": this.x + this.width, "y": this.y},
                "4": {"x": this.x, "y": this.y}
            }
        };
        let new_other = {
            "1": {
                "3": {"x": other.x, "y": other.y},
                "4": {"x": other.x + other.width, "y": other.y}
            },
            "2": {
                "3": {"x": other.x, "y": other.y + other.height},
                "4": {"x": other.x + other.width, "y": other.y + other.height}
            }
        };
        if (s == 2 && this.speed[1] < 0) {
            return s;
        }
        // console.log(other.x, other.y);
        if (Math.pow(new_other[s][t].x - new_this[s][t].x, 2) >= Math.pow(new_other[s][t].y - new_this[s][t].y, 2)) {
            // console.log(s);
            return s;
        } else {
            // console.log('falling');
            return t;
        }
    }

    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.height, this.width)
    }

}

export class MovableObject extends GameObject {
    constructor(x, y, height, width, image, speed) {
        super(x, y, height, width, image);
        this.speed = speed;
        this.onGround = false;
    }

    move() {
        if (this.onGround && this.speed[1] > 0)
            this.speed[1] = 0;
        if (this.y + this.height >= 720 && this.speed[1] > 0)
            this.speed[1] = 0;
        if ((this.x + this.speed[0] < 0) || (this.speed[0] + this.x + this.width) > 1200) {
            this.speed[0] = 0;
        }
        this.x += this.speed[0];
        this.y += this.speed[1];

        if (this.speed[1] < 0) {
            this.speed = this.speed.map(val => Math.abs(val * 0.3) < 1 ? 0 : val * 0.7);
            if (!this.speed[1].onGround)
                this.speed[1] = this.speed[1] === 0 ? 15 : this.speed[1];
        } else {
            this.speed[0] = Math.abs(this.speed[0] * 0.7) < 1 ? 0 : this.speed[0] * 0.7;
            if (!this.speed[1].onGround)
                this.speed[1] = 15;
        }
        if (this.y + this.height >= 720 && this.speed[1] > 0)
            this.speed[1] = 0;
    }

    onCollision(other) {
        let side = this.isCollision(other);
        switch (side) {
            case 1:
                this.onGround = true;
                this.y = other.y - this.height + 1;
                return true;
            case 2:
                this.onGround = false;
                this.y = other.y + other.height + 1;
                return true;
            case 3:
                this.x = other.x - this.width - 10;
                return true;
            case 4:
                this.x = other.x + other.width + 10;
                return true;
            case 0:
                break;
        }
        return false;
    }
}