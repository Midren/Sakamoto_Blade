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
        this.actionProcessor = new PubSub();
    }

    start(playerActions) {
        this.playerActions = playerActions;
        this.playerActions.addEventListener("message", event =>
            this.actionProcessor.publish(JSON.parse(event.data))
        );
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

                    this.playerActionsPublisher.publish(players[players.length - 1]);
                });
                let field = generateMap(platformSprite);
                const subscription = this.actionProcessor.subscribe(data => {
                    if (data === "game_over") {
                        this.actionProcessor.unsubscribe(subscription);
                    } else this.updateScene(movableObjects, data);
                });

                let background = backGroundAnimation(this.ctx, backgroundImg);
                this.render(movableObjects, field, background, players);
            } catch (error) {
                console.log(error);
            }
        });
    }

    updateScene(movableObjects, entities) {
        movableObjects.length = 0;
        entities.forEach(entity => {
            if (entity) {
                if (entity.id) {
                    movableObjects.push(
                        new Player(
                            entity.id,
                            entity.coordinates,
                            {height: CELL_HEIGHT, width: CELL_WIDTH},
                            entity.speed,
                            entity.direction
                        )
                    );
                } else {
                    movableObjects.push(
                        new Bullet(
                            entity.id,
                            entity.coordinates,
                            {height: 18, width: 5},
                            entity.speed
                        )
                    );
                }
            }
        });
    }

    clear() {
        clear(this.ctx);
    }

  render(movableObjects, field, background, players) {
    const render = () => {
      this.clear();
      drawImage(this.ctx, background.image, { height: FIELD_HEIGHT, width: FIELD_WIDTH });

            players.forEach(player => this.playerActionsPublisher.publish(player));
            field.forEach(obj => obj.render(this.ctx));
            movableObjects.forEach(obj => obj.render(this.ctx));
            // movableObjects.forEach(obj =>
            //   field.forEach(block => obj.renderCollisionGrid(block, this.ctx))
            // );
            requestAnimationFrame(render);
        };

        render();
    }
}
