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

export const generate_map = (field, blockImg) => {
    const cell_size = 50;
    const width = 1200;
    fieldBlueprint.split('').forEach((val, ind) =>
        val === "#" ?
            field.push(
                new GameObject((ind % (width / cell_size)) * cell_size, Math.floor(ind / (width / cell_size)) * cell_size, 50, 50, blockImg))
            : null
    );
};