"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
function omit(object, toOmit) {
    return Object
        .keys(object)
        .filter(not(isIncluded(toOmit)))
        .reduce((result, field) => {
        result[field] = object[field];
        return result;
    }, {});
}
exports.omit = omit;
function not(func) {
    return (value) => {
        return !func(value);
    };
}
function isIncluded(toOmit) {
    const matcher = (Array.isArray(toOmit) ? toOmit : [toOmit]);
    return (value) => {
        return matcher.includes(value);
    };
}
