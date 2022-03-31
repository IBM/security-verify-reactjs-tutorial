"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvString = void 0;
function parseCsvString(value, defaultValue) {
    if (value) {
        return value.split(',').map(v => v.trim());
    }
    return defaultValue ? [defaultValue] : [];
}
exports.parseCsvString = parseCsvString;
