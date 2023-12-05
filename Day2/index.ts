import utils from "../utils/utils";

const mapColorToMaxCount: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = (input: string): number => {
  const rows = input.split("\r\n");
  return rows.reduce<number>((idTotal, row) => {
    const [game, rounds] = row.split(":");
    const [_, gameId] = game.split("Game");
    const areRoundsValid = rounds
      .split(";")
      .reduce<boolean>((isRoundValid, round) => {
        return (
          isRoundValid &&
          round.split(",").reduce((isRollValid, roll) => {
            const [count, color] = roll.trim().split(" ");
            return isRollValid && mapColorToMaxCount[color] >= parseInt(count);
          }, true)
        );
      }, true);
    if (!areRoundsValid) return idTotal;
    return idTotal + parseInt(gameId.trim());
  }, 0);
};

const part2 = (input: string): number => {
  const rows = input.split("\r\n");
  return rows.reduce<number>((minimumCubePower, row) => {
    const [_, rounds] = row.split(":");
    const { red, green, blue } = rounds
      .split(";")
      .reduce<Record<string, number>>(
        (minimumNeeded, round) => {
          round.split(",").some((roll) => {
            const [count, color] = roll.trim().split(" ");
            if (parseInt(count) > minimumNeeded[color]) {
              minimumNeeded[color] = parseInt(count);
            }
          });
          return minimumNeeded;
        },
        {
          red: 1,
          green: 1,
          blue: 1,
        }
      );
    return minimumCubePower + red * green * blue;
  }, 0);
};

utils.log({
  part1: utils.run(part1, "Day2"),
  part2: utils.run(part2, "Day2"),
});
