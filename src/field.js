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
export const CELL_WIDTH = FIELD_WIDTH / 24;
export const CELL_HEIGHT = FIELD_HEIGHT / 14;

export const generateMap = blockImg => {
  return fieldBlueprint
    .split("")
    .map((val, ind) =>
      val === PLATFORM
        ? new GameObject(
            {
              x: (ind % (FIELD_WIDTH / CELL_WIDTH)) * CELL_WIDTH,
              y: Math.floor((ind / FIELD_WIDTH) * CELL_WIDTH) * CELL_HEIGHT
            },
            { height: CELL_HEIGHT, width: CELL_WIDTH },
            blockImg
          )
        : val === EMPTY
        ? null
        : null
    )
    .filter(val => val);
};
