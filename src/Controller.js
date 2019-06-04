export const keyController = (player, e) => {
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            player.speed[0] += 20;
            player.direction = -1;
            // player.move(-1);
            console.log("Left");
            break;
        case "d":
        case "ArrowRight":
            console.log("Right");
            player.speed[0] += 20;
            player.direction = 1;
            // player.move(1);
            break;
        case "w":
        case "ArrowUp":
            player.speed[1] = -60;
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