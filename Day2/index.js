"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
const mapColorToMaxCount = {
    red: 12,
    green: 13,
    blue: 14,
};
const part1 = (input) => {
    const rows = input.split("\r\n");
    return rows.reduce((idTotal, row) => {
        const [game, rounds] = row.split(":");
        const [_, gameId] = game.split("Game");
        const areRoundsValid = rounds
            .split(";")
            .reduce((isRoundValid, round) => {
            return (isRoundValid &&
                round.split(",").reduce((isRollValid, roll) => {
                    const [count, color] = roll.trim().split(" ");
                    return isRollValid && mapColorToMaxCount[color] >= parseInt(count);
                }, true));
        }, true);
        if (!areRoundsValid)
            return idTotal;
        return idTotal + parseInt(gameId.trim());
    }, 0);
};
const part2 = (input) => {
    const rows = input.split("\r\n");
    return rows.reduce((minimumCubePower, row) => {
        const [_, rounds] = row.split(":");
        const { red, green, blue } = rounds
            .split(";")
            .reduce((minimum, round) => {
            round.split(",").some((roll) => {
                const [count, color] = roll.trim().split(" ");
                if (minimum[color] === null || minimum[color] < parseInt(count)) {
                    minimum[color] = parseInt(count);
                }
            });
            return minimum;
        }, {
            red: 1,
            green: 1,
            blue: 1,
        });
        return minimumCubePower + red * green * blue;
    }, 0);
};
utils_1.default.log({
    part1: utils_1.default.run(part1, "Day2"),
    part2: utils_1.default.run(part2, "Day2"),
});
