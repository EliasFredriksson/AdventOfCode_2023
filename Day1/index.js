"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
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
];
const mapDigitNameToDigit = {
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
const convertDigitNamesToNumbers = (inputRow) => {
    return inputRow.split("").reduce((currentRowCharacters, character) => {
        const parsedRow = DIGIT_NAMES.reduce((currentRow, digit) => {
            return currentRow.replaceAll(digit, `${mapDigitNameToDigit[digit]}`);
        }, currentRowCharacters);
        return parsedRow + character;
    }, "");
};
const getFirstAndLastDigitOfRow = (inputRow) => {
    return inputRow.split("").reduce((digits, char) => {
        const number = parseInt(char);
        if (!isNaN(number)) {
            if (!digits.first)
                digits.first = number;
            digits.last = number;
        }
        return digits;
    }, {
        first: null,
        last: null,
    });
};
const part1 = (input) => {
    return input.split("\n").reduce((total, row) => {
        const { first, last } = getFirstAndLastDigitOfRow(row);
        return total + parseInt(`${first}${last}`);
    }, 0);
};
const part2 = (input) => {
    return input.split("\n").reduce((total, row) => {
        const ROW_PARSED = convertDigitNamesToNumbers(row);
        const { first, last } = getFirstAndLastDigitOfRow(ROW_PARSED);
        return total + parseInt(`${first}${last}`);
    }, 0);
};
utils_1.default.log({
    part1: utils_1.default.run(part1, "Day1"),
    part2: utils_1.default.run(part2, "Day1"),
});
