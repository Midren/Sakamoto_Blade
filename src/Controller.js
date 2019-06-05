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
        if (player.speed[1] === 0)
            player.speed[1] = -30;
    }
    if (keyStatus.hit) {

    }
    if (keyStatus.shoot) {

    }

};

export const keyController = (keyHelper, bool, e) => {
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            keyHelper.left = bool;
            break;
        case "d":
        case "ArrowRight":
            keyHelper.right = bool;
            break;
        case "w":
        case "ArrowUp":
            keyHelper.up = bool;
            break;
        case "k":
            keyHelper.hit = bool;
            break;
        case "j":
            keyHelper.shot = bool;
            break;
    }
};