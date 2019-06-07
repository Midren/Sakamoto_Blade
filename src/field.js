import {GameObject} from "./GameObjects";

// @formatter:off
export const fieldBlueprint =
    "########################" +
    "#..........##..........#" +
    "##....................##" +
    "#..........##..........#" +
    "#..........##..........#" +
    "######............######" +
    "#......................#" +
    "#......##......##......#" +
    "#..........##..........#" +
    "#.........####.........#" +
    "#......................#" +
    "#....##############....#" +
    "##....................##" +
    "########################";
// @formatter:on

export const generate_map = (blockImg) => {
    const cell_size = 50;
    const width = 1200;
    return fieldBlueprint.split('').map((val, ind) =>
        val === "#" ?
            new GameObject((ind % (width / cell_size)) * cell_size, Math.floor(ind / (width / cell_size)) * cell_size, 50, 50, blockImg)
            : null
    ).filter((val) => val);
};