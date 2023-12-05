import { readFileSync } from "fs";

export default {
  run: <T>(fn: (input: string) => T, dayFolder: string): T => {
    return fn(readFileSync(`${dayFolder}/INPUT.txt`).toString());
  },
  log: <T>(output: T): void => {
    console.log(JSON.stringify(output, null, 2));
  },
};
