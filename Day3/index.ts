import utils from "../utils/utils";

type Pos = {
  x: number;
  y: number;
};

const DIGITS: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const getSymbols = (input: string): string[] => {
  return input.split("\r\n").reduce((acc, row) => {
    const filtered = row
      .split("")
      .filter((value) => !DIGITS.includes(value) && value !== ".");
    return [...new Set([...acc, ...filtered])];
  }, []);
};

const getAdjecent = (pos: Pos, partNumber: string, data: string[][]): Pos[] => {
  const MAX_X = data[0].length;
  const MAX_Y = data.length;
  const adjecentPositions: Pos[] = [];
  const isAtLeftEdge = pos.x === 0;
  const isAtRightEdge = pos.x + partNumber.length === MAX_X;
  const startIndex = isAtLeftEdge ? 0 : -1;
  const endIndex = isAtRightEdge ? partNumber.length : partNumber.length + 1;
  for (let xIndex = startIndex; xIndex < endIndex; xIndex++) {
    const finalX = pos.x + xIndex;
    if (finalX < 0 || finalX > MAX_X) continue;
    const isValidNorthPos = pos.y - 1 >= 0;
    const isValidSouthPos = pos.y + 1 < MAX_Y;
    if (isValidNorthPos) {
      adjecentPositions.push({
        x: pos.x + xIndex,
        y: pos.y - 1,
      });
    }
    if (isValidSouthPos) {
      adjecentPositions.push({
        x: pos.x + xIndex,
        y: pos.y + 1,
      });
    }
  }
  if (!isAtLeftEdge) {
    adjecentPositions.push({
      x: pos.x - 1,
      y: pos.y,
    });
  }
  if (!isAtRightEdge) {
    adjecentPositions.push({
      x: pos.x + partNumber.length,
      y: pos.y,
    });
  }
  return adjecentPositions;
};

const isDigit = (char: string): boolean => DIGITS.includes(char);

const part1 = (input: string) => {
  const data = input.split("\r\n").map((row) => row.split(""));
  const MAX_X = data[0].length;
  const MAX_Y = data.length;
  const SYMBOLS = getSymbols(input);

  let totalSumOfParts = 0;
  let charOffset = 0;
  for (let y = 0; y < MAX_Y; y++) {
    for (let x = 0; x < MAX_X; x++) {
      const char = data[y][x];
      if (charOffset === 0) {
        if (isDigit(char)) {
          let charsOfPartNumber = "";
          let currentX = x;
          while (isDigit(data[y][currentX])) {
            const test = data[y][currentX];
            charsOfPartNumber += test;
            currentX++;
          }
          const adjecentPositions = getAdjecent(
            { x, y },
            charsOfPartNumber,
            data
          );
          const hasSymbol = adjecentPositions.some((pos) => {
            return SYMBOLS.includes(data[pos.y][pos.x]);
          });
          if (hasSymbol) totalSumOfParts += parseInt(charsOfPartNumber);
          charOffset = charsOfPartNumber.length;
        }
      } else {
        charOffset--;
      }
    }
  }

  return totalSumOfParts;
};

const part2 = () => {};

utils.log({
  part1: utils.run(part1, "Day3"),
  part2: utils.run(part2, "Day3"),
});
