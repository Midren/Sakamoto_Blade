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
            [
              (ind % (width / cellSize)) * cellSize,
              Math.floor((ind / width) * cellSize) * cellSize
            ],
            [cellSize, cellSize],
            blockImg
          )
        : null
    )
    .filter(val => val);
};
