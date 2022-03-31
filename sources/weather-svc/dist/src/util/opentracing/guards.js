"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpan = void 0;
function isSpan(context) {
    return !!context && !!context.tracer && !!context.setTag;
}
exports.isSpan = isSpan;
