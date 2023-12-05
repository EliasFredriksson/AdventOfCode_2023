import utils from "../utils/utils";

type Digits = {
  first: number;
  last: number;
};

const DIGIT_NAMES = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

const mapDigitNameToDigit: Record<(typeof DIGIT_NAMES)[number], number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const convertDigitNamesToNumbers = (inputRow: string): string => {
  return inputRow.split("").reduce((currentRowCharacters, character) => {
    const parsedRow = DIGIT_NAMES.reduce<string>((currentRow, digit) => {
      return currentRow.replaceAll(digit, `${mapDigitNameToDigit[digit]}`);
    }, currentRowCharacters);
    return parsedRow + character;
  }, "");
};

const getFirstAndLastDigitOfRow = (inputRow: string): Digits => {
  return inputRow.split("").reduce<Digits>(
    (digits, char) => {
      const number = parseInt(char);
      if (!isNaN(number)) {
        if (!digits.first) digits.first = number;
        digits.last = number;
      }
      return digits;
    },
    {
      first: null,
      last: null,
    }
  );
};

const part1 = (input: string): number => {
  return input.split("\n").reduce<number>((total, row) => {
    const { first, last } = getFirstAndLastDigitOfRow(row);
    return total + parseInt(`${first}${last}`);
  }, 0);
};

const part2 = (input: string): number => {
  return input.split("\n").reduce<number>((total, row) => {
    const ROW_PARSED = convertDigitNamesToNumbers(row);
    const { first, last } = getFirstAndLastDigitOfRow(ROW_PARSED);
    return total + parseInt(`${first}${last}`);
  }, 0);
};

utils.log({
  part1: utils.run(part1, "Day1"),
  part2: utils.run(part2, "Day1"),
});
