import { GameObject } from "./GameObjects";

// @prettier-ignore
export const fieldBlueprint =
  "########################" +
  "#..........##..........#" +
  "##....................##" +
  "#..........##..........#" +
  "#..........##..........#" +
  "######............######" +
  "#......................#" +
  "#......##......##......#" +
  "#......................#" +
  "#.........####.........#" +
  "#......................#" +
  "#....##############....#" +
  "##....................##" +
  "########################";

const PLATFORM = "#";
const EMPTY = ".";

export const FIELD_WIDTH = 900;
export const FIELD_HEIGHT = 525;
export const CELL_SIZE = FIELD_WIDTH / 24;

export const generateMap = blockImg => {
  return fieldBlueprint
    .split("")
    .map((val, ind) =>
      val === PLATFORM
        ? new GameObject(
            {
              x: (ind % (FIELD_WIDTH / CELL_SIZE)) * CELL_SIZE,
              y: Math.floor((ind / FIELD_WIDTH) * CELL_SIZE) * CELL_SIZE
            },
            { height: CELL_SIZE, width: CELL_SIZE },
            blockImg
          )
        : null
    )
    .filter(val => val);
};
