import utils from "../utils/utils";

const part1 = (input: string) => {
  const cards = input.split("\r\n");
  return cards.reduce((total, card) => {
    const data = card.split(":")[1].trim();
    const raw = data.split("|");
    const [...cardNumbers] = raw[0].trim().match(/\d+/g);
    const [...winningNumbers] = raw[1].trim().match(/\d+/g);
    const hits = cardNumbers.filter((num) => winningNumbers.includes(num));
    const totalPoints = !!hits.length ? 2 ** hits.length / 2 : 0;
    return total + totalPoints;
  }, 0);
};

const part2 = (input: string) => {};

utils.log({
  part1: utils.run(part1, "Day4"),
  part2: utils.run(part2, "Day4"),
});
