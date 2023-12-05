"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = {
    run: (fn, dayFolder) => {
        return fn((0, fs_1.readFileSync)(`${dayFolder}/INPUT.txt`).toString());
    },
    log: (output) => {
        console.log(JSON.stringify(output, null, 2));
    },
};
