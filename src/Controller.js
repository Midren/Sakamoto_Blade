export class KeyStatus {
    constructor() {
        this.clear();
    }

    clear() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.hit = false;
        this.shoot = false;
    }
}

export const keyHandler = (keyStatus, player) => {
    if (keyStatus.left) {
        player.speed[0] += 5;
        player.direction = -1;
    }
    if (keyStatus.right) {
        player.speed[0] += 5;
        player.direction = 1;
    }
    if (keyStatus.up) {
        player.speed[1] = -30;
    }
    if (keyStatus.hit) {

    }
    if (keyStatus.shoot) {

    }

};

export const keyController = (keyHelper, e) => {
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            keyHelper.left = true;
            break;
        case "d":
        case "ArrowRight":
            keyHelper.right = true;
            break;
        case "w":
        case "ArrowUp":
            keyHelper.up = true;
            break;
        case "k":
            keyHelper.hit = true;
            break;
        case "j":
            keyHelper.shot = true;
            break;
    }
};