"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crop = void 0;
var sharp_1 = __importDefault(require("sharp"));
function crop(filename, width, height, outputname) {
    (0, sharp_1.default)("assets/full/".concat(filename))
        .resize(width, height)
        .toFile("assets/thumb/".concat(outputname), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
exports.crop = crop;
