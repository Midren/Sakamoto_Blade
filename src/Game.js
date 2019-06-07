import {keyController} from "./Controller";
import {Bullet, Player} from "./Entity";
import {playTrack} from "./media";
import {generate_map} from "./field";

const render = (ctx, field, movableObjects, keyStatus, playerImg, blocksImg, background, socket) => {
    ctx.clearRect(0, 0, 1200, 750);
    ctx.drawImage(background.image, 0, 0, 1200, 750);

    socket.send(JSON.stringify(keyStatus));
    keyStatus.shoot = false;

    field.forEach(block => block.render(ctx));
    movableObjects.forEach(obj => obj.render(ctx));

    requestAnimationFrame(render.bind(null, ctx, field, movableObjects, keyStatus, playerImg, blocksImg, background, socket));
};

export const startGame = (ctx, audioCtx, socket, playerImg, blocksImg, backgroundImg, soundtrack) => {
        document.getElementById("loading_screen").style.display = "none";
        document.getElementById("field").style.display = "flex";

        let keyStatus = {"left": false, "right": false, "up": false, "hit": false, "shoot": false};

        let movableObjects = [];
        let field = generate_map(blocksImg["platform.png"]);

        document.onkeydown = keyController.bind(null, keyStatus, true);
        document.onkeyup = keyController.bind(null, keyStatus, false);

        let background = {"image": backgroundImg["frame_000.png"]};
        let counter = {"n": 0};

        setInterval(((ctx, backgroundImg, num) => {
            background.image = backgroundImg["frame_" + counter.n.toString().padStart(3, "0") + ".png"];
            counter.n = (++counter.n) % Object.keys(backgroundImg).length;
        }).bind(null, ctx, backgroundImg, counter), 100);

        playTrack(audioCtx, soundtrack);

        socket.addEventListener('message', (event) => {
            movableObjects.length = 0;
            JSON.parse(event.data).forEach(entity =>
                entity && entity.id ? movableObjects.push(new Player(entity.id, entity.x, entity.y, 50, 50, playerImg, [1, 0], entity.direction)) :
                    entity && !entity.id ? movableObjects.push(new Bullet(0, entity.x, entity.y, 18, 5, blocksImg["lava.png"], [entity.direction * 40, 0])) : null);
        });

        requestAnimationFrame(render.bind(null, ctx, field, movableObjects, keyStatus, playerImg, blocksImg, background, socket));
    }
;
