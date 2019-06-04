export const keyController = (e) => {
    switch (e.key) {
        case "a":
        case "ArrowLeft":
            console.log("Left");
            break;
        case "d":
        case "ArrowRight":
            console.log("Right");
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