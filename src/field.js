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

export const generate_map = blockImg => {
  const cellSize = 50;
  const width = 1200;
  return fieldBlueprint
    .split("")
    .map((val, ind) =>
      val === "#"
        ? new GameObject(
            (ind % (width / cellSize)) * cellSize,
            Math.floor(ind / (width / cellSize)) * cellSize,
            50,
            50,
            blockImg
          )
        : null
    )
    .filter(val => val);
};
