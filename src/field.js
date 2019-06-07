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

export const generate_map = blockImg => {
  const cellSize = 50;
  const width = 1200;
  return fieldBlueprint
    .split("")
    .map((val, ind) =>
      val === PLATFORM
        ? new GameObject(
            {
              x: (ind % (width / cellSize)) * cellSize,
              y: Math.floor((ind / width) * cellSize) * cellSize
            },
            { height: cellSize, width: cellSize },
            blockImg
          )
        : null
    )
    .filter(val => val);
};
