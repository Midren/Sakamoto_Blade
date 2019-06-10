import {activateKeyboardInput} from "./Controller";
import {Bullet} from "./Bullet";
import {Player} from "./Player";
import {
    backGroundAnimation,
    getSong,
    loadImg,
    loadingImgSrc,
    playTrack
} from "./media";
import {
    generateMap,
    FIELD_WIDTH,
    FIELD_HEIGHT,
    CELL_WIDTH,
    CELL_HEIGHT,
    singleSpritesLoader
} from "./field";
// import {
//   loadImages,
//   playerImagesSrc,
//   blocksImagesSrc,
//   backgroundImagesSrc
// } from "./media";
import {clear, drawImage} from "./canvasHelper";
import {PubSub} from "./PubSub";

let GAME_INSTANCES_NUMBER = 0;

export class Game {
    constructor(canvas, keyControllers) {
        this.sprites = singleSpritesLoader();
        this.ctx = canvas.getContext("2d");
        loadImg(loadingImgSrc).then(val =>
            drawImage(this.ctx, val, {height: FIELD_HEIGHT, width: FIELD_WIDTH})
        );

        const audioCtx = new AudioContext();
        getSong(audioCtx, "music/MOON_Dust.ogg").then(song =>
            playTrack(audioCtx, song)
        );
        canvas.setAttribute("height", FIELD_HEIGHT);
        canvas.setAttribute("width", FIELD_WIDTH);
        this.keyControllers = keyControllers;
        this.id = GAME_INSTANCES_NUMBER++;
        this.playerActionsPublisher = new PubSub();
    }

    start(playerActions) {
        this.playerActions = playerActions;
        this.sprites.then(values => {
            try {
                const [playerImgs, blocksImg, backgroundImg] = values;
                const [platformSprite, lavaSprite] = blocksImg;
                Bullet.img = lavaSprite;
                Player.img = playerImgs;

                let movableObjects = [];
                let players = [];
                this.keyControllers.forEach(keyController => {
                    let keyStatus = {
                        left: false,
                        right: false,
                        up: false,
                        hit: false,
                        shoot: false
                    };
                    this.id++;

                    activateKeyboardInput(
                        playerActions,
                        keyStatus,
                        keyController,
                        this.id
                    );
                    let playerId = this.id;
                    players.push({playerId: playerId, keyStatus: keyStatus});
                    this.playerActionsPublisher.subscribe(player => {
                        playerActions.send(JSON.stringify(player));
                    });

                    this.playerActionsPublisher.publish(players[players.length-1]);
                });
                let field = generateMap(platformSprite);
                this.startListenFromServer(movableObjects);

                let background = backGroundAnimation(this.ctx, backgroundImg);
                this.render(movableObjects, field, background, players);
            } catch (error) {
                console.log(error);
            }
        });
    }

    clear() {
        clear(this.ctx);
    }

    render(movableObjects, field, background, players) {
        const render = () => {
            this.clear();
            drawImage(this.ctx, background.image);

            players.forEach(player => this.playerActionsPublisher.publish(player));
            field.forEach(obj => obj.render(this.ctx));
            movableObjects.forEach(obj => obj.render(this.ctx));
            requestAnimationFrame(render);
        };

        render();
    }

    startListenFromServer(movableObjects) {
        this.playerActions.addEventListener("message", event => {
            movableObjects.length = 0;
            JSON.parse(event.data).forEach(entity =>
                entity && entity.id
                    ? movableObjects.push(
                    new Player(
                        entity.id,
                        entity.coordinates,
                        {height: CELL_HEIGHT, width: CELL_WIDTH},
                        {x: 1, y: 0},
                        entity.direction
                    )
                    )
                    : entity && !entity.id
                    ? movableObjects.push(
                        new Bullet(
                            entity.id,
                            entity.coordinates,
                            {height: 18, width: 5},
                            {x: entity.direction * 40, y: 0}
                        )
                    )
                    : null
            );
        });
    }
}
