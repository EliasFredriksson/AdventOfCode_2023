import utils from "../utils/utils";

type Pos = {
  x: number;
  y: number;
};

const isStar = (char: string): boolean => char.length === 1 && char === "*";

const isSymbol = (char: string): boolean =>
  char.length === 1 && !char.match(/\d+/) && char !== ".";

const getAdjecent = (
  pos: Pos,
  partNumberLength: number,
  maxX: number,
  maxY: number
): Pos[] => {
  const adjecentPositions: Pos[] = [];
  const isAtLeftEdge = pos.x === 0;
  const isAtRightEdge = pos.x + partNumberLength === maxX;
  const startIndex = isAtLeftEdge ? 0 : -1;
  const endIndex = isAtRightEdge ? partNumberLength : partNumberLength + 1;
  for (let xIndex = startIndex; xIndex < endIndex; xIndex++) {
    const finalX = pos.x + xIndex;
    if (finalX < 0 || finalX > maxX) continue;
    const isValidNorthPos = pos.y - 1 >= 0;
    const isValidSouthPos = pos.y + 1 < maxY;
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
      x: pos.x + partNumberLength,
      y: pos.y,
    });
  }
  return adjecentPositions;
};

const part1 = (input: string): number => {
  const rows = input.split("\r\n");
  const MAX_Y = rows.length;
  let totalSumOfParts: number = 0;
  for (let i = 0; i < rows.length; ) {
    const match = rows[i].match(/\d+/);
    if (match) {
      const MAX_X = rows[i].length;
      const { 0: partNumber, index: rowIndex } = match;
      // Get positions around the found partNumber.
      const adjecentPositions = getAdjecent(
        {
          x: rowIndex,
          y: i,
        },
        partNumber.length,
        MAX_X,
        MAX_Y
      );
      // Check if any of the positions contain a symbol
      const hasSymbol = adjecentPositions.some((pos) =>
        isSymbol(rows[pos.y][pos.x])
      );
      if (hasSymbol) {
        totalSumOfParts += Number(partNumber);
      }
      // Replace found full number with "." dots.
      rows[i] = rows[i].replace(partNumber, ".".repeat(partNumber.length));
    } else {
      // if we did not find any numbers on current row, continue to next row
      i++;
    }
  }
  return totalSumOfParts;
};

const part2 = (input: string): number => {
  const rows = input.split("\r\n");
  const MAX_Y = rows.length;
  const gears: Record<string, number[]> = {};
  for (let i = 0; i < rows.length; ) {
    // A regex pattern to find the first matched full number on row.
    const match = rows[i].match(/\d+/);
    if (match) {
      const MAX_X = rows[i].length;
      const { 0: partNumber, index: rowIndex } = match;
      // Get positions around the found partNumber.
      const adjecentPositions = getAdjecent(
        {
          x: rowIndex,
          y: i,
        },
        partNumber.length,
        MAX_X,
        MAX_Y
      );
      // Find the position containing a "*" (if there is one)
      const starPos = adjecentPositions.find((pos) =>
        isStar(rows[pos.y][pos.x])
      );
      if (starPos) {
        // If we found a "*", add the partNumber to that "*"s numbers
        const key = `${starPos.y}-${starPos.x}`;
        if (!gears[key]) gears[key] = [];
        gears[key].push(Number(partNumber));
      }
      // Replace found full number with "." dots.
      rows[i] = rows[i].replace(partNumber, ".".repeat(partNumber.length));
    } else {
      // if we did not find any numbers on current row, continue to next row
      i++;
    }
  }
  return Object.values(gears).reduce((total, partNumbers) => {
    if (partNumbers.length === 2) {
      const [p1, p2] = partNumbers;
      return total + p1 * p2;
    }
    return total;
  }, 0);
};

utils.log({
  part1: utils.run(part1, "Day3"),
  part2: utils.run(part2, "Day3"),
});
