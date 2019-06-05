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
    let player;
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            keyHelper.left = true;
            // player.speed[0] += 20;
            // player.direction = -1;
            // player.move(-1);
            console.log("Left");
            break;
        case "d":
        case "ArrowRight":
            keyHelper.right = true;
            console.log("Right");
            // player.speed[0] += 20;
            // player.direction = 1;
            // player.move(1);
            break;
        case "w":
        case "ArrowUp":
            keyHelper.up = true;
            // player.speed[1] = -60;
            console.log("Up");
            break;
        case "k":
            keyHelper.hit = true;
            console.log("Katana");
            break;
        case "j":
            keyHelper.shot = true;
            console.log("Long shot");
            break;
    }
};