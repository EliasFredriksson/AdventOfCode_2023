import utils from "../utils/utils";

type CardRecord = {
  card: string;
  count: number;
};

const part1 = (input: string): number => {
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

const part2 = (input: string) => {
  const cards = input.split("\r\n");
  const cardsRecord = cards.reduce<Record<string, CardRecord>>(
    (record, card) => {
      const cardNumber = card.split(":")[0].match(/\d+/)[0];
      return {
        ...record,
        [cardNumber]: {
          card,
          count: 1,
        },
      };
    },
    {}
  );

  Object.keys(cardsRecord).forEach((cardNumber) => {
    const cardRaw = cardsRecord[cardNumber].card.split(":");
    const raw = cardRaw[1].trim().split("|");
    const [...cardNumbers] = raw[0].trim().match(/\d+/g);
    const [...winningNumbers] = raw[1].trim().match(/\d+/g);
    const hits = cardNumbers.filter((num) => winningNumbers.includes(num));
    const newCards = Array.from(
      { length: hits.length },
      (_, i) => i + 1 + parseInt(cardNumber)
    );
    const currentCount = cardsRecord[cardNumber].count;
    newCards.forEach((num) => {
      cardsRecord[num].count += 1 * currentCount;
    });
  });

  return Object.values(cardsRecord).reduce((total, card) => {
    return total + card.count;
  }, 0);
};

utils.log({
  part1: utils.run(part1, "Day4"),
  part2: utils.run(part2, "Day4"),
});
