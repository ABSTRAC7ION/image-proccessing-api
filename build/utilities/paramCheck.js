"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
var fs_1 = __importDefault(require("fs"));
function check(filename, width, height) {
    if (!fs_1.default.existsSync("assets/full/".concat(filename))) {
        return false;
    }
    if (width < 1 || height < 1) {
        return false;
    }
    return true;
}
exports.check = check;
