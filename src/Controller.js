export const keyHandler = (keyStatus, player) => {
    if (keyStatus.left) {
        player.speed[0] += 2.5;
        player.direction = -1;
    }
    if (keyStatus.right) {
        player.speed[0] += 2.5;
        player.direction = 1;
    }
    if (keyStatus.up) {
        if (player.onGround) {
            player.speed[1] = -30;
            player.onGround = false;
        }
    }
    if (keyStatus.hit) {

    }
    if (keyStatus.shoot) {
        keyStatus.shoot = false;
        return true;
    }
    return false;
};

let can_shoot = {"is_allowed": true};
const allowShoot = can_shoot => can_shoot.is_allowed = true;

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
            if (can_shoot.is_allowed && bool === true) {
                keyHelper.shoot = bool;
                can_shoot.is_allowed = false;
                setTimeout(allowShoot.bind(null, can_shoot), 500);
            } else {
                keyHelper.shoot = false;
            }
            break;
    }
};