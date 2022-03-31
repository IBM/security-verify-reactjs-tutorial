"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
function timer(value, timer) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, timer);
    });
}
exports.timer = timer;
