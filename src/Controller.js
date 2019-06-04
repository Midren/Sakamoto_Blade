export const keyController = (player, e) => {
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            player.speed[0] += 10;
            player.direction = -1;
            // player.move(-1);
            console.log("Left");
            break;
        case "d":
        case "ArrowRight":
            console.log("Right");
            player.speed[0] += 10;
            player.direction = 1;
            // player.move(1);
            break;
        case "w":
        case "ArrowUp":
            console.log("Up");
            break;
        case "k":
            console.log("Katana");
            break;
        case "l":
            console.log("Long shot");
            break;
    }
};